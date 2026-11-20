# Task Tracker

A single-page task tracker built with plain HTML, CSS, and JavaScript. No frameworks or libraries.

## Features

- Add tasks with the **Add** button or the **Enter** key
- Empty or whitespace-only tasks are rejected with an error message
- Click a task to mark it complete or active
- Delete any task with the ✕ button
- Filter by **All**, **Active**, or **Completed**
- Live counter showing how many tasks are left
- Tasks are saved in `localStorage`, so they persist after a refresh
- Responsive layout for mobile and desktop
- Follows your system's light or dark mode

## Project structure

```
task-tracker/
├── index.html   # Page structure
├── style.css    # Styling, layout, and theme colors
├── script.js    # App logic and localStorage
└── README.md
```

## Getting started

1. Download or clone the project folder.
2. Keep `index.html`, `style.css`, and `script.js` in the same folder.
3. Open `index.html` in any modern browser.

No build step or server is required.

## How it works

- **State:** tasks live in a `tasks` array of objects (`{ id, text, completed }`), and `currentFilter` tracks the active filter.
- **Rendering:** `render()` rebuilds the list from the current state every time something changes.
- **Persistence:** `saveTasks()` writes the array to `localStorage` after each change, and `loadTasks()` reads it on page load.
- **Security:** task text is inserted with `textContent` and `createElement`, never `innerHTML`, so user input cannot inject HTML or scripts.

## Customizing

- **Colors:** edit the CSS variables in the `:root` block of `style.css`. The dark theme values are inside the `prefers-color-scheme: dark` media query.
- **Storage key:** change `STORAGE_KEY` at the top of `script.js` if you want separate saved lists.
- **Max task length:** change the `maxlength` attribute on the input in `index.html`.

## Ideas for next steps

- Double-click a task to edit its text
- Add a "Clear completed" button
- Add drag-and-drop reordering
- Add a manual dark mode toggle that remembers the choice

## Concepts practiced

DOM manipulation, event handling, array methods (`filter`, `map`, `find`), state management, and `localStorage`.
