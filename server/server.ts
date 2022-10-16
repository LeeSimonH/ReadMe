const fs = require('fs');
const path = require('path');
const http = require('http');
const https = require('https');
const url = require('url');
const opn = require('open');
const destroyer = require('server-destroy')
const express = require('express');
const app = express();
const cors = require('cors');

// const PORT: number = 5173;


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// import routers
// const authRouter = require('./routes/auth-router');

// import controllers
// const authController = require('./controllers/auth-controller');

// handle requests for static files
app.use(express.static(path.resolve(__dirname, '../public')));

const { PORT = 5173 } = process.env;

// server routing
// app.use('/auth', authRouter);


// catch-all route handler for any requests to an unknown route
app.use((req, res) => res.status(404).send('Sorry, this page does not exist.'));

//global eror handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`server listening on *:${PORT}`);
});