const express = require('express');
const swaggerUI = require('swagger-ui-express');
const swaggerDoc = require('../swagger.json');
import bodyParser from 'body-parser';
import { RegisterRoutes } from '../build/routes';
var cors =require('cors')
export const app = express();
const multer= require('multer');


app.use(cors());

app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );

// configure multer
export const upload = multer({
  dest: 'uploads/',
  file : 'test'
});



app.use(bodyParser.json()); 

// #we call the generated swagger documentation
// #We start swaggerUi express server and setup the documentation   
app.use('/doc', swaggerUI.serve,   swaggerUI.setup(swaggerDoc));
// app.use('/user/fileUpload',upload('x'));
RegisterRoutes(app);