/*--------------------------------------------------------*/

const express = require("express");
const router = express.Router();
const math = require("mathjs");

/*--------------------------------------------------------*/


/**
 * @swagger
 *  tags:
 *   name: NewtonRaphsonAPI
 *   description: Get all books
 * 
 */

/**
 * @swagger
 * /api/NewtonRaphsonAPI:
 *   get:
 *     tags: [NewtonRaphsonAPI]
 *     responses:
 *       201:
 *         description: GET
 */

 /**
 * @swagger
 * /api/NewtonRaphsonAPI:
 *   post:
 *     parameters:
 *      - name: equation
 *      - name: xl
 *      - name: xr
 *     tags: [NewtonRaphsonAPI]
 *     responses:
 *       201:
 *         description: post data
 */

router.post("/api/NewtonRaphsonAPI", (req, res) => {
  var eq = math.compile(req.body.equation);
  var diffeq = math.derivative(req.body.equation, "x");
  var x_old = parseFloat(req.body.x_old);
  var x_new = 0;
  var n = 0;
  var tmpArr = [];

  do {
    x_new = x_old - eq.evaluate({x:x_old}) / diffeq.evaluate({x:x_old});
    check = Math.abs((x_new - x_old) / x_new).toFixed(8);
    n++;
    console.log(n);
    console.log("eval ",n,":",eq.evaluate({x:x_old}))
    console.log("diff ",n,":",diffeq.evaluate({x:x_old}))
    tmpArr.push({
      iteration: n,
      x_old: x_old,
      x_new: x_new,
      Error: check,
    });
    x_old = x_new;
  } while (check > 0.00001 && n < 100);

  res.json({
    tmpArr: tmpArr,
  });
});
module.exports = router;
