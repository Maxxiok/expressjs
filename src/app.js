const express = require('express');
const path = require('path');
const hbs = require('hbs');
const location = require('./utils/location');

const app = express();

const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname,'../public')));

app.set('view engine', 'hbs');

app.set('views', path.join(__dirname, "../templates/views"));

hbs.registerPartials(path.join(__dirname, "../templates/partials"));

app.get('', (req, resp)=>{
    resp.render('index', {
        title: 'WEATHER!',
        name: 'Max K'
    });
});

app.get('/about', (req, resp)=>{
    resp.render('about', {
        title: 'About',
        name: 'Max K'
    });
});

app.get('/help', (req, resp)=>{
    resp.render('help', {
        title: 'Help',
        helpTxt: 'Call 777 when assistance is required.',
        name: 'Max K'
    });
});

app.get('/weather', (req, resp)=> {
    if (!req.query.address) {
        return resp.send({
            error: 'Please provide address param'
        });
    } else {
        const loc = location(req.query.address).then((rsp)=> {
            if (!rsp.error) {
                resp.send({
                    forecast: rsp.forecast,
                    address: req.query.address,
                    location: rsp.location
                });
            } else {
                resp.send({
                    error: rsp.error
                });
            }
        });
    }

});

app.get('/products', (req, resp)=> {
    if (!req.query.search) {
        return resp.send({
            error: 'Please provide search param'
        });
    }
    resp.send({
        products: []
    });
});

app.get('/help/*', (req, resp)=> {
    resp.render('404', {
        title: 'Not Found',
        errorMsg: 'Help article not found',
        name: 'Max K'
    });
});

app.get('*', (req, resp)=> {
    resp.render('404', {
        title: 'Not Found',
        errorMsg: 'Page Not Found',
        name: 'Max K'
    });
});

app.listen(port, ()=>{
    console.log('Started on port '+port);
});
