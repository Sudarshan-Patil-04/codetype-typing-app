export const javaSnippets = [
  {
    question: "Binary Search in Java",
    code: `public class BinarySearch {
    static int search(int[] arr, int x) {
        int l = 0, r = arr.length - 1;
        while (l <= r) {
            int m = l + (r - l) / 2;
            if (arr[m] == x)
                return m;
            if (arr[m] < x)
                l = m + 1;
            else
                r = m - 1;
        }
        return -1;
    }
}`
  },
  {
    question: "Check Palindrome String",
    code: `public class Palindrome {
    static boolean isPalindrome(String s) {
        return s.equals(new StringBuilder(s).reverse().toString());
    }
}`
  }
]
