package se.chalmers.sepg4;

public abstract class ClassMembersSample {
    int field;
    public int publicField;
    private int privateField;
    protected int protectedField;
    private InnerClass innerClassField;

    private final int finalField = 0;
    private static StaticNestedClass staticField = new StaticNestedClass();
    private static final int CONSTANT = 42;

    public ClassMembersSample(int a, int b, int c) {
        field = a;
        publicField = b;
        privateField = c;
        protectedField = a + b + c;
        innerClassField = new InnerClass(c, b, a);
    }

    public int addFields() {
        return field + publicField + privateField + finalField + addStaticFields() + innerClassField.sumFields();
    }

    public void setPrivateField(int p) {
        privateField = p;
    }

    private static int addStaticFields() {
        return staticField.a + staticField.b + staticField.c + CONSTANT;
    }

    public static void setStaticField(StaticNestedClass s) {
        staticField = s;
    }

    public abstract int[] computeWinningLotteryNumbers(int daysInFuture);

    public static class StaticNestedClass {
        public int a;
        public int b;
        public int c;
    }

    private class InnerClass {
        private int d;
        private int e;
        private int f;

        public InnerClass(int d, int e, int f) {
            this.d = d;
            this.e = e;
            this.f = f;
        }

        public int sumFields() {
            return d + e + f;
        }
    }
}
