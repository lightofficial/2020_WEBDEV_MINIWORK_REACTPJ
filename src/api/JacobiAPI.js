/*--------------------------------------------------------*/

const express = require("express");
const router = express.Router();
const math = require("mathjs");

/*--------------------------------------------------------*/

router.post("/api/JacobiAPI", (req, res) => {
  var MatrixA = req.body.matrixA;
  var MatrixB = [].concat(...req.body.matrixB);
  var MatrixX = [].concat(...req.body.matrixX);
  var solution = [];
  var n = MatrixA.length;
  var epsilon = new Array(n);

  error = (xnew, xold) => {
    for (var i = 0; i < xnew.length; i++) {
      epsilon[i] = Math.abs((xnew[i] - xold[i]) / xnew[i]);
    }
    for (i = 0; i < epsilon.length; i++) {
      if (epsilon[i] > 0.000001) {
        return true;
      }
    }
    return false;
  };

  do {
    temp = [];
    xold = MatrixX;
    for (var i = 0; i < n; i++) {
      var sum = 0;
      for (var j = 0; j < n; j++) {
        if (i !== j) {
          //else i == j That is a divide number
          sum = sum + MatrixA[i][j] * MatrixX[j];
        }
      }
      temp[i] = (MatrixB[i] - sum) / MatrixA[i][i]; //update MatrixX[i]
    }
    solution = temp;
  } while (error(MatrixX, xold)); //if true , continue next iteration

  console.log(solution);
  console.log(math.multiply(MatrixA, solution));
  res.json({
    out: solution,
  });
});
module.exports = router;

/*--------------------------------------------------------*/
