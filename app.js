// Dependences
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const help = require('./helper.js');
const middlewares = require('./middlewares');


// Middlewares
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use("/public", express.static(__dirname + '/public/'));
app.use("/sw.js", express.static(__dirname + '/public/js/sw.js'));
app.use(middlewares.httpRedirect);




//Route
app.get('/favicon.ico', async function (req, res) {
	res.redirect(301, '/public/favicon.ico')
});

app.get('/', async function (req, res) {

    let toSend = await help.compileAll([
		{ part: 'index' }		
    ]);

    res.send(toSend);

});


app.listen(process.env.PORT || 3000, '0.0.0.0', function () {
    console.log('Running')
  });