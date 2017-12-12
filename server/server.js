var express = require('express');
var app = express();
var cors = require('cors')
var bodyParser = require('body-parser');
var comments = require('./comments.json');
var fs = require('fs');

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}


app.get('/comments', function (req, res) {
    const { order, dir, limit } = req.query;
    let items = comments.map(item => item);
    if (order && dir) {
        let fn = (prev, next) => +prev[order] - +next[order];
        if (dir == 'desc') {
            fn = (prev, next) => +next[order] - +prev[order];
        }
        items.sort(fn);
    }
    res.json({
      items: items.slice(0, limit || 5),
      total: items.length
    });
});


app.post('/comments', function (req, res) {
    const { parentId, text } = req.body;
    comments.push({
        body: text,
        parentId,
        rating: 0,
        email: 'anonymous@gmail.com',
        name: 'Anonymous User',
        id: comments.length + 1
    });

    fs.writeFile('./comments.json', JSON.stringify(comments), err => {
        res.json({});
    });
});


app.post('/comments/vote', function (req, res) {
    const { cid } = req.body;
    comments.forEach(item => {
        if (item.id === cid) {
            item.rating = item.rating || 0;
            item.rating += req.body.operation;
        }
    })
    fs.writeFile('./comments.json', JSON.stringify(comments), err => {
        res.json({});
    });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
