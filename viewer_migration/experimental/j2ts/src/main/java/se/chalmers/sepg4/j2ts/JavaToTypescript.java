package se.chalmers.sepg4.j2ts;

import com.github.javaparser.JavaParser;
import com.github.javaparser.ast.*;
import com.github.javaparser.ast.body.*;
import com.github.javaparser.ast.comments.BlockComment;
import com.github.javaparser.ast.comments.JavadocComment;
import com.github.javaparser.ast.comments.LineComment;
import com.github.javaparser.ast.expr.*;
import com.github.javaparser.ast.modules.*;
import com.github.javaparser.ast.nodeTypes.NodeWithSimpleName;
import com.github.javaparser.ast.stmt.*;
import com.github.javaparser.ast.type.*;
import com.github.javaparser.ast.visitor.GenericVisitor;

import java.io.IOException;
import java.nio.file.Paths;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class JavaToTypescript {
    public static void main(String[] args) throws IOException {
        Scanner inputScanner = new Scanner(System.in);
        System.err.print("Please specify file: ");
        String fileName = inputScanner.nextLine();
        System.err.println("File: " + fileName);
        CompilationUnit compilationUnit = JavaParser.parse(Paths.get(fileName));
        String marker = "/* ---------------------------------------------------------------------- */";
        System.err.println(marker);
        System.out.println(compilationUnit.accept(new CodeVisitor(), null));
        System.err.println(marker);
    }

    private static class CodeVisitor implements GenericVisitor<String, Void> {
        public static class Scope {
            private Scope parent;
            private String className;
            private Set<String> localSymbols = new HashSet<>();
            private Set<String> instanceSymbols = new HashSet<>();
            private Set<String> staticSymbols = new HashSet<>();

            public Scope() {}

            public Scope(String className, Scope parent) {
                this.className = parent.className != null ? parent.className + "." + className : className;
                this.parent = parent;
            }

            public Scope(Scope parent) {
                this.parent = parent;
                this.className = parent.className;
            }

            public void addLocalSymbol(String symbol) {
                localSymbols.add(symbol);
            }

            public void addInstanceSymbol(String symbol) {
                instanceSymbols.add(symbol);
            }

            public void addStaticSymbol(String symbol) {
                staticSymbols.add(symbol);
            }

            public String lookup(String symbol) {
                if (localSymbols.contains(symbol)) {
                    return "";
                }
                if (instanceSymbols.contains(symbol)) {
                    return "this";
                }
                if (staticSymbols.contains(symbol)) {
                    return className != null ? className : "";
                }
                if (parent != null) {
                    return parent.lookup(symbol);
                }
                try {
                    // Check if referring to java.lang class.
                    Class.forName("java.lang." + symbol);
                    return "";
                } catch (ClassNotFoundException ex) {
                    return null;
                }
            }
        }

        private Scope scope;

        public CodeVisitor() {
            this.scope = new Scope();
        }

        public CodeVisitor(Scope scope) {
            this.scope = scope;
        }

        private static String join(String delimiter, Stream<String> elements) {
            return elements.collect(Collectors.joining(delimiter));
        }

        private static String joinLines(Stream<String> lines) {
            return join("\n", lines);
        }

        private static String joinLines(String... lines) {
            return joinLines(Arrays.stream(lines));
        }

        private static Stream<String> splitLines(String code) {
            return Arrays.stream(code.split("\\r?\\n"));
        }

        private static String indentLine(String line, int levels) {
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < levels; i++) {
                sb.append("    ");
            }
            return sb.append(line).toString();
        }

        private static String indent(int levels, String lines) {
            return joinLines(splitLines(lines).map(line -> indentLine(line, levels)));
        }

        private static String indent(String lines) {
            return indent(1, lines);
        }

        private static void populateClassScope(ClassOrInterfaceDeclaration n, Scope classScope) {
            for (BodyDeclaration<?> member : n.getMembers()) {
                if (member.isFieldDeclaration()) {
                    FieldDeclaration field = member.asFieldDeclaration();
                    field.getVariables().stream()
                            .map(NodeWithSimpleName::getNameAsString)
                            .forEach(field.isStatic() ? classScope::addStaticSymbol : classScope::addInstanceSymbol);
                } else if (member.isConstructorDeclaration()) {
                    // Ignore.
                } else if (member.isMethodDeclaration()) {
                    MethodDeclaration method = member.asMethodDeclaration();
                    if (method.isStatic()) {
                        classScope.addStaticSymbol(method.getNameAsString());
                    } else {
                        classScope.addInstanceSymbol(method.getNameAsString());
                    }
                } else if (member.isTypeDeclaration()) {
                    classScope.addStaticSymbol(member.asTypeDeclaration().getNameAsString());
                } else {
                    throw new UnsupportedOperationException(
                            joinLines("Unrecognised class member type, " + member.getClass() + ":",
                                    member.toString()));
                }
            }
        }

        private String commentedElement(Node n) {
            return joinLines(splitLines(n.toString().trim()).map(s -> "// " + s));
        }

        private String visitUnknownElement(Node n) {
            throw new UnsupportedOperationException(joinLines("Unknown element: " + n.getClass(), n.toString()));
        }

        private String visit(Node n) {
            return n.accept(this, null);
        }

        private String visit(Node n, Scope scope) {
            return n.accept(new CodeVisitor(scope), null);
        }

        private String visit(EnumSet<Modifier> modifiers) {
            StringBuilder modifierString = new StringBuilder();
            if (modifiers.contains(Modifier.PUBLIC)) modifierString.append("public ");
            if (modifiers.contains(Modifier.PRIVATE)) modifierString.append("private ");
            if (modifiers.contains(Modifier.PROTECTED)) modifierString.append("protected ");
            if (modifiers.contains(Modifier.STATIC)) modifierString.append("static ");
            if (modifiers.contains(Modifier.ABSTRACT)) modifierString.append("abstract ");
            return modifierString.toString();
        }

        @Override
        public String visit(PackageDeclaration n, Void arg) {
            return commentedElement(n);
        }

        @Override
        public String visit(Parameter n, Void arg) {
            scope.addLocalSymbol(n.getNameAsString());
            if (n.getType().asString().isEmpty()) {
                return n.getNameAsString();
            } else {
                return n.getNameAsString() + ": " + visit(n.getType());
            }
        }

        @Override
        public String visit(PrimitiveType n, Void arg) {
            String typeName = n.asString();
            switch (typeName) {
                case "byte":
                case "short":
                case "int":
                case "long":
                case "float":
                case "double": return "number";
                case "char": return "number";
                default: return typeName;
            }
        }

        @Override
        public String visit(ReturnStmt n, Void arg) {
            if (n.getExpression().isPresent()) {
                return "return " + visit(n.getExpression().get()) + ";";
            } else {
                return "return;";
            }
        }

        @Override
        public String visit(SimpleName n, Void arg) {
            // TODO(alniniclas): Implement this.
            return visitUnknownElement(n);
        }

        @Override
        public String visit(SingleMemberAnnotationExpr n, Void arg) {
            // TODO(alniniclas): Implement this.
            return visitUnknownElement(n);
        }

        @Override
        public String visit(StringLiteralExpr n, Void arg) {
            return n.toString();
        }

        @Override
        public String visit(SuperExpr n, Void arg) {
            return "super";
        }

        @Override
        public String visit(SwitchEntryStmt n, Void arg) {
            String caseLabel = n.getLabel().isPresent()
                    ? "case " + visit(n.getLabel().get()) + ":"
                    : "default:";
            return !n.getStatements().isEmpty()
                    ? joinLines(caseLabel, indent(joinLines(n.getStatements().stream().map(this::visit))))
                    : caseLabel;
        }

        @Override
        public String visit(SwitchStmt n, Void arg) {
            return joinLines("switch (" + visit(n.getSelector()) + ") {",
                    indent(joinLines(n.getEntries().stream().map(this::visit))), "}");
        }

        @Override
        public String visit(SynchronizedStmt n, Void arg) {
            // TODO(alniniclas): Implement this.
            return visitUnknownElement(n);
        }

        @Override
        public String visit(ThisExpr n, Void arg) {
            return "this";
        }

        @Override
        public String visit(ThrowStmt n, Void arg) {
            return "throw " + visit(n.getExpression()) + ";";
        }

        @Override
        public String visit(TryStmt n, Void arg) {
            if (!n.getResources().isEmpty()) {
                throw new UnsupportedOperationException(joinLines("Try-with-resources not supported.", n.toString()));
            }
            StringBuilder sb = new StringBuilder("try ");
            sb.append(visit(n.getTryBlock()));
            if (!n.getCatchClauses().isEmpty()) {
                // Typescript, as far as we know, does not support multiple catch clauses. Thus, we need to perform
                // merging magic here.
                List<String> exceptionNames = new ArrayList<>();
                {
                    Set<String> exceptionNamesSet = new HashSet<>();
                    n.getCatchClauses().stream()
                            .map(CatchClause::getParameter)
                            .map(NodeWithSimpleName::getNameAsString)
                            .forEach(exceptionNamesSet::add);
                    exceptionNames.addAll(exceptionNamesSet);
                }
                Scope catchClauseScope = new Scope(scope);
                String exceptionName = exceptionNames.get(0);
                sb.append(" catch (").append(exceptionName).append(") {\n");
                String catchBlock = joinLines(
                        exceptionNames.subList(1, exceptionNames.size()).stream()
                                .map(e -> "let " + e + " = " + exceptionName + ";"))
                        + join(" else ", n.getCatchClauses().stream().map(c -> visit(c, catchClauseScope)));
                sb.append(indent(catchBlock)).append("\n}");
            }
            if (n.getFinallyBlock().isPresent()) {
                sb.append(" finally ");
                sb.append(visit(n.getFinallyBlock().get()));
            }
            return sb.toString();
        }

        @Override
        public String visit(TypeExpr n, Void arg) {
            return visit(n.getType());
        }

        @Override
        public String visit(TypeParameter n, Void arg) {
            // TODO(alniniclas): Implement this.
            return visitUnknownElement(n);
        }

        @Override
        public String visit(UnaryExpr n, Void arg) {
            if (n.isPrefix()) {
                return n.getOperator().asString() + visit(n.getExpression());
            } else {
                return visit(n.getExpression()) + n.getOperator().asString();
            }
        }

        @Override
        public String visit(UnionType n, Void arg) {
            // TODO(alniniclas): Implement this.
            return visitUnknownElement(n);
        }

        @Override
        public String visit(UnknownType n, Void arg) {
            // TODO(alniniclas): Implement this.
            return visitUnknownElement(n);
        }

        @Override
        public String visit(VariableDeclarationExpr n, Void arg) {
            n.getVariables().stream()
                    .map(NodeWithSimpleName::getNameAsString)
                    .forEach(scope::addLocalSymbol);
            String declarationType = n.isFinal() ? "const" : "let";
            return (n.getVariables().size() > 1
                    ? "// TODO: Warning - declaring multiple variables with the same statement may not be supported."
                    : "")
                    + join(";\n", n.getVariables().stream()
                    .map(this::visit)
                    .map(v -> declarationType + " " + v));
        }

        @Override
        public String visit(VariableDeclarator n, Void arg) {
            String nameAndType = n.getName() + ": " + visit(n.getType());
            if (n.getInitializer().isPresent()) {
                return nameAndType + " = " + visit(n.getInitializer().get());
            } else {
                return nameAndType;
            }
        }

        @Override
        public String visit(VoidType n, Void arg) {
            return "void";
        }

        @Override
        public String visit(WhileStmt n, Void arg) {
            return "while (" + visit(n.getCondition()) + ") " + visit(n.getBody());
        }

        @Override
        public String visit(WildcardType n, Void arg) {
            // TODO(alniniclas): Implement this.
            return visitUnknownElement(n);
        }

        @Override
        public String visit(ModuleDeclaration n, Void arg) {
            // TODO(alniniclas): Implement this.
            return visitUnknownElement(n);
        }

        @Override
        public String visit(ModuleRequiresStmt n, Void arg) {
            // TODO(alniniclas): Implement this.
            return visitUnknownElement(n);
        }

        @Override
        public String visit(ModuleExportsStmt n, Void arg) {
            // TODO(alniniclas): Implement this.
            return visitUnknownElement(n);
        }

        @Override
        public String visit(ModuleProvidesStmt n, Void arg) {
            // TODO(alniniclas): Implement this.
            return visitUnknownElement(n);
        }

        @Override
        public String visit(ModuleUsesStmt n, Void arg) {
            // TODO(alniniclas): Implement this.
            return visitUnknownElement(n);
        }

        @Override
        public String visit(ModuleOpensStmt n, Void arg) {
            // TODO(alniniclas): Implement this.
            return visitUnknownElement(n);
        }

        @Override
        public String visit(UnparsableStmt n, Void arg) {
            // TODO(alniniclas): Implement this.
            return visitUnknownElement(n);
        }

        @Override
        public String visit(ReceiverParameter n, Void arg) {
            // TODO(alniniclas): Implement this.
            return visitUnknownElement(n);
        }

        @Override
        public String visit(ImportDeclaration n, Void arg) {
            String[] components = n.getName().asString().split("\\.");
            String symbol = components[components.length - 1];
            scope.addStaticSymbol(symbol);
            if (!n.isStatic()) {
                return "import { " + symbol + " } from \"./" + join("/", Arrays.stream(components)) + "\";";
            } else {
                String scope = components[components.length - 2];
                return joinLines("import { " + symbol + " } from \"./"
                        + join("/", Arrays.stream(components, 0, components.length - 1))
                        + ";",
                        "const " + symbol + " = " + scope + "." + symbol + "\";");
            }
        }

        @Override
        public String visit(InitializerDeclaration n, Void arg) {
            // TODO(alniniclas): Implement this.
            return visitUnknownElement(n);
        }

        @Override
        public String visit(InstanceOfExpr n, Void arg) {
            return visit(n.getExpression()) + " instanceof " + visit(n.getType());
        }

        @Override
        public String visit(IntegerLiteralExpr n, Void arg) {
            return n.toString();
        }

        @Override
        public String visit(IntersectionType n, Void arg) {
            // TODO(alniniclas): Implement this.
            return visitUnknownElement(n);
        }

        @Override
        public String visit(JavadocComment n, Void arg) {
            // TODO(alniniclas): Implement this.
            return visitUnknownElement(n);
        }

        @Override
        public String visit(LabeledStmt n, Void arg) {
            // TODO(alniniclas): Implement this.
            return visitUnknownElement(n);
        }

        @Override
        public String visit(LambdaExpr n, Void arg) {
            Scope lambdaScope = new Scope(scope);
            n.getParameters().stream()
                    .map(NodeWithSimpleName::getNameAsString)
                    .forEach(lambdaScope::addLocalSymbol);
            String body = visit(n.getBody(), lambdaScope);
            if (body.endsWith(";")) {
                body = body.substring(0, body.length() - 1);
            }
            return "(" + join(", ", n.getParameters().stream().map(p -> visit(p, lambdaScope))) + ")"
                    + " => " + body;
        }

        @Override
        public String visit(LineComment n, Void arg) {
            // TODO(alniniclas): Implement this.
            return visitUnknownElement(n);
        }

        @Override
        public String visit(LocalClassDeclarationStmt n, Void arg) {
            // TODO(alniniclas): Implement this.
            return visitUnknownElement(n);
        }

        @Override
        public String visit(LongLiteralExpr n, Void arg) {
            String literal =  n.toString();
            if (literal.toLowerCase().endsWith("l")) {
                literal = literal.substring(0, literal.length() - 1);
            }
            return literal;
        }

        @Override
        public String visit(MarkerAnnotationExpr n, Void arg) {
            // TODO(alniniclas): Implement this.
            return visitUnknownElement(n);
        }

        @Override
        public String visit(MemberValuePair n, Void arg) {
            // TODO(alniniclas): Implement this.
            return visitUnknownElement(n);
        }

        @Override
        public String visit(MethodCallExpr n, Void arg) {
            String args = join(",\n", n.getArguments().stream().map(this::visit));
            String call = n.getName().asString()
                    + "(" + (n.getArguments().size() < 2 ? args : joinLines("", indent(args), "")) + ")";
            if (n.getScope().isPresent()) {
                return visit(n.getScope().get()) + "." + call;
            } else {
                String symbolScope = scope.lookup(n.getNameAsString());
                if (symbolScope != null) {
                    return !symbolScope.isEmpty() ? symbolScope + "." + call : call;
                } else {
                    return "\n" + indent(joinLines("// TODO: Warning - no scope specified; assuming 'this'.",
                            "this." + call));
                }
            }
        }

        @Override
        public String visit(MethodDeclaration n, Void arg) {
            if (n.isStatic()) {
                scope.addStaticSymbol(n.getNameAsString());
            } else {
                scope.addInstanceSymbol(n.getNameAsString());
            }
            Scope methodScope = new Scope(scope);
            String args = join(",\n", n.getParameters().stream().map(p -> visit(p, methodScope)));
            String modifiers = visit(n.getModifiers());
            String head = modifiers + n.getName()
                    + "(" + (n.getParameters().size() < 2 ? args : joinLines("", indent(2, args))) + ") : "
                    + visit(n.getType());
            if (n.getBody().isPresent()) {
                return head + " " + visit(n.getBody().get(), methodScope);
            } else {
                return head + ";";
            }
        }

        @Override
        public String visit(MethodReferenceExpr n, Void arg) {
            return "\n" + indent(joinLines("TODO: Warning - method may require binding.",
                    visit(n.getScope()) + "." + n.getIdentifier()));
        }

        @Override
        public String visit(NameExpr n, Void arg) {
            String nameScope = scope.lookup(n.getNameAsString());
            if (nameScope != null) {
                return !nameScope.isEmpty() ? nameScope + "." + n.getNameAsString() : n.getNameAsString();
            } else {
                return "\n" + indent(joinLines("// TODO: Warning - no scope specified; assuming 'this'.",
                        "this." + n.getNameAsString()));
            }
        }

        @Override
        public String visit(Name n, Void arg) {
            // TODO(alniniclas): Implement this.
            return visitUnknownElement(n);
        }

        @Override
        public String visit(NormalAnnotationExpr n, Void arg) {
            // TODO(alniniclas): Implement this.
            return visitUnknownElement(n);
        }

        @Override
        public String visit(NullLiteralExpr n, Void arg) {
            return "null";
        }

        @Override
        public String visit(ObjectCreationExpr n, Void arg) {
            String args = join(",\n", n.getArguments().stream().map(this::visit));
            String constructorCall = "new " + visit(n.getType())
                    + "(" + (n.getArguments().size() < 2 ? args : joinLines("", indent(args), "")) + ")";
            if (!n.getAnonymousClassBody().isPresent()) {
                return constructorCall;
            } else {
                return joinLines(constructorCall + "{",
                        n.getAnonymousClassBody().get().accept(this, null), "}");
            }
        }

        @Override
        public String visit(NodeList n, Void arg) {
            return joinLines(((NodeList<? extends Node>) n).stream().map(this::visit));
        }

        @Override
        public String visit(AnnotationDeclaration n, Void arg) {
            // TODO(alniniclas): Implement this.
            return visitUnknownElement(n);
        }

        @Override
        public String visit(AnnotationMemberDeclaration n, Void arg) {
            // TODO(alniniclas): Implement this.
            return visitUnknownElement(n);
        }

        @Override
        public String visit(ArrayAccessExpr n, Void arg) {
            return visit(n.getName()) + "[" + visit(n.getIndex()) + "]";
        }

        @Override
        public String visit(ArrayCreationExpr n, Void arg) {
            if (!n.getInitializer().isPresent()) {
                // Create initialization function to deal with initializations of type "new T[a]", "new T[a][b][c]", and
                // "new T[a][b][]".
                //
                // Because TypeScript (as far as we know) doesn't provide syntax to support this kind of array creation
                // natively, the generated code is unfortunately rather ugly and verbose.
                int totalDimensions = n.getLevels().size();
                List<Expression> initializedDimensions = new ArrayList<>(totalDimensions);
                n.getLevels().stream()
                        .map(ArrayCreationLevel::getDimension)
                        .filter(Optional::isPresent).map(Optional::get)
                        .forEach(initializedDimensions::add);
                StringBuilder sb = new StringBuilder("function(d) {\n")
                        .append(indent(joinLines(commentedElement(n),
                                "// TODO: Consider refactoring this array initialization to be more readable.")))
                        .append('\n');
                Type componentType = n.createdType().asArrayType().getComponentType();
                while (componentType.isArrayType()) {
                    componentType = componentType.asArrayType().getComponentType();
                }
                String fillValue;
                if (!componentType.isPrimitiveType()) {
                    fillValue = null;
                } else {
                    fillValue = componentType.equals(PrimitiveType.booleanType()) ? "false" : "0";
                }
                if (initializedDimensions.size() > 1) {
                    // General multi-dimensional array initialization.
                    String returnType = componentType.asString()
                            + String.join("", Collections.nCopies(totalDimensions, "[]"));
                    sb.append(indent(joinLines("let a = function(d) {",
                            indent(joinLines("if (d.length === 0) return " + fillValue + ";",
                                    "let r = [];",
                                    "for (let i = 0; i < d[0]; i++) r.push(a(d.slice(1)));",
                                    "return r;")),
                            "};",
                            "return a(d) as " + returnType + ";")));
                    sb.append("\n}([")
                            .append(join(", ", initializedDimensions.stream().map(this::visit))).append("])");
                } else {
                    // Special case for one-dimensional arrays.
                    sb.append(indent(joinLines("let r = [];",
                            "for (let i = 0; i < d; i++) r.push(" + fillValue + ");",
                            "return r;")))
                            .append("\n}(")
                            .append(visit(initializedDimensions.get(0)))
                            .append(")");
                }
                return sb.toString();
            } else {
                return visit(n.getInitializer().get());
            }
        }

        @Override
        public String visit(ArrayCreationLevel n, Void arg) {
            throw new AssertionError(joinLines("Unexpected node type: " + n.getClass()
                    + ". This node type should never be reached.", n.toString()));
        }

        @Override
        public String visit(ArrayInitializerExpr n, Void arg) {
            return joinLines("[", indent(join(",\n", n.getValues().stream().map(this::visit))), "]");
        }

        @Override
        public String visit(ArrayType n, Void arg) {
            return visit(n.getComponentType()) + "[]";
        }

        @Override
        public String visit(AssertStmt n, Void arg) {
            // TODO(alniniclas): Implement this.
            return visitUnknownElement(n);
        }

        @Override
        public String visit(AssignExpr n, Void arg) {
            return visit(n.getTarget()) + " " + n.getOperator().asString() + " " + visit(n.getValue());
        }

        @Override
        public String visit(BinaryExpr n, Void arg) {
            return visit(n.getLeft()) + " " + n.getOperator().asString() + " " + visit(n.getRight());
        }

        @Override
        public String visit(BlockComment n, Void arg) {
            // TODO(alniniclas): Implement this.
            return visitUnknownElement(n);
        }

        @Override
        public String visit(BlockStmt n, Void arg) {
            Scope blockScope = new Scope(scope);
            return joinLines("{", indent(joinLines(n.getStatements().stream().map(s -> visit(s, blockScope)))), "}");
        }

        @Override
        public String visit(BooleanLiteralExpr n, Void arg) {
            return Boolean.toString(n.getValue());
        }

        @Override
        public String visit(BreakStmt n, Void arg) {
            if (n.getLabel().isPresent()) {
                throw new UnsupportedOperationException(
                        joinLines("Labeled 'break' is not supported:", n.toString()));
            }
            return "break;";
        }

        @Override
        public String visit(CastExpr n, Void arg) {
            return "<" + visit(n.getType()) + "> " + visit(n.getExpression());
        }

        @Override
        public String visit(CatchClause n, Void arg) {
            String exceptionName = n.getParameter().getNameAsString();
            String exceptionType = n.getParameter().getType().asString();
            String head = "if (" + exceptionName + " instanceof " + exceptionType + ")";
            return head + " " + visit(n.getBody());
        }

        @Override
        public String visit(CharLiteralExpr n, Void arg) {
            return "/* '" + n.getValue() + "' */ " + ((int) n.asChar());
        }

        @Override
        public String visit(ClassExpr n, Void arg) {
            // TODO(alniniclas): Implement this.
            return visitUnknownElement(n);
        }

        @Override
        public String visit(ClassOrInterfaceDeclaration n, Void arg) {
            Scope classScope = new Scope(n.getNameAsString(), scope);
            populateClassScope(n, classScope);
            String extension = join(", ", n.getExtendedTypes().stream()
                    .map(this::visit)
                    .map(t -> "extends " + t));
            if (!extension.isEmpty()) {
                extension += " ";
            }
            String members = join("\n\n", n.getMembers().stream()
                    .map(m -> visit(m, classScope)).map(CodeVisitor::indent));
            if (n.isLocalClassDeclaration()) {
                scope.addLocalSymbol(n.getNameAsString());
                return joinLines("let " + n.getName() + " = class " + extension + "{", members, "};");
            } else if (n.isNestedType()) {
                scope.addStaticSymbol(n.getNameAsString());
                StringBuilder modifiers = new StringBuilder();
                if (n.isPublic()) modifiers.append("public ");
                if (n.isPrivate()) modifiers.append("private ");
                if (n.isProtected()) modifiers.append("protected ");
                modifiers.append("static ");  // Always static.
                if (n.isAbstract()) modifiers.append("abstract ");
                return joinLines("// TODO: Warning - using nested classes may cause compilation problems.",
                        modifiers.toString() + n.getName() + " = class " + extension + "{", members, "};");
            } else {
                scope.addStaticSymbol(n.getNameAsString());
                String keyword = n.isInterface()
                        ? "interface"
                        : n.isAbstract() ? "abstract class" : "class";
                return joinLines(keyword + " " + n.getName() + " " + extension + "{",  members, "}");
            }
        }

        @Override
        public String visit(ClassOrInterfaceType n, Void arg) {
            String typeScope = scope.lookup(n.getNameAsString());
            String type = typeScope != null && !typeScope.isEmpty()
                    ? typeScope + "." + n.asString()
                    : n.asString();
            if (type.equals("String")) {
                // Special case, switch to using primitive string.
                type = type.toLowerCase();
            }
            if (typeScope != null) {
                return type;
            } else {
                return "\n" + joinLines(indent("// TODO: Warning - type not found in scope."), type);
            }
        }

        @Override
        public String visit(CompilationUnit n, Void arg) {
            StringBuilder sb = new StringBuilder();
            if (n.getPackageDeclaration().isPresent()) {
                sb.append("// package ").append(n.getPackageDeclaration().get().getName()).append(";");
                sb.append("\n\n");
            }
            if (!n.getImports().isEmpty()) {
                sb.append(joinLines(n.getImports().stream().map(this::visit)));
                sb.append("\n\n");
            }
            return sb.append(join("\n\n", n.getTypes().stream()
                    .map(this::visit)
                    .map(c -> "export " + c))).toString();
        }

        @Override
        public String visit(ConditionalExpr n, Void arg) {
            return joinLines(visit(n.getCondition()),
                    indent("? " + visit(n.getThenExpr())),
                    indent(": " + visit(n.getElseExpr())));
        }

        @Override
        public String visit(ConstructorDeclaration n, Void arg) {
            Scope constructorScope = new Scope(scope);
            String args = join(",\n", n.getParameters().stream().map(p -> visit(p, constructorScope)));
            StringBuilder modifiers = new StringBuilder();
            if (n.isPublic()) modifiers.append("public ");
            if (n.isProtected()) modifiers.append("private ");
            if (n.isProtected()) modifiers.append("protected ");
            return joinLines(modifiers + "constructor("
                    + (n.getParameters().size() < 2 ? args : joinLines("", indent(2, args))) + ") "
                    + visit(n.getBody(), constructorScope));
        }

        @Override
        public String visit(ContinueStmt n, Void arg) {
            if (n.getLabel().isPresent()) {
                throw new UnsupportedOperationException(
                        joinLines("Labeled 'continue' is not supported:", n.toString()));
            }
            return "continue;";
        }

        @Override
        public String visit(DoStmt n, Void arg) {
            return "do " + visit(n.getBody()) + " while (" + visit(n.getCondition()) + ");";
        }

        @Override
        public String visit(DoubleLiteralExpr n, Void arg) {
            String literal = n.toString();
            if (literal.toLowerCase().endsWith("d") || literal.toLowerCase().endsWith("f")) {
                literal = literal.substring(0, literal.length() - 1);
            }
            return literal;
        }

        @Override
        public String visit(EmptyStmt n, Void arg) {
            return ";";
        }

        @Override
        public String visit(EnclosedExpr n, Void arg) {
            return "(" + visit(n.getInner()) + ")";
        }

        @Override
        public String visit(EnumConstantDeclaration n, Void arg) {
            return n.getNameAsString();
        }

        @Override
        public String visit(EnumDeclaration n, Void arg) {
            scope.addStaticSymbol(n.getNameAsString());
            if (!n.getMembers().isEmpty()) {
                throw new UnsupportedOperationException(joinLines("Only simple enums are supported.", n.toString()));
            }
            String declaration = joinLines("enum " + n.getNameAsString() + " {",
                    indent(join(",\n", n.getEntries().stream().map(this::visit))),
                    "}");
            if (n.isNestedType()) {
                StringBuilder modifiers = new StringBuilder();
                if (n.isPublic()) modifiers.append("public ");
                if (n.isPrivate()) modifiers.append("private ");
                if (n.isProtected()) modifiers.append("protected ");
                modifiers.append("static "); // Always static.
                return joinLines(modifiers.toString() + n.getName() + " = function () {",
                        indent(joinLines(declaration + ";", "return " + n.getNameAsString() + ";")),
                        "}();");
            } else {
                return declaration;
            }
        }

        @Override
        public String visit(ExplicitConstructorInvocationStmt n, Void arg) {
            if (n.isThis()) {
                throw new UnsupportedOperationException(
                        joinLines("Constructor chaining is not supported.", n.toString()));
            }
            String args = join(",\n", n.getArguments().stream().map(this::visit));
            return "super(" + (n.getArguments().size() < 2 ? args : joinLines("", indent(args), "")) + ");";
        }

        @Override
        public String visit(ExpressionStmt n, Void arg) {
            return visit(n.getExpression()) + ";";
        }

        @Override
        public String visit(FieldAccessExpr n, Void arg) {
            return visit(n.getScope()) + "." + n.getNameAsString();
        }

        @Override
        public String visit(FieldDeclaration n, Void arg) {
            n.getVariables().stream()
                    .map(f -> f.getName().asString())
                    .forEach(n.isStatic() ? scope::addStaticSymbol : scope::addInstanceSymbol);
            StringBuilder modifiers = new StringBuilder();
            if (n.isPublic()) modifiers.append("public ");
            if (n.isPrivate()) modifiers.append("private ");
            if (n.isProtected()) modifiers.append("protected ");
            if (n.isStatic()) modifiers.append("static ");
            if (n.isFinal()) modifiers.append("readonly ");
            return joinLines(n.getVariables().stream()
                    .map(v -> modifiers.toString() + visit(v) + ";"));
        }

        @Override
        public String visit(ForStmt n, Void arg) {
            Scope loopScope = new Scope(scope);
            String init = join(", ", n.getInitialization().stream().map(i -> visit(i, loopScope)));
            String compare = n.getCompare().isPresent() ? " " + visit(n.getCompare().get(), loopScope) : "";
            String update = join(", ", n.getUpdate().stream().map(u -> visit(u, loopScope)));
            update = update.isEmpty() ? update : " " + update;
            String head = "for (" + init + ";" + compare + ";" + update + ")";
            return head + " " + visit(n.getBody(), loopScope);
        }

        @Override
        public String visit(ForeachStmt n, Void arg) {
            Scope forScope = new Scope(scope);
            String variable = n.getVariable().getVariable(0).getNameAsString();
            forScope.addLocalSymbol(variable);
            String declarationType = n.getVariable().isFinal() ? "const" : "let";
            return "for (" + declarationType + " " + variable + " of " + visit(n.getIterable()) + ") "
                    + visit(n.getBody(), forScope);
        }

        @Override
        public String visit(IfStmt n, Void arg) {
            String ifThen = "if (" + visit(n.getCondition()) + ") " + visit(n.getThenStmt());
            if (n.getElseStmt().isPresent()) {
                return ifThen + " else " + visit(n.getElseStmt().get());
            } else {
                return ifThen;
            }
        }
    }
}
