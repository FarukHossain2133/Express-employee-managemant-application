var express = require('express');
var router = express.Router();
const empModel = require('../models/Employee')

var employee = empModel.find({}) 
/* GET home page. */
router.get('/', function(req, res, next) {
  employee.exec((err, data) => {
    if(err) throw new Error();
    res.render('index', { title: 'Employee Records' , records: data});
  })
 
});

router.post('/', (req, res, next) => {
  const empDetails = new empModel({
    name: req.body.name,
    email: req.body.email,
    eType: req.body.etype,
    hourlyRate: req.body.hrate,
    totalHour: req.body.thour,
    total: parseInt(req.body.hrate) * parseInt(req.body.thour)
  })
  empDetails.save((err, res1) => {
    if(err) throw error;
    employee.exec((err, data) => {
      if(err) throw new Error();
      res.render('index', { title: 'Employee Records' , records: data});
    })
  })
});


module.exports = router;
