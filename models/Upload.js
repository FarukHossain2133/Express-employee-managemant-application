const mongoose =  require('mongoose');
mongoose.connect('mongodb+srv://Faruk:Faruk01936@cluster0-fqsei.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true});

// mongoose.connect('mongodb://localhost:27017/employee', {useNewUrlParser: true});
const db = mongoose.connection;

const uploadSchema = new mongoose.Schema({
    imageName: String
});

const uploadModel =  mongoose.model('uploadImage', uploadSchema);
module.exports = uploadModel;