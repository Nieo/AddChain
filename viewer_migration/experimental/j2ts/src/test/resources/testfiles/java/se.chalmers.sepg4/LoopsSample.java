package se.chalmers.sepg4;

public class LoopsSample {
    public void whileTrue() {
        while (true) {
            // Do nothing.
        }
    }

    public void forTrue() {
        for (; true;) {
            // Do nothing.
        }
    }

    public void forEmpty() {
        for (;;) {
            // Do nothing.
        }
    }

    public void forFlip() {
        for (boolean a = true; true; a = !a) {
            // Do nothing.
        }
    }

    public void doWhileTrue() {
        do {
            // Do nothing.
        } while (true);
    }

    public void breakWhile() {
        while (true) {
            break;
        }
    }

    public void continueWhile() {
        while (true) {
            continue;
        }
    }

    public void forEach() {
        for (boolean b : new boolean[] {false, true, true, false}) {
            // Do nothing.
        }
    }
}
