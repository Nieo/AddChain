package se.chalmers.sepg4;

public class ArraysSample {
    private String[] a;
    private String[][] b;
    private String[][][] c;

    public void newArraysOneD() {
        a = new String[3];
        b = new String[4][];
        c = new String[5][][];
    }

    public void newArraysTwoD() {
        b = new String[3][4];
        c = new String[3][4][];
    }

    public void newArraysThreeD() {
        c = new String[3][4][5];
    }

    public void initArraysOneD() {
        a = new String[] {"a", "b", "c"};
        b = new String[][] {null, null, null};
        c = new String[][][] {null, null, null};
    }

    public void initArraysTwoD() {
        b = new String[][] {
                new String[] {"aa", "ab", "ac"},
                new String[] {"ba", "bb", "bc"},
                new String[] {"ca", "cb", "cc"}
        };
        c = new String[][][] {
                new String[][]{null, null, null},
                new String[][]{null, null, null},
                new String[][]{null, null, null}
        };
    }

    public void initArraysThreeD() {
        c = new String[][][] {
                new String[][] {
                        new String[] {"aaa", "aab", "aac"},
                        new String[] {"aba", "abb", "abc"},
                        new String[] {"aca", "acb", "acc"}
                },
                new String[][] {
                        new String[] {"baa", "bab", "bac"},
                        new String[] {"bba", "bbb", "bbc"},
                        new String[] {"bca", "bcb", "bcc"}
                },
                new String[][] {
                        new String[] {"caa", "cab", "cac"},
                        new String[] {"cba", "cbb", "cbc"},
                        new String[] {"cca", "ccb", "ccc"}
                }
        };
    }
}
