# 📚 Library Book Finder using A* Algorithm

## 🔍 Overview
This project is a web-based application that helps users find the shortest path to a selected book in a library using the **A* search algorithm**.  
The system visually demonstrates pathfinding on a grid.

---

## 🧠 AI Concepts Used
- State Space Representation  
- Informed Search  
- A* Algorithm  
- Heuristic Function (Manhattan Distance)  

---

## ⚙️ Technical Details
- Library is modeled as a **10×10 grid (2D array)**
- Each cell represents a **node (state)**
- A* uses:  
  **f(n) = g(n) + h(n)**  
  - g(n): cost from start  
  - h(n): estimated cost to goal  

- Path is reconstructed using **parent tracking (`cameFrom`)**

---

## 💻 Technologies Used
- HTML  
- CSS  
- Vanilla JavaScript  

---

## 🚀 Features
- Interactive grid  
- Book selection  
- Shortest path calculation  
- Step-by-step visualization  
- Obstacle handling
