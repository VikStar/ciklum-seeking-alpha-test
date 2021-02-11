# Ciklum / Seeking Alpha

The grid is subject to changes on what is called a tick. When a grid “ticks”, these are the rules to determine the next state of the grid:

* Any live cell with fewer than two live neighbours dies (underpopulation).
* Any live cell with two or three live neighbours lives on to the next generation.
* Any live cell with more than three live neighbours dies (overcrowding).
* Any dead cell with exactly three live neighbours becomes a live cell (reproduction).

---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).