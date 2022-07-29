let dName;

if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const port = 3000;
const fetch = require('node-fetch');
import('node-fetch');

app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

app.get('/dinoname', async (request, response) => {
    const dinoNameResponse = await fetch('https://dinoipsum.com/api/?format=json&words=1&paragraphs=1')
    .then(response => response.json())
    .then(data => data)
    .catch(err => console.error('Where did all the dinosaurs go?'));
    console.log(dinoNameResponse);
    response.json(dinoNameResponse);
});

const api_key = process.env.API_KEY;

app.get('/dinoimage', async (request, response) => {
    console.log(request.query.name)
    const fetchApi = await fetch(
        `https://bing-image-search1.p.rapidapi.com/images/search?q=dinosaur&count=100`,
        {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': api_key,
            'X-RapidAPI-Host': 'bing-image-search1.p.rapidapi.com',
            },
        }
    );
    const dinoImageResponse = await fetchApi.json();
    response.json(dinoImageResponse);
});