import express from 'express';
import * as dotenv from 'dotenv';
import { blogRouter } from './routes/blogRoutes.js';

dotenv.config();
const app = express();

app.use(express.json());
app.use(blogRouter);

app.get('/', (req, res) => {
    res.send('Foi');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));