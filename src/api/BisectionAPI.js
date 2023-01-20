/*--------------------------------------------------------*/

const express = require("express");
const router = express.Router();
const math = require("mathjs");

/*--------------------------------------------------------*/

router.post("/api/BisectionAPI", (req, res) => {
  var eq = math.compile(req.body.equation);
  var xl = parseFloat(req.body.xl);
  var xr = parseFloat(req.body.xr);
  var xm = 0;
  var n = 0;
  var check;
  var tmpArr = [];

  const findxm = (xl, xr) => {
    return (parseFloat(xl) + parseFloat(xr)) / 2;
  };

  do {
    xm = findxm(xl, xr);
    n++;

    tmpArr.push({
      iteration: n,
      xl: xl,
      xr: xr,
      xm: xm,
      Error: check,
    });

    if (eq.evaluate({x:xm}) > 0) {
      check = Math.abs((xm - xr) / xm).toFixed(8);
      xr = xm;
    } else {
      check = Math.abs((xm - xl) / xm).toFixed(8);
      xl = xm;
    }
  } while (check > 0.000001 && n < 25);

  res.json({
    tmpArr: tmpArr,
  });
});
module.exports = router;

/*--------------------------------------------------------*/