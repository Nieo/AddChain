package se.chalmers.sepg4;

public class PrimitiveTypesSample {
    public static class Booleans {
        public static final boolean TRUE = true;
        public static final boolean FALSE = false;
    }

    public static class Bytes {
        public static final byte ZERO = 0;
        public static final byte ONE = 1;
        public static final byte MINUS_ONE = -1;
        public static final byte MAX = 127;
        public static final byte MIN = -128;
    }

    public static class Shorts {
        public static final short ZERO = 0;
        public static final short ONE = 1;
        public static final short MINUS_ONE = -1;
        public static final short MAX = 32767;
        public static final short MIN = -32768;
    }

    public static class Ints {
        public static final int ZERO = 0;
        public static final int ONE = 1;
        public static final int MINUS_ONE = -1;
        public static final int MAX = 2147483647;
        public static final int MIN = -2147483648;
    }

    public static class Longs {
        public static final long ZERO = 0;
        public static final long ONE = 1;
        public static final long MINUS_ONE = -1;
        public static final long MAX = 9223372036854775807L;
        public static final long MIN = -9223372036854775808L;
    }

    public static class Floats {
        public static final float ZERO = 0;
        public static final float ONE = 1;
        public static final float MINUS_ONE = -1;
        public static final float MAX = 3.40282347e38f;
        public static final float MIN = 1.40239846e-45f;
    }

    public static class Doubles {
        public static final double ZERO = 0;
        public static final double ONE = 1;
        public static final double MINUS_ONE = -1;
        public static final double MAX = 1.7976931348623157e308;
        public static final double MIN = 4.9406564584124654e-324;
    }

    public static class Chars {
        public static final char ZERO_ASCII = 0;
        public static final char ONE_ASCII = 1;
        public static final char ONE = '1';
        public static final char A = 'A';
        public static final char MAX = 0xFFFF;
    }

    public static class Strings {
        public static final String EMPTY = "";
        public static final String HELLO = "Hello!";
        public static final String ESCAPED = "\"\\\n\t";
    }
}
