const { Router } = require("express");
const { registerUsuario, loginUsuario } = require("../controllers/authController");
const { check } = require("express-validator");
const validationErrors = require("../middlewares/validationErrors");
const authRouter = Router();

/**
 * @swagger
 * components: 
 *  schemas:
 *      Usuario:
 *          type: object
 *          properties:
 *              username:
 *                  type: string
 *                  description: Nombre de usuario
 *              email:
 *                  type: string
 *                  description: Email del usuario
 *              password:
 *                  type: string
 *                  description: Contraseña encriptada con BCrypt, largo minimo de 6 caracteres
 *          required:
 *              - username
 *              - email
 *              - password
 *          example:
 *              username: Paulo Vera
 *              email: paulo@mail.com
 *              password: password123
 */

/**
 * @swagger
 * /auth/register:
 *  post:
 *      summary: Registro de nuevo usuario
 *      tags: [Usuario]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Usuario'
 *      responses:
 *          501:
 *              description: Correo ya registrado
 *          200:
 *              description: Usuario creado correctamente y retornado con JWT (Token)
 */

/**
 * @swagger
 * /auth/login:
 *  post:
 *      summary: Iniciar sesion de un usuario con un token valido
 *      tags: [Usuario]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              type: string
 *                              description: Email del usuario
 *                          password:
 *                              type: string
 *                              description: Contraseña encriptada con BCrypt, largo minimo de 6 caracteres
 *                      required:
 *                          - email
 *                          - password
 *                      example:
 *                          email: paulo@mail.com
 *                          password: password123
 *
 *      responses:
 *          401:
 *              description: Correo o contraseña invalidos
 *          200:
 *              description: Usuario ingresado correctamente y retornado un JWT (Token) nuevo y valido 
 */




authRouter.post("/register", 
[check("email","El formato es invalido").isEmail(),
check("password","La contraseña debe de ser de 6 caracteres minimo").isLength({min: 6}),
check("username","El nombre de usuario es requerido").not().isEmpty(),
validationErrors,
],
registerUsuario);
authRouter.post("/login",
[check("email","El formato es invalido").isEmail(),
check("password","La contraseña debe de ser de 6 caracteres minimo").isLength({min: 6}),
validationErrors,
], 
loginUsuario);

module.exports = authRouter;