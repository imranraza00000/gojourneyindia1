const express = require('express');
const tour = express();


tour.get('/golden_triangle', (req, res) => {
    res.render('golden_triangle')
});

tour.get('/traditional_rajasthan', (req, res) => {
    res.render('traditional_rajasthan')
});

tour.get('/kashmir', (req, res) => {
    res.render('kashmir')
});




module.exports = tour;
