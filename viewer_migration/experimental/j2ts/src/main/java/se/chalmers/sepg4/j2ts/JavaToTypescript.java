package se.chalmers.sepg4.j2ts;

import java.io.IOException;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.EnumSet;
import java.util.Scanner;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import com.github.javaparser.JavaParser;
import com.github.javaparser.ast.ArrayCreationLevel;
import com.github.javaparser.ast.CompilationUnit;
import com.github.javaparser.ast.ImportDeclaration;
import com.github.javaparser.ast.Modifier;
import com.github.javaparser.ast.Node;
import com.github.javaparser.ast.NodeList;
import com.github.javaparser.ast.PackageDeclaration;
import com.github.javaparser.ast.body.AnnotationDeclaration;
import com.github.javaparser.ast.body.AnnotationMemberDeclaration;
import com.github.javaparser.ast.body.ClassOrInterfaceDeclaration;
import com.github.javaparser.ast.body.ConstructorDeclaration;
import com.github.javaparser.ast.body.EnumConstantDeclaration;
import com.github.javaparser.ast.body.EnumDeclaration;
import com.github.javaparser.ast.body.FieldDeclaration;
import com.github.javaparser.ast.body.InitializerDeclaration;
import com.github.javaparser.ast.body.MethodDeclaration;
import com.github.javaparser.ast.body.Parameter;
import com.github.javaparser.ast.body.ReceiverParameter;
import com.github.javaparser.ast.body.VariableDeclarator;
import com.github.javaparser.ast.comments.BlockComment;
import com.github.javaparser.ast.comments.JavadocComment;
import com.github.javaparser.ast.comments.LineComment;
import com.github.javaparser.ast.expr.ArrayAccessExpr;
import com.github.javaparser.ast.expr.ArrayCreationExpr;
import com.github.javaparser.ast.expr.ArrayInitializerExpr;
import com.github.javaparser.ast.expr.AssignExpr;
import com.github.javaparser.ast.expr.BinaryExpr;
import com.github.javaparser.ast.expr.BooleanLiteralExpr;
import com.github.javaparser.ast.expr.CastExpr;
import com.github.javaparser.ast.expr.CharLiteralExpr;
import com.github.javaparser.ast.expr.ClassExpr;
import com.github.javaparser.ast.expr.ConditionalExpr;
import com.github.javaparser.ast.expr.DoubleLiteralExpr;
import com.github.javaparser.ast.expr.EnclosedExpr;
import com.github.javaparser.ast.expr.FieldAccessExpr;
import com.github.javaparser.ast.expr.InstanceOfExpr;
import com.github.javaparser.ast.expr.IntegerLiteralExpr;
import com.github.javaparser.ast.expr.LambdaExpr;
import com.github.javaparser.ast.expr.LongLiteralExpr;
import com.github.javaparser.ast.expr.MarkerAnnotationExpr;
import com.github.javaparser.ast.expr.MemberValuePair;
import com.github.javaparser.ast.expr.MethodCallExpr;
import com.github.javaparser.ast.expr.MethodReferenceExpr;
import com.github.javaparser.ast.expr.Name;
import com.github.javaparser.ast.expr.NameExpr;
import com.github.javaparser.ast.expr.NormalAnnotationExpr;
import com.github.javaparser.ast.expr.NullLiteralExpr;
import com.github.javaparser.ast.expr.ObjectCreationExpr;
import com.github.javaparser.ast.expr.SimpleName;
import com.github.javaparser.ast.expr.SingleMemberAnnotationExpr;
import com.github.javaparser.ast.expr.StringLiteralExpr;
import com.github.javaparser.ast.expr.SuperExpr;
import com.github.javaparser.ast.expr.ThisExpr;
import com.github.javaparser.ast.expr.TypeExpr;
import com.github.javaparser.ast.expr.UnaryExpr;
import com.github.javaparser.ast.expr.VariableDeclarationExpr;
import com.github.javaparser.ast.modules.ModuleDeclaration;
import com.github.javaparser.ast.modules.ModuleExportsStmt;
import com.github.javaparser.ast.modules.ModuleOpensStmt;
import com.github.javaparser.ast.modules.ModuleProvidesStmt;
import com.github.javaparser.ast.modules.ModuleRequiresStmt;
import com.github.javaparser.ast.modules.ModuleUsesStmt;
import com.github.javaparser.ast.stmt.AssertStmt;
import com.github.javaparser.ast.stmt.BlockStmt;
import com.github.javaparser.ast.stmt.BreakStmt;
import com.github.javaparser.ast.stmt.CatchClause;
import com.github.javaparser.ast.stmt.ContinueStmt;
import com.github.javaparser.ast.stmt.DoStmt;
import com.github.javaparser.ast.stmt.EmptyStmt;
import com.github.javaparser.ast.stmt.ExplicitConstructorInvocationStmt;
import com.github.javaparser.ast.stmt.ExpressionStmt;
import com.github.javaparser.ast.stmt.ForStmt;
import com.github.javaparser.ast.stmt.ForeachStmt;
import com.github.javaparser.ast.stmt.IfStmt;
import com.github.javaparser.ast.stmt.LabeledStmt;
import com.github.javaparser.ast.stmt.LocalClassDeclarationStmt;
import com.github.javaparser.ast.stmt.ReturnStmt;
import com.github.javaparser.ast.stmt.SwitchEntryStmt;
import com.github.javaparser.ast.stmt.SwitchStmt;
import com.github.javaparser.ast.stmt.SynchronizedStmt;
import com.github.javaparser.ast.stmt.ThrowStmt;
import com.github.javaparser.ast.stmt.TryStmt;
import com.github.javaparser.ast.stmt.UnparsableStmt;
import com.github.javaparser.ast.stmt.WhileStmt;
import com.github.javaparser.ast.type.ArrayType;
import com.github.javaparser.ast.type.ClassOrInterfaceType;
import com.github.javaparser.ast.type.IntersectionType;
import com.github.javaparser.ast.type.PrimitiveType;
import com.github.javaparser.ast.type.TypeParameter;
import com.github.javaparser.ast.type.UnionType;
import com.github.javaparser.ast.type.UnknownType;
import com.github.javaparser.ast.type.VoidType;
import com.github.javaparser.ast.type.WildcardType;
import com.github.javaparser.ast.visitor.GenericVisitor;

public class JavaToTypescript {
    public static void main(String[] args) throws IOException {
        Scanner inputScanner = new Scanner(System.in);
        System.out.print("Please specify file: ");
        String fileName = inputScanner.nextLine();
        System.out.println("File: " + fileName);
        CompilationUnit compilationUnit = JavaParser.parse(Paths.get(fileName));
        String marker = "/* ---------------------------------------------------------------------- */";
        System.err.println(marker);
        System.out.println(compilationUnit.accept(new CodeVisitor(), null));
        System.err.println(marker);
    }

    private static class CodeVisitor implements GenericVisitor<String, Void> {
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

        private String commentedElement(Node n) {
            return joinLines(splitLines(n.toString().trim()).map(s -> "// " + s));
        }

        private String visitUnknownElement(Node n) {
            throw new UnsupportedOperationException(joinLines("Unknown element: " + n.getClass(), n.toString()));
        }

        private String visit(Node n) {
            return n.accept(this, null);
        }

        private String visit(EnumSet<Modifier> modifiers) {
            return join(" ", modifiers.stream().map(Enum::toString).map(String::toLowerCase));
        }

        @Override
        public String visit(PackageDeclaration n, Void arg) {
            return commentedElement(n);
        }

        @Override
        public String visit(Parameter n, Void arg) {
            String typeAndModifiers = n.getModifiers().isEmpty()
                    ? n.getType().asString()
                    : visit(n.getModifiers()) + " " + n.getType();
            return "param: /* " + typeAndModifiers + " */ " + n.getName().asString();
        }

        @Override
        public String visit(PrimitiveType n, Void arg) {
            // TODO(alniniclas): Implement this.
            return visitUnknownElement(n);
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
            // TODO(alniniclas): Implement this.
            return visitUnknownElement(n);
        }

        @Override
        public String visit(SwitchEntryStmt n, Void arg) {
            // TODO(alniniclas): Implement this.
            return visitUnknownElement(n);
        }

        @Override
        public String visit(SwitchStmt n, Void arg) {
            // TODO(alniniclas): Implement this.
            return visitUnknownElement(n);
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
            return "throws " + visit(n.getExpression()) + ";";
        }

        @Override
        public String visit(TryStmt n, Void arg) {
            // TODO(alniniclas): Implement this.
            return visitUnknownElement(n);
        }

        @Override
        public String visit(TypeExpr n, Void arg) {
            return n.getType().asString();
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
            String typeAndModifiers = n.getModifiers().isEmpty()
                    ? n.getElementType().asString()
                    : visit(n.getModifiers()) + " " + n.getElementType();
            return join(",\n", n.getVariables().stream()
                    .map(this::visit)
                    .map(v -> "var: /* " + typeAndModifiers + " */ " + v));
        }

        @Override
        public String visit(VariableDeclarator n, Void arg) {
            if (n.getInitializer().isPresent()) {
                return n.getName() + " = " + visit(n.getInitializer().get());
            }
            return n.getName().asString();
        }

        @Override
        public String visit(VoidType n, Void arg) {
            // TODO(alniniclas): Implement this.
            return visitUnknownElement(n);
        }

        @Override
        public String visit(WhileStmt n, Void arg) {
            // TODO(alniniclas): Implement this.
            return visitUnknownElement(n);
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
            return commentedElement(n);
        }

        @Override
        public String visit(InitializerDeclaration n, Void arg) {
            // TODO(alniniclas): Implement this.
            return visitUnknownElement(n);
        }

        @Override
        public String visit(InstanceOfExpr n, Void arg) {
            // TODO(alniniclas): Implement this.
            return visitUnknownElement(n);
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
            return join(", ", n.getParameters().stream().map(this::visit)) + " -> " + visit(n.getBody());
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
            return Long.toString(n.asLong());
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
                return call;
            }
        }

        @Override
        public String visit(MethodDeclaration n, Void arg) {
            String args = join(",\n", n.getParameters().stream().map(this::visit));
            String typeAndModifiers = n.getModifiers().isEmpty()
                    ? n.getType().asString()
                    : visit(n.getModifiers()) + " " + n.getType();
            String head = "method: /* " + typeAndModifiers + " */ " + n.getName()
                            + "(" + (n.getParameters().size() < 2 ? args : joinLines("", indent(2, args))) + ")";
            if (n.getBody().isPresent()) {
                return head + " " + visit(n.getBody().get());
            } else {
                return head + ";";
            }
        }

        @Override
        public String visit(MethodReferenceExpr n, Void arg) {
            return visit(n.getScope()) + "::" + n.getIdentifier();
        }

        @Override
        public String visit(NameExpr n, Void arg) {
            return n.getName().asString();
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
            String constructorCall = "new " + n.getType()
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
            String type = n.createdType().asArrayType().getComponentType().asString();
            String dimensions = join("", n.getLevels().stream().map(this::visit));
            if (!n.getInitializer().isPresent()) {
                return "new " + type + dimensions;
            } else {
                return joinLines("new " + type + dimensions + " {",
                        visit(n.getInitializer().get()), "}");
            }
        }

        @Override
        public String visit(ArrayCreationLevel n, Void arg) {
            if (n.getDimension().isPresent()) {
                return "[" +  visit(n.getDimension().get()) + "]";
            } else {
                return "[]";
            }
        }

        @Override
        public String visit(ArrayInitializerExpr n, Void arg) {
            // TODO(alniniclas): Implement this.
            return visitUnknownElement(n);
        }

        @Override
        public String visit(ArrayType n, Void arg) {
            // TODO(alniniclas): Implement this.
            return visitUnknownElement(n);
        }

        @Override
        public String visit(AssertStmt n, Void arg) {
            // TODO(alniniclas): Implement this.
            return visitUnknownElement(n);
        }

        @Override
        public String visit(AssignExpr n, Void arg) {
            return visit(n.getTarget()) + " = " + visit(n.getValue());
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
            return joinLines("{", indent(n.getStatements().accept(this, null)), "}");
        }

        @Override
        public String visit(BooleanLiteralExpr n, Void arg) {
            return Boolean.toString(n.getValue());
        }

        @Override
        public String visit(BreakStmt n, Void arg) {
            // TODO(alniniclas): Implement this.
            return visitUnknownElement(n);
        }

        @Override
        public String visit(CastExpr n, Void arg) {
            return "(" + n.getType() + ") " + visit(n.getExpression());
        }

        @Override
        public String visit(CatchClause n, Void arg) {
            // TODO(alniniclas): Implement this.
            return visitUnknownElement(n);
        }

        @Override
        public String visit(CharLiteralExpr n, Void arg) {
            return "'" + n.getValue() + "'";
        }

        @Override
        public String visit(ClassExpr n, Void arg) {
            // TODO(alniniclas): Implement this.
            return visitUnknownElement(n);
        }

        @Override
        public String visit(ClassOrInterfaceDeclaration n, Void arg) {
            // TODO(alniniclas): Handle modifiers.
            String members = join("\n\n", n.getMembers().stream()
                    .map(this::visit).map(CodeVisitor::indent));
            return joinLines("class: " + n.getName() + " {",  members, "}");
        }

        @Override
        public String visit(ClassOrInterfaceType n, Void arg) {
            // TODO(alniniclas): Implement this.
            return visitUnknownElement(n);
        }

        @Override
        public String visit(CompilationUnit n, Void arg) {
            return joinLines(n.getChildNodes().stream().map(this::visit));
        }

        @Override
        public String visit(ConditionalExpr n, Void arg) {
            return joinLines(visit(n.getCondition()),
                    indent("? " + visit(n.getThenExpr())),
                    indent(": " + visit(n.getElseExpr())));
        }

        @Override
        public String visit(ConstructorDeclaration n, Void arg) {
            String args = join(",\n", n.getParameters().stream().map(this::visit));
            return joinLines("constructor: "
                    + (n.getModifiers().isEmpty() ? " " : "/* " + visit(n.getModifiers()) + " */ ") + n.getName()
                    + "(" + (n.getParameters().size() < 2 ? args : joinLines("", indent(2, args))) + ") "
                    + visit(n.getBody()));
        }

        @Override
        public String visit(ContinueStmt n, Void arg) {
            // TODO(alniniclas): Implement this.
            return visitUnknownElement(n);
        }

        @Override
        public String visit(DoStmt n, Void arg) {
            // TODO(alniniclas): Implement this.
            return visitUnknownElement(n);
        }

        @Override
        public String visit(DoubleLiteralExpr n, Void arg) {
            return n.toString();
        }

        @Override
        public String visit(EmptyStmt n, Void arg) {
            // TODO(alniniclas): Implement this.
            return visitUnknownElement(n);
        }

        @Override
        public String visit(EnclosedExpr n, Void arg) {
            return "(" + visit(n.getInner()) + ")";
        }

        @Override
        public String visit(EnumConstantDeclaration n, Void arg) {
            // TODO(alniniclas): Implement this.
            return visitUnknownElement(n);
        }

        @Override
        public String visit(EnumDeclaration n, Void arg) {
            // TODO(alniniclas): Implement this.
            return visitUnknownElement(n);
        }

        @Override
        public String visit(ExplicitConstructorInvocationStmt n, Void arg) {
            // TODO(alniniclas): Implement this.
            return visitUnknownElement(n);
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
            String modifiers = visit(n.getModifiers());
            String typeAndModifiers = n.getModifiers().isEmpty()
                    ? n.getElementType().asString()
                    : modifiers + " " + n.getElementType();
            return joinLines(n.getVariables().stream()
                    .map(v -> "field: /* " + typeAndModifiers + " */ " + visit(v) + ";"));
        }

        @Override
        public String visit(ForStmt n, Void arg) {
            String init = join(",\n", n.getInitialization().stream().map(this::visit));
            String compare = n.getCompare().isPresent() ? n.getCompare().get().accept(this, null) : "";
            String update = join(",\n", n.getUpdate().stream().map(this::visit));
            String head = joinLines("for (" + init + ";", indent(2, joinLines(compare + ";", update)) + ")");
            return head + " " + visit(n.getBody());
        }

        @Override
        public String visit(ForeachStmt n, Void arg) {
            // TODO(alniniclas): Implement this.
            return visitUnknownElement(n);
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
