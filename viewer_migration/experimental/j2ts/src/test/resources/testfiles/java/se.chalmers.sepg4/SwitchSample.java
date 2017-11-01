package se.chalmers.sepg4;

public class SwitchSample {
    static String switchTest(int n) {
        int k = 0;
        switch (n) {
            case 1:
            case 2:
            case 3:
                k += 10;
                break;
            case 4:
                return "four";
            case 5:
                k += 5;
            case 6:
                k += 6;
            case 7:
                k += 7;
                break;
            case 8:
                k = -5;
                break;
            default:
                k = 0;
        }
        return Integer.toString(k);
    }
}
