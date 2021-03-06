"use strict";
const dotenv = require('dotenv');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const Router = require('./src/routes/Router');
const mongodb = require('mongodb');
const compression = require('compression');
const cors = require('cors');
const body_parser = require('body-parser');
const db = require('./src/mongo.helper');
dotenv.config();
const { DB_NAME, DB_COLLECTION } = process.env;
const app = express();
db.initialize(DB_NAME, DB_COLLECTION);
app.set('port', process.env.PORT || 3000);
app.use(morgan('dev'));
app.use(express.json());
app.use(body_parser.json());
// app.use(helmet())
// app.use(compression())
// app.use(cors())
app.use(Router);
const port = app.get('port');
app.listen(port, () => {
    console.log(`Server listening at port: ${port}`);
});
