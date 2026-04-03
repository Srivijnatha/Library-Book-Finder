// GRID SIZE
const size = 10;

let grid = [];
let start = null;
let goal = null;

// WALLS
const walls = [
  [1,1],[1,2],[1,3],
  [4,4],[5,4],[6,4],
  [7,7],[7,8]
];

// BOOKS
const books = {
  "AI": [0, 9],
  "DBMS": [2, 5],
  "DSA": [4, 8],
  "OS": [6, 2],
  "CN": [8, 7],
  "ML": [1, 5],
  "SE": [7, 0],
  "JAVA": [9, 4],
  "PYTHON": [3, 1],
  "C++": [5, 6]
};

// NAVIGATION
function goToPage(pageNum) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById("page" + pageNum).classList.add("active");
  window.scrollTo(0, 0);

  if (pageNum === 3) createGrid();
}

// CREATE GRID
function createGrid() {
  const g = document.getElementById("grid");
  g.innerHTML = "";

  for (let i = 0; i < size; i++) {
    grid[i] = [];
    for (let j = 0; j < size; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");

      cell.onclick = () => setStart(cell, i, j);

      g.appendChild(cell);
      grid[i][j] = cell;
    }
  }

  walls.forEach(([x,y]) => {
    grid[x][y].classList.add("block");
  });

  for (let b in books) {
    let [x,y] = books[b];
    grid[x][y].innerText = b;
    grid[x][y].classList.add("book");
  }
}

// SET START
function setStart(cell, i, j) {
  if (cell.classList.contains("block") || cell.classList.contains("book")) return;

  if (start) {
    let [x,y] = start;
    if (!grid[x][y].classList.contains("book")) {
      grid[x][y].innerText = "";
      grid[x][y].classList.remove("walker");
    }
  }

  start = [i,j];
  cell.innerText = "🚶";
  cell.classList.add("walker");
}

// HEURISTIC
function heuristic(a, b) {
  return Math.abs(a[0]-b[0]) + Math.abs(a[1]-b[1]);
}

// FIND PATH
function findPath() {
  const selected = document.getElementById("bookSelect").value;

  if (!start || !selected) {
    alert("Select start and book!");
    return;
  }

  goal = books[selected];

  // remove previous glow
  document.querySelectorAll(".book").forEach(c => c.classList.remove("selected-book"));

  // add glow
  grid[goal[0]][goal[1]].classList.add("selected-book");

  aStar();
}

// A*
function aStar() {
  let open = [];
  let cameFrom = {};
  let gScore = {};

  open.push({pos: start, f: 0});
  gScore[start.toString()] = 0;

  while (open.length > 0) {
    open.sort((a,b)=>a.f-b.f);
    let current = open.shift().pos;

    if (current[0] === goal[0] && current[1] === goal[1]) {
      reconstructPath(cameFrom, current);
      return;
    }

    let dirs = [[1,0],[-1,0],[0,1],[0,-1]];

    for (let [dx,dy] of dirs) {
      let nx = current[0] + dx;
      let ny = current[1] + dy;

      if (nx<0 || ny<0 || nx>=size || ny>=size) continue;
      if (grid[nx][ny].classList.contains("block")) continue;

      if (grid[nx][ny].classList.contains("book") &&
         !(nx===goal[0] && ny===goal[1])) continue;

      let newG = gScore[current.toString()] + 1;
      let key = [nx,ny].toString();

      if (!(key in gScore) || newG < gScore[key]) {
        gScore[key] = newG;

        let f = newG + heuristic([nx,ny], goal);

        open.push({pos: [nx,ny], f: f});
        cameFrom[key] = current;
      }
    }
  }

  alert("No path found!");
}

// RECONSTRUCT PATH
function reconstructPath(cameFrom, current) {
  let path = [];

  while (current) {
    path.push(current);
    current = cameFrom[current.toString()];
  }

  path.reverse();
  animate(path);
}

// ANIMATION
function animate(path) {
  let i = 0;

  function step() {
    if (i > 0) {
      let [px, py] = path[i - 1];

      if (!grid[px][py].classList.contains("book")) {
        grid[px][py].classList.remove("walker");
        grid[px][py].classList.add("path");
        grid[px][py].innerText = "•";
      }
    }

    if (i >= path.length) {
      let [gx, gy] = goal;

      // 🔥 STOP GLOW WHEN REACHED
      grid[gx][gy].classList.remove("selected-book");

      start = path[path.length - 1];
      return;
    }

    let [x,y] = path[i];

    grid[x][y].innerText = "🚶";
    grid[x][y].classList.add("walker");

    document.getElementById("info").innerText =
      `Step ${i} → (${x}, ${y})`;

    i++;
    setTimeout(step, 350);
  }

  step();
}

// RESET
function resetGrid() {
  location.reload();
}