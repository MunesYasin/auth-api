'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const v1=require('./routes/v1');
const v2=require('./routes/v2');

const errorHandler = require('./error-handlers/500.js');
const notFound = require('./error-handlers/404.js');
const authRoutes = require('./routes/routes');

const app = express();

app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(authRoutes);
app.use('/api/v1',v1);
app.use('/api/v2',v2);

app.get('/test',(req,res)=>{
  res.status(200).send('hello ');
})

app.use(notFound);
app.use(errorHandler);

module.exports = {
  server: app,
  start: (port) => {
    if (!port) {
      throw new Error("Missing Port");
    }
    app.listen(port, () => console.log(`Listening on ${port}`));
  },
};
