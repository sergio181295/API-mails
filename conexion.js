var mongoose = require('mongoose');
var user = require("./users");

mongoose.connect('mongodb://172.17.0.2:27017/suscribers', function(error){
   if(error){
      throw error; 
   }else{
      console.log('Conectado a MongoDB');
      
   }
});

module.exports = mongoose;

var userSchema = mongoose.Schema({
    userId : {type: String, required : true},
    email : {type : String, required : true}
});

var userModel = mongoose.model('user',userSchema);
user.setModel(userModel);