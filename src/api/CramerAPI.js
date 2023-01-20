/*--------------------------------------------------------*/

const express = require("express");
const router = express.Router();
const math = require("mathjs");

/*--------------------------------------------------------*/

router.post("/api/CramerAPI", (req, res) => {
  var MatrixA = req.body.matrixA;
  var MatrixB = [].concat(...req.body.matrixB);

  var result = cramersRule(MatrixA, MatrixB);

  //result
  console.log(result);
  //check
  console.log(math.multiply(MatrixA, result));

  /*--------------------------------------------------------*/

  function cramersRule(MatrixA, MatrixB) {
    var det = detr(MatrixA),
      returnArray = [],
      i,
      tmpMatrix;

    for (i = 0; i < MatrixA[0].length; i++) {
      var tmpMatrix = insertInTerms(MatrixA, MatrixB, i);
      returnArray.push(detr(tmpMatrix) / det);
    }
    return returnArray;
  }

  /*--------------------------------------------------------*/

  function insertInTerms(MatrixA, ins, at) {
    var tmpMatrix = clone(MatrixA),
      i;
    for (i = 0; i < MatrixA.length; i++) {
      tmpMatrix[i][at] = ins[i];
    }
    return tmpMatrix;
  }

  /*--------------------------------------------------------*/

  function detr(m) {
    var ret = 1,
      k,
      A = clone(m),
      n = m[0].length,
      alpha;

    for (var j = 0; j < n - 1; j++) {
      k = j;
      for (i = j + 1; i < n; i++) {
        if (Math.abs(A[i][j]) > Math.abs(A[k][j])) {
          k = i;
        }
      }
      if (k !== j) {
        temp = A[k];
        A[k] = A[j];
        A[j] = temp;
        ret *= -1;
      }
      Aj = A[j];
      for (i = j + 1; i < n; i++) {
        Ai = A[i];
        alpha = Ai[j] / Aj[j];
        for (k = j + 1; k < n - 1; k += 2) {
          k1 = k + 1;
          Ai[k] -= Aj[k] * alpha;
          Ai[k1] -= Aj[k1] * alpha;
        }
        if (k !== n) {
          Ai[k] -= Aj[k] * alpha;
        }
      }
      if (Aj[j] === 0) {
        return 0;
      }
      ret *= Aj[j];
    }
    return Math.round(ret * A[j][j]);
  }

  /*--------------------------------------------------------*/
  
  function clone(m) {
    return m.map(function (a) {
      return a.slice();
    });
  }

  /*--------------------------------------------------------*/
  
  res.json({
    out: result,
  });
});
module.exports = router;

/*--------------------------------------------------------*/
