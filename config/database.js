const mongoose = require('mongoose');
const mongoDB = 'mongodb+srv://Huzaifa:h12356ashah@cluster0.ieadc.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
module.exports = mongoose;