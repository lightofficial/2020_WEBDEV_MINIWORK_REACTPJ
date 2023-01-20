/*--------------------------------------------------------*/

const express = require("express");
const app = express();
const bodyparser = require("body-parser");
app.use(bodyparser.json());
const cors = require("cors");
app.use(cors());
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

/*--------------------------------------------------------*/

const port = process.env.PORT || 5000;

/*--------------------------------------------------------*/

const BisectionAPI = require("./api/BisectionAPI");
const FalsePosAPI = require("./api/FalsePosAPI");
const OnePointAPI = require("./api/OnePointAPI");
const SecantAPI = require("./api/SecantAPI");
const NewtonRaphsonAPI = require("./api/NewtonRaphsonAPI");
const CramerAPI = require("./api/CramerAPI");
const GaussElimAPI = require("./api/GaussElimAPI");
const GaussJordanAPI = require("./api/GaussJordanAPI");

/*--------------------------------------------------------*/

const CholeskyAPI = require("./api/CholeskyAPI");
const LUDecomposeAPI = require("./api/LUDecomposeAPI");
const GaussSeidelAPI = require("./api/GaussSeidelAPI");
const JacobiAPI = require("./api/JacobiAPI");
const NewtonInterpolationAPI = require("./api/NewtonInterpolation");
const LinearRegressionAPI = require("./api/LinearRegressionAPI");
app.use("/", BisectionAPI);
app.use("/", FalsePosAPI);
app.use("/", OnePointAPI);
app.use("/", SecantAPI);
app.use("/", NewtonRaphsonAPI);
app.use("/", CramerAPI);
app.use("/", GaussElimAPI);
app.use("/", GaussJordanAPI);
app.use("/", CholeskyAPI);
app.use("/", LUDecomposeAPI);
app.use("/", GaussSeidelAPI);
app.use("/", JacobiAPI);
app.use("/", NewtonInterpolationAPI);
app.use("/", LinearRegressionAPI);

/*--------------------------------------------------------*/

const swaggerOptions = {
    swaggerDefinition: {
        
      info: {
        title: "Numerical API",
        version: '1.0.0',
      },
      host: ["localhost:3000"],
    },


    apis: 
    ["src/api/*.js"],
  };
  
  const swaggerDocs = swaggerJsDoc(swaggerOptions);
  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));



app.listen(port, () => console.log("Backend server live on " + port));

/*--------------------------------------------------------*/

module.exports = app;

/*--------------------------------------------------------*/
