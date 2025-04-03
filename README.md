# Crisis of Trust - Dice Game

## 🎲 Overview

**Crisis of Trust** is an immersive retro-style dice game built within a Y2K-inspired desktop interface. Challenge the Duck Bot to a game of chance while experiencing the nostalgic feel of early 2000s computing. What makes this game special is its integration with SP1 zero-knowledge proof technology, allowing players to cryptographically verify their game results.

## ✨ Features

- **Authentic Y2K Desktop Experience**: Complete with taskbar, desktop icons, and window management
- **3D Dice Game**: Play against the Duck Bot with beautifully animated 3D dice
- **Zero-Knowledge Proof Verification**: Verify game results using SP1 technology
- **Retro Sound Effects**: Optional sound effects for the full nostalgic experience
- **Responsive Design**: Works on desktop and mobile devices

## 🎮 Game Rules

1. Each game consists of 3 rounds
2. In each round, you and the Duck Bot roll a die
3. The player with the higher roll wins that round and adds their dice value to their score
4. If both players roll the same number, no points are awarded
5. After 3 rounds, the player with the highest total score wins
6. Use the "Prove" button to generate a zero-knowledge proof of your game result

## 🖥️ Desktop Interface

The game is wrapped in a nostalgic Y2K-style desktop interface featuring:

- **Menu Bar**: Access system functions and view status information
- **Desktop Icons**: Launch various applications and utilities
- **Taskbar**: Quick access to frequently used applications
- **Window Management**: Classic window controls (minimize, maximize, close)

## 🔐 SP1 Integration

Crisis of Trust uses Succinct Labs' SP1 zero-knowledge proof system to verify game results. SP1 provides a ZK-VM (zero-knowledge virtual machine) that proves programs are executed correctly.

When you click the "Prove" button after a game, the application:

1. Generates game data (scores, winner, timestamp)
2. Creates a cryptographic proof that the game was played fairly
3. Verifies the proof on-chain (simulation or real mode)
4. Provides a shareable verification result

## 🚀 Technologies

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Animation**: Framer Motion for smooth animations
- **3D Rendering**: Custom CSS 3D transforms
- **State Management**: React Hooks
- **ZK Proof**: SP1 (Succinct Labs)
- **Styling**: Tailwind CSS with custom retro styling

## 🛠️ Local Setup

### Requirements

- Node.js (v14+)
- npm or yarn
- Rust (1.79+) for SP1 integration

