const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/employee', {useNewUrlParser: true});
const db = mongoose.connection; 


const employeeSchema = new mongoose.Schema({
    name: String, 
    email: String, 
    eType: String, 
    hourlyRate: Number, 
    totalHour: Number, 
    total: Number
});

var employeeModel = mongoose.model('Employes', employeeSchema);
module.exports = employeeModel;