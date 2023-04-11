const {Router} = require("express");
const {check} = require("express-validator");
const { createTarea, readTarea, updateTarea, deleteTarea } = require("../controllers/tareaController");
const verifyToken = require("../middlewares/verifyToken");
const validationErrors = require("../middlewares/validationErrors");

const router = new Router();

/**
 * @swagger
 * components: 
 *  schemas:
 *      Tarea:
 *          type: object
 *          properties:
 *              nombre:
 *                  type: string
 *                  description: Nombre de la tarea
 *              creator:
 *                  type: Usuario
 *                  description: ID del usuario
 *              createdAT:
 *                  type: date
 *                  description: Fecha de creación de la tarea
 *          required:
 *              - nombre
 *              - creator
 *          example:
 *              nombre: Aplicacion con Laravel
 *              creator: 6435d0c0933c8d7b3755dba9
 */

/**
 * @swagger
 * /task/read:
 *  get:
 *      summary: Lee todas las tares
 *      tags: [Tarea]
 *      parameters:
 *          - name: x-auth-token
 *            in: header
 *            description: JWT Token Valido
 *            required: true
 *            type: string
 *      requestBody:
 *          required: false
 *      responses:
 *          404:
 *              description: EL usuario no tiene tareas visibles
 *          200:
 *              description: Listado de tareas del usuario logeado
 */


router.get("/read", [verifyToken],readTarea);

/**
 * @swagger
 * /task/create:
 *  post:
 *      summary: Creacion de nueva tarea
 *      tags: [Tarea]
 *      parameters:
 *          - name: x-auth-token
 *            in: header
 *            description: JWT Token Valido
 *            required: true
 *            type: string
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          nombre:
 *                              type: string
 *                              description: Nombre de la tarea
 *      responses:
 *          200:
 *              description: Tarea creada correctamente
 */


router.post("/create", [check("nombre","Nombre del proyecto obligatorio").not().isEmpty(), validationErrors, verifyToken],createTarea);

/**
 * @swagger
 * /task/update/{id}:
 *  put:
 *      summary: Actualizar una tarea
 *      tags: [Tarea]
 *      parameters:
 *          - name: id
 *            in: path
 *            description: Id de la tarea por actualizar
 *            required: true
 *            type: string
 *          - name: x-auth-token
 *            in: header
 *            description: JWT Token Valido
 *            required: true
 *            type: string
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          nombre:
 *                              type: string
 *                              description: Nuevo nombre de la tarea
 *      responses:
 *          404:
 *              description: La tarea que se trata de actualizar no existe
 *          200:
 *              description: Tarea actaulizada correctamente
 */

router.put("/update/:id", [check("nombre","Nombre del proyecto obligatorio").not().isEmpty(), validationErrors, verifyToken],updateTarea);

/**
 * @swagger
 * /task/delete/{id}:
 *  delete:
 *      summary: Eliminar una tarea
 *      tags: [Tarea]
 *      parameters:
 *          - name: id
 *            in: path
 *            description: Id de la tarea por eliminar
 *            required: true
 *            type: string
 *          - name: x-auth-token
 *            in: header
 *            description: JWT Token Valido
 *            required: true
 *            type: string
 *      requestBody:
 *          required: false
 *      responses:
 *          404:
 *              description: Tarea no eliminada
 *          200:
 *              description: Tarea eliminada correctamente
 */

router.delete("/delete/:id", [verifyToken],deleteTarea);

module.exports = router;