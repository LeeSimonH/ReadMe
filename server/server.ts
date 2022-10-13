const path = require('path');
const express = require('express');
const app = express();
const PORT: number = 5173;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// import routers
const authRouter = require('./routes/authRouter');

const authController = require('./controllers/authController');

// handle requests for static files
app.use(express.static(path.resolve(__dirname, '../public')));

// server routing
app.use('/auth', authRouter);


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