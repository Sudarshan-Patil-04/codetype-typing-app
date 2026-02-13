export const pythonSnippets = [
  {
    question: "Implement Binary Search in Python",
    code: `def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1`
  },
  {
    question: "Reverse a String",
    code: `def reverse_string(s):
    return s[::-1]`
  },
  {
    question: "Factorial Using Recursion",
    code: `def factorial(n):
    if n == 0:
        return 1
    return n * factorial(n-1)`
  }
]
