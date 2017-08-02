var mongoose = require('mongoose');

a = mongoose.connect('mongodb://172.17.0.2:27017/suscribers', function(error){
   if(error){
      throw error; 
   }else{
      console.log('Conectado a MongoDB');
      
   }
});

module.exports = mongoose;