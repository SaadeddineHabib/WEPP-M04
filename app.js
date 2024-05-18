var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
bodyParser = require("body-parser")
swaggerJsdoc = require("swagger-jsdoc")
swaggerUi = require("swagger-ui-express");


// API ENDPOINTS IMPORTS
var indexRouter = require('./routes/index');
var seriesApiGetAllRouter = require('./routes/apiRoutes/seriesApis/seriesGetAll')
var seriesApiGetOneRouter = require('./routes/apiRoutes/seriesApis/seriesGetOne')
var seriesApiDeleteOneRouter = require('./routes/apiRoutes/seriesApis/seriesDeleteOne')
var seriesApiPostOneRouter = require('./routes/apiRoutes/seriesApis/seriesPostOne')
var seriesApiPutOneRouter = require('./routes/apiRoutes/seriesApis/seriesUpdateOne')

var temporadesApiGetAllRouter = require('./routes/apiRoutes/temporadesApis/temporadasGetAll')
var temporadesApiGetOneRouter = require('./routes/apiRoutes/temporadesApis/tempoardasGetOne')
var temporadesApiDeleteOneRouter = require('./routes/apiRoutes/temporadesApis/temporadasDeleteOne')
var temporadesApiPostOneRouter = require('./routes/apiRoutes/temporadesApis/temporadasPostOne')
var temporadesApiPutOneRouter = require('./routes/apiRoutes/temporadesApis/temporadasUpdateOne')
// END API ENDPOINTS IMPORT

// RENDER ENDPOINTS IMPORT
var temporadesRenderGetAll = require('./routes/renderRoutes/temporades/temporadasGetAll')
var temporadesRenderGetOne = require('./routes/renderRoutes/temporades/tempoardasGetOne')
var temporadesRenderInsertOne = require('./routes/renderRoutes/temporades/tempoardasInsertOne')
var temporadesRenderDeleteOne = require('./routes/renderRoutes/temporades/temporadasDeleteOne')
var temporadesRenderPostOne = require('./routes/renderRoutes/temporades/temporadasPostOne')
var temporadesRenderUpdateGet = require('./routes/renderRoutes/temporades/temporadasUpdateGet')
var temporadesRenderUpdatePost = require('./routes/renderRoutes/temporades/temporadasUpdatePost')

var seriesRenderGetAll = require('./routes/renderRoutes/series/seriesGetAll')
var seriesRenderGetOne = require('./routes/renderRoutes/series/seriesGetOne')
var seriesRenderInsertOne = require('./routes/renderRoutes/series/seriesInsertOne')
var seriesRenderDeleteOne = require('./routes/renderRoutes/series/seriesDeleteOne')
var seriesRenderPostOne = require('./routes/renderRoutes/series/seriesPostOne')
var seriesRenderUpdateGet = require('./routes/renderRoutes/series/seriesUpdateGet')
var seriesRenderUpdatePost = require('./routes/renderRoutes/series/seriesUpdatePost')
// END RENDER ENDPOINTS IMPORT

var aboutRouter = require('./routes/about')
var contactRouter = require('./routes/contact')
var contactResponseRouter = require('./routes/contact')

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const options = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "Netflow",
            version: "0.1.0",
            description:
                "This is a simple CRUD API application made with Express and documented with Swagger",
        },
        servers: [
            {
                url: "http://localhost:3000",
            },
        ],
    },
    apis: ["app.js"],
};

const specs = swaggerJsdoc(options);
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs, {explorer: true})
);


const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/NetflowDesnormalized')

// START API ENDPOINTS

app.use(temporadesApiGetAllRouter)
app.use(seriesApiGetAllRouter)
app.use(temporadesApiGetOneRouter)
app.use(seriesApiGetOneRouter)
app.use(seriesApiDeleteOneRouter)
app.use(temporadesApiDeleteOneRouter)
app.use(seriesApiPostOneRouter)
app.use(temporadesApiPostOneRouter)
app.use(temporadesApiPutOneRouter)
app.use(seriesApiPutOneRouter)

// END OF API ENDPOINTS

// START EJS RENDER ENDPOINTS WEBSITE

app.use(indexRouter);
app.use(aboutRouter)
app.use(contactRouter)
app.use(contactResponseRouter)
app.use(temporadesRenderGetAll)
app.use(temporadesRenderInsertOne)
app.use(temporadesRenderGetOne)
app.use(seriesRenderGetAll)
app.use(seriesRenderInsertOne)
app.use(seriesRenderGetOne)
app.use(seriesRenderDeleteOne)
app.use(temporadesRenderDeleteOne)
app.use(seriesRenderPostOne)
app.use(temporadesRenderPostOne)
app.use(seriesRenderUpdateGet)
app.use(seriesRenderUpdatePost)
app.use(temporadesRenderUpdateGet)
app.use(temporadesRenderUpdatePost)

// END EJS RENDER ENDPOINTS WEBSITE


// API DOCUMENTATION
/**
 * @swagger
 *
 * tags:
 *   - name: Series
 *     description: Endpoints relacionados con las series
 *   - name: Temporadas
 *     description: Endpoints relacionados con las temporadas
 *
 * paths:
 *   /api/series:
 *     get:
 *       summary: Obtener todas las series
 *       tags:
 *         - Series
 *       responses:
 *         '200':
 *           description: Successful response
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Serie'
 *
 *     post:
 *       summary: Crear una nueva serie
 *       tags:
 *         - Series
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Serie'
 *       responses:
 *         '200':
 *           description: Successful response
 *
 *   /api/series/{id}:
 *     get:
 *       summary: Obtener una serie por ID
 *       tags:
 *         - Series
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: Successful response
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Serie'
 *
 *     post:
 *       summary: Actualizar una serie por ID
 *       tags:
 *         - Series
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Serie'
 *       responses:
 *         '200':
 *           description: Successful response
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Serie'
 *
 *     delete:
 *       summary: Eliminar una serie por ID
 *       tags:
 *         - Series
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: Successful response
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/SuccessResponse'
 *
 *   /api/temporadas:
 *
 *     get:
 *       summary: Obtener todas las temporadas
 *       tags:
 *         - Temporadas
 *       responses:
 *         '200':
 *           description: Successful response
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Temporada'
 *
 *     post:
 *       summary: Crear una nueva temporada
 *       tags:
 *         - Temporadas
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Temporada'
 *       responses:
 *         '200':
 *           description: Successful response
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Temporada'
 *
 *   /api/temporadas/{id}:
 *     get:
 *       summary: Obtener una temporada por ID
 *       tags:
 *         - Temporadas
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: Successful response
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Temporada'
 *
 *     post:
 *       summary: Actualizar una temporada por ID
 *       tags:
 *         - Temporadas
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Temporada'
 *       responses:
 *         '200':
 *           description: Successful response
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Temporada'
 *
 *     delete:
 *       summary: Eliminar una temporada por ID
 *       tags:
 *         - Temporadas
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: Successful response
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/SuccessResponse'
 *
 * components:
 *   schemas:
 *     Serie:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 6467d4c5a9b0c3b7c8d4c5a9
 *           required: true
 *         nom:
 *           type: string
 *           example: Peaky Blinders
 *           required: true
 *         estat:
 *           type: string
 *           example: Finalizada
 *           required: true
 *         imatge:
 *           type: string
 *           example: https://example.com/peaky-blinders.jpg
 *           required: true
 *         descripcio:
 *           type: string
 *           example: Una historia sobre una pandilla criminal que opera en Birmingham, Inglaterra, después de la Primera Guerra Mundial.
 *           required: true
 *         idioma:
 *           type: string
 *           example: Inglés
 *           required: true
 *         temporadas:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Temporada'
 *           required: true
 *         enllac:
 *           type: string
 *           example: https://www.peakyblinders.com
 *           required: true
 *
 *     Temporada:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 64680c2a1b2c3d4e5f6a7b8c
 *           required: true
 *         temporada:
 *           type: number
 *           example: 1
 *           required: true
 *         estat:
 *           type: string
 *           example: Finalizada
 *           required: true
 *         imatge:
 *           type: string
 *           example: https://example.com/peaky-blinders-season1.jpg
 *           required: true
 *         descripcio:
 *           type: string
 *           example: La temporada 1 de Peaky Blinders sigue a la pandilla Shelby en 1919, a medida que se expanden su imperio criminal en Birmingham.
 *           required: true
 *         enllac:
 *           type: string
 *           example: https://www.peakyblinders.com/season1
 *           required: true
 *         episodis:
 *           type: number
 *           example: 6
 *           required: true
 *         valoracio:
 *           type: number
 *           example: 4.8
 *           required: true
 *         serieOfTempo:
 *           type: string
 *           example: 6467d4c5a9b0c3b7c8d4c5a9
 *           required: false
 *
 */
// END API DOCUMENTATION

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
