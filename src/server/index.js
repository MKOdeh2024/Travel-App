import express from 'express';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';
import cors from 'cors';
import path from 'path';

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

app.use(express.static('dist'));

// Serve static files from the 'dist' directory


app.get('/', function(req, res) {
    res.sendFile(path.resolve('dist', 'index.html'));
});

app.get('/', (req, res) => {
    let city = req.query.city;
    let date = req.query.date;
    res.json({ message: 'Test endpoint working!' });
});

app.get('/api/keys', (req, res) => {
    res.json({
        geonamesUsername: process.env.geonamesUsername,
        WeatherBitApiKey: process.env.WeatherBitApiKey,
        pixabayApiKey: process.env.pixabayApiKey
    });
});
// Example endpoint
app.get('/test', (req, res) => {
    res.json({ message: 'Test endpoint working!' });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

export default app;