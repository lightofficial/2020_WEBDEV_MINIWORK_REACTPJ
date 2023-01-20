/*--------------------------------------------------------*/

const express = require("express");
const router = express.Router();
const math = require("mathjs");

/*--------------------------------------------------------*/

router.post("/api/GaussElimAPI", (req, res) => {
  var MatrixA = req.body.matrixA;
  var MatrixB = [].concat(...req.body.matrixB);
  var solution = gausselimsolve(MatrixA, MatrixB);

  function gausselimsolve(A, b, update) {
    var a = matrixdcp(A, update);
    if (a === undefined) return;
    return matrixsubstitution(a, b, update);
  }

  function matrixdcp(A, update) {
    var d = true;
    var n = A.length;
    var idx = new Array(n);
    var vv = new Array(n);

    for (var i = 0; i < n; i++) {
      var max = 0;
      for (var j = 0; j < n; j++) {
        var temp = Math.abs(A[i][j]);
        if (temp > max) max = temp;
      }
      if (max == 0) return;
      vv[i] = 1 / max;
    }

    if (!update) {
      var Acpy = new Array(n);
      for (var i = 0; i < n; i++) {
        var Ai = A[i];
        Acpyi = new Array(Ai.length);
        for (j = 0; j < Ai.length; j += 1) Acpyi[j] = Ai[j];
        Acpy[i] = Acpyi;
      }
      A = Acpy;
    }

    /*--------------------------------------------------------*/

    var tiny = 0;
    for (var i = 0; ; i++) {
      for (var j = 0; j < i; j++) {
        var sum = A[j][i];
        for (var k = 0; k < j; k++) sum -= A[j][k] * A[k][i];
        A[j][i] = sum;
      }
      var jmax = 0;
      var max = 0;
      for (var j = i; j < n; j++) {
        var sum = A[j][i];
        for (var k = 0; k < i; k++) sum -= A[j][k] * A[k][i];
        A[j][i] = sum;
        var temp = vv[j] * Math.abs(sum);
        if (temp >= max) {
          max = temp;
          jmax = j;
        }
      }
      if (i <= jmax) {
        for (var j = 0; j < n; j++) {
          var temp = A[jmax][j];
          A[jmax][j] = A[i][j];
          A[i][j] = temp;
        }
        d = !d;
        vv[jmax] = vv[i];
      }
      idx[i] = jmax;
      if (i == n - 1) break;
      var temp = A[i][i];
      if (temp == 0) A[i][i] = temp = tiny;
      temp = 1 / temp;
      for (var j = i + 1; j < n; j++) A[j][i] *= temp;
    }
    return { A: A, idx: idx, d: d };
  }

  /*--------------------------------------------------------*/

  function matrixsubstitution(a, b, update) {
    var A = a.A;
    var idx = a.idx;
    var n = idx.length;

    if (!update) {
      var bcpy = new Array(n);
      for (var i = 0; i < b.length; i += 1) bcpy[i] = b[i];
      b = bcpy;
    }

    for (var ii = -1, i = 0; i < n; i++) {
      var ix = idx[i];
      var sum = b[ix];
      b[ix] = b[i];
      if (ii > -1) for (var j = ii; j < i; j++) sum -= A[i][j] * b[j];
      else if (sum) ii = i;
      b[i] = sum;
    }
    for (var i = n - 1; i >= 0; i--) {
      var sum = b[i];
      for (var j = i + 1; j < n; j++) sum -= A[i][j] * b[j];
      b[i] = sum / A[i][i];
    }
    return b;
  }

  /*--------------------------------------------------------*/
  
  console.log(solution);
  console.log(math.multiply(MatrixA, solution));
  res.json({
    out: solution,
  });
});
module.exports = router;

/*--------------------------------------------------------*/
