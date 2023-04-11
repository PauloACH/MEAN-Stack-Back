const express = require('express');
const cors = require('cors');
const conexionDB = require('./db/config');
const {version} = require("./package.json")

const swaggerUI = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");

const authRouter = require("./routes/auth");
const taskRouter = require("./routes/tareas");
const path = require("path");

const app = express();
require("dotenv").config();

conexionDB();

app.use(express.json());
app.use(cors());

app.use( "/", express.static(__dirname + "/public"));
app.use("/api/docs", swaggerUI.serve, swaggerUI.setup( swaggerJSDoc({
    definition: {
        openapi: "3.0.0",
        info: {
            title: "MEAN Task API",
            version 
        },
        servers: [
            {
                url: "http://localhost:3000"
            }
        ]
    },
    apis: [`${ path.join(__dirname, "./routes/*.js") }`],
}) ));
app.use("/auth", authRouter);
app.use("/task", taskRouter);

app.listen(process.env.PORT,() => {
    console.log(`Aplicacion corriendo en el puerto ${process.env.PORT}`);
});