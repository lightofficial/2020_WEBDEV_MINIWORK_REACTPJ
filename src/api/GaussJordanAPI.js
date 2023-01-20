/*--------------------------------------------------------*/

const express = require("express");
const router = express.Router();
const math = require("mathjs");

/*--------------------------------------------------------*/

router.post("/api/GaussJordanAPI", (req, res) => {
  var matrixA = req.body.matrixA;

  var matrixB = [].concat(...req.body.matrixB);
  var n = matrixA.length;

  var result = GaussJordan(matrixA, matrixB);
  //result
  console.log(result);
  //check
  console.log(math.multiply(matrixA, result));

  function clone(m) {
    return m.map(function (a) {
      return a.slice();
    });
  }

  function GaussJordan(matrixA, MatrixB) {
    var MatrixA = clone(matrixA);
    var solution = [];
    if (MatrixA[0][0] === 0) {
      //pivoting
      var tempRow = JSON.parse(JSON.stringify(MatrixA[0]));
      var tempColumn = MatrixB[0];
      MatrixA[0] = MatrixA[1];
      MatrixA[1] = tempRow;
      MatrixB[0] = MatrixB[1];
      MatrixB[1] = tempColumn;
    }
    //Forward eliminate
    for (var k = 0; k < n; k++) {
      for (var i = k + 1; i < n; i++) {
        var factor = MatrixA[i][k] / MatrixA[k][k];
        for (var j = k; j < n; j++) {
          MatrixA[i][j] = MatrixA[i][j] - factor * MatrixA[k][j];
        }
        MatrixB[i] = MatrixB[i] - factor * MatrixB[k];
      }
    }
    //Backward Substitution
    for (k = n - 1; k >= 0; k--) {
      for (i = k; i >= 0; i--) {
        if (i === k) {
          //Identity matrix
          factor = 1 / MatrixA[i][k];

          for (j = 0; j < n; j++) {
            MatrixA[i][j] = MatrixA[i][j] * factor;
          }
          MatrixB[i] = MatrixB[i] * factor;
        } else {
          factor = MatrixA[i][k] / MatrixA[k][k];
          for (j = 0; j < n; j++) {
            MatrixA[i][j] = MatrixA[i][j] - factor * MatrixA[k][j];
          }
          MatrixB[i] = MatrixB[i] - factor * MatrixB[k];
        }
      }
    }
    for (i = 0; i < n; i++) {
      solution.push(MatrixB[i]);
    }
    return solution;
  }

  /*--------------------------------------------------------*/
  
  res.json({
    out: result,
  });
});
module.exports = router;
