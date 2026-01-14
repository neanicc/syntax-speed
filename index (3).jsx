import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Code Snippets Library
const CODE_SNIPPETS = {
  general: {
    javascript: {
      beginner: [
        { title: "Arrow Function", code: `const add = (a, b) => a + b;` },
        { title: "Array Map", code: `const doubled = nums.map(n => n * 2);` },
        { title: "Object Destructure", code: `const { name, age } = person;` },
        { title: "Template Literal", code: `const greeting = \`Hello, \${name}!\`;` },
        { title: "Spread Operator", code: `const merged = [...arr1, ...arr2];` },
        { title: "Ternary Operator", code: `const status = isActive ? "on" : "off";` },
        { title: "Array Filter", code: `const evens = nums.filter(n => n % 2 === 0);` },
        { title: "Optional Chaining", code: `const city = user?.address?.city;` },
        { title: "Nullish Coalescing", code: `const value = data ?? "default";` },
        { title: "Object Spread", code: `const updated = { ...user, name: "New" };` },
      ],
      intermediate: [
        {
          title: "Filter and Map", code: `const names = users
  .filter(u => u.age >= 18)
  .map(u => u.name);` },
        {
          title: "Async Function", code: `const fetchData = async (url) => {
  const res = await fetch(url);
  return res.json();
};` },
        {
          title: "Array Reduce", code: `const total = items.reduce(
  (sum, item) => sum + item.price,
  0
);` },
        {
          title: "Try Catch", code: `try {
  const data = JSON.parse(text);
  return data;
} catch (err) {
  console.error(err);
}` },
        {
          title: "Class Definition", code: `class User {
  constructor(name) {
    this.name = name;
  }
  greet() {
    return "Hello, " + this.name;
  }
}` },
      ],
      advanced: [
        {
          title: "Custom Hook", code: `const useDebounce = (value, delay) => {
  const [debounced, setDebounced] = useState(value);
  
  useEffect(() => {
    const timer = setTimeout(
      () => setDebounced(value),
      delay
    );
    return () => clearTimeout(timer);
  }, [value, delay]);
  
  return debounced;
};` },
        {
          title: "Memoization", code: `const memoize = (fn) => {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
};` },
      ],
    },
    python: {
      beginner: [
        { title: "List Comprehension", code: `squares = [x ** 2 for x in range(10)]` },
        {
          title: "Function Definition", code: `def greet(name):
    return f"Hello, {name}!"` },
        { title: "Dictionary", code: `person = {"name": "Alice", "age": 30}` },
        {
          title: "For Loop", code: `for i in range(5):
    print(i)` },
        {
          title: "If Statement", code: `if score >= 90:
    grade = "A"
else:
    grade = "B"` },
        {
          title: "Lambda Function", code: `double = lambda x: x * 2
result = double(5)` },
      ],
      intermediate: [
        {
          title: "Class Definition", code: `class Dog:
    def __init__(self, name):
        self.name = name
    
    def bark(self):
        return f"{self.name} says woof!"` },
        {
          title: "Try Except", code: `try:
    result = risky_operation()
except ValueError as e:
    print(f"Error: {e}")
finally:
    cleanup()` },
        {
          title: "Context Manager", code: `with open("file.txt", "r") as f:
    content = f.read()
    lines = content.splitlines()` },
      ],
      advanced: [
        {
          title: "Decorator", code: `def timer(func):
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        elapsed = time.time() - start
        print(f"Took {elapsed:.2f}s")
        return result
    return wrapper` },
        {
          title: "Generator Function", code: `def fibonacci(n):
    a, b = 0, 1
    for _ in range(n):
        yield a
        a, b = b, a + b

fibs = list(fibonacci(10))` },
      ],
    },
    typescript: {
      beginner: [
        {
          title: "Interface", code: `interface User {
  id: number;
  name: string;
  email: string;
}` },
        { title: "Type Alias", code: `type Status = "pending" | "active" | "done";` },
        {
          title: "Generic Function", code: `function first<T>(arr: T[]): T | undefined {
  return arr[0];
}` },
        {
          title: "Union Type", code: `type Result = string | number | null;
let value: Result = "hello";` },
      ],
      intermediate: [
        {
          title: "React Component", code: `interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled = false,
}) => (
  <button onClick={onClick} disabled={disabled}>
    {label}
  </button>
);` },
        {
          title: "Type Guard", code: `function isString(value: unknown): value is string {
  return typeof value === "string";
}

if (isString(input)) {
  console.log(input.toUpperCase());
}` },
      ],
      advanced: [
        {
          title: "Discriminated Union", code: `type Success<T> = {
  status: "success";
  data: T;
};

type Failure = {
  status: "error";
  error: string;
};

type Result<T> = Success<T> | Failure;` },
      ],
    },
    cpp: {
      beginner: [
        {
          title: "Hello World", code: `#include <iostream>

int main() {
    std::cout << "Hello, World!" << std::endl;
    return 0;
}` },
        {
          title: "Variables", code: `int age = 25;
double price = 19.99;
char grade = 'A';
bool isValid = true;` },
        {
          title: "For Loop", code: `for (int i = 0; i < 5; i++) {
    std::cout << i << std::endl;
}` },
        {
          title: "Function", code: `int add(int a, int b) {
    return a + b;
}` },
        {
          title: "Array", code: `int nums[5] = {1, 2, 3, 4, 5};
for (int i = 0; i < 5; i++) {
    std::cout << nums[i] << " ";
}` },
      ],
      intermediate: [
        {
          title: "Class Definition", code: `class Rectangle {
private:
    int width, height;
public:
    Rectangle(int w, int h) : width(w), height(h) {}
    
    int area() {
        return width * height;
    }
};` },
        {
          title: "Vector Usage", code: `#include <vector>

std::vector<int> nums = {1, 2, 3, 4, 5};
nums.push_back(6);

for (int n : nums) {
    std::cout << n << " ";
}` },
        {
          title: "Pointers", code: `int value = 42;
int* ptr = &value;

std::cout << "Value: " << *ptr << std::endl;
std::cout << "Address: " << ptr << std::endl;` },
      ],
      advanced: [
        {
          title: "Smart Pointers", code: `#include <memory>

std::unique_ptr<int> ptr1 = std::make_unique<int>(42);
std::shared_ptr<int> ptr2 = std::make_shared<int>(100);

std::cout << *ptr1 << " " << *ptr2 << std::endl;` },
        {
          title: "Lambda Expression", code: `auto add = [](int a, int b) -> int {
    return a + b;
};

std::vector<int> nums = {3, 1, 4, 1, 5};
std::sort(nums.begin(), nums.end(), [](int a, int b) {
    return a > b;
});` },
      ],
    },
    java: {
      beginner: [
        {
          title: "Hello World", code: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}` },
        {
          title: "Variables", code: `int age = 25;
double price = 19.99;
char grade = 'A';
boolean isValid = true;
String name = "Alice";` },
        {
          title: "For Loop", code: `for (int i = 0; i < 5; i++) {
    System.out.println(i);
}` },
        {
          title: "Method", code: `public static int add(int a, int b) {
    return a + b;
}` },
        {
          title: "Array", code: `int[] nums = {1, 2, 3, 4, 5};
for (int num : nums) {
    System.out.println(num);
}` },
      ],
      intermediate: [
        {
          title: "Class Definition", code: `public class Rectangle {
    private int width;
    private int height;
    
    public Rectangle(int w, int h) {
        this.width = w;
        this.height = h;
    }
    
    public int area() {
        return width * height;
    }
}` },
        {
          title: "ArrayList", code: `import java.util.ArrayList;

ArrayList<String> names = new ArrayList<>();
names.add("Alice");
names.add("Bob");

for (String name : names) {
    System.out.println(name);
}` },
        {
          title: "Try Catch", code: `try {
    int result = 10 / 0;
} catch (ArithmeticException e) {
    System.out.println("Error: " + e.getMessage());
} finally {
    System.out.println("Cleanup");
}` },
      ],
      advanced: [
        {
          title: "Lambda Expression", code: `import java.util.Arrays;
import java.util.List;

List<Integer> nums = Arrays.asList(1, 2, 3, 4, 5);
nums.stream()
    .filter(n -> n % 2 == 0)
    .map(n -> n * 2)
    .forEach(System.out::println);` },
        {
          title: "Generics", code: `public class Box<T> {
    private T content;
    
    public void set(T content) {
        this.content = content;
    }
    
    public T get() {
        return content;
    }
}` },
      ],
    },
  },
  dsa: {
    javascript: {
      beginner: [
        {
          title: "Array Sum", code: `const sum = (arr) => {
  let total = 0;
  for (let i = 0; i < arr.length; i++) {
    total += arr[i];
  }
  return total;
};` },
        {
          title: "Find Max", code: `const findMax = (arr) => {
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  return max;
};` },
        {
          title: "Reverse Array", code: `const reverse = (arr) => {
  let left = 0;
  let right = arr.length - 1;
  while (left < right) {
    [arr[left], arr[right]] = [arr[right], arr[left]];
    left++;
    right--;
  }
  return arr;
};` },
        {
          title: "Two Sum Brute", code: `const twoSum = (nums, target) => {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }
  return [];
};` },
      ],
      intermediate: [
        {
          title: "Binary Search", code: `const binarySearch = (arr, target) => {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return -1;
};` },
        {
          title: "Valid Parentheses", code: `const isValid = (s) => {
  const stack = [];
  const map = { ')': '(', ']': '[', '}': '{' };
  
  for (const char of s) {
    if (char in map) {
      if (stack.pop() !== map[char]) {
        return false;
      }
    } else {
      stack.push(char);
    }
  }
  return stack.length === 0;
};` },
        {
          title: "Max Subarray", code: `const maxSubArray = (nums) => {
  let maxSum = nums[0];
  let currentSum = nums[0];
  
  for (let i = 1; i < nums.length; i++) {
    currentSum = Math.max(nums[i], currentSum + nums[i]);
    maxSum = Math.max(maxSum, currentSum);
  }
  
  return maxSum;
};` },
      ],
      advanced: [
        {
          title: "Quick Sort", code: `const quickSort = (arr) => {
  if (arr.length <= 1) return arr;
  
  const pivot = arr[Math.floor(arr.length / 2)];
  const left = arr.filter(x => x < pivot);
  const middle = arr.filter(x => x === pivot);
  const right = arr.filter(x => x > pivot);
  
  return [...quickSort(left), ...middle, ...quickSort(right)];
};` },
        {
          title: "BFS Graph", code: `const bfs = (graph, start) => {
  const visited = new Set();
  const queue = [start];
  const result = [];
  
  while (queue.length > 0) {
    const node = queue.shift();
    if (visited.has(node)) continue;
    
    visited.add(node);
    result.push(node);
    
    for (const neighbor of graph[node] || []) {
      if (!visited.has(neighbor)) {
        queue.push(neighbor);
      }
    }
  }
  
  return result;
};` },
        {
          title: "LRU Cache", code: `class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }
  
  get(key) {
    if (!this.cache.has(key)) return -1;
    const value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, value);
    return value;
  }
}` },
      ],
    },
    python: {
      beginner: [
        {
          title: "Array Sum", code: `def array_sum(arr):
    total = 0
    for num in arr:
        total += num
    return total` },
        {
          title: "Find Max", code: `def find_max(arr):
    max_val = arr[0]
    for num in arr[1:]:
        if num > max_val:
            max_val = num
    return max_val` },
        {
          title: "Reverse List", code: `def reverse_list(arr):
    left, right = 0, len(arr) - 1
    while left < right:
        arr[left], arr[right] = arr[right], arr[left]
        left += 1
        right -= 1
    return arr` },
      ],
      intermediate: [
        {
          title: "Binary Search", code: `def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return -1` },
        {
          title: "Two Sum", code: `def two_sum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []` },
      ],
      advanced: [
        {
          title: "Quick Sort", code: `def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    
    return quick_sort(left) + middle + quick_sort(right)` },
      ],
    },
    typescript: {
      beginner: [
        {
          title: "Array Sum", code: `const sum = (arr: number[]): number => {
  let total = 0;
  for (const num of arr) {
    total += num;
  }
  return total;
};` },
      ],
      intermediate: [
        {
          title: "Binary Search", code: `const binarySearch = (arr: number[], target: number): number => {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  
  return -1;
};` },
      ],
      advanced: [
        {
          title: "LRU Cache", code: `class LRUCache {
  private capacity: number;
  private cache: Map<number, number>;

  constructor(capacity: number) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  get(key: number): number {
    if (!this.cache.has(key)) return -1;
    const value = this.cache.get(key)!;
    this.cache.delete(key);
    this.cache.set(key, value);
    return value;
  }
}` },
      ],
    },
    cpp: {
      beginner: [
        {
          title: "Array Sum", code: `int sum(int arr[], int n) {
    int total = 0;
    for (int i = 0; i < n; i++) {
        total += arr[i];
    }
    return total;
}` },
        {
          title: "Find Max", code: `int findMax(int arr[], int n) {
    int maxVal = arr[0];
    for (int i = 1; i < n; i++) {
        if (arr[i] > maxVal) {
            maxVal = arr[i];
        }
    }
    return maxVal;
}` },
      ],
      intermediate: [
        {
          title: "Binary Search", code: `int binarySearch(vector<int>& arr, int target) {
    int left = 0;
    int right = arr.size() - 1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1;
}` },
      ],
      advanced: [
        {
          title: "Quick Sort", code: `void quickSort(vector<int>& arr, int low, int high) {
    if (low < high) {
        int pivot = arr[high];
        int i = low - 1;
        
        for (int j = low; j < high; j++) {
            if (arr[j] < pivot) {
                i++;
                swap(arr[i], arr[j]);
            }
        }
        swap(arr[i + 1], arr[high]);
        int pi = i + 1;
        
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}` },
      ],
    },
    java: {
      beginner: [
        {
          title: "Array Sum", code: `public static int sum(int[] arr) {
    int total = 0;
    for (int num : arr) {
        total += num;
    }
    return total;
}` },
        {
          title: "Find Max", code: `public static int findMax(int[] arr) {
    int max = arr[0];
    for (int i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    return max;
}` },
      ],
      intermediate: [
        {
          title: "Binary Search", code: `public static int binarySearch(int[] arr, int target) {
    int left = 0;
    int right = arr.length - 1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1;
}` },
      ],
      advanced: [
        {
          title: "Merge Sort", code: `public static void mergeSort(int[] arr, int left, int right) {
    if (left < right) {
        int mid = left + (right - left) / 2;
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);
        merge(arr, left, mid, right);
    }
}` },
      ],
    },
  },
};

// Syntax highlighting configuration
const SYNTAX_RULES = {
  javascript: {
    keywords: ['const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'class', 'constructor', 'new', 'this', 'async', 'await', 'try', 'catch', 'throw', 'import', 'export', 'default', 'from', 'of', 'in', 'typeof', 'instanceof'],
    builtins: ['console', 'Math', 'Array', 'Object', 'String', 'Number', 'Boolean', 'Map', 'Set', 'Promise', 'JSON', 'setTimeout', 'setInterval', 'fetch'],
    constants: ['true', 'false', 'null', 'undefined', 'NaN', 'Infinity'],
  },
  typescript: {
    keywords: ['const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'class', 'constructor', 'new', 'this', 'async', 'await', 'try', 'catch', 'throw', 'import', 'export', 'default', 'from', 'interface', 'type', 'extends', 'implements', 'public', 'private', 'protected', 'readonly', 'static', 'abstract'],
    builtins: ['console', 'Math', 'Array', 'Object', 'String', 'Number', 'Boolean', 'Map', 'Set', 'Promise', 'JSON', 'React'],
    constants: ['true', 'false', 'null', 'undefined', 'NaN', 'Infinity'],
  },
  python: {
    keywords: ['def', 'return', 'if', 'else', 'elif', 'for', 'while', 'class', 'self', 'import', 'from', 'as', 'try', 'except', 'finally', 'raise', 'with', 'lambda', 'yield', 'pass', 'break', 'continue', 'in', 'not', 'and', 'or', 'is'],
    builtins: ['print', 'len', 'range', 'int', 'str', 'float', 'list', 'dict', 'set', 'tuple', 'open', 'enumerate', 'zip', 'map', 'filter', 'sorted', 'sum', 'max', 'min', 'abs'],
    constants: ['True', 'False', 'None'],
  },
  cpp: {
    keywords: ['int', 'double', 'float', 'char', 'bool', 'void', 'const', 'static', 'class', 'struct', 'public', 'private', 'protected', 'return', 'if', 'else', 'for', 'while', 'do', 'switch', 'case', 'break', 'continue', 'new', 'delete', 'this', 'template', 'typename', 'virtual', 'override', 'namespace', 'using', 'auto', 'nullptr', 'sizeof', 'noexcept'],
    builtins: ['std', 'cout', 'cin', 'endl', 'vector', 'string', 'map', 'set', 'queue', 'stack', 'pair', 'make_pair', 'make_unique', 'make_shared', 'unique_ptr', 'shared_ptr', 'sort', 'swap', 'push_back', 'begin', 'end', 'size'],
    constants: ['true', 'false', 'NULL'],
  },
  java: {
    keywords: ['public', 'private', 'protected', 'static', 'final', 'class', 'interface', 'extends', 'implements', 'new', 'this', 'super', 'return', 'if', 'else', 'for', 'while', 'do', 'switch', 'case', 'break', 'continue', 'try', 'catch', 'finally', 'throw', 'throws', 'import', 'package', 'void', 'int', 'double', 'float', 'char', 'boolean', 'String', 'long', 'short', 'byte'],
    builtins: ['System', 'out', 'println', 'print', 'String', 'Integer', 'Double', 'Boolean', 'ArrayList', 'HashMap', 'HashSet', 'List', 'Map', 'Set', 'Arrays', 'Collections', 'Optional', 'Stream'],
    constants: ['true', 'false', 'null'],
  },
};

// Achievements configuration with rarity tiers
const ACHIEVEMENTS = [
  { id: 'first_race', title: 'First Steps', desc: 'Complete your first race', icon: '1', rarity: 'common', check: (stats) => stats.totalRaces >= 1 },
  { id: 'ten_races', title: 'Getting Started', desc: 'Complete 10 races', icon: '10', rarity: 'common', check: (stats) => stats.totalRaces >= 10 },
  { id: 'fifty_races', title: 'Dedicated', desc: 'Complete 50 races', icon: '50', rarity: 'rare', check: (stats) => stats.totalRaces >= 50 },
  { id: 'hundred_races', title: 'Centurion', desc: 'Complete 100 races', icon: '100', rarity: 'epic', check: (stats) => stats.totalRaces >= 100 },
  { id: 'wpm_40', title: 'Warming Up', desc: 'Reach 40 WPM', icon: '40', rarity: 'common', check: (stats) => stats.topWpm >= 40 },
  { id: 'wpm_60', title: 'Quick Fingers', desc: 'Reach 60 WPM', icon: '60', rarity: 'rare', check: (stats) => stats.topWpm >= 60 },
  { id: 'wpm_80', title: 'Speed Demon', desc: 'Reach 80 WPM', icon: '80', rarity: 'epic', check: (stats) => stats.topWpm >= 80 },
  { id: 'wpm_100', title: 'Lightning', desc: 'Reach 100 WPM', icon: '100', rarity: 'legendary', check: (stats) => stats.topWpm >= 100 },
  { id: 'perfect', title: 'Perfectionist', desc: '100% accuracy in a race', icon: 'P', rarity: 'epic', check: (stats) => stats.hasPerfect },
  { id: 'streak_5', title: 'On Fire', desc: '5 race streak in one session', icon: '5x', rarity: 'rare', check: (stats) => stats.maxStreak >= 5 },
  { id: 'streak_10', title: 'Unstoppable', desc: '10 race streak in one session', icon: '10x', rarity: 'legendary', check: (stats) => stats.maxStreak >= 10 },
  { id: 'all_langs', title: 'Polyglot', desc: 'Race in all 5 languages', icon: '5L', rarity: 'epic', check: (stats) => stats.languagesUsed >= 5 },
  { id: 'dsa_master', title: 'DSA Master', desc: 'Complete 20 DSA races', icon: 'DSA', rarity: 'rare', check: (stats) => stats.dsaRaces >= 20 },
  { id: 'advanced', title: 'Expert', desc: 'Complete 10 advanced races', icon: 'A', rarity: 'epic', check: (stats) => stats.advancedRaces >= 10 },
];

const LANGUAGE_CONFIG = {
  javascript: { label: 'JavaScript', icon: 'JS', gradient: 'from-yellow-500 to-orange-500' },
  python: { label: 'Python', icon: 'PY', gradient: 'from-blue-500 to-green-500' },
  typescript: { label: 'TypeScript', icon: 'TS', gradient: 'from-blue-600 to-blue-400' },
  cpp: { label: 'C++', icon: 'C++', gradient: 'from-blue-700 to-indigo-500' },
  java: { label: 'Java', icon: 'JV', gradient: 'from-red-500 to-orange-500' },
};

const CATEGORY_CONFIG = {
  general: { label: 'General', description: 'Common patterns and syntax' },
  dsa: { label: 'DSA', description: 'Data Structures & Algorithms' },
};

const DIFFICULTY_CONFIG = {
  beginner: { label: 'Beginner', color: 'text-emerald-400', bg: 'bg-emerald-500/20', border: 'border-emerald-500/30' },
  intermediate: { label: 'Intermediate', color: 'text-amber-400', bg: 'bg-amber-500/20', border: 'border-amber-500/30' },
  advanced: { label: 'Advanced', color: 'text-rose-400', bg: 'bg-rose-500/20', border: 'border-rose-500/30' },
};

const THEMES = {
  midnight: { name: 'Midnight', card: 'bg-slate-800/50', accent: 'from-blue-600 to-purple-600', bg: 'from-slate-950 via-slate-900 to-slate-950' },
  forest: { name: 'Forest', card: 'bg-emerald-900/50', accent: 'from-emerald-600 to-teal-600', bg: 'from-emerald-950 via-green-900 to-emerald-950' },
  sunset: { name: 'Sunset', card: 'bg-orange-900/50', accent: 'from-orange-600 to-rose-600', bg: 'from-orange-950 via-rose-900 to-orange-950' },
  ocean: { name: 'Ocean', card: 'bg-cyan-900/50', accent: 'from-cyan-600 to-blue-600', bg: 'from-cyan-950 via-blue-900 to-cyan-950' },
  dracula: { name: 'Dracula', card: 'bg-[#282a36]/70', accent: 'from-[#bd93f9] to-[#ff79c6]', bg: 'from-[#1a1b26] via-[#282a36] to-[#1a1b26]' },
  nord: { name: 'Nord', card: 'bg-[#3b4252]/60', accent: 'from-[#88c0d0] to-[#81a1c1]', bg: 'from-[#2e3440] via-[#3b4252] to-[#2e3440]' },
  monokai: { name: 'Monokai', card: 'bg-[#272822]/70', accent: 'from-[#f92672] to-[#fd971f]', bg: 'from-[#1e1f1c] via-[#272822] to-[#1e1f1c]' },
  catppuccin: { name: 'Catppuccin', card: 'bg-[#1e1e2e]/60', accent: 'from-[#cba6f7] to-[#f5c2e7]', bg: 'from-[#11111b] via-[#1e1e2e] to-[#11111b]' },
  gruvbox: { name: 'Gruvbox', card: 'bg-[#3c3836]/60', accent: 'from-[#fabd2f] to-[#fe8019]', bg: 'from-[#1d2021] via-[#282828] to-[#1d2021]' },
  rosepine: { name: 'Rosé Pine', card: 'bg-[#26233a]/60', accent: 'from-[#c4a7e7] to-[#ebbcba]', bg: 'from-[#191724] via-[#26233a] to-[#191724]' },
};

// Tokenize code for syntax highlighting
const tokenizeCode = (code, language) => {
  const rules = SYNTAX_RULES[language] || SYNTAX_RULES.javascript;
  const tokens = [];
  let i = 0;

  while (i < code.length) {
    // String detection
    if (code[i] === '"' || code[i] === "'" || code[i] === '`') {
      const quote = code[i];
      let str = quote;
      i++;
      while (i < code.length && code[i] !== quote) {
        if (code[i] === '\\' && i + 1 < code.length) {
          str += code[i] + code[i + 1];
          i += 2;
        } else {
          str += code[i];
          i++;
        }
      }
      if (i < code.length) {
        str += code[i];
        i++;
      }
      tokens.push({ type: 'string', value: str });
      continue;
    }

    // Comment detection (single line)
    if ((code[i] === '/' && code[i + 1] === '/') || (code[i] === '#' && language === 'python')) {
      let comment = '';
      while (i < code.length && code[i] !== '\n') {
        comment += code[i];
        i++;
      }
      tokens.push({ type: 'comment', value: comment });
      continue;
    }

    // Number detection
    if (/\d/.test(code[i])) {
      let num = '';
      while (i < code.length && /[\d.]/.test(code[i])) {
        num += code[i];
        i++;
      }
      tokens.push({ type: 'number', value: num });
      continue;
    }

    // Word detection (keywords, builtins, identifiers)
    if (/[a-zA-Z_]/.test(code[i])) {
      let word = '';
      while (i < code.length && /[a-zA-Z0-9_]/.test(code[i])) {
        word += code[i];
        i++;
      }
      if (rules.keywords.includes(word)) {
        tokens.push({ type: 'keyword', value: word });
      } else if (rules.constants.includes(word)) {
        tokens.push({ type: 'constant', value: word });
      } else if (rules.builtins.includes(word)) {
        tokens.push({ type: 'builtin', value: word });
      } else {
        tokens.push({ type: 'identifier', value: word });
      }
      continue;
    }

    // Operators and punctuation
    tokens.push({ type: 'punctuation', value: code[i] });
    i++;
  }

  return tokens;
};

const getTokenColor = (type) => {
  switch (type) {
    case 'keyword': return 'text-purple-400';
    case 'string': return 'text-amber-500';
    case 'number': return 'text-orange-400';
    case 'comment': return 'text-slate-500';
    case 'builtin': return 'text-cyan-400';
    case 'constant': return 'text-orange-400';
    default: return 'text-white/40';
  }
};

const useSound = () => {
  const audioContextRef = useRef(null);
  const getAudioContext = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioContextRef.current;
  };
  const playTone = (frequency, duration, type = 'sine', volume = 0.1) => {
    try {
      const ctx = getAudioContext();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      oscillator.frequency.value = frequency;
      oscillator.type = type;
      gainNode.gain.setValueAtTime(volume, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + duration);
    } catch (e) { }
  };
  return {
    playKeypress: () => playTone(600, 0.03, 'sine', 0.03),
    playError: () => playTone(200, 0.12, 'sawtooth', 0.06),
    playSuccess: () => {
      playTone(523, 0.1, 'sine', 0.08);
      setTimeout(() => playTone(659, 0.1, 'sine', 0.08), 80);
      setTimeout(() => playTone(784, 0.15, 'sine', 0.08), 160);
    },
    playCountdown: () => playTone(440, 0.08, 'sine', 0.08),
    playGo: () => playTone(880, 0.15, 'sine', 0.1),
    playAchievement: () => {
      playTone(523, 0.15, 'sine', 0.1);
      setTimeout(() => playTone(659, 0.15, 'sine', 0.1), 100);
      setTimeout(() => playTone(784, 0.15, 'sine', 0.1), 200);
      setTimeout(() => playTone(1047, 0.3, 'sine', 0.1), 300);
    },
  };
};

const useSnippetHistory = () => {
  const usedSnippetsRef = useRef({});
  const getNextSnippet = (category, language, difficulty) => {
    const key = `${category}-${language}-${difficulty}`;
    const snippets = CODE_SNIPPETS[category]?.[language]?.[difficulty] || [];
    if (snippets.length === 0) return null;
    if (!usedSnippetsRef.current[key]) usedSnippetsRef.current[key] = [];
    const used = usedSnippetsRef.current[key];
    let availableIndices = snippets.map((_, i) => i).filter(i => !used.includes(i));
    if (availableIndices.length === 0) {
      usedSnippetsRef.current[key] = [];
      availableIndices = snippets.map((_, i) => i);
    }
    const randomIdx = availableIndices[Math.floor(Math.random() * availableIndices.length)];
    usedSnippetsRef.current[key].push(randomIdx);
    return snippets[randomIdx];
  };
  return { getNextSnippet };
};

// ===== ANIMATION COMPONENTS =====

// Custom Cursor Component
const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const trailsRef = useRef([]);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const lastTrailTime = useRef(0);

  useEffect(() => {
    const moveCursor = (e) => {
      const { clientX, clientY } = e;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${clientX - 4}px, ${clientY - 4}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${clientX - 10}px, ${clientY - 10}px)`;
      }

      // Create trail particles (throttled)
      const now = Date.now();
      if (now - lastTrailTime.current > 50) {
        lastTrailTime.current = now;
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.left = `${clientX}px`;
        trail.style.top = `${clientY}px`;
        document.body.appendChild(trail);
        setTimeout(() => trail.remove(), 500);
      }
    };

    const handleMouseOver = (e) => {
      if (e.target.closest('button, a, [role="button"], input, select, .cursor-hover')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    document.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className={`cursor-dot ${isClicking ? 'clicking' : ''}`} />
      <div ref={ringRef} className={`cursor-ring ${isHovering ? 'hovering' : ''} ${isClicking ? 'clicking' : ''}`} />
    </>
  );
};

// Floating Particles Background
const FloatingParticles = ({ count = 20 }) => {
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 20,
      duration: 15 + Math.random() * 20,
      size: 2 + Math.random() * 4,
      color: ['#8b5cf6', '#06b6d4', '#ec4899', '#3b82f6'][Math.floor(Math.random() * 4)],
    }));
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full opacity-30"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            background: p.color,
            animation: `float-particle ${p.duration}s infinite linear`,
            animationDelay: `-${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

// Code Particles (floating code symbols)
const CodeParticles = () => {
  const symbols = ['{ }', '< />', '( )', '[ ]', '=>', '&&', '||', '++', '**', '//'];
  const particles = useMemo(() => {
    return Array.from({ length: 15 }, (_, i) => ({
      id: i,
      symbol: symbols[Math.floor(Math.random() * symbols.length)],
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 30,
      duration: 25 + Math.random() * 15,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => (
        <div
          key={p.id}
          className="code-particle"
          style={{
            left: p.left,
            animation: `code-float ${p.duration}s infinite linear`,
            animationDelay: `-${p.delay}s`,
          }}
        >
          {p.symbol}
        </div>
      ))}
    </div>
  );
};

// Animated Grid Background
const GridBackground = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
    <div className="grid-bg" />
    <div className="grid-lines">
      <div className="grid-line-h" style={{ animationDelay: '0s' }} />
      <div className="grid-line-h" style={{ animationDelay: '2s' }} />
      <div className="grid-line-h" style={{ animationDelay: '4s' }} />
      <div className="grid-line-v" style={{ animationDelay: '1s' }} />
      <div className="grid-line-v" style={{ animationDelay: '3s' }} />
      <div className="grid-line-v" style={{ animationDelay: '5s' }} />
    </div>
  </div>
);

// Glitch Text Component
const GlitchText = ({ children, className = '' }) => (
  <span className={`glitch-text ${className}`} data-text={children}>
    {children}
  </span>
);

// Ripple Button Component
const RippleButton = ({ children, onClick, className = '', ...props }) => {
  const buttonRef = useRef(null);

  const createRipple = (e) => {
    const button = buttonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const ripple = document.createElement('span');
    ripple.className = 'ripple-effect';
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    button.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);

    onClick?.(e);
  };

  return (
    <button
      ref={buttonRef}
      onClick={createRipple}
      className={`ripple btn-cyber ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// Page Transition Wrapper
const PageTransition = ({ children, keyProp }) => (
  <AnimatePresence mode="wait">
    <motion.div
      key={keyProp}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  </AnimatePresence>
);

// Staggered Container
const StaggerContainer = ({ children, className = '', staggerDelay = 0.1 }) => (
  <motion.div
    className={className}
    initial="hidden"
    animate="visible"
    variants={{
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: staggerDelay,
        },
      },
    }}
  >
    {children}
  </motion.div>
);

// Staggered Item
const StaggerItem = ({ children, className = '' }) => (
  <motion.div
    className={className}
    variants={{
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
    }}
  >
    {children}
  </motion.div>
);

// Countdown Display with animation
const CountdownDisplay = ({ number }) => (
  <motion.div
    key={number}
    initial={{ scale: 0.5, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    exit={{ scale: 1.5, opacity: 0 }}
    transition={{ duration: 0.5, ease: 'easeOut' }}
    className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"
    style={{
      textShadow: '0 0 40px rgba(139, 92, 246, 0.5), 0 0 80px rgba(139, 92, 246, 0.3)',
    }}
  >
    {number === 0 ? 'GO!' : number}
  </motion.div>
);

// Confetti Celebration Component
const Confetti = ({ show }) => {
  const [pieces, setPieces] = useState([]);

  useEffect(() => {
    if (show) {
      const colors = ['#8b5cf6', '#06b6d4', '#ec4899', '#3b82f6', '#fbbf24', '#10b981'];
      const newPieces = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 6 + Math.random() * 8,
        rotation: Math.random() * 360,
      }));
      setPieces(newPieces);
      setTimeout(() => setPieces([]), 3500);
    }
  }, [show]);

  if (!show && pieces.length === 0) return null;

  return (
    <div className="confetti-container">
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className="confetti-piece"
          style={{
            left: `${piece.left}%`,
            backgroundColor: piece.color,
            width: piece.size,
            height: piece.size,
            animationDelay: `${piece.delay}s`,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
          }}
        />
      ))}
    </div>
  );
};

const Logo = ({ onClick, size = 'large' }) => (
  <button onClick={onClick} className="flex items-center gap-3 group transition-transform duration-200 hover:scale-105">
    <div className={`${size === 'large' ? 'w-14 h-14' : 'w-10 h-10'} rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/20`}>
      <svg className={`${size === 'large' ? 'w-8 h-8' : 'w-5 h-5'} text-white`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    </div>
    {size !== 'icon' && (
      <div className="text-left">
        <h1 className={`${size === 'large' ? 'text-2xl' : 'text-xl'} font-bold text-white`}>Code Racer</h1>
        {size === 'large' && <p className="text-white/40 text-sm">Master your typing speed</p>}
      </div>
    )}
  </button>
);

// Navbar Component
const Navbar = ({ screen, setScreen, totalRaces, topWpm, streak, setShowSettings }) => (
  <motion.nav
    initial={{ y: -20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    className="fixed top-0 left-0 right-0 z-40 backdrop-blur-xl bg-slate-950/80 border-b border-white/5"
  >
    <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-8">
        <Logo onClick={() => setScreen('home')} size="icon" />
        <div className="hidden md:flex items-center gap-1">
          {[
            { id: 'home', label: 'Home', icon: '🏠' },
            { id: 'menu', label: 'Play', icon: '🎮' },
            { id: 'stats', label: 'Stats', icon: '📊' },
            { id: 'achievements', label: 'Achievements', icon: '🏆' },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setScreen(item.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${screen === item.id
                ? 'bg-white/10 text-white'
                : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
            >
              <span className="mr-2">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-4">
        {totalRaces > 0 && (
          <div className="hidden sm:flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg">
              <span className="text-white/50">🏁</span>
              <span className="text-white font-medium">{totalRaces}</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg">
              <span className="text-white/50">⚡</span>
              <span className="text-blue-400 font-medium">{topWpm} WPM</span>
            </div>
            {streak > 0 && (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-orange-500/10 rounded-lg border border-orange-500/20">
                <span>🔥</span>
                <span className="text-orange-400 font-medium">{streak}</span>
              </div>
            )}
          </div>
        )}
        <button
          onClick={() => setShowSettings(true)}
          className="p-2 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      </div>
    </div>
  </motion.nav>
);

// Footer Component
const Footer = ({ setShowContact, setShowAbout }) => (
  <footer className="relative z-10 border-t border-white/5 mt-auto">
    <div className="max-w-7xl mx-auto px-6 py-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-white/40 text-sm">
          <span>⚡</span>
          <span>Code Racer</span>
          <span className="text-white/20">•</span>
          <span>Built for developers</span>
        </div>
        <div className="flex items-center gap-6">
          <button onClick={() => setShowAbout(true)} className="text-sm text-white/50 hover:text-white transition-colors">
            How to Play
          </button>
          <button onClick={() => setShowContact(true)} className="text-sm text-white/50 hover:text-white transition-colors">
            Contact
          </button>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-sm text-white/50 hover:text-white transition-colors">
            GitHub
          </a>
        </div>
      </div>
    </div>
  </footer>
);

// Bento Grid Stat Card
const BentoCard = ({ children, className = '', span = 1, onClick }) => (
  <motion.div
    whileHover={{ scale: 1.02, y: -2 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`
      ${span === 2 ? 'col-span-2' : 'col-span-1'}
      ${onClick ? 'cursor-pointer' : ''}
      bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-5
      hover:bg-white/10 hover:border-white/20 transition-all duration-300
      glow-hover
      ${className}
    `}
  >
    {children}
  </motion.div>
);

const StatCard = ({ label, value, subtext }) => (
  <div className="text-center">
    <div className="text-3xl font-bold text-white mb-1">{value}</div>
    <div className="text-sm text-white/50">{label}</div>
    {subtext && <div className="text-xs text-white/30 mt-1">{subtext}</div>}
  </div>
);

// Achievement notification popup
const AchievementPopup = ({ achievement, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  if (!achievement) return null;

  return (
    <div className="fixed top-4 right-4 z-50 animate-slideIn">
      <div className="bg-gradient-to-r from-yellow-600 to-orange-600 rounded-xl p-4 shadow-2xl border border-yellow-500/30 flex items-center gap-4">
        <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center font-bold text-lg">
          {achievement.icon}
        </div>
        <div>
          <div className="text-xs text-yellow-200 uppercase tracking-wide">Achievement Unlocked</div>
          <div className="font-bold text-white">{achievement.title}</div>
          <div className="text-sm text-white/70">{achievement.desc}</div>
        </div>
        <button onClick={onClose} className="text-white/50 hover:text-white ml-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

const ContactModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="relative bg-slate-900 border border-white/10 rounded-2xl p-8 max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Get in Touch</h2>
          <p className="text-white/50 mb-6">Have questions or feedback? Reach out!</p>
          <a href="mailto:ali.imran@uwaterloo.ca" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-medium hover:scale-105 transition-transform duration-200">
            ali.imran@uwaterloo.ca
          </a>
        </div>
      </div>
    </div>
  );
};

const AboutModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="relative bg-slate-900 border border-white/10 rounded-2xl p-6 max-w-3xl w-full shadow-2xl" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-xl font-bold text-white mb-4">How to Play</h2>

        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="p-3 bg-white/5 rounded-lg border border-white/5">
            <h3 className="font-medium text-white text-sm mb-1">Type Real Code</h3>
            <p className="text-xs text-white/50">Practice with snippets from 5 languages</p>
          </div>
          <div className="p-3 bg-white/5 rounded-lg border border-white/5">
            <h3 className="font-medium text-white text-sm mb-1">Track Progress</h3>
            <p className="text-xs text-white/50">Real-time WPM, accuracy, and errors</p>
          </div>
          <div className="p-3 bg-white/5 rounded-lg border border-white/5">
            <h3 className="font-medium text-white text-sm mb-1">Ghost Mode</h3>
            <p className="text-xs text-white/50">Race against your personal best</p>
          </div>
          <div className="p-3 bg-white/5 rounded-lg border border-white/5">
            <h3 className="font-medium text-white text-sm mb-1">DSA Practice</h3>
            <p className="text-xs text-white/50">Algorithms: sorting, graphs, DP</p>
          </div>
          <div className="p-3 bg-white/5 rounded-lg border border-white/5">
            <h3 className="font-medium text-white text-sm mb-1">Achievements</h3>
            <p className="text-xs text-white/50">Unlock badges as you improve</p>
          </div>
          <div className="p-3 bg-white/5 rounded-lg border border-white/5">
            <h3 className="font-medium text-white text-sm mb-1">Stats Dashboard</h3>
            <p className="text-xs text-white/50">Track your progress over time</p>
          </div>
        </div>

        <div className="bg-white/5 rounded-lg p-3 border border-white/5">
          <h3 className="font-medium text-white text-sm mb-2">Keyboard Shortcuts</h3>
          <div className="grid grid-cols-3 gap-x-4 gap-y-1 text-xs text-white/50">
            <span><kbd className="px-1.5 py-0.5 bg-white/10 rounded text-white/70">R</kbd> Restart race</span>
            <span><kbd className="px-1.5 py-0.5 bg-white/10 rounded text-white/70">Esc</kbd> Back to menu</span>
            <span><kbd className="px-1.5 py-0.5 bg-white/10 rounded text-white/70">Enter</kbd> Start next race</span>
            <span><kbd className="px-1.5 py-0.5 bg-white/10 rounded text-white/70">Tab</kbd> Insert 2 spaces</span>
            <span><kbd className="px-1.5 py-0.5 bg-white/10 rounded text-white/70">G</kbd> Race ghost</span>
            <span><kbd className="px-1.5 py-0.5 bg-white/10 rounded text-white/70">Ctrl+U</kbd> Clear typed text</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function CodeTypeRacer() {
  const [screen, setScreen] = useState('home');
  const [currentSnippet, setCurrentSnippet] = useState(null);
  const [typedText, setTypedText] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [errors, setErrors] = useState(0);
  const [totalKeystrokes, setTotalKeystrokes] = useState(0);
  const [countdown, setCountdown] = useState(3);
  const [currentWpm, setCurrentWpm] = useState(0);
  const [streak, setStreak] = useState(0);
  const [elapsedDisplay, setElapsedDisplay] = useState('0.0');

  const [selectedCategory, setSelectedCategory] = useState('general');
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [selectedDifficulty, setSelectedDifficulty] = useState('beginner');
  const [selectedTheme, setSelectedTheme] = useState('midnight');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showTimer, setShowTimer] = useState(true);
  const [fontSize, setFontSize] = useState('base');
  const [showSettings, setShowSettings] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [ghostEnabled, setGhostEnabled] = useState(true);

  const [bestScores, setBestScores] = useState({});
  const [totalRaces, setTotalRaces] = useState(0);
  const [ghostRecords, setGhostRecords] = useState({});
  const [raceHistory, setRaceHistory] = useState([]);
  const [unlockedAchievements, setUnlockedAchievements] = useState([]);
  const [newAchievement, setNewAchievement] = useState(null);

  const [currentGhost, setCurrentGhost] = useState(null);
  const [ghostProgress, setGhostProgress] = useState(0);
  const [errorShake, setErrorShake] = useState(false);
  const [isPersonalRecord, setIsPersonalRecord] = useState(false);
  const raceRecordRef = useRef([]);

  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const inputRef = useRef(null);
  const sounds = useSound();
  const { getNextSnippet } = useSnippetHistory();
  const theme = THEMES[selectedTheme];

  // Mouse tracking for aurora
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger shortcuts when typing
      if (screen === 'playing') return;

      if (e.key === 'Escape') {
        if (screen === 'finished' || screen === 'countdown') {
          setScreen('menu');
        }
      }

      if (e.key === 'r' || e.key === 'R') {
        if (screen === 'finished' && currentSnippet) {
          startWithSnippet(currentSnippet, false);
        }
      }

      if (e.key === 'g' || e.key === 'G') {
        if (screen === 'finished' && currentSnippet && hasGhostForCurrentSnippet) {
          raceGhost();
        }
      }

      if (e.key === 'Enter') {
        if (screen === 'finished') {
          startGame();
        } else if (screen === 'menu') {
          startGame();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [screen, currentSnippet]);

  // Load saved data
  useEffect(() => {
    try {
      const scores = localStorage.getItem('coderacer-scores');
      const races = localStorage.getItem('coderacer-races');
      const settings = localStorage.getItem('coderacer-settings');
      const ghosts = localStorage.getItem('coderacer-ghosts');
      const history = localStorage.getItem('coderacer-history');
      const achievements = localStorage.getItem('coderacer-achievements');
      if (scores) setBestScores(JSON.parse(scores));
      if (races) setTotalRaces(parseInt(races));
      if (ghosts) setGhostRecords(JSON.parse(ghosts));
      if (history) setRaceHistory(JSON.parse(history));
      if (achievements) setUnlockedAchievements(JSON.parse(achievements));
      if (settings) {
        const s = JSON.parse(settings);
        setSelectedTheme(s.theme || 'midnight');
        setSoundEnabled(s.sound !== false);
        setShowTimer(s.timer !== false);
        setFontSize(s.fontSize || 'base');
        setGhostEnabled(s.ghost !== false);
        setSelectedCategory(s.category || 'general');
      }
    } catch (e) { }
  }, []);

  // Save settings
  useEffect(() => {
    localStorage.setItem('coderacer-settings', JSON.stringify({
      theme: selectedTheme, sound: soundEnabled, timer: showTimer, fontSize, ghost: ghostEnabled, category: selectedCategory,
    }));
  }, [selectedTheme, soundEnabled, showTimer, fontSize, ghostEnabled, selectedCategory]);

  // Timer and ghost progress update
  useEffect(() => {
    if (screen === 'playing' && startTime) {
      const interval = setInterval(() => {
        const elapsed = (Date.now() - startTime) / 1000;
        setElapsedDisplay(elapsed.toFixed(1));

        if (currentGhost && currentGhost.length > 0 && ghostEnabled) {
          const elapsedMs = elapsed * 1000;
          let newGhostProgress = 0;

          for (let i = currentGhost.length - 1; i >= 0; i--) {
            if (currentGhost[i].time <= elapsedMs) {
              newGhostProgress = currentGhost[i].position;
              break;
            }
          }
          setGhostProgress(newGhostProgress);
        }
      }, 50);
      return () => clearInterval(interval);
    }
  }, [screen, startTime, currentGhost, ghostEnabled]);

  const getSnippetKey = (snippet) => {
    if (!snippet) return '';
    return `${selectedCategory}-${selectedLanguage}-${selectedDifficulty}-${snippet.title}`;
  };

  const saveBestScore = (wpm) => {
    const key = `${selectedCategory}-${selectedLanguage}-${selectedDifficulty}`;
    const newScores = { ...bestScores };
    if (!newScores[key] || wpm > newScores[key]) {
      newScores[key] = wpm;
      setBestScores(newScores);
      localStorage.setItem('coderacer-scores', JSON.stringify(newScores));
      return true;
    }
    return false;
  };

  const saveGhostRecord = (snippet, record) => {
    const key = getSnippetKey(snippet);
    const newGhosts = { ...ghostRecords, [key]: record };
    setGhostRecords(newGhosts);
    localStorage.setItem('coderacer-ghosts', JSON.stringify(newGhosts));
  };

  const saveRaceHistory = (wpm, accuracy, language, category, difficulty) => {
    const newHistory = [...raceHistory, {
      wpm, accuracy, language, category, difficulty,
      date: Date.now(),
    }].slice(-100); // Keep last 100 races
    setRaceHistory(newHistory);
    localStorage.setItem('coderacer-history', JSON.stringify(newHistory));
  };

  const checkAchievements = (newStats) => {
    for (const achievement of ACHIEVEMENTS) {
      if (!unlockedAchievements.includes(achievement.id) && achievement.check(newStats)) {
        const newUnlocked = [...unlockedAchievements, achievement.id];
        setUnlockedAchievements(newUnlocked);
        localStorage.setItem('coderacer-achievements', JSON.stringify(newUnlocked));
        setNewAchievement(achievement);
        if (soundEnabled) sounds.playAchievement();
        break; // Only show one achievement at a time
      }
    }
  };

  const getAchievementStats = (extraRace = null) => {
    const history = extraRace ? [...raceHistory, extraRace] : raceHistory;
    const allBests = Object.values(bestScores);
    const topWpm = allBests.length > 0 ? Math.max(...allBests) : 0;
    const languagesUsed = new Set(history.map(r => r.language)).size;
    const dsaRaces = history.filter(r => r.category === 'dsa').length;
    const advancedRaces = history.filter(r => r.difficulty === 'advanced').length;
    const hasPerfect = history.some(r => r.accuracy === 100);

    return {
      totalRaces: totalRaces + (extraRace ? 1 : 0),
      topWpm: extraRace ? Math.max(topWpm, extraRace.wpm) : topWpm,
      maxStreak: streak,
      languagesUsed,
      dsaRaces,
      advancedRaces,
      hasPerfect: hasPerfect || (extraRace && extraRace.accuracy === 100),
    };
  };

  const startGame = () => {
    const snippet = getNextSnippet(selectedCategory, selectedLanguage, selectedDifficulty);
    if (!snippet) {
      alert('No snippets available for this combination.');
      return;
    }
    startWithSnippet(snippet, false);
  };

  const startWithSnippet = (snippet, withGhost = false) => {
    setCurrentSnippet(snippet);
    setTypedText('');
    setErrors(0);
    setTotalKeystrokes(0);
    setStartTime(null);
    setEndTime(null);
    setCurrentWpm(0);
    setElapsedDisplay('0.0');
    setCountdown(3);
    raceRecordRef.current = [];
    setGhostProgress(0);
    setIsPersonalRecord(false);

    if (withGhost) {
      const ghostKey = `${selectedCategory}-${selectedLanguage}-${selectedDifficulty}-${snippet.title}`;
      const loadedGhost = ghostRecords[ghostKey] || null;
      setCurrentGhost(loadedGhost);
    } else {
      setCurrentGhost(null);
    }

    setScreen('countdown');
  };

  const raceGhost = () => {
    if (currentSnippet) {
      startWithSnippet(currentSnippet, true);
    }
  };

  useEffect(() => {
    if (screen === 'countdown') {
      if (countdown > 0) {
        if (soundEnabled) sounds.playCountdown();
        const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        return () => clearTimeout(timer);
      } else {
        if (soundEnabled) sounds.playGo();
        setScreen('playing');
        setStartTime(Date.now());
        setTimeout(() => inputRef.current?.focus(), 50);
      }
    }
  }, [screen, countdown, soundEnabled]);

  useEffect(() => {
    if (screen === 'playing' && startTime && typedText.length > 0) {
      const elapsed = (Date.now() - startTime) / 1000 / 60;
      const words = typedText.length / 5;
      setCurrentWpm(Math.round(words / elapsed));
    }
  }, [typedText, screen, startTime]);

  const handleKeyDown = (e) => {
    if (screen !== 'playing' || !currentSnippet) return;

    // Prevent paste (anti-cheat)
    if ((e.ctrlKey || e.metaKey) && e.key === 'v') {
      e.preventDefault();
      return;
    }

    // Ctrl+U to clear typed text (error recovery)
    if ((e.ctrlKey || e.metaKey) && e.key === 'u') {
      e.preventDefault();
      setTypedText('');
      return;
    }

    if (e.key === 'Escape') {
      setScreen('menu');
      return;
    }

    if (e.key === 'Backspace') {
      setTypedText(prev => prev.slice(0, -1));
      return;
    }

    if (e.key === 'Tab') {
      e.preventDefault();
      handleCharInput('  ');
      return;
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      const targetCode = currentSnippet.code;
      const nextIndex = typedText.length;

      if (nextIndex < targetCode.length && targetCode[nextIndex] === '\n') {
        let autoInsert = '\n';
        let lookAhead = nextIndex + 1;
        while (lookAhead < targetCode.length && (targetCode[lookAhead] === ' ' || targetCode[lookAhead] === '\t')) {
          autoInsert += targetCode[lookAhead];
          lookAhead++;
        }
        handleAutoInsert(autoInsert);
      } else {
        handleCharInput('\n');
      }
      return;
    }

    if (e.key.length === 1) {
      handleCharInput(e.key);
    }
  };

  const recordKeystroke = (position) => {
    if (startTime) {
      raceRecordRef.current.push({ time: Date.now() - startTime, position });
    }
  };

  const handleAutoInsert = (chars) => {
    const targetCode = currentSnippet.code;
    const expectedChars = targetCode.slice(typedText.length, typedText.length + chars.length);

    if (chars === expectedChars) {
      if (soundEnabled) sounds.playKeypress();
      const newTyped = typedText + chars;
      setTypedText(newTyped);
      setTotalKeystrokes(prev => prev + 1);
      recordKeystroke(newTyped.length);
      if (newTyped === targetCode) finishRace();
    } else {
      if (soundEnabled) sounds.playError();
      setErrors(prev => prev + 1);
      setTotalKeystrokes(prev => prev + 1);
    }
  };

  const handleCharInput = (char) => {
    const targetCode = currentSnippet.code;
    const nextIndex = typedText.length;
    if (nextIndex >= targetCode.length) return;
    setTotalKeystrokes(prev => prev + 1);
    const expectedChar = targetCode[nextIndex];
    if (char === expectedChar) {
      if (soundEnabled) sounds.playKeypress();
      const newTyped = typedText + char;
      setTypedText(newTyped);
      recordKeystroke(newTyped.length);
      if (newTyped === targetCode) finishRace();
    } else {
      if (soundEnabled) sounds.playError();
      setErrors(prev => prev + 1);
      // Trigger error shake animation
      setErrorShake(true);
      setTimeout(() => setErrorShake(false), 400);
    }
  };

  const finishRace = () => {
    const end = Date.now();
    setEndTime(end);
    setScreen('finished');

    const elapsed = (end - startTime) / 1000 / 60;
    const words = currentSnippet.code.length / 5;
    const finalWpm = Math.round(words / elapsed);
    const accuracy = totalKeystrokes > 0 ? Math.round(((totalKeystrokes - errors) / totalKeystrokes) * 100) : 100;

    const isNewBest = saveBestScore(finalWpm);
    setIsPersonalRecord(isNewBest);

    const ghostKey = getSnippetKey(currentSnippet);
    const existingGhost = ghostRecords[ghostKey];
    if (!existingGhost || isNewBest) {
      saveGhostRecord(currentSnippet, [...raceRecordRef.current]);
    }

    const newStreak = streak + 1;
    setStreak(newStreak);

    const newTotalRaces = totalRaces + 1;
    setTotalRaces(newTotalRaces);
    localStorage.setItem('coderacer-races', newTotalRaces.toString());

    // Save race history
    const raceData = {
      wpm: finalWpm,
      accuracy,
      language: selectedLanguage,
      category: selectedCategory,
      difficulty: selectedDifficulty,
    };
    saveRaceHistory(finalWpm, accuracy, selectedLanguage, selectedCategory, selectedDifficulty);

    // Check achievements
    setTimeout(() => {
      checkAchievements(getAchievementStats(raceData));
    }, 500);

    if (soundEnabled) sounds.playSuccess();
  };

  // Memoize tokenized code to avoid O(n) per keystroke
  const memoizedTokens = useMemo(() => {
    if (!currentSnippet) return [];
    return tokenizeCode(currentSnippet.code, selectedLanguage);
  }, [currentSnippet?.code, selectedLanguage]);

  const renderCode = () => {
    if (!currentSnippet) return null;
    const code = currentSnippet.code;
    const fontSizeClass = fontSize === 'sm' ? 'text-sm' : fontSize === 'lg' ? 'text-lg' : 'text-base';

    const tokens = memoizedTokens;
    let charIndex = 0;

    return (
      <pre className={`${fontSizeClass} font-mono leading-relaxed whitespace-pre-wrap relative`}>
        {tokens.map((token, tokenIdx) => {
          const tokenChars = token.value.split('').map((char, i) => {
            const idx = charIndex + i;
            const isGhostPosition = ghostEnabled && currentGhost && idx === ghostProgress && ghostProgress > 0;
            const isPlayerPosition = idx === typedText.length;
            const isTyped = idx < typedText.length;

            let colorClass = getTokenColor(token.type);
            if (isTyped) {
              colorClass = 'text-teal-400'; // Teal green for typed text
            } else if (isPlayerPosition) {
              colorClass = 'text-white bg-gradient-to-r from-purple-500/40 to-cyan-500/40 rounded-sm caret-pulse';
            }

            return (
              <span key={`${tokenIdx}-${i}`} className={`relative transition-colors duration-75 ${colorClass}`}>
                {isGhostPosition && !isTyped && (
                  <span className="absolute inset-0 bg-purple-500/50 rounded-sm animate-pulse" />
                )}
                {isPlayerPosition && (
                  <span className="absolute -left-0.5 top-0 bottom-0 w-0.5 bg-cyan-400 terminal-cursor" />
                )}
                {char}
              </span>
            );
          });
          charIndex += token.value.length;
          return <span key={tokenIdx}>{tokenChars}</span>;
        })}
      </pre>
    );
  };

  const getStats = () => {
    if (!startTime || !endTime || !currentSnippet) return {};
    const elapsed = (endTime - startTime) / 1000;
    const minutes = elapsed / 60;
    const words = currentSnippet.code.length / 5;
    const wpm = Math.round(words / minutes);
    const accuracy = totalKeystrokes > 0 ? Math.round(((totalKeystrokes - errors) / totalKeystrokes) * 100) : 100;
    return { wpm, accuracy, elapsed: elapsed.toFixed(1), errors };
  };

  const stats = getStats();
  const progress = currentSnippet ? (typedText.length / currentSnippet.code.length) * 100 : 0;
  const ghostProgressPercent = currentSnippet && currentGhost ? (ghostProgress / currentSnippet.code.length) * 100 : 0;
  const bestKey = `${selectedCategory}-${selectedLanguage}-${selectedDifficulty}`;
  const bestScore = bestScores[bestKey];
  const allBests = Object.values(bestScores);
  const avgWpm = allBests.length > 0 ? Math.round(allBests.reduce((a, b) => a + b, 0) / allBests.length) : 0;
  const topWpm = allBests.length > 0 ? Math.max(...allBests) : 0;
  const hasGhostForCurrentSnippet = currentSnippet && ghostRecords[getSnippetKey(currentSnippet)];

  // Stats dashboard calculations
  const last10Races = raceHistory.slice(-10);
  const avgWpmRecent = last10Races.length > 0 ? Math.round(last10Races.reduce((a, b) => a + b.wpm, 0) / last10Races.length) : 0;
  const avgAccuracyRecent = last10Races.length > 0 ? Math.round(last10Races.reduce((a, b) => a + b.accuracy, 0) / last10Races.length) : 0;
  const maxWpmEver = raceHistory.length > 0 ? Math.max(...raceHistory.map(r => r.wpm)) : 0;

  // Calculate ghost time difference for finished screen
  const getGhostTimeDiff = () => {
    if (!currentSnippet || !currentGhost || !endTime || !startTime) return null;
    const playerTime = (endTime - startTime) / 1000;
    const ghostFinalEntry = currentGhost[currentGhost.length - 1];
    if (!ghostFinalEntry) return null;
    const ghostTime = ghostFinalEntry.time / 1000;
    const diff = playerTime - ghostTime;
    return { diff, playerTime, ghostTime };
  };
  const ghostTimeDiff = getGhostTimeDiff();

  // Detect touch device for custom cursor
  const isTouchDevice = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden custom-cursor-active">
      {/* Custom Cursor - disabled on touch devices */}
      {!isTouchDevice && <CustomCursor />}

      {/* Aurora Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${theme.bg} animate-gradient-shift`} />
        <div className="absolute w-[600px] h-[600px] rounded-full opacity-20 blur-[100px]" style={{ background: 'linear-gradient(180deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%)', left: `calc(${mousePos.x}% - 300px)`, top: `calc(${mousePos.y}% - 300px)`, transition: 'left 0.8s ease-out, top 0.8s ease-out' }} />
        <div className="absolute w-[400px] h-[400px] rounded-full opacity-15 blur-[80px]" style={{ background: 'linear-gradient(180deg, #06b6d4 0%, #3b82f6 100%)', left: `calc(${mousePos.x}% - 100px)`, top: `calc(${mousePos.y}% - 100px)`, transition: 'left 0.5s ease-out, top 0.5s ease-out' }} />
        <div className="absolute w-[500px] h-[500px] rounded-full opacity-10 blur-[100px]" style={{ background: 'linear-gradient(180deg, #a855f7 0%, #6366f1 100%)', left: `calc(${100 - mousePos.x}% - 250px)`, top: `calc(${100 - mousePos.y}% - 250px)`, transition: 'left 1s ease-out, top 1s ease-out' }} />
      </div>

      {/* Animated Background Elements - disabled during gameplay for performance */}
      {screen !== 'playing' && <FloatingParticles count={25} />}
      {screen !== 'playing' && <CodeParticles />}
      <GridBackground />

      <ContactModal isOpen={showContact} onClose={() => setShowContact(false)} />
      <AboutModal isOpen={showAbout} onClose={() => setShowAbout(false)} />
      <AchievementPopup achievement={newAchievement} onClose={() => setNewAchievement(null)} />
      <Confetti show={isPersonalRecord && screen === 'finished'} />

      {/* Persistent Navbar */}
      <Navbar
        screen={screen}
        setScreen={setScreen}
        totalRaces={totalRaces}
        topWpm={topWpm}
        streak={streak}
        setShowSettings={setShowSettings}
      />

      {/* Main Content Area */}
      <div className="relative z-10 min-h-screen flex flex-col pt-16">
        <div className="flex-1 container mx-auto px-6 py-8 max-w-7xl">

          <AnimatePresence mode="wait">
            {screen === 'home' && (
              <motion.div
                key="home"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
                className="min-h-[80vh] flex flex-col items-center justify-center"
              >
                <StaggerContainer className="text-center mb-12">
                  <StaggerItem>
                    <motion.div
                      className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-2xl shadow-purple-500/30 mx-auto mb-6 breathing-glow"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                    </motion.div>
                  </StaggerItem>
                  <StaggerItem>
                    <h1 className="text-5xl font-bold text-white mb-4">
                      <GlitchText>Code Racer</GlitchText>
                    </h1>
                  </StaggerItem>
                  <StaggerItem>
                    <p className="text-white/50 text-lg max-w-md mx-auto">Improve your coding speed with real code snippets and race against your personal best</p>
                  </StaggerItem>
                  <StaggerItem>
                    <motion.div
                      className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full border border-purple-500/30 holographic"
                      whileHover={{ scale: 1.05 }}
                    >
                      <span className="text-xs font-semibold text-purple-400">NEW</span>
                      <span className="text-sm text-white/70">DSA Mode - Practice algorithms</span>
                    </motion.div>
                  </StaggerItem>
                </StaggerContainer>

                {totalRaces > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className={`${theme.card} backdrop-blur-xl rounded-2xl p-6 border border-white/10 mb-8 w-full max-w-md glow-hover neon-border`}
                  >
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-white">{totalRaces}</div>
                        <div className="text-xs text-white/50">Races</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-blue-400">{topWpm}</div>
                        <div className="text-xs text-white/50">Top WPM</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-emerald-400">{avgWpm}</div>
                        <div className="text-xs text-white/50">Avg WPM</div>
                      </div>
                    </div>
                  </motion.div>
                )}

                <StaggerContainer className="flex flex-col gap-3 w-full max-w-md" staggerDelay={0.08}>
                  <StaggerItem>
                    <RippleButton onClick={() => setScreen('menu')} className={`w-full py-4 rounded-xl bg-gradient-to-r ${theme.accent} font-semibold text-lg glow-hover`}>
                      <span className="relative z-10">Start Racing</span>
                    </RippleButton>
                  </StaggerItem>
                  <StaggerItem>
                    <div className="grid grid-cols-2 gap-3">
                      <RippleButton onClick={() => setScreen('stats')} className="py-3 rounded-xl border border-white/20 font-medium hover:bg-white/5 glow-hover">
                        Stats
                      </RippleButton>
                      <RippleButton onClick={() => setScreen('achievements')} className="py-3 rounded-xl border border-white/20 font-medium hover:bg-white/5 glow-hover">
                        Achievements
                      </RippleButton>
                    </div>
                  </StaggerItem>
                  <StaggerItem>
                    <RippleButton onClick={() => setShowAbout(true)} className="w-full py-3 rounded-xl border border-white/20 font-medium hover:bg-white/5 glow-hover">
                      How to Play
                    </RippleButton>
                  </StaggerItem>
                  <StaggerItem>
                    <RippleButton onClick={() => setShowContact(true)} className="w-full py-3 rounded-xl border border-white/10 font-medium hover:bg-white/5 text-white/70 glow-hover">
                      Contact
                    </RippleButton>
                  </StaggerItem>
                </StaggerContainer>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="grid grid-cols-3 gap-6 mt-12 w-full max-w-lg text-center"
                >
                  <motion.div className="p-4" whileHover={{ scale: 1.1, y: -5 }}>
                    <div className="text-3xl font-bold mb-1 text-gradient">5</div>
                    <div className="text-sm text-white/50">Languages</div>
                  </motion.div>
                  <motion.div className="p-4" whileHover={{ scale: 1.1, y: -5 }}>
                    <div className="text-3xl font-bold mb-1 text-gradient">80+</div>
                    <div className="text-sm text-white/50">Snippets</div>
                  </motion.div>
                  <motion.div className="p-4" whileHover={{ scale: 1.1, y: -5 }}>
                    <div className="text-3xl font-bold mb-1 text-gradient">3</div>
                    <div className="text-sm text-white/50">Difficulties</div>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}

            {screen === 'stats' && (
              <motion.div
                key="stats"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <header className="flex items-center justify-between mb-8">
                  <Logo onClick={() => setScreen('home')} size="small" />
                </header>

                <h2 className="text-2xl font-bold mb-6">Your Stats</h2>

                {raceHistory.length === 0 ? (
                  <div className={`${theme.card} backdrop-blur-xl rounded-xl p-8 border border-white/10 text-center`}>
                    <p className="text-white/50">Complete some races to see your stats!</p>
                    <button onClick={() => setScreen('menu')} className={`mt-4 px-6 py-2 rounded-lg bg-gradient-to-r ${theme.accent} font-medium`}>
                      Start Racing
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Summary stats */}
                    <div className="grid grid-cols-4 gap-4">
                      <div className={`${theme.card} backdrop-blur-xl rounded-xl p-4 border border-white/10 text-center card-hover`}>
                        <div className="text-3xl font-bold text-white">{totalRaces}</div>
                        <div className="text-xs text-white/50">Total Races</div>
                      </div>
                      <div className={`${theme.card} backdrop-blur-xl rounded-xl p-4 border border-white/10 text-center card-hover`}>
                        <div className="text-3xl font-bold text-blue-400">{maxWpmEver}</div>
                        <div className="text-xs text-white/50">Best WPM</div>
                      </div>
                      <div className={`${theme.card} backdrop-blur-xl rounded-xl p-4 border border-white/10 text-center card-hover`}>
                        <div className="text-3xl font-bold text-emerald-400">{avgWpmRecent}</div>
                        <div className="text-xs text-white/50">Avg WPM (L10)</div>
                      </div>
                      <div className={`${theme.card} backdrop-blur-xl rounded-xl p-4 border border-white/10 text-center card-hover`}>
                        <div className="text-3xl font-bold text-amber-400">{avgAccuracyRecent}%</div>
                        <div className="text-xs text-white/50">Avg Accuracy</div>
                      </div>
                    </div>

                    {/* WPM History Chart */}
                    <div className={`${theme.card} backdrop-blur-xl rounded-xl p-4 border border-white/10`}>
                      <h3 className="font-medium mb-4">Recent Performance (WPM)</h3>
                      <div className="flex items-end gap-1 h-32">
                        {last10Races.map((race, i) => {
                          const maxH = Math.max(...last10Races.map(r => r.wpm), 60);
                          const height = (race.wpm / maxH) * 100;
                          return (
                            <div key={i} className="flex-1 flex flex-col items-center gap-1">
                              <div className="text-xs text-white/50">{race.wpm}</div>
                              <div
                                className="w-full bg-gradient-to-t from-blue-600 to-purple-600 rounded-t transition-all duration-300"
                                style={{ height: `${height}%` }}
                              />
                            </div>
                          );
                        })}
                      </div>
                      <div className="text-xs text-white/30 text-center mt-2">Last {last10Races.length} races</div>
                    </div>

                    {/* Language breakdown */}
                    <div className={`${theme.card} backdrop-blur-xl rounded-xl p-4 border border-white/10`}>
                      <h3 className="font-medium mb-4">Races by Language</h3>
                      <div className="grid grid-cols-5 gap-2">
                        {Object.entries(LANGUAGE_CONFIG).map(([lang, config]) => {
                          const count = raceHistory.filter(r => r.language === lang).length;
                          return (
                            <div key={lang} className="text-center p-2 bg-white/5 rounded-lg">
                              <div className={`w-8 h-8 rounded bg-gradient-to-br ${config.gradient} flex items-center justify-center font-bold text-xs mx-auto mb-1`}>
                                {config.icon}
                              </div>
                              <div className="text-lg font-bold">{count}</div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <RippleButton onClick={() => setScreen('home')} className="w-full py-3 rounded-xl border border-white/20 font-medium hover:bg-white/5 glow-hover">
                      Back
                    </RippleButton>
                  </div>
                )}
              </motion.div>
            )}

            {screen === 'achievements' && (
              <motion.div
                key="achievements"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <header className="flex items-center justify-between mb-8">
                  <Logo onClick={() => setScreen('home')} size="small" />
                </header>

                <h2 className="text-2xl font-bold mb-2">Achievements</h2>
                <p className="text-white/50 mb-6">{unlockedAchievements.length} / {ACHIEVEMENTS.length} unlocked</p>

                <div className="grid grid-cols-2 gap-3 mb-6">
                  {ACHIEVEMENTS.map(achievement => {
                    const unlocked = unlockedAchievements.includes(achievement.id);
                    const rarityColors = {
                      common: { bg: 'from-slate-600/20 to-slate-500/20', border: 'border-slate-400/30', icon: 'from-slate-500 to-slate-400', glow: '' },
                      rare: { bg: 'from-blue-600/20 to-cyan-600/20', border: 'border-blue-400/40', icon: 'from-blue-500 to-cyan-500', glow: 'achievement-rare' },
                      epic: { bg: 'from-purple-600/20 to-pink-600/20', border: 'border-purple-400/40', icon: 'from-purple-500 to-pink-500', glow: 'achievement-epic' },
                      legendary: { bg: 'from-yellow-600/20 to-orange-600/20', border: 'border-yellow-400/50', icon: 'from-yellow-500 to-orange-500', glow: 'achievement-legendary' },
                    };
                    const rarity = rarityColors[achievement.rarity] || rarityColors.common;
                    return (
                      <div
                        key={achievement.id}
                        className={`p-4 rounded-xl border transition-all card-hover ${unlocked
                          ? `bg-gradient-to-br ${rarity.bg} ${rarity.border} ${rarity.glow}`
                          : 'bg-white/5 border-white/5 opacity-50'
                          }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm ${unlocked ? `bg-gradient-to-br ${rarity.icon} text-white` : 'bg-white/10 text-white/30'
                            }`}>
                            {achievement.icon}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className={`font-medium ${unlocked ? 'text-white' : 'text-white/50'}`}>{achievement.title}</span>
                              <span className={`text-[10px] px-1.5 py-0.5 rounded uppercase tracking-wider ${achievement.rarity === 'legendary' ? 'bg-yellow-500/20 text-yellow-400' :
                                achievement.rarity === 'epic' ? 'bg-purple-500/20 text-purple-400' :
                                  achievement.rarity === 'rare' ? 'bg-blue-500/20 text-blue-400' :
                                    'bg-slate-500/20 text-slate-400'
                                }`}>{achievement.rarity}</span>
                            </div>
                            <div className="text-xs text-white/40">{achievement.desc}</div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <RippleButton onClick={() => setScreen('home')} className="w-full py-3 rounded-xl border border-white/20 font-medium hover:bg-white/5 glow-hover">
                  Back
                </RippleButton>
              </motion.div>
            )}

            {screen === 'menu' && (
              <motion.div
                key="menu"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <header className="flex items-center justify-between mb-8">
                  <Logo onClick={() => setScreen('home')} size="small" />
                  <div className="flex items-center gap-3">
                    {totalRaces > 0 && <div className="text-sm text-white/40">{totalRaces} races</div>}
                    <button onClick={() => setShowSettings(!showSettings)} className={`p-2 rounded-lg transition-all duration-200 ${showSettings ? 'bg-white/20' : 'bg-white/5 hover:bg-white/10'}`}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </button>
                  </div>
                </header>

                {showSettings && (
                  <div className={`${theme.card} backdrop-blur-xl rounded-2xl p-6 border border-white/10 mb-6 animate-slideDown`}>
                    <h3 className="font-semibold mb-4">Settings</h3>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                      <div>
                        <label className="text-sm text-white/50 block mb-2">Theme</label>
                        <select value={selectedTheme} onChange={(e) => setSelectedTheme(e.target.value)} className="w-full bg-slate-800 border border-white/10 rounded-lg px-3 py-2 text-sm">
                          {Object.entries(THEMES).map(([key, t]) => (<option key={key} value={key}>{t.name}</option>))}
                        </select>
                      </div>
                      <div>
                        <label className="text-sm text-white/50 block mb-2">Font Size</label>
                        <select value={fontSize} onChange={(e) => setFontSize(e.target.value)} className="w-full bg-slate-800 border border-white/10 rounded-lg px-3 py-2 text-sm">
                          <option value="sm">Small</option>
                          <option value="base">Medium</option>
                          <option value="lg">Large</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-sm text-white/50 block mb-2">Sound</label>
                        <button onClick={() => setSoundEnabled(!soundEnabled)} className={`w-full px-3 py-2 rounded-lg text-sm transition-all ${soundEnabled ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-slate-800 text-white/50 border border-white/10'}`}>
                          {soundEnabled ? 'On' : 'Off'}
                        </button>
                      </div>
                      <div>
                        <label className="text-sm text-white/50 block mb-2">Timer</label>
                        <button onClick={() => setShowTimer(!showTimer)} className={`w-full px-3 py-2 rounded-lg text-sm transition-all ${showTimer ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-slate-800 text-white/50 border border-white/10'}`}>
                          {showTimer ? 'On' : 'Off'}
                        </button>
                      </div>
                      <div>
                        <label className="text-sm text-white/50 block mb-2">Ghost</label>
                        <button onClick={() => setGhostEnabled(!ghostEnabled)} className={`w-full px-3 py-2 rounded-lg text-sm transition-all ${ghostEnabled ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' : 'bg-slate-800 text-white/50 border border-white/10'}`}>
                          {ghostEnabled ? 'On' : 'Off'}
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <h2 className="text-sm font-medium text-white/50 mb-3">Category</h2>
                    <div className="flex gap-2">
                      {Object.entries(CATEGORY_CONFIG).map(([key, config]) => (
                        <button key={key} onClick={() => setSelectedCategory(key)} className={`flex-1 px-4 py-3 rounded-xl border transition-all duration-200 ${selectedCategory === key ? 'border-white/30 bg-white/10' : 'border-white/5 bg-white/5 hover:bg-white/10'}`}>
                          <div className="font-medium flex items-center justify-center gap-2">
                            {config.label}
                            {key === 'dsa' && <span className="text-[10px] px-1.5 py-0.5 bg-purple-500/30 text-purple-300 rounded">NEW</span>}
                          </div>
                          <div className="text-xs text-white/40">{config.description}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h2 className="text-sm font-medium text-white/50 mb-3">Language</h2>
                    <div className="grid grid-cols-5 gap-2">
                      {Object.entries(LANGUAGE_CONFIG).map(([key, config]) => (
                        <button key={key} onClick={() => setSelectedLanguage(key)} className={`relative p-3 rounded-xl border transition-all duration-200 ${selectedLanguage === key ? 'border-white/30 bg-white/10 scale-105' : 'border-white/5 bg-white/5 hover:bg-white/10'}`}>
                          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${config.gradient} flex items-center justify-center font-bold text-xs text-white mb-2 mx-auto`}>{config.icon}</div>
                          <span className="text-xs font-medium">{config.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h2 className="text-sm font-medium text-white/50 mb-3">Difficulty</h2>
                    <div className="flex gap-2">
                      {Object.entries(DIFFICULTY_CONFIG).map(([key, config]) => (
                        <button key={key} onClick={() => setSelectedDifficulty(key)} className={`flex-1 px-4 py-3 rounded-xl border transition-all duration-200 ${selectedDifficulty === key ? `${config.bg} ${config.border} ${config.color}` : 'border-white/5 bg-white/5 hover:bg-white/10 text-white/60'}`}>
                          {config.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {(bestScore || streak > 0) && (
                    <div className={`${theme.card} backdrop-blur-xl rounded-xl p-4 border border-white/10`}>
                      <div className="flex items-center justify-between text-sm">
                        {bestScore && <div className="text-white/50">Best: <span className="text-white font-medium">{bestScore} WPM</span></div>}
                        {streak > 0 && <div className="text-orange-400">{streak} race streak</div>}
                      </div>
                    </div>
                  )}

                  <RippleButton onClick={startGame} className={`w-full py-4 rounded-xl bg-gradient-to-r ${theme.accent} font-semibold text-lg glow-hover`}>
                    Start Race
                  </RippleButton>

                  <p className="text-center text-xs text-white/30">Press Enter to start</p>
                </div>
              </motion.div>
            )}

            {screen === 'countdown' && (
              <motion.div
                key="countdown"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center h-96"
              >
                <div className="relative countdown-pulse">
                  <div className="countdown-ring" />
                  <AnimatePresence mode="wait">
                    <CountdownDisplay key={countdown} number={countdown} />
                  </AnimatePresence>
                </div>
              </motion.div>
            )}

            {screen === 'playing' && currentSnippet && (
              <motion.div
                key="playing"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
                onClick={() => inputRef.current?.focus()}
              >
                <header className="flex items-center justify-between mb-4">
                  <Logo onClick={() => setScreen('home')} size="small" />
                </header>

                <div className={`${theme.card} backdrop-blur-xl rounded-xl p-4 border border-white/10 flex items-center justify-between`}>
                  <div className="flex items-center gap-3">
                    <div className={`px-3 py-1 rounded-lg bg-gradient-to-r ${LANGUAGE_CONFIG[selectedLanguage].gradient} font-bold text-sm`}>{LANGUAGE_CONFIG[selectedLanguage].icon}</div>
                    <div>
                      <div className="font-medium">{currentSnippet.title}</div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs ${DIFFICULTY_CONFIG[selectedDifficulty].color}`}>{DIFFICULTY_CONFIG[selectedDifficulty].label}</span>
                        <span className="text-xs text-white/30">•</span>
                        <span className="text-xs text-white/40">{CATEGORY_CONFIG[selectedCategory].label}</span>
                        {currentGhost && ghostEnabled && <span className="text-xs text-purple-400 ml-1">Ghost Active</span>}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    {showTimer && (
                      <div className="text-right">
                        <div className="text-2xl font-mono font-bold tabular-nums">{elapsedDisplay}s</div>
                        <div className="text-xs text-white/40">time</div>
                      </div>
                    )}
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-400">{currentWpm}</div>
                      <div className="text-xs text-white/40">WPM</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-rose-400">{errors}</div>
                      <div className="text-xs text-white/40">errors</div>
                    </div>
                  </div>
                </div>

                {/* Code Display with CRT Effect */}
                <div className={`${theme.card} backdrop-blur-xl rounded-xl p-6 border border-white/10 cursor-text crt-overlay screen-flicker ${errorShake ? 'error-shake error-flash' : ''}`}>
                  {renderCode()}
                </div>

                {/* Keyboard Hints */}
                <div className="flex items-center justify-center gap-4 text-xs text-white/40">
                  <span className="flex items-center gap-1.5">
                    <kbd className="key-hint">Tab</kbd>
                    <span>indent</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <kbd className="key-hint">Enter</kbd>
                    <span>newline</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <kbd className="key-hint">Ctrl+U</kbd>
                    <span>clear</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <kbd className="key-hint">Esc</kbd>
                    <span>cancel</span>
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="relative h-3 bg-white/10 rounded-full overflow-hidden">
                    {ghostEnabled && currentGhost && ghostProgress > 0 && (
                      <motion.div
                        className="absolute h-full bg-purple-500/60 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${ghostProgressPercent}%` }}
                        transition={{ duration: 0.1 }}
                      />
                    )}
                    <motion.div
                      className={`absolute h-full bg-gradient-to-r ${theme.accent} rounded-full`}
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.1 }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-white/40">
                    <span>
                      You: {Math.round(progress)}%
                      {ghostEnabled && currentGhost && ghostProgress > 0 && (
                        <span className="text-purple-400 ml-3">Ghost: {Math.round(ghostProgressPercent)}%</span>
                      )}
                    </span>
                    <span>{typedText.length} / {currentSnippet.code.length}</span>
                  </div>
                </div>

                <input ref={inputRef} type="text" onKeyDown={handleKeyDown} onPaste={(e) => e.preventDefault()} className="absolute opacity-0 pointer-events-none" autoFocus autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false" />

                <div className="flex justify-between items-center">
                  <p className="text-sm text-white/30">Esc to cancel</p>
                  <button onClick={() => setScreen('menu')} className="text-sm text-white/40 hover:text-white/60 glow-hover">Cancel</button>
                </div>
              </motion.div>
            )}

            {screen === 'finished' && (
              <motion.div
                key="finished"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                <header className="flex items-center justify-between mb-4">
                  <Logo onClick={() => setScreen('home')} size="small" />
                </header>

                <motion.div
                  className="text-center py-6"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {isPersonalRecord && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 rounded-full border border-amber-500/40 pr-badge"
                    >
                      <span className="text-lg">🏆</span>
                      <span className="font-bold text-amber-400">Personal Record!</span>
                    </motion.div>
                  )}
                  <h2 className="text-3xl font-bold mb-2">
                    <GlitchText>Race Complete</GlitchText>
                  </h2>
                  <p className="text-white/50">{currentSnippet?.title}</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className={`${theme.card} backdrop-blur-xl rounded-2xl p-8 border border-white/10 neon-border`}
                >
                  <div className="grid grid-cols-4 gap-6">
                    <StatCard label="Speed" value={`${stats.wpm}`} subtext="words/min" />
                    <StatCard label="Accuracy" value={`${stats.accuracy}%`} />
                    <StatCard label="Time" value={`${stats.elapsed}s`} />
                    <StatCard label="Errors" value={stats.errors} />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className={`${theme.card} backdrop-blur-xl rounded-xl p-4 border border-white/10 text-center`}
                >
                  {stats.wpm >= 80 && stats.accuracy >= 95 ? (
                    <p className="text-emerald-400 font-medium">Outstanding performance!</p>
                  ) : stats.wpm >= 60 && stats.accuracy >= 90 ? (
                    <p className="text-blue-400 font-medium">Great job!</p>
                  ) : stats.wpm >= 40 ? (
                    <p className="text-amber-400 font-medium">Good effort, keep practicing!</p>
                  ) : (
                    <p className="text-white/50">Practice makes perfect</p>
                  )}
                  {bestScore === stats.wpm && (
                    <motion.p
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', delay: 0.5 }}
                      className="text-yellow-400 mt-2 font-medium"
                    >
                      New Personal Best!
                    </motion.p>
                  )}
                  {ghostTimeDiff && ghostEnabled && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      className={`mt-2 font-medium ${ghostTimeDiff.diff < 0 ? 'text-emerald-400' : 'text-purple-400'}`}
                    >
                      {ghostTimeDiff.diff < 0
                        ? `${Math.abs(ghostTimeDiff.diff).toFixed(1)}s faster than your ghost!`
                        : ghostTimeDiff.diff > 0
                          ? `${ghostTimeDiff.diff.toFixed(1)}s behind your ghost`
                          : 'Tied with your ghost!'}
                    </motion.p>
                  )}
                </motion.div>

                <StaggerContainer className="space-y-3" staggerDelay={0.1}>
                  {hasGhostForCurrentSnippet && ghostEnabled && (
                    <StaggerItem>
                      <RippleButton onClick={raceGhost} className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 font-semibold glow-hover flex items-center justify-center gap-2">
                        Race Your Ghost
                        <span className="text-xs text-white/70 ml-1">Same snippet, beat your time</span>
                      </RippleButton>
                    </StaggerItem>
                  )}

                  <StaggerItem>
                    <div className="flex gap-3">
                      <RippleButton onClick={startGame} className={`flex-1 py-3 rounded-xl bg-gradient-to-r ${theme.accent} font-semibold glow-hover`}>
                        New Snippet
                      </RippleButton>
                      <RippleButton onClick={() => setScreen('menu')} className="flex-1 py-3 rounded-xl border border-white/20 font-semibold hover:bg-white/5 glow-hover">
                        Settings
                      </RippleButton>
                    </div>
                  </StaggerItem>

                  <StaggerItem>
                    <p className="text-center text-xs text-white/30">
                      <kbd className="px-1.5 py-0.5 bg-white/10 rounded">Enter</kbd> new race
                      <span className="mx-2">•</span>
                      <kbd className="px-1.5 py-0.5 bg-white/10 rounded">R</kbd> restart
                      <span className="mx-2">•</span>
                      <kbd className="px-1.5 py-0.5 bg-white/10 rounded">G</kbd> ghost
                    </p>
                  </StaggerItem>
                </StaggerContainer>

                {streak > 1 && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center text-orange-400 text-sm"
                  >
                    {streak} races completed this session
                  </motion.p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>


      </div>
      {/* Footer */}
      <Footer setShowContact={setShowContact} setShowAbout={setShowAbout} />

      {screen === 'playing' && <div className="fixed inset-0 z-0 cursor-text" onClick={() => inputRef.current?.focus()} />}
    </div>
  );
}
