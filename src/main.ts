import './style.css'
import { createMatrix, makeCellAlive, makeCellDead } from './ui';

function createMatrixNumber(dimensionX: number, dimensionY: number, empty: boolean) {

  let matrix = Array.from({ length: dimensionY },
    (_, i) => Array.from({ length: dimensionX },
      (_, j) => {
        if (empty) {
          return 0;
        }
        if (i === 0 || i === dimensionY - 1 || j === 0 || j === dimensionX - 1) {
          return 0
        }
        return Math.random() < 0.2 ? 1 : 0

      }));

  return matrix;
}

const dimY = 256;
const dimX = 256;
let matrix = createMatrixNumber(dimX, dimY, false);




const elementsRoot = createMatrix(matrix);
elementsRoot.root.classList.add("root");
elementsRoot.root.style.gridTemplateColumns = `repeat(${dimX}, 1fr)`;
elementsRoot.root.style.gridTemplateRows = `repeat(${dimY}, 1fr)`;
const app = document.querySelector("#app")!;
app.appendChild(elementsRoot.root)

function tick() {
  const newMatrix = createMatrixNumber(dimX, dimY, true);
  for (let i = 1; i < dimY - 1; i++) {
    for (let j = 1; j < dimX - 1; j++) {

      let neighbors = 0;

      //Count neighbors
      neighbors =
        matrix[i - 1][j - 1] +
        matrix[i - 1][j] +
        matrix[i - 1][j + 1] +
        matrix[i][j - 1] +
        matrix[i][j + 1] +
        matrix[i + 1][j - 1] +
        matrix[i + 1][j] +
        matrix[i + 1][j + 1];

      //Cell is dead
      if (matrix[i][j] == 0) {

        //Make the cell alive
        if (neighbors === 3) {
          newMatrix[i][j] = 1;
          makeCellAlive(elementsRoot.matrixDom[i][j]);
        }
      } else {
        if (neighbors < 2 || neighbors > 3) {
          newMatrix[i][j] = 0;
          makeCellDead(elementsRoot.matrixDom[i][j])
        } else {
          newMatrix[i][j] = 1;
          makeCellAlive(elementsRoot.matrixDom[i][j]);
        }
      }
    }
  }
  matrix = newMatrix;
  requestAnimationFrame(tick);
  // tick();
}

tick();

