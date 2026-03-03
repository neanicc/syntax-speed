import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { IconHome, IconKeyboard, IconChartBar, IconTrophy, IconLeaf, IconSettings, IconLayoutNavbarCollapse } from '@tabler/icons-react';

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
  dark: { name: 'Dark' },
  nord: { name: 'Nord' },
  catppuccin: { name: 'Catppuccin' },
  gruvbox: { name: 'Gruvbox' },
  rosepine: { name: 'Rosé Pine' },
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

// ===== UI COMPONENTS =====

// Plain Button (replaces RippleButton)
const RippleButton = ({ children, onClick, className = '', ...props }) => (
  <button
    onClick={onClick}
    className={`transition-all duration-150 active:scale-[0.98] ${className}`}
    {...props}
  >
    {children}
  </button>
);

// Page Transition Wrapper
const PageTransition = ({ children, keyProp }) => (
  <AnimatePresence mode="wait">
    <motion.div
      key={keyProp}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  </AnimatePresence>
);

// Staggered Container
const StaggerContainer = ({ children, className = '', staggerDelay = 0.05 }) => (
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
      hidden: { opacity: 0, y: 10 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.25, ease: 'easeOut' } },
    }}
  >
    {children}
  </motion.div>
);

// Countdown Display with animation
const CountdownDisplay = ({ number }) => (
  <motion.div
    key={number}
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    exit={{ scale: 1.1, opacity: 0 }}
    transition={{ duration: 0.2, ease: 'easeOut' }}
    className={`text-7xl font-semibold ${number === 0 ? 'text-violet-400' : 'text-white'}`}
  >
    {number === 0 ? 'GO!' : number}
  </motion.div>
);


// Floating Dock (Aceternity UI — vertical left sidebar adaptation)
const FloatingDockIconContainer = ({ mouseY, title, icon, onClick, active }) => {
  const ref = useRef(null);
  const distance = useTransform(mouseY, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { y: 0, height: 0 };
    return val - bounds.y - bounds.height / 2;
  });
  const sizeTransform = useTransform(distance, [-150, 0, 150], [40, 68, 40]);
  const iconSizeTransform = useTransform(distance, [-150, 0, 150], [18, 32, 18]);
  const size = useSpring(sizeTransform, { mass: 0.1, stiffness: 150, damping: 12 });
  const iconSize = useSpring(iconSizeTransform, { mass: 0.1, stiffness: 150, damping: 12 });
  const [hovered, setHovered] = useState(false);
  return (
    <button onClick={onClick} className="relative flex items-center justify-center">
      <motion.div
        ref={ref}
        style={{ width: size, height: size }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`relative flex items-center justify-center rounded-full transition-colors ${active
          ? 'bg-violet-500/15 text-violet-400'
          : 'bg-[#27272a] text-zinc-400 hover:bg-[#3f3f46] hover:text-zinc-200'
        }`}
      >
        {active && (
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-[7px] w-1.5 h-1.5 rounded-full bg-violet-500" />
        )}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -4 }}
              className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-2 py-1 rounded-md bg-[#27272a] border border-[#3f3f46] text-xs text-white whitespace-nowrap z-50 pointer-events-none"
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div style={{ width: iconSize, height: iconSize }} className="flex items-center justify-center">
          {icon}
        </motion.div>
      </motion.div>
    </button>
  );
};

const FloatingDockDesktop = ({ items, className }) => {
  const mouseY = useMotionValue(Infinity);
  return (
    <motion.div
      onMouseMove={(e) => mouseY.set(e.pageY)}
      onMouseLeave={() => mouseY.set(Infinity)}
      className={`hidden md:flex flex-col items-center gap-3 rounded-2xl bg-[#18181b] border border-[#3f3f46] py-4 px-3 ${className ?? ''}`}
    >
      {items.map((item) => (
        <FloatingDockIconContainer mouseY={mouseY} key={item.title} {...item} />
      ))}
    </motion.div>
  );
};

const FloatingDockMobile = ({ items, className }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={`relative block md:hidden ${className ?? ''}`}>
      <AnimatePresence>
        {open && (
          <motion.div
            layoutId="nav-mobile"
            className="absolute inset-x-0 bottom-full mb-2 flex flex-col gap-2 items-center"
          >
            {items.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10, transition: { delay: idx * 0.05 } }}
                transition={{ delay: (items.length - 1 - idx) * 0.05 }}
              >
                <button
                  onClick={() => { item.onClick(); setOpen(false); }}
                  className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${item.active
                    ? 'bg-violet-500/20 text-violet-400'
                    : 'bg-[#27272a] text-zinc-400 hover:bg-[#3f3f46]'
                  }`}
                >
                  <div className="h-4 w-4">{item.icon}</div>
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen(!open)}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-[#27272a] border border-[#3f3f46] text-zinc-400"
      >
        <IconLayoutNavbarCollapse className="h-5 w-5" />
      </button>
    </div>
  );
};

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
      bg-[#18181b] rounded-2xl border border-[#3f3f46] p-5
      hover:bg-[#27272a] hover:border-zinc-600 transition-all duration-200
      ${className}
    `}
  >
    {children}
  </motion.div>
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

const SettingsModal = ({ isOpen, onClose, selectedTheme, setSelectedTheme, fontSize, setFontSize, soundEnabled, setSoundEnabled, showTimer, setShowTimer, ghostEnabled, setGhostEnabled }) => {
  if (!isOpen) return null;
  const toggle = (val, set) => () => set(!val);
  const ToggleBtn = ({ on, onToggle, label }) => (
    <div>
      <label className="text-xs text-zinc-500 block mb-2">{label}</label>
      <button onClick={onToggle} className={`w-full px-3 py-2 rounded-lg text-sm font-medium transition-all ${on ? 'bg-violet-500/10 text-violet-400 border border-violet-500/30' : 'bg-[#27272a] text-zinc-500 border border-[#3f3f46] hover:border-zinc-500'}`}>
        {on ? 'On' : 'Off'}
      </button>
    </div>
  );
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="relative bg-[#18181b] border border-[#3f3f46] rounded-2xl p-6 max-w-sm w-full shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-white">Settings</h2>
          <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="space-y-5">
          <div>
            <label className="text-xs text-zinc-500 block mb-2">Theme</label>
            <select value={selectedTheme} onChange={(e) => setSelectedTheme(e.target.value)} className="w-full bg-[#27272a] border border-[#3f3f46] rounded-lg px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-zinc-500">
              {Object.entries(THEMES).map(([key, t]) => (<option key={key} value={key}>{t.name}</option>))}
            </select>
          </div>
          <div>
            <label className="text-xs text-zinc-500 block mb-2">Font Size</label>
            <div className="flex gap-2">
              {[['sm', 'Small'], ['base', 'Medium'], ['lg', 'Large']].map(([val, label]) => (
                <button key={val} onClick={() => setFontSize(val)} className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${fontSize === val ? 'bg-[#27272a] text-white border border-zinc-500' : 'bg-[#09090b] text-zinc-500 border border-[#3f3f46] hover:border-zinc-600'}`}>
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <ToggleBtn on={soundEnabled} onToggle={toggle(soundEnabled, setSoundEnabled)} label="Sound" />
            <ToggleBtn on={showTimer} onToggle={toggle(showTimer, setShowTimer)} label="Timer" />
            <ToggleBtn on={ghostEnabled} onToggle={toggle(ghostEnabled, setGhostEnabled)} label="Ghost" />
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
  const [selectedTheme, setSelectedTheme] = useState('dark');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showTimer, setShowTimer] = useState(true);
  const [fontSize, setFontSize] = useState('base');
  const [showSettings, setShowSettings] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [ghostEnabled, setGhostEnabled] = useState(true);
  const [isZenMode, setIsZenMode] = useState(false);
  const [zenSnippetsCompleted, setZenSnippetsCompleted] = useState(0);
  const [zenSessionStartTime, setZenSessionStartTime] = useState(null);

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

  const inputRef = useRef(null);
  const sounds = useSound();
  const { getNextSnippet } = useSnippetHistory();

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

      if (e.key === 'z' || e.key === 'Z') {
        if (screen === 'menu') {
          startZenMode();
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
        setSelectedTheme(s.theme || 'dark');
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

  const startZenMode = () => {
    setIsZenMode(true);
    setZenSnippetsCompleted(0);
    setZenSessionStartTime(Date.now());
    startZenSnippet();
  };

  const startZenSnippet = () => {
    const snippet = getNextSnippet(selectedCategory, selectedLanguage, selectedDifficulty);
    if (!snippet) {
      alert('No snippets available for this combination.');
      return;
    }
    setCurrentSnippet(snippet);
    setTypedText('');
    setErrors(0);
    setTotalKeystrokes(0);
    setStartTime(Date.now());
    setEndTime(null);
    setCurrentWpm(0);
    setElapsedDisplay('0.0');
    raceRecordRef.current = [];
    setGhostProgress(0);
    setCurrentGhost(null);
    setIsPersonalRecord(false);
    setScreen('playing');
    setTimeout(() => inputRef.current?.focus(), 50);
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
      if (isZenMode) {
        setIsZenMode(false);
        setScreen('zen_summary');
      } else {
        setScreen('menu');
      }
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

    const elapsed = (end - startTime) / 1000 / 60;
    const words = currentSnippet.code.length / 5;
    const finalWpm = Math.round(words / elapsed);
    const accuracy = totalKeystrokes > 0 ? Math.round(((totalKeystrokes - errors) / totalKeystrokes) * 100) : 100;

    if (isZenMode) {
      saveBestScore(finalWpm);
      const newTotalRaces = totalRaces + 1;
      setTotalRaces(newTotalRaces);
      localStorage.setItem('coderacer-races', newTotalRaces.toString());
      saveRaceHistory(finalWpm, accuracy, selectedLanguage, selectedCategory, selectedDifficulty);
      setStreak(prev => prev + 1);

      setTimeout(() => {
        checkAchievements(getAchievementStats({
          wpm: finalWpm, accuracy,
          language: selectedLanguage,
          category: selectedCategory,
          difficulty: selectedDifficulty,
        }));
      }, 500);

      setZenSnippetsCompleted(prev => prev + 1);
      setScreen('zen_interstitial');
      if (soundEnabled) sounds.playSuccess();

      setTimeout(() => {
        startZenSnippet();
      }, 1500);

      return;
    }

    setScreen('finished');

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

    const raceData = {
      wpm: finalWpm,
      accuracy,
      language: selectedLanguage,
      category: selectedCategory,
      difficulty: selectedDifficulty,
    };
    saveRaceHistory(finalWpm, accuracy, selectedLanguage, selectedCategory, selectedDifficulty);

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
              colorClass = 'text-violet-300';
            } else if (isPlayerPosition) {
              colorClass = 'text-white bg-white/10 rounded-sm caret-pulse';
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

  return (
    <div className="min-h-screen bg-[#09090b] text-white overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0" style={{ background: 'radial-gradient(ellipse at 30% -5%, rgba(139, 92, 246, 0.07) 0%, #09090b 55%)' }} />

      <ContactModal isOpen={showContact} onClose={() => setShowContact(false)} />
      <AboutModal isOpen={showAbout} onClose={() => setShowAbout(false)} />
      <SettingsModal
        isOpen={showSettings} onClose={() => setShowSettings(false)}
        selectedTheme={selectedTheme} setSelectedTheme={setSelectedTheme}
        fontSize={fontSize} setFontSize={setFontSize}
        soundEnabled={soundEnabled} setSoundEnabled={setSoundEnabled}
        showTimer={showTimer} setShowTimer={setShowTimer}
        ghostEnabled={ghostEnabled} setGhostEnabled={setGhostEnabled}
      />
      <AchievementPopup achievement={newAchievement} onClose={() => setNewAchievement(null)} />

      {/* Floating Dock — hidden during active race/countdown */}
      {!['playing', 'countdown', 'zen_interstitial', 'zen_summary'].includes(screen) && (
        <>
          <FloatingDockDesktop items={[
            { title: 'Home', icon: <IconHome size={18} />, onClick: () => setScreen('home'), active: screen === 'home' },
            { title: 'Race', icon: <IconKeyboard size={18} />, onClick: () => setScreen('menu'), active: screen === 'menu' },
            { title: 'Stats', icon: <IconChartBar size={18} />, onClick: () => setScreen('stats'), active: screen === 'stats' },
            { title: 'Achievements', icon: <IconTrophy size={18} />, onClick: () => setScreen('achievements'), active: screen === 'achievements' },
            { title: 'Zen Mode', icon: <IconLeaf size={18} />, onClick: startZenMode },
            { title: 'Settings', icon: <IconSettings size={18} />, onClick: () => setShowSettings(true) },
          ]} className="fixed left-4 top-1/2 -translate-y-1/2 z-50" />
          <FloatingDockMobile items={[
            { title: 'Home', icon: <IconHome size={18} />, onClick: () => setScreen('home'), active: screen === 'home' },
            { title: 'Race', icon: <IconKeyboard size={18} />, onClick: () => setScreen('menu'), active: screen === 'menu' },
            { title: 'Stats', icon: <IconChartBar size={18} />, onClick: () => setScreen('stats'), active: screen === 'stats' },
            { title: 'Achievements', icon: <IconTrophy size={18} />, onClick: () => setScreen('achievements'), active: screen === 'achievements' },
            { title: 'Zen', icon: <IconLeaf size={18} />, onClick: startZenMode },
            { title: 'Settings', icon: <IconSettings size={18} />, onClick: () => setShowSettings(true) },
          ]} className="fixed bottom-6 right-4 z-50" />
        </>
      )}

      {/* Main Content Area */}
      <div className="relative z-10 min-h-screen flex flex-col">
        <div className="flex-1 container mx-auto px-6 py-8 max-w-5xl md:pl-24">

          <AnimatePresence mode="wait">
            {screen === 'home' && (
              <motion.div
                key="home"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.2 }}
                className="min-h-[80vh] flex items-center py-12"
              >
                <div className="w-full flex flex-col md:flex-row items-start gap-12 md:gap-16">
                  {/* Left column — hero + actions */}
                  <div className="flex-1 max-w-sm">
                    <StaggerContainer staggerDelay={0.05}>
                      <StaggerItem>
                        <motion.div
                          className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-6"
                          whileHover={{ scale: 1.08, rotate: 4 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                          </svg>
                        </motion.div>
                      </StaggerItem>
                      <StaggerItem>
                        <h1 className="text-5xl font-bold tracking-tight text-white mb-3">Code Racer</h1>
                        <p className="text-zinc-400 text-base leading-relaxed mb-2">Improve your coding speed with real snippets. Race your personal best.</p>
                        <div className="inline-flex items-center gap-2 mb-8 px-3 py-1.5 bg-purple-500/10 rounded-full border border-purple-500/20">
                          <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider">New</span>
                          <span className="text-xs text-zinc-400">DSA Mode — algorithms &amp; data structures</span>
                        </div>
                      </StaggerItem>
                      <StaggerItem>
                        <RippleButton onClick={() => setScreen('menu')} className="w-full py-3.5 rounded-xl bg-violet-500 hover:bg-violet-600 text-zinc-950 font-semibold text-base mb-3">
                          Start Racing
                        </RippleButton>
                        <div className="grid grid-cols-2 gap-2 mb-2">
                          <RippleButton onClick={() => setScreen('stats')} className="py-2.5 rounded-xl border border-[#3f3f46] text-sm font-medium hover:bg-[#27272a] text-zinc-300">
                            Stats
                          </RippleButton>
                          <RippleButton onClick={() => setScreen('achievements')} className="py-2.5 rounded-xl border border-[#3f3f46] text-sm font-medium hover:bg-[#27272a] text-zinc-300">
                            Achievements
                          </RippleButton>
                        </div>
                        <RippleButton onClick={startZenMode} className="w-full py-2.5 rounded-xl border border-[#3f3f46] text-sm font-medium hover:bg-[#27272a] text-zinc-400 flex items-center justify-center gap-2">
                          <span>☯</span> Zen Mode — no pressure, just flow
                        </RippleButton>
                      </StaggerItem>
                    </StaggerContainer>
                  </div>

                  {/* Right column — stats + feature info */}
                  <div className="w-full md:w-72 flex flex-col gap-4">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25 }}
                      className="bg-[#18181b] rounded-2xl border border-[#3f3f46] overflow-hidden"
                    >
                      <div className="px-5 py-4 border-b border-[#3f3f46]">
                        <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Your progress</p>
                      </div>
                      {totalRaces > 0 ? (
                        <div className="grid grid-cols-3 divide-x divide-[#3f3f46]">
                          <div className="px-4 py-5 text-center">
                            <div className="text-2xl font-bold text-white tabular-nums">{totalRaces}</div>
                            <div className="text-[11px] text-zinc-500 mt-1">Races</div>
                          </div>
                          <div className="px-4 py-5 text-center">
                            <div className="text-2xl font-bold text-blue-400 tabular-nums">{topWpm}</div>
                            <div className="text-[11px] text-zinc-500 mt-1">Top WPM</div>
                          </div>
                          <div className="px-4 py-5 text-center">
                            <div className="text-2xl font-bold text-violet-400 tabular-nums">{avgWpm}</div>
                            <div className="text-[11px] text-zinc-500 mt-1">Avg WPM</div>
                          </div>
                        </div>
                      ) : (
                        <div className="px-5 py-6 text-center">
                          <p className="text-zinc-500 text-sm mb-3">No races yet</p>
                          <button onClick={() => setScreen('menu')} className="text-xs text-violet-400 hover:text-violet-300 transition-colors">Start your first race →</button>
                        </div>
                      )}
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35 }}
                      className="bg-[#18181b] rounded-2xl border border-[#3f3f46] overflow-hidden"
                    >
                      {raceHistory.length > 0 ? (
                        <>
                          <div className="px-5 py-4 border-b border-[#3f3f46]">
                            <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Recent races</p>
                          </div>
                          <div className="divide-y divide-[#27272a]">
                            {[...raceHistory].reverse().slice(0, 3).map((race, i) => {
                              const langColors = { javascript: 'text-yellow-400', python: 'text-blue-400', typescript: 'text-sky-400', cpp: 'text-indigo-400', java: 'text-red-400' };
                              const ago = (() => {
                                const diff = Date.now() - race.date;
                                if (diff < 60000) return 'just now';
                                if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
                                if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
                                return `${Math.floor(diff / 86400000)}d ago`;
                              })();
                              return (
                                <div key={i} className="flex items-center justify-between px-5 py-3">
                                  <div className="flex items-center gap-2">
                                    <span className={`text-xs font-bold w-6 text-center ${langColors[race.language] ?? 'text-zinc-400'}`}>{LANGUAGE_CONFIG[race.language]?.icon}</span>
                                    <span className="text-sm font-semibold text-white tabular-nums">{race.wpm} WPM</span>
                                  </div>
                                  <div className="flex items-center gap-3 text-xs text-zinc-500">
                                    <span>{race.accuracy}%</span>
                                    <span>{ago}</span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </>
                      ) : (
                        <div className="p-5">
                          <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-4">What's inside</p>
                          <div className="space-y-3">
                            {[
                              { label: '5 Languages', detail: 'JS, Python, Go, Rust, C++' },
                              { label: '80+ Snippets', detail: 'Real-world code patterns' },
                              { label: '3 Difficulties', detail: 'Beginner to advanced' },
                            ].map(({ label, detail }) => (
                              <div key={label} className="flex items-center justify-between">
                                <span className="text-sm font-medium text-white">{label}</span>
                                <span className="text-xs text-zinc-500">{detail}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}

            {screen === 'stats' && (
              <motion.div
                key="stats"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.2 }}
              >
                <h2 className="text-3xl font-bold text-white mb-1">Stats</h2>
                <p className="text-zinc-500 text-sm mb-8">Your performance over time</p>

                {raceHistory.length === 0 ? (
                  <div className="bg-[#18181b] rounded-xl p-10 border border-[#3f3f46] text-center">
                    <p className="text-zinc-500 mb-4">No races yet — complete a race to see your stats</p>
                    <button onClick={() => setScreen('menu')} className="px-6 py-2.5 rounded-lg bg-violet-500 hover:bg-violet-600 text-zinc-950 font-semibold text-sm transition-colors">
                      Start Racing
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* KPI row */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {[
                        { label: 'Races', value: totalRaces, color: 'text-white' },
                        { label: 'Best WPM', value: maxWpmEver, color: 'text-blue-400' },
                        { label: 'Avg WPM', value: avgWpmRecent, color: 'text-violet-400' },
                        { label: 'Accuracy', value: `${avgAccuracyRecent}%`, color: 'text-amber-400' },
                      ].map(({ label, value, color }) => (
                        <div key={label} className="bg-[#18181b] rounded-xl border border-[#3f3f46] p-4">
                          <div className={`text-3xl font-bold tabular-nums ${color}`}>{value}</div>
                          <div className="text-xs text-zinc-500 mt-1">{label}</div>
                        </div>
                      ))}
                    </div>

                    {/* WPM chart — green bars */}
                    <div className="bg-[#18181b] rounded-xl border border-[#3f3f46] p-5">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-medium text-zinc-300">WPM over time</h3>
                        <span className="text-xs text-zinc-500">last {last10Races.length} races</span>
                      </div>
                      <div className="flex items-end gap-1.5 h-44">
                        {last10Races.map((race, i) => {
                          const maxH = Math.max(...last10Races.map(r => r.wpm), 60);
                          const height = (race.wpm / maxH) * 100;
                          const isLatest = i === last10Races.length - 1;
                          return (
                            <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
                              <div className="text-[10px] text-zinc-600 group-hover:text-zinc-400 transition-colors">{race.wpm}</div>
                              <div
                                className={`w-full rounded-t transition-all duration-300 ${isLatest ? 'bg-violet-500' : 'bg-violet-500/40 group-hover:bg-violet-500/70'}`}
                                style={{ height: `${height}%`, minHeight: '4px' }}
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Language breakdown */}
                    <div className="bg-[#18181b] rounded-xl border border-[#3f3f46] p-5">
                      <h3 className="text-sm font-medium text-zinc-300 mb-4">Races by language</h3>
                      <div className="grid grid-cols-5 gap-2">
                        {Object.entries(LANGUAGE_CONFIG).map(([lang, config]) => {
                          const count = raceHistory.filter(r => r.language === lang).length;
                          const langColors = { javascript: 'text-yellow-400', python: 'text-blue-400', typescript: 'text-sky-400', cpp: 'text-indigo-400', java: 'text-red-400' };
                          return (
                            <div key={lang} className="text-center p-3 bg-[#09090b] rounded-lg border border-[#3f3f46]">
                              <div className={`font-bold text-sm mb-1 ${langColors[lang] ?? 'text-zinc-300'}`}>{config.icon}</div>
                              <div className="text-lg font-bold text-white tabular-nums">{count}</div>
                              <div className="text-[10px] text-zinc-600 mt-0.5">{config.label.replace('JavaScript', 'JS').replace('TypeScript', 'TS')}</div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Recent races history */}
                    <div className="bg-[#18181b] rounded-xl border border-[#3f3f46] overflow-hidden">
                      <div className="px-5 py-4 border-b border-[#3f3f46]">
                        <h3 className="text-sm font-medium text-zinc-300">Recent races</h3>
                      </div>
                      <div className="divide-y divide-[#27272a]">
                        {[...raceHistory].reverse().slice(0, 10).map((race, i) => {
                          const langColors = { javascript: 'text-yellow-400', python: 'text-blue-400', typescript: 'text-sky-400', cpp: 'text-indigo-400', java: 'text-red-400' };
                          const langIcons = { javascript: 'JS', python: 'PY', typescript: 'TS', cpp: 'C++', java: 'JV' };
                          const ago = (() => {
                            const s = Math.floor((Date.now() - race.date) / 1000);
                            if (s < 60) return 'just now';
                            const m = Math.floor(s / 60);
                            if (m < 60) return `${m}m ago`;
                            const h = Math.floor(m / 60);
                            if (h < 24) return `${h}h ago`;
                            return `${Math.floor(h / 24)}d ago`;
                          })();
                          return (
                            <div key={i} className="flex items-center gap-4 px-5 py-3">
                              <span className={`text-xs font-bold w-6 shrink-0 ${langColors[race.language] ?? 'text-zinc-400'}`}>{langIcons[race.language] ?? race.language}</span>
                              <span className="text-sm font-semibold text-white tabular-nums w-12">{race.wpm} <span className="text-[10px] text-zinc-500 font-normal">wpm</span></span>
                              <span className="text-sm text-zinc-400 tabular-nums w-14">{race.accuracy}<span className="text-[10px] text-zinc-500">%</span></span>
                              <span className="text-xs text-zinc-600 capitalize">{race.difficulty}</span>
                              <span className="ml-auto text-xs text-zinc-600">{ago}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
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
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-end justify-between mb-2">
                  <h2 className="text-3xl font-bold text-white">Achievements</h2>
                  <span className="text-sm text-zinc-500 tabular-nums">{unlockedAchievements.length} / {ACHIEVEMENTS.length}</span>
                </div>
                {/* Progress bar */}
                <div className="h-1 bg-[#27272a] rounded-full mb-4 overflow-hidden">
                  <motion.div
                    className="h-full bg-violet-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${(unlockedAchievements.length / ACHIEVEMENTS.length) * 100}%` }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                  />
                </div>
                {/* Rarity summary */}
                <div className="flex items-center gap-4 mb-8 text-sm">
                  {['common', 'rare', 'epic', 'legendary'].map(rarity => {
                    const count = ACHIEVEMENTS.filter(a => a.rarity === rarity && unlockedAchievements.includes(a.id)).length;
                    const total = ACHIEVEMENTS.filter(a => a.rarity === rarity).length;
                    const color = { common: 'text-zinc-400', rare: 'text-blue-400', epic: 'text-purple-400', legendary: 'text-amber-400' }[rarity];
                    return (
                      <span key={rarity} className={`${color} tabular-nums`}>
                        {count}<span className="text-zinc-600">/{total}</span> <span className="text-zinc-600 capitalize text-xs">{rarity}</span>
                      </span>
                    );
                  })}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {ACHIEVEMENTS.map(achievement => {
                    const unlocked = unlockedAchievements.includes(achievement.id);
                    const rarityBorder = {
                      common: 'border-l-zinc-500',
                      rare: 'border-l-blue-500',
                      epic: 'border-l-purple-500',
                      legendary: 'border-l-amber-500',
                    }[achievement.rarity] ?? 'border-l-zinc-500';
                    const rarityLabel = {
                      common: 'text-zinc-500',
                      rare: 'text-blue-400',
                      epic: 'text-purple-400',
                      legendary: 'text-amber-400',
                    }[achievement.rarity] ?? 'text-zinc-500';
                    return (
                      <div
                        key={achievement.id}
                        className={`p-4 rounded-xl bg-[#18181b] border border-[#3f3f46] border-l-4 ${rarityBorder} transition-all ${unlocked ? '' : 'opacity-40 grayscale'}`}
                      >
                        <div className="flex items-start gap-3">
                          <span className="text-xl leading-none mt-0.5">{achievement.icon}</span>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="text-sm font-semibold text-white truncate">{achievement.title}</span>
                              <span className={`text-[9px] font-bold uppercase tracking-wider shrink-0 ${rarityLabel}`}>{achievement.rarity}</span>
                            </div>
                            <p className="text-xs text-zinc-500 leading-snug">{achievement.desc}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {screen === 'menu' && (
              <motion.div
                key="menu"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.2 }}
              >
                <h2 className="text-3xl font-bold text-white mb-1">New Race</h2>
                <p className="text-zinc-500 text-sm mb-8">Configure your next session</p>

                <div className="space-y-8">
                  {/* Category — pill tabs */}
                  <div>
                    <p className="text-sm font-medium text-zinc-400 mb-3">Category</p>
                    <div className="inline-flex bg-[#18181b] border border-[#3f3f46] rounded-xl p-1 gap-1">
                      {Object.entries(CATEGORY_CONFIG).map(([key, config]) => (
                        <button
                          key={key}
                          onClick={() => setSelectedCategory(key)}
                          className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${selectedCategory === key
                            ? 'bg-[#27272a] text-white shadow-sm'
                            : 'text-zinc-500 hover:text-zinc-300'
                          }`}
                        >
                          {config.label}
                          {key === 'dsa' && <span className="ml-2 text-[9px] px-1.5 py-0.5 bg-purple-500/25 text-purple-400 rounded font-bold uppercase">New</span>}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Language — grid with colored top-border accent */}
                  <div>
                    <p className="text-sm font-medium text-zinc-400 mb-3">Language</p>
                    <div className="grid grid-cols-5 gap-2">
                      {Object.entries(LANGUAGE_CONFIG).map(([key, config]) => {
                        const langColors = { javascript: 'text-yellow-400', python: 'text-blue-400', typescript: 'text-sky-400', cpp: 'text-indigo-400', java: 'text-red-400' };
                        const langBorders = { javascript: 'border-t-yellow-500/60', python: 'border-t-blue-500/60', typescript: 'border-t-sky-500/60', cpp: 'border-t-indigo-500/60', java: 'border-t-red-500/60' };
                        const active = selectedLanguage === key;
                        return (
                          <button
                            key={key}
                            onClick={() => setSelectedLanguage(key)}
                            className={`flex flex-col items-center gap-2.5 pt-4 pb-3 px-2 rounded-xl border border-t-2 transition-all duration-150 ${langBorders[key] ?? 'border-t-zinc-500/40'} ${active
                              ? 'border-x-[#3f3f46] border-b-[#3f3f46] bg-[#27272a]'
                              : 'border-x-[#3f3f46] border-b-[#3f3f46] bg-[#18181b] hover:bg-[#27272a]'
                            }`}
                          >
                            <span className={`font-bold text-base ${langColors[key] ?? 'text-zinc-300'}`}>{config.icon}</span>
                            <span className="text-[11px] text-zinc-400 leading-none">{config.label.replace('JavaScript', 'JS').replace('TypeScript', 'TS')}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Difficulty — segmented control */}
                  <div>
                    <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-3">Difficulty</p>
                    <div className="flex bg-[#18181b] border border-[#3f3f46] rounded-xl p-1 gap-1">
                      {Object.entries(DIFFICULTY_CONFIG).map(([key, config]) => (
                        <button
                          key={key}
                          onClick={() => setSelectedDifficulty(key)}
                          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${selectedDifficulty === key
                            ? `bg-[#27272a] ${config.color}`
                            : 'text-zinc-500 hover:text-zinc-300'
                          }`}
                        >
                          {config.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Best / streak row */}
                  {(bestScore || streak > 0) && (
                    <div className="flex items-center gap-4 text-sm">
                      {bestScore && <span className="text-zinc-500">Best on this config: <span className="text-white font-medium">{bestScore} WPM</span></span>}
                      {streak > 0 && <span className="text-orange-400 font-medium">🔥 {streak} streak</span>}
                    </div>
                  )}

                  <div className="space-y-2">
                    <RippleButton onClick={startGame} className="w-full py-3.5 rounded-xl bg-violet-500 hover:bg-violet-600 text-zinc-950 font-semibold text-base">
                      Start Race
                    </RippleButton>
                    <RippleButton onClick={startZenMode} className="w-full py-2.5 rounded-xl border border-[#3f3f46] text-sm font-medium hover:bg-[#27272a] text-zinc-400 flex items-center justify-center gap-2">
                      <span>☯</span> Zen Mode
                    </RippleButton>
                  </div>

                  <p className="text-center text-xs text-zinc-600">Enter to start · Z for Zen Mode</p>
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
                <div className="relative">
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
                transition={{ duration: 0.2 }}
                className="space-y-4"
                onClick={() => inputRef.current?.focus()}
              >
                <div className={"bg-[#18181b] rounded-xl p-4 border border-[#3f3f46] flex items-center justify-between"}>
                  <div className="flex items-center gap-3">
                    <div className="px-3 py-1 rounded-lg bg-zinc-700 font-bold text-sm text-zinc-200">{LANGUAGE_CONFIG[selectedLanguage].icon}</div>
                    <div>
                      <div className="font-medium">{currentSnippet.title}</div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-zinc-400">{DIFFICULTY_CONFIG[selectedDifficulty].label}</span>
                        <span className="text-xs text-white/30">•</span>
                        <span className="text-xs text-white/40">{CATEGORY_CONFIG[selectedCategory].label}</span>
                        {currentGhost && ghostEnabled && <span className="text-xs text-zinc-400 ml-1">Ghost Active</span>}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    {isZenMode && (
                      <div className="text-xs text-white/30 flex items-center gap-1">
                        <span>☯</span> Zen · {zenSnippetsCompleted} done
                      </div>
                    )}
                    {showTimer && !isZenMode && (
                      <div className="text-right">
                        <div className="text-2xl font-mono font-bold tabular-nums">{elapsedDisplay}s</div>
                        <div className="text-xs text-white/40">time</div>
                      </div>
                    )}
                    {!isZenMode && (
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-400">{currentWpm}</div>
                        <div className="text-xs text-white/40">WPM</div>
                      </div>
                    )}
                    {!isZenMode && (
                      <div className="text-right">
                        <div className="text-2xl font-bold text-rose-400">{errors}</div>
                        <div className="text-xs text-white/40">errors</div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Code Display with CRT Effect */}
                <div className={`bg-[#18181b] rounded-xl p-6 border border-[#3f3f46] cursor-text ${errorShake ? 'error-shake error-flash' : ''}`}>
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
                        className="absolute h-full bg-zinc-500 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${ghostProgressPercent}%` }}
                        transition={{ duration: 0.1 }}
                      />
                    )}
                    <motion.div
                      className="absolute h-full bg-violet-500 rounded-full"
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
                  <button onClick={() => setScreen('menu')} className="text-sm text-white/40 hover:text-white/60">Cancel</button>
                </div>
              </motion.div>
            )}

            {screen === 'finished' && (
              <motion.div
                key="finished"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="max-w-2xl"
              >
                {/* Hero WPM */}
                <motion.div
                  className="py-10 flex flex-col items-start"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  {isPersonalRecord && (
                    <motion.div
                      initial={{ scale: 0, rotate: -4 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', damping: 12, stiffness: 200 }}
                      className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-md border border-amber-500/40 bg-amber-500/10 text-amber-400 text-xs font-semibold"
                    >
                      <span>🏆</span> Personal Record
                    </motion.div>
                  )}
                  <div className="text-[80px] font-bold leading-none tabular-nums text-white">{stats.wpm}</div>
                  <div className="text-sm text-zinc-500 mt-2">words per minute</div>
                  <p className="text-zinc-600 text-xs mt-1">{currentSnippet?.title}</p>
                  <p className="text-zinc-400 text-sm mt-3 font-medium">
                    {stats.wpm > 110 ? 'Exceptional' : stats.wpm > 90 ? 'Impressive' : stats.wpm > 70 ? 'Above average' : stats.wpm > 50 ? 'Solid speed' : stats.wpm > 30 ? 'Building muscle memory' : 'Just getting started'}
                  </p>
                </motion.div>

                {/* Secondary stats row */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="grid grid-cols-3 gap-3 mb-6"
                >
                  <div className="bg-[#18181b] rounded-xl border border-[#3f3f46] p-4">
                    <div className="text-2xl font-bold text-violet-400 tabular-nums">{stats.accuracy}%</div>
                    <div className="text-xs text-zinc-500 mt-1">Accuracy</div>
                  </div>
                  <div className="bg-[#18181b] rounded-xl border border-[#3f3f46] p-4">
                    <div className="text-2xl font-bold text-blue-400 tabular-nums">{stats.elapsed}s</div>
                    <div className="text-xs text-zinc-500 mt-1">Time</div>
                  </div>
                  <div className="bg-[#18181b] rounded-xl border border-[#3f3f46] p-4">
                    <div className="text-2xl font-bold text-rose-400 tabular-nums">{stats.errors}</div>
                    <div className="text-xs text-zinc-500 mt-1">Errors</div>
                  </div>
                </motion.div>

                {/* Feedback + ghost */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mb-6 space-y-1">
                  {stats.wpm >= 80 && stats.accuracy >= 95 ? (
                    <p className="text-emerald-400 text-sm font-medium">Outstanding performance!</p>
                  ) : stats.wpm >= 60 && stats.accuracy >= 90 ? (
                    <p className="text-blue-400 text-sm font-medium">Great job!</p>
                  ) : stats.wpm >= 40 ? (
                    <p className="text-amber-400 text-sm font-medium">Good effort, keep practicing!</p>
                  ) : (
                    <p className="text-zinc-500 text-sm">Practice makes perfect</p>
                  )}
                  {ghostTimeDiff && ghostEnabled && (
                    <p className={`text-sm font-medium ${ghostTimeDiff.diff < 0 ? 'text-emerald-400' : 'text-zinc-400'}`}>
                      {ghostTimeDiff.diff < 0
                        ? `${Math.abs(ghostTimeDiff.diff).toFixed(1)}s faster than your ghost`
                        : ghostTimeDiff.diff > 0
                          ? `${ghostTimeDiff.diff.toFixed(1)}s behind your ghost`
                          : 'Tied with your ghost'}
                    </p>
                  )}
                  {streak > 1 && <p className="text-orange-400 text-sm">🔥 {streak} race streak</p>}
                </motion.div>

                {/* Actions */}
                <StaggerContainer className="space-y-2" staggerDelay={0.05}>
                  {hasGhostForCurrentSnippet && ghostEnabled && (
                    <StaggerItem>
                      <RippleButton onClick={raceGhost} className="w-full py-3 rounded-xl bg-[#27272a] hover:bg-zinc-700 border border-[#3f3f46] text-sm font-semibold text-zinc-200 flex items-center justify-center gap-2">
                        Race Ghost <span className="text-xs text-zinc-500 font-normal">same snippet, beat your time</span>
                      </RippleButton>
                    </StaggerItem>
                  )}
                  <StaggerItem>
                    <div className="flex gap-2">
                      <RippleButton onClick={startGame} className="flex-1 py-3 rounded-xl bg-violet-500 hover:bg-violet-600 text-zinc-950 font-semibold text-sm">
                        New Race
                      </RippleButton>
                      <RippleButton onClick={() => setScreen('menu')} className="flex-1 py-3 rounded-xl border border-[#3f3f46] text-sm font-semibold hover:bg-[#27272a] text-zinc-300">
                        Change Setup
                      </RippleButton>
                    </div>
                  </StaggerItem>
                  <StaggerItem>
                    <p className="text-center text-xs text-zinc-600 pt-1">
                      <kbd className="px-1.5 py-0.5 bg-white/5 rounded border border-[#3f3f46]">Enter</kbd> new race ·
                      <kbd className="px-1.5 py-0.5 bg-white/5 rounded border border-[#3f3f46] ml-1">G</kbd> ghost
                    </p>
                  </StaggerItem>
                </StaggerContainer>
              </motion.div>
            )}

            {screen === 'zen_interstitial' && (
              <motion.div
                key="zen-interstitial"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="min-h-[80vh] flex flex-col items-center justify-center"
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', damping: 20 }}
                  className="text-center"
                >
                  <div className="text-4xl mb-2">✓</div>
                  <div className="text-white/50 text-sm">Nice. Next one coming up...</div>
                </motion.div>
              </motion.div>
            )}

            {screen === 'zen_summary' && (
              <motion.div
                key="zen-summary"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="min-h-[80vh] flex flex-col items-center justify-center"
              >
                <div className={"bg-[#18181b] rounded-2xl p-8 border border-[#3f3f46] max-w-md w-full text-center"}>
                  <div className="text-3xl mb-2">☯</div>
                  <h2 className="text-2xl font-bold mb-1">Zen Session Complete</h2>
                  <p className="text-white/40 text-sm mb-6">
                    {zenSessionStartTime ? Math.round((Date.now() - zenSessionStartTime) / 1000 / 60) : 0} min session
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="p-4 rounded-xl bg-white/5">
                      <div className="text-2xl font-bold text-emerald-400">{zenSnippetsCompleted}</div>
                      <div className="text-xs text-white/50">Snippets</div>
                    </div>
                    <div className="p-4 rounded-xl bg-white/5">
                      <div className="text-2xl font-bold text-blue-400">{streak}</div>
                      <div className="text-xs text-white/50">Streak</div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <RippleButton
                      onClick={() => { setIsZenMode(true); startZenSnippet(); }}
                      className="w-full py-3 rounded-xl bg-violet-500 hover:bg-violet-600 text-zinc-950 font-medium"
                    >
                      Continue Zen
                    </RippleButton>
                    <RippleButton
                      onClick={() => setScreen('home')}
                      className="w-full py-3 rounded-xl border border-white/20 font-medium hover:bg-white/5"
                    >
                      Back to Home
                    </RippleButton>
                  </div>
                </div>
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
