const express = require('express')
const app=express();
exports.app = app;
app.get('/', function (req, res) {
    res.send('Hello')
  });

app.listen(3000,()=>{
    console.log('server has began');
})
//hello