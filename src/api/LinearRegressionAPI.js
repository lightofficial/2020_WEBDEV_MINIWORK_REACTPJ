/*--------------------------------------------------------*/

const express = require("express");
const router = express.Router();
const math = require("mathjs");

/*--------------------------------------------------------*/

router.post("/api/LinearRegressionAPI", (req, res) => {
  var FindX = req.body.FindX;
  var x = [].concat(...req.body.xValue);
  var y = [].concat(...req.body.yValue);
  var n = x.length;

  /*--------------------------------------------------------*/

  var sum_x=0, sum_y=0, sum_xy=0, sum_xx=0;
  for(i=0;i<n;i++)
  {
      sum_x += x[i];
      sum_y += y[i];
      sum_xy += x[i]*y[i];
      sum_xx += x[i]*x[i];
  }

  /*--------------------------------------------------------*/

  var slope = (n*sum_xy - sum_x*sum_y) / (n*sum_xx - math.pow(sum_x,2));
  var intercept = (sum_y-slope*sum_x)/n;

  var equation = slope + "x+" + intercept;
  var out = (slope*FindX)+intercept;

  /*--------------------------------------------------------*/

  console.log(equation);
  console.log(out);
  res.json({
    equation: equation,
    out: out,
  });
});
module.exports = router;

/*--------------------------------------------------------*/

