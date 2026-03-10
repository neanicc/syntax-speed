# Debug Mode — Implementation Plan

> A game mode where the player sees **buggy code** and must type the **corrected version**.
> This document is a self-contained guide for any AI or developer to implement the feature.

---

## 1. Overview

In Debug Mode, the player is shown a code snippet that contains **intentional bugs** (syntax errors, logic errors, wrong variable names, etc.). Above or beside the buggy snippet, a **hint** describes what's wrong. The player must type the **correct version** of the code — the same snippet with the bugs fixed. The race is timed and scored just like a normal race.

### Core UX
1. Player selects "Debug Mode" from the menu (new category alongside General & DSA)
2. A **buggy snippet** is displayed at the top of the screen (read-only, with bugs highlighted in red)
3. Below it, the **correct code** appears in the usual typing area — the player types the corrected version
4. Timer, WPM, accuracy, achievements all work normally
5. On completion, show the standard finish screen

### Why this is different from a normal race
- The player sees **two code blocks**: the buggy version (read-only reference) and the correct version (typing target)
- The challenge is both *reading comprehension* (spot the bug) and *typing speed*
- Bug hints are shown so the player knows what to look for

---

## 2. Codebase Context

All game logic lives in:
```
index (3).jsx  (2698 lines)
```

| Concept | Location | Notes |
|---|---|---|
| Snippet data | `CODE_SNIPPETS` object (line 6) | Structured as `{ category: { language: { difficulty: [snippets] } } }` |
| Each snippet | `{ title, code }` | The `code` field is the typing target |
| Category config | `CATEGORY_CONFIG` (line 787) | `general` and `dsa` — we add `debug` |
| Game start | `startGame()` (line 1561) | Picks snippet, calls `startWithSnippet()` |
| Start with snippet | `startWithSnippet()` (line 1570) | Resets state, sets screen to `countdown` |
| Typing handler | `handleKeyDown()` / `handleCharInput()` | Compares typed chars against `currentSnippet.code` |
| Code rendering | `renderCode()` (line ~1806) | Renders the target snippet with syntax highlighting |
| Finish race | `finishRace()` (line 1759) | Calculates WPM/accuracy, saves stats |
| Playing screen JSX | Search for `screen === 'playing'` | The gameplay UI |
| Menu screen category selector | Around line 2240+ | Where General/DSA buttons are |
| Achievements | `ACHIEVEMENTS` array (line 762) | Achievement checks |

---

## 3. New Data: `DEBUG_SNIPPETS`

Add a new constant after the existing `CODE_SNIPPETS` object. Each debug snippet has **three fields**:

```jsx
const DEBUG_SNIPPETS = {
  javascript: {
    beginner: [
      {
        title: "Fix the Arrow Function",
        buggyCode: `const add = (a, b) -> a + b;`,
        code: `const add = (a, b) => a + b;`,
        hints: ["Arrow syntax uses => not ->"],
      },
      {
        title: "Fix the Comparison",
        buggyCode: `if (x = 10) {\n  console.log("ten");\n}`,
        code: `if (x === 10) {\n  console.log("ten");\n}`,
        hints: ["Assignment vs comparison operator"],
      },
      {
        title: "Fix the Array Method",
        buggyCode: `const doubled = nums.maps(n => n * 2);`,
        code: `const doubled = nums.map(n => n * 2);`,
        hints: ["Check the method name spelling"],
      },
      {
        title: "Fix the String",
        buggyCode: `const msg = "Hello, " + name + "!;`,
        code: `const msg = "Hello, " + name + "!";`,
        hints: ["Missing closing quote"],
      },
      {
        title: "Fix the Variable",
        buggyCode: `cosnt greeting = "Hi there";`,
        code: `const greeting = "Hi there";`,
        hints: ["Typo in the keyword"],
      },
    ],
    intermediate: [
      {
        title: "Fix the Async Function",
        buggyCode: `const fetchData = async (url) => {\n  const res = wait fetch(url);\n  return res.json();\n};`,
        code: `const fetchData = async (url) => {\n  const res = await fetch(url);\n  return res.json();\n};`,
        hints: ["Missing keyword before fetch"],
      },
      {
        title: "Fix the Reduce",
        buggyCode: `const total = items.reduce(\n  (sum, item) => sum + item.price\n);`,
        code: `const total = items.reduce(\n  (sum, item) => sum + item.price,\n  0\n);`,
        hints: ["Missing initial value for reduce"],
      },
      {
        title: "Fix the Destructuring",
        buggyCode: `const [name, age] = person;`,
        code: `const { name, age } = person;`,
        hints: ["Wrong bracket type for object destructuring"],
      },
    ],
    advanced: [
      {
        title: "Fix the Closure",
        buggyCode: `const memoize = (fn) => {\n  const cache = new Map();\n  return (...args) => {\n    const key = JSON.stringify(args);\n    if (cache.has(key))\n      return cache.get(key);\n    const result = fn(args);\n    cache.set(key, result);\n    return result;\n  };\n};`,
        code: `const memoize = (fn) => {\n  const cache = new Map();\n  return (...args) => {\n    const key = JSON.stringify(args);\n    if (cache.has(key))\n      return cache.get(key);\n    const result = fn(...args);\n    cache.set(key, result);\n    return result;\n  };\n};`,
        hints: ["How should the arguments be spread when calling fn?"],
      },
    ],
  },
  python: {
    beginner: [
      {
        title: "Fix the Print",
        buggyCode: `print("Hello, World!"`,
        code: `print("Hello, World!")`,
        hints: ["Missing closing parenthesis"],
      },
      {
        title: "Fix the Indentation",
        buggyCode: `def greet(name):\nreturn f"Hello, {name}!"`,
        code: `def greet(name):\n    return f"Hello, {name}!"`,
        hints: ["Python requires indentation inside functions"],
      },
      {
        title: "Fix the Loop",
        buggyCode: `for i in range(10)\n    print(i)`,
        code: `for i in range(10):\n    print(i)`,
        hints: ["Missing colon after the for statement"],
      },
    ],
    intermediate: [
      {
        title: "Fix the List Comprehension",
        buggyCode: `squares = [x ** 2 for x in range(10]`,
        code: `squares = [x ** 2 for x in range(10)]`,
        hints: ["Mismatched brackets"],
      },
      {
        title: "Fix the Class",
        buggyCode: `class Dog:\n    def __init__(self, name):\n        self.name = name\n    \n    def bark(self):\n        return f"{name} says woof!"`,
        code: `class Dog:\n    def __init__(self, name):\n        self.name = name\n    \n    def bark(self):\n        return f"{self.name} says woof!"`,
        hints: ["How do you access instance attributes in Python?"],
      },
    ],
    advanced: [
      {
        title: "Fix the Decorator",
        buggyCode: `def timer(func):\n    def wrapper(*args, **kwargs):\n        start = time.time()\n        result = func(*args, **kwargs)\n        print(f"Took {time.time() - start}s")\n    return wrapper`,
        code: `def timer(func):\n    def wrapper(*args, **kwargs):\n        start = time.time()\n        result = func(*args, **kwargs)\n        print(f"Took {time.time() - start}s")\n        return result\n    return wrapper`,
        hints: ["The wrapper function is missing a return value"],
      },
    ],
  },
  typescript: {
    beginner: [
      {
        title: "Fix the Type",
        buggyCode: `const name: string = 42;`,
        code: `const name: string = "42";`,
        hints: ["Value doesn't match the declared type"],
      },
    ],
    intermediate: [
      {
        title: "Fix the Generic",
        buggyCode: `function first<T>(arr: T[]): T {\n  return arr[0];\n}`,
        code: `function first<T>(arr: T[]): T | undefined {\n  return arr[0];\n}`,
        hints: ["What if the array is empty?"],
      },
    ],
  },
  cpp: {
    beginner: [
      {
        title: "Fix the Semicolon",
        buggyCode: `int x = 5\nstd::cout << x << std::endl;`,
        code: `int x = 5;\nstd::cout << x << std::endl;`,
        hints: ["C++ statements need terminators"],
      },
    ],
    intermediate: [
      {
        title: "Fix the Loop",
        buggyCode: `for (int i = 0; i <= 5; i++) {\n    std::cout << nums[i] << " ";\n}`,
        code: `for (int i = 0; i < 5; i++) {\n    std::cout << nums[i] << " ";\n}`,
        hints: ["Off-by-one error in the loop condition"],
      },
    ],
  },
  java: {
    beginner: [
      {
        title: "Fix the Main Method",
        buggyCode: `public class Main {\n    public void main(String[] args) {\n        System.out.println("Hello!");\n    }\n}`,
        code: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello!");\n    }\n}`,
        hints: ["The main method needs a modifier"],
      },
    ],
    intermediate: [
      {
        title: "Fix the Comparison",
        buggyCode: `String a = "hello";\nString b = "hello";\nif (a == b) {\n    System.out.println("equal");\n}`,
        code: `String a = "hello";\nString b = "hello";\nif (a.equals(b)) {\n    System.out.println("equal");\n}`,
        hints: ["How should you compare Strings in Java?"],
      },
    ],
  },
};
```

> **Add more snippets as you like** — aim for at least 3-5 per language per difficulty to start with. The structure mirrors `CODE_SNIPPETS` but with the extra `buggyCode` and `hints` fields.

---

## 4. Detailed Changes

### 4.1 Add `CATEGORY_CONFIG` entry

Update the existing `CATEGORY_CONFIG` (line 787):

```diff
 const CATEGORY_CONFIG = {
   general: { label: 'General', description: 'Common patterns and syntax' },
   dsa: { label: 'DSA', description: 'Data Structures & Algorithms' },
+  debug: { label: 'Debug', description: 'Find and fix the bugs' },
 };
```

### 4.2 New State Variable

Add inside `CodeTypeRacer()`:

```jsx
const [isDebugMode, setIsDebugMode] = useState(false);
```

### 4.3 Modify `startGame()` — Branch for Debug Mode

Update `startGame()` (line 1561):

```jsx
const startGame = () => {
  if (selectedCategory === 'debug') {
    startDebugGame();
    return;
  }
  const snippet = getNextSnippet(selectedCategory, selectedLanguage, selectedDifficulty);
  if (!snippet) {
    alert('No snippets available for this combination.');
    return;
  }
  startWithSnippet(snippet, false);
};
```

### 4.4 New Function: `startDebugGame()`

Add near `startGame()`:

```jsx
const startDebugGame = () => {
  const langSnippets = DEBUG_SNIPPETS[selectedLanguage];
  if (!langSnippets) {
    alert('No debug snippets for this language.');
    return;
  }
  const diffSnippets = langSnippets[selectedDifficulty];
  if (!diffSnippets || diffSnippets.length === 0) {
    alert('No debug snippets for this difficulty.');
    return;
  }
  // Pick a random debug snippet
  const snippet = diffSnippets[Math.floor(Math.random() * diffSnippets.length)];
  setIsDebugMode(true);
  startWithSnippet(snippet, false);
};
```

**Note:** The `snippet` object from `DEBUG_SNIPPETS` has `{ title, buggyCode, code, hints }`. The existing `startWithSnippet` sets `currentSnippet` which is used by `handleCharInput` to compare against `currentSnippet.code` — this already works because the `code` field contains the *correct* version.

### 4.5 Reset `isDebugMode` When Leaving

In every place that navigates away from playing/finished (Escape, Back buttons, etc.), reset:

```jsx
setIsDebugMode(false);
```

Specifically:
- In `handleKeyDown` when Escape is pressed (screen === 'playing'), add `setIsDebugMode(false)` before `setScreen('menu')`
- In the global keyboard handler where Escape sets screen to `menu` from `finished`/`countdown`

### 4.6 Modify the Playing Screen JSX — Show Buggy Code Reference

In the playing screen, **above** the existing code typing area, add a buggy code reference panel when `isDebugMode` is true:

```jsx
{isDebugMode && currentSnippet?.buggyCode && (
  <div className={`${theme.card} backdrop-blur-xl rounded-xl p-4 border border-red-500/30 mb-4`}>
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center gap-2">
        <span className="text-red-400 text-sm font-semibold">🐛 Buggy Code</span>
        <span className="text-[10px] px-1.5 py-0.5 bg-red-500/20 text-red-400 rounded uppercase tracking-wider">
          Find the bug
        </span>
      </div>
    </div>

    {/* Render the buggy code with syntax highlighting */}
    <pre className={`${fontSize === 'sm' ? 'text-sm' : fontSize === 'lg' ? 'text-lg' : 'text-base'} font-mono leading-relaxed whitespace-pre-wrap text-red-300/80`}>
      {currentSnippet.buggyCode}
    </pre>

    {/* Hints */}
    {currentSnippet.hints && currentSnippet.hints.length > 0 && (
      <div className="mt-3 pt-3 border-t border-white/10">
        <div className="text-xs text-white/40 mb-1">💡 Hint:</div>
        {currentSnippet.hints.map((hint, i) => (
          <div key={i} className="text-xs text-amber-400/70">{hint}</div>
        ))}
      </div>
    )}
  </div>
)}
```

Then the normal code typing area (the `renderCode()` output) appears below with the label:

```jsx
{isDebugMode && (
  <div className="text-sm text-emerald-400 font-medium mb-2 flex items-center gap-2">
    <span>✓</span> Type the corrected version below:
  </div>
)}
```

### 4.7 Modify `finishRace()` — Track Debug Stats

In `finishRace()`, after the shared WPM/accuracy calculations, add debug-specific tracking:

```jsx
// Save as category 'debug' in race history (already works if selectedCategory is 'debug')
// No special changes needed — saveRaceHistory already stores category
```

The existing `saveRaceHistory(finalWpm, accuracy, selectedLanguage, selectedCategory, selectedDifficulty)` already passes `selectedCategory`, which will be `'debug'`, so it will naturally show up in stats.

Reset `isDebugMode` in the finished screen's navigation buttons (back to menu, retry, etc.):
- On "Next Race" → `setIsDebugMode(false)` then `startGame()` (which re-detects debug via category)
- On "Back to Menu" → `setIsDebugMode(false)`

### 4.8 Add a Debug-Specific Achievement (Optional)

Add to the `ACHIEVEMENTS` array:

```jsx
{ id: 'debug_10', title: 'Bug Hunter', desc: 'Complete 10 debug races', icon: '🐛', rarity: 'rare',
  check: (stats) => stats.debugRaces >= 10 },
{ id: 'debug_25', title: 'Exterminator', desc: 'Complete 25 debug races', icon: '🔧', rarity: 'epic',
  check: (stats) => stats.debugRaces >= 25 },
```

And in `getAchievementStats()`, add:

```jsx
const debugRaces = raceHistory.filter(r => r.category === 'debug').length + (extraRace?.category === 'debug' ? 1 : 0);
// ... include debugRaces in the returned object
```

### 4.9 Menu Screen — Category Selector Update

No JSX changes needed for the category selector itself — it already loops over `CATEGORY_CONFIG`:

```jsx
{Object.entries(CATEGORY_CONFIG).map(([key, config]) => (
  <button key={key} onClick={() => setSelectedCategory(key)} ...>
```

Adding `debug` to `CATEGORY_CONFIG` will automatically render a third button. However, you can add a badge to it:

```jsx
{key === 'debug' && <span className="text-[10px] px-1.5 py-0.5 bg-red-500/30 text-red-300 rounded">NEW</span>}
```

(This follows the same pattern as the existing `'dsa'` badge.)

### 4.10 Snippet Availability Check

When `selectedCategory === 'debug'`, the existing `getNextSnippet()` from `useSnippetHistory()` won't work because it reads from `CODE_SNIPPETS`, which doesn't have a `debug` key. The `startDebugGame()` function handles this separately by reading from `DEBUG_SNIPPETS` directly.

But you should also **disable the "Start Race" and "Race Ghost" buttons** when the category is debug and no snippets exist for that language/difficulty combo. Add a helper:

```jsx
const hasDebugSnippets = selectedCategory === 'debug'
  && DEBUG_SNIPPETS[selectedLanguage]?.[selectedDifficulty]?.length > 0;

const hasSnippetsForSelection = selectedCategory === 'debug'
  ? hasDebugSnippets
  : (CODE_SNIPPETS[selectedCategory]?.[selectedLanguage]?.[selectedDifficulty]?.length > 0);
```

Use `hasSnippetsForSelection` to conditionally disable the Start button or show "No snippets available" text.

---

## 5. Files to Modify

| File | Change |
|---|---|
| `index (3).jsx` | All changes listed above |

No new files needed. No dependency changes needed.

---

## 6. Summary Checklist

- [ ] Add `DEBUG_SNIPPETS` constant with `{ title, buggyCode, code, hints }` entries for each language
- [ ] Add `debug` to `CATEGORY_CONFIG`
- [ ] Add `isDebugMode` state
- [ ] Add `startDebugGame()` function that reads from `DEBUG_SNIPPETS`
- [ ] Modify `startGame()` to branch when `selectedCategory === 'debug'`
- [ ] Add buggy code reference panel to playing screen JSX (above typing area)
- [ ] Add "Type the corrected version" label in debug mode
- [ ] Reset `isDebugMode` on Escape / Back navigation
- [ ] Add debug achievements (`Bug Hunter`, `Exterminator`) and `debugRaces` stat
- [ ] Add `NEW` badge on the debug category button in the menu
- [ ] Add snippet availability check for debug category
- [ ] Populate at least 3-5 debug snippets per language per difficulty

---

## 7. Verification

Since there are no automated tests in this project, verify manually:

1. **Category appears** — Go to menu → Three category buttons: General, DSA, Debug (with NEW badge)
2. **Select Debug + start** — Pick Debug, choose a language and difficulty → Hit Start → Countdown → Playing
3. **Buggy code visible** — During gameplay, the buggy code panel appears at the top with a red border, showing the broken code and a hint
4. **Typing target is correct code** — The code you type should be the *fixed* version, not the buggy one
5. **Completion works** — Finish typing → Normal result screen appears with WPM and accuracy
6. **Stats tracked** — Go to Stats → The race should appear in history with category "debug"
7. **Escape works** — During debug mode gameplay, press Escape → Returns to menu, `isDebugMode` is reset
8. **Missing snippets handled** — Select Debug + a language/difficulty combo with no snippets → Should show alert or disable the Start button
9. **Achievement unlock** — After 10 debug races → "Bug Hunter" achievement should unlock
