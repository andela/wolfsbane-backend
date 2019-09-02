import { config } from 'dotenv';
import express from 'express';
import cors from 'cors';
import router from './routes';

config();

// Create global app object
const app = express();

app.use(cors());

// Normal express config defaults
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const isProduction = process.env.NODE_ENV === 'production';

// Test route
app.get('/', (req, res) => res.json({ status: res.statusCode, message: 'Welcome to Wolfsbane' }));

app.use(router);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (!isProduction) {
  app.use((err, req, res) => {
    // eslint-disable-next-line no-console
    console.log(err.stack);
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
        error: err
      }
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res) => {
  res.status(err.status || 500);
  res.json({
    errors: {
      message: err.message,
      error: {}
    }
  });
});

const port = process.env.PORT || 3000;

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Server started on localhost:${port}`));

export default app;
