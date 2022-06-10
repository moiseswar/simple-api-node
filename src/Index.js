const express = require('express');
const app= express();

const morgan = require('morgan');
const cors  = require('cors');

//configuracion
app.use(cors());
app.set('port', 3000);

app.use(morgan());
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());
app.use(require('./routesApi'))


app.listen(3000, () =>{
    console.log("Servicio puerto 3000");
})