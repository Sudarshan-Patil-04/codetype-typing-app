export const dsaJavaSnippets = [
  {
    question: "Create a Linked List Node",
    code: `class Node {
    int data;
    Node next;
    Node(int d) {
        data = d;
        next = null;
    }
}`
  },
  {
    question: "Stack Implementation Using Array",
    code: `class Stack {
    int arr[] = new int[100];
    int top = -1;

    void push(int x) {
        arr[++top] = x;
    }

    int pop() {
        return arr[top--];
    }
}`
  }
]
