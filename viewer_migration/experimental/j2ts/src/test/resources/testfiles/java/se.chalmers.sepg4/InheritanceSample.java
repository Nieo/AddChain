package se.chalmers.sepg4;

public class InheritanceSample {
}

class A {
    protected int a;

    A(int a) {
        this.a = a;
    }

    int aa() {
        return a + a;
    }
}

class B extends A {
    B(int b) {
        super(b);
    }

    int aa() {
        return super.aa() + a;
    }
}
