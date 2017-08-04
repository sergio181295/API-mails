var user;

exports.setModel = function(model){
    user = model;
};

exports.create = function(req,status){
   var newUser = new user({
       userId : req.body.userId,
       email : req.body.email,
       status : status
   });
    console.log(req.body.userId);
    console.log(req.body.email);
   return newUser.save(function(error, document){
       if(error){
           return [];
       }else{
            return document;
       }

   }); 
};

exports.find = function(query, res){
   return user.find({$or:[{'userId':query.userId},{'email':query.email}]},function(error, users){
       if(error){
           return [];
       }else{
           return users;
       }
   });
};