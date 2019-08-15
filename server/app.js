import express from 'express';
import cors from 'cors';

// Create global app object
const app = express();

app.use(cors());

// Normal express config defaults
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => res.json({ status: res.statusCode, message: 'Welcome to Wolfsbane' }));
// Test route
const port = process.env.PORT || 3000;

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Server started on localhost:${port}`));
