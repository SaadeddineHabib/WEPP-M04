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

var seriesRenderGetAll = require('./routes/renderRoutes/seriesRender/seriesGetAll')
var seriesRenderGetOne = require('./routes/renderRoutes/seriesRender/seriesGetOne')
var seriesRenderInsertOne = require('./routes/renderRoutes/seriesRender/seriesInsertOne')
var seriesRenderDeleteOne = require('./routes/renderRoutes/seriesRender/seriesDeleteOne')
var seriesRenderPostOne = require('./routes/renderRoutes/seriesRender/seriesPostOne')
var seriesRenderUpdateGet = require('./routes/renderRoutes/seriesRender/seriesUpdateGet')
var seriesRenderUpdatePost = require('./routes/renderRoutes/seriesRender/seriesUpdatePost')
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
 * components:
 *   schemas:
 *     seriesRender:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *           description: ID de la serie (autoincremental)
 *           example: 0
 *         Nom:
 *           type: string
 *           description: Nom de la serie
 *           example: Peaky blinders
 *         Estat:
 *           type: string
 *           description: Estat de la serie
 *           example: finalitzat
 *         Imatge:
 *           type: string
 *           description: URL de la imatge de la serie
 *           example: https://cdn.webshopapp.com/shops/268192/files/433182623/the-peaky-blinders.jpg
 *         Descripcio:
 *           type: string
 *           description: Descripciò de la serie
 *           example: "Peaky Blinders és una sèrie de televisió que segueix una família de gànsters a Birmingham, Anglaterra, després de la Primera Guerra Mundial."
 *         Idioma:
 *           type: string
 *           description: Idioma de la serie
 *           example: Anglès
 *         Enllac:
 *           type: string
 *           description: Enllac de la serie
 *           example: https://m.imdb.com/title/tt2442560/?language=es-es
 *       required:
 *         - id
 *         - Nom
 *         - Imatge
 *         - Estat
 *
 *     temporades:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID de la temporada (autoincremental)
 *           example: 0
 *         IdSerie:
 *           type: integer
 *           description: ID de la serie a la que pertany la temporada
 *           example: 0
 *         Temporada:
 *           type: number
 *           format: int64
 *           description: Número de la temporada
 *           example: 1
 *         Estat:
 *           type: string
 *           description: Estat de la temporada
 *           example: finalitzat
 *         Imatge:
 *           type: string
 *           description: URL de la imatge de la temporada
 *           example: https://m.media-amazon.com/images/M/MV5BMDI0NjZlOWEtOTA5MS00MGExLTk1ZDMtMzk0ZTE3YzYzZGIxXkEyXkFqcGdeQXVyNDg4MjkzNDk@._V1_.jpg
 *         Descripcio:
 *           type: string
 *           description: Descripciò de la temporada
 *           example: Els Peaky Blinders tenen sota el seu control gairebé tot a Birmingham, Anglaterra, però un robatori mal executat podria canviar-ho tot.
 *         Enllac:
 *           type: string
 *           description: Enllac de la temporada
 *           example: https://m.imdb.com/title/tt2471500/?ref_=ttep_ep1
 *         Episodis:
 *           type: number
 *           description: Número de episodios en la temporada
 *           example: https://m.imdb.com/title/tt2471500/?ref_=ttep_ep1
 *         Valoracio:
 *           type: number
 *           description: Valoración de la temporada
 *           example: 8
 *       required:
 *         - id
 *         - IdSerie
 *         - Temporada
 *         - Imatge
 *         - Estat
 */

/**
 * @swagger
 * tags:
 *   - name: temporades
 *     description: Access to all temporades
 *     externalDocs:
 *       description: Find out more
 *       url: /temporades
 *   - name: seriesRender
 *     description: Access to all seriesRender
 *     externalDocs:
 *       description: Find out more
 *       url: /seriesRender
 * paths:
 *   /api/temporades:
 *     get:
 *       tags:
 *         - temporades
 *       summary: Gets temporades list
 *       description: Get all the information of every temporada.
 *       responses:
 *         '200':
 *           description: successful operation
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/temporades'
 *         '500':
 *            description: Internal server error
 *
 *     post:
 *       tags:
 *         - temporades
 *       summary: Add a new temporada to plataform
 *       description: Add a new temporade to plataform
 *       requestBody:
 *         description: Create a new temporada in plataform
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/temporades'
 *         required: true
 *       responses:
 *         '200':
 *           description: Successful operation
 *         '400':
 *           description: A season without a related seriesRender cannot be added or the seriesRender with the id does not exist
 *         '500':
 *           description: Internal server error
 *
 *   /api/temporades/{temporadaId}:
 *     get:
 *       tags:
 *         - temporades
 *       summary: Find temporada by ID
 *       description: Returns a temporada
 *       parameters:
 *         - name: temporadaId
 *           in: path
 *           description: ID of remporada to return
 *           required: true
 *           schema:
 *             type: integer
 *             format: int64
 *       responses:
 *         '200':
 *           description: successful operation
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/temporades'
 *         '400':
 *           description: Invalid ID supplied
 *         '404':
 *           description: Pet not found
 *         '500':
 *           description: Internal server error
 *
 *     put:
 *       tags:
 *         - temporades
 *       summary: Update an existing temporada
 *       description: Update an existing temporada by Id
 *       requestBody:
 *         description: Update an existent temporada in the plataform
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/temporades'
 *         required: true
 *       responses:
 *         '200':
 *           description: Successful operation
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/temporades'
 *         '400':
 *           description: Invalid ID supplied
 *         '404':
 *           description: temporada not found
 *         '500':
 *           description: Internal server error
 *
 *     delete:
 *       tags:
 *         - temporades
 *       summary: Deletes a temporada
 *       description: delete a temporada
 *       parameters:
 *         - name: temporadaId
 *           in: path
 *           description: temporada id to delete
 *           required: true
 *           schema:
 *             type: integer
 *             format: int64
 *       responses:
 *         '200':
 *           description: Successful operation
 *         '404':
 *           description: temporada not found
 *         '400':
 *           description: Invalid temporada value
 *
 *
 *   /api/seriesRender:
 *     get:
 *       tags:
 *         - seriesRender
 *       summary: Gets seriesRender list
 *       description: Get all the information of every seriesRender.
 *       responses:
 *         '200':
 *           description: successful operation
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/seriesRender'
 *         '500':
 *            description: Internal server error
 *
 *     post:
 *       tags:
 *         - seriesRender
 *       summary: Add a new seriesRender to plataform
 *       description: Add a new seriesRender to plataform
 *       requestBody:
 *         description: Create a new seriesRender in plataform
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/seriesRender'
 *         required: true
 *       responses:
 *         '200':
 *           description: Successful operation
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/seriesRender'
 *         '400':
 *           description: A season without a related seriesRender cannot be added or the seriesRender with the id does not exist
 *         '500':
 *           description: Internal server error
 *
 *   /api/seriesRender/{seriesId}:
 *     get:
 *       tags:
 *         - seriesRender
 *       summary: Find temporada by ID
 *       description: Returns a temporada
 *       parameters:
 *         - name: seriesId
 *           in: path
 *           description: ID of remporada to return
 *           required: true
 *           schema:
 *             type: integer
 *             format: int64
 *       responses:
 *         '200':
 *           description: successful operation
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/temporades'
 *         '400':
 *           description: Invalid ID supplied
 *         '404':
 *           description: Pet not found
 *         '500':
 *           description: Internal server error
 *
 *     put:
 *       tags:
 *         - seriesRender
 *       summary: Update an existing temporada
 *       description: Update an existing temporada by Id
 *       requestBody:
 *         description: Update an existent temporada in the plataform
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/temporades'
 *         required: true
 *       responses:
 *         '200':
 *           description: Successful operation
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/temporades'
 *         '400':
 *           description: Invalid ID supplied
 *         '404':
 *           description: temporada not found
 *         '500':
 *           description: Internal server error
 *
 *     delete:
 *       tags:
 *         - seriesRender
 *       summary: Deletes a temporada
 *       description: delete a temporada
 *       parameters:
 *         - name: temporadaId
 *           in: path
 *           description: temporada id to delete
 *           required: true
 *           schema:
 *             type: integer
 *             format: int64
 *       responses:
 *         '200':
 *           description: Successful operation
 *         '404':
 *           description: seriesRender not found
 *         '400':
 *           description: Invalid seriesRender value
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
