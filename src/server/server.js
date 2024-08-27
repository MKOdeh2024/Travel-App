const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('dist'));

const port = 3000;

app.get('/', (req, res) => {
    res.sendFile('dist/index.html')
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});