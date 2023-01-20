/*--------------------------------------------------------*/

const express = require("express");
const router = express.Router();

/*--------------------------------------------------------*/

router.post("/api/NewtonInterpolation", (req, res) => {
  var X = req.body.FindX;
  var x = [].concat(...req.body.xValue);
  var y = [].concat(...req.body.yValue);

  var Point = [].concat(...req.body.interpolatePoint);
  var n = Point.length;

  function C(i) {
    switch (i) {
      case 1:
        return (
          (y[Point[i]] - y[Point[i - 1]]) / (x[Point[i]] - x[Point[i - 1]])
        );
      case 2:
        return (
          (y[Point[i]] - y[Point[i - 1]]) / (x[Point[i]] - x[Point[i - 1]]) -
          C(i - 1)
        );
      case 3:
        return (
          (y[Point[3]] -
            y[Point[2]] / (x[Point[3]] - x[Point[2]]) -
            (y[Point[2]] - y[Point[1]] / (x[Point[2]] - x[Point[1]]))) /
            (x[Point[3]] - x[Point[1]]) -
          C(2)
        );
      case 4:
        return (
          (((y[Point[4]] - y[Point[3]]) / (x[Point[4]] - x[Point[3]]) -
            (y[Point[3]] - y[Point[2]]) / (x[Point[3]] - x[Point[2]])) /
            (x[Point[4]] - x[Point[2]]) -
            C(2)) /
            (x[Point[4]] - x[Point[1]]) -
          C(3)
        );
      default:
        console.log("not done yet");
    }
  }

  function findX(X, i) {
    if (i < 0) {
      return 1;
    } else {
      return (X - x[Point[i]]) * findX(X, i - 1);
    }
  }

  fx = y[Point[0]];

  if (n == 2) {
    fx += C(1) * (X - x[Point[0]]);
  } else {
    for (var i = 1; i < n; i++) {
      if (i == 1) {
        fx += C(i) * (X - x[Point[0]]);
      } else {
        fx += (C(i) / (x[Point[i]] - x[Point[0]])) * findX(X, i - 1);
      }
    }
  }

/*--------------------------------------------------------*/

  console.log(fx);

/*--------------------------------------------------------*/

  res.json({
    out: fx,
  });
});
module.exports = router;

/*--------------------------------------------------------*/

