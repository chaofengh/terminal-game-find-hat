# Terminal Game

This is a terminal-based game implemented in Node.js using the terminal-kit library.

## How to Play

- Use `W`, `A`, `S`, `D` keys to move.
- Your goal is to find the hat (`^`) without falling into holes (`O`).
- The player starts at a random position (not the upper-left corner).
- In hard mode, additional holes are added after certain turns.

## Screenshots

<img width="452" alt="Screenshot 2024-06-19 at 4 25 00 PM" src="https://github.com/chaofengh/terminal-game-find-hat/assets/73614799/ae38dcd5-4b36-44dc-b8aa-6d60e6471623">
<img width="452" alt="Screenshot 2024-06-19 at 4 32 26 PM" src="https://github.com/chaofengh/terminal-game-find-hat/assets/73614799/f7194332-c457-4271-baab-00e8a3e0474a">

## Setup

1. Clone the repository:
   git clone https://github.com/your-username/terminal-game.git
2. Navigate to the project directory:
   cd terminal-game-find-hat
3. npm install
4. node main.js

## Code Structure
main.js: The main game logic and setup.
screenshots/: Directory containing game screenshots.

## Dependencies
prompt-sync: A synchronous prompt for node.js.
terminal-kit: A terminal toolkit for node.js.
