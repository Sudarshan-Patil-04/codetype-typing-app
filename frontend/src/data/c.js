export const cSnippets = [
  {
    question: "Linear Search in C",
    code: `#include <stdio.h>

int main() {
    int arr[] = {2,4,6,8,10};
    int x = 6;
    for(int i = 0; i < 5; i++) {
        if(arr[i] == x) {
            printf("Found");
            break;
        }
    }
    return 0;
}`
  },
  {
    question: "Swap Two Numbers",
    code: `#include <stdio.h>

int main() {
    int a = 5, b = 10, temp;
    temp = a;
    a = b;
    b = temp;
    printf("%d %d", a, b);
    return 0;
}`
  }
]
