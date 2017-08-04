/****************** MONGOOSE ********************/
var mongoose = require('mongoose');
var configDb = require("config").get("api").get("database");
mongoose.connect("mongodb://"+configDb.host+":"+configDb.port+"/"+configDb.dbName, function(error){
   if(error){
      throw error; 
   }else{
      console.log('Conectado a MongoDB');
      
   }
});

exports.conexion = mongoose;

/****************** USER ********************/
var user = require("./collections/users");
var userSchema = mongoose.Schema({
    userId : {type : Number, required : true},
    email : {type : String, required : true},
    country: {type : String, required : true},
    status : {type : Object, required : true}
});

var userModel = mongoose.model('user',userSchema);
user.setModel(userModel);

exports.user = user;

/****************** COUNTRY ********************/
var country = require("./collections/country");
var countrySchema = mongoose.Schema({
    country : {type : String, required : true},
    key: {type : String, required : true},
    globalKey: {type : String, required : true}
});

var countryModel = mongoose.model('country',countrySchema);
country.setModel(countryModel);

exports.country = country;
