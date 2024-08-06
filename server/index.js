import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';


import { blogRouter } from './routes/blogRoutes.js';
import { authRouter } from './routes/authRoutes.js';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')));

app.use(blogRouter);
app.use(authRouter);

app.get('/', (req, res) => {
    res.send('Foi');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));