const express = require('express');
const router = express.Router();
const multer = require('multer')
const path = require('path')
const empModel = require('../models/Employee')

const employee = empModel.find({}) 


// File Upload 
router.use(express.static(__dirname+'./public'));
console.log(__dirname)
var Storage = multer.diskStorage({
  destination : './public/uploads',
  filename:(req, file, cb) => {
    cb(null, file.fieldname + '_' + Date.now()+path.extname(file.originalname) )
  }
});

var upload = multer({
  storage: Storage
}).single('file');

/* GET home page. */
router.post('/upload', upload, (req, res, next)=>{
  const success = req.file.filename+' uploade successfully';
  res.render('upload-file', {title: 'Upload Page', success: success})
})
router.get('/upload', (req, res, next)=>{
  res.render('upload-file', {title: 'Upload Page', success: ''})
})

router.get('/', function(req, res, next) {
  employee.exec((err, data) => {
    if(err) throw new Error();
    res.render('index', { title: 'Employee Records' , records: data, success: ''});
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
      res.render('index', { title: 'Employee Records' , records: data, success: 'Data inserted successfully'});
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

router.get('/delete/:id', (req, res, next) => {
  const id = req.params.id;
  const del =  empModel.findByIdAndDelete(id);
  del.exec(function(err, data){
    if(err) throw err;
    employee.exec((err, data) => {
      if(err) throw new Error();
      res.render('index', { title: 'Employee Records' , records: data, success: 'Data deleted successfully'});
  })
})
});

router.get('/edit/:id', function(req, res, next) {
  const id = req.params.id;
  const edit =  empModel.findById(id);

  edit.exec((err, data) => {
    if(err) throw new Error();
    res.render('edit', { title: 'Edit Employee Records' , records: data});
    console.log(data)
  })
});

router.post('/update', function(req, res, next) {
  
  const update =  empModel.findByIdAndUpdate(req.body.id, {
    name: req.body.name,
    email: req.body.email,
    eType: req.body.etype,
    hourlyRate: req.body.hrate,
    totalHour: req.body.thour,
    total: parseInt(req.body.hrate) * parseInt(req.body.thour)
  });

  update.exec((err, data) => {
    if(err) throw err;
  })
  employee.exec((err, data) => {
      if(err) throw new Error();
      res.render('index', { title: 'Employee Records' , records: data, success: 'Data updated successfully'});
    
    // res.redirect('/');
    // console.log(data)
  })
});


module.exports = router;
