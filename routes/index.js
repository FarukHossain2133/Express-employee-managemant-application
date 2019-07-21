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

router.post('/search', (req, res, next) => {
  const filterName = req.body.filtername;
  const filterEmail = req.body.filteremail;
  const filtereType = req.body.filteretype;

  if(filterName !== '' && filterEmail !== '' && filtereType !== ''){
    var filterParam = { 
      $and: [{name: filterName},
        {$and: [{email: filterEmail}, {eType: filtereType}]}
    ]}

  }else if(filterName !== '' && filterEmail ==='' && filtereType !== ''){
    var filterParam = { 
      $and: [{name: filterName}, {eType: filtereType}]}

  }else if(filterName === '' && filterEmail !== '' && filtereType !== ''){
     var filterParam = { $and: [{email: filterEmail}, {eType: filtereType}]}

    }else if(filterName === '' && filterEmail === '' && filtereType !== ''){
      var filterParam =  {eType: filtereType}
 
     }else {
      var filterParam = {}
    }
    
  const employeeFilter = empModel.find(filterParam);
  

  employeeFilter.exec((err, data) => {
  if(err) throw err;
  res.render('index', {title: 'Search Result', records: data})
})
})


module.exports = router;
