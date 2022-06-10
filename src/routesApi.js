const {Router, request} = require('express');
const router = Router();

const mysql = require("mysql");
var mysqlConecction = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "pruebanode",
  });
  
  mysqlConecction.connect((err) => {
    if (!err) console.log("Coneccion Exitoxa");
    else
      console.log(
        "Error de coneccion \n Error : " + JSON.stringify(err, undefined, 2)
      );
  });
  
  router.get('/consulta', (req, res) => {
    mysqlConecction.query("SELECT * FROM usuarios", (err, rows, fields) => {
      if (!err) 
       res.send(rows);
      else 
      console.log(err);
    });
  
  });

  router.get('/consultaOrderByName', (req, res) => {
    mysqlConecction.query("SELECT * FROM usuarios ORDER BY username", (err, rows, fields) => {
      if (!err) 
       res.send(rows);
      else 
      console.log(err);
    });
  
  });
  
  router.get('/consultaByType/:type', (req, res) => {
    var type = req.param('type');
    mysqlConecction.query("SELECT * FROM usuarios WHERE type=?",type, (err, rows, fields) => {
      if (!err) 
       res.send(rows);
      else 
      console.log(err);
    });
  
  });
  
  router.post('/eliminar', (req, res) => {
    var {id,status} =req.body;
    mysqlConecction.query("UPDATE usuarios SET status = ? WHERE (id = ?)", [status,id], (err, rows, fields) => {
      if (!err) 
       res.send('Deleted Successfully');
      else 
      console.log(err);
    });
  
  });
  
  router.post('/insertar', (req, res) => {
    var {username, password, complete_name, email, type} =req.body;
    mysqlConecction.query("INSERT INTO usuarios (username, password, complete_name, email, type) VALUES (?,?,?,?,?)", [username, password, complete_name, email, type],function(err, rows, fields){
      if (!err) 
       res.send('Insert Successfully');
      else 
      console.log(err);
    });
  
  });
  
  
  router.post('/actualizar', (req, res) => {
    var {id,username,password} =req.body;
    mysqlConecction.query("UPDATE usuarios SET username = ?,password = ? WHERE (id = ?)", [username,password,id],function(err, rows, fields){
      if (!err) 
       res.send('Update Successfully');
      else 
      console.log(err);
    });
  
  });

module.exports = router;