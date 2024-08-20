import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(express.static('dist'));

app.get('/', (req, res) => {
    res.sendFile(path.resolve('dist/index.html'));
});

// Example endpoint
app.get('/test', (req, res) => {
    res.json({ message: 'Test endpoint working!' });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

export default app;