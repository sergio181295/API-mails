var country;

exports.setModel = function(model){
    country = model;
};

exports.create = function(req){
   var newcountry = new country({
       country : req.body.country,
       key : req.body.key,
       globalKey : req.body.globalKey
   });
    // console.log(req.body.countryId);
    // console.log(req.body.key);
   return newcountry.save(function(error, document){
       if(error){
           return [];
       }else{
            return document;
       }

   }); 
};

exports.find = function(query){
   return country.find({$or:[{'country':query.country},{'key':query.key}]},function(error, countries){
       if(error){
           return [];
       }else{
           return countries;
       }
   });
};

exports.update = function(req){
    return country.findOne({'country':req.body.country},function(error, country){
       if(error){
           return [];
       }else{
           country.country = req.body.country;
           country.key = req.body.key;     
           return country.save(function(error, country){
               if(error){
                   return [];
               }else{
                   return country;
               }
           });
       }
   });
};

exports.delete = function(req){
    return country.remove({country:req.body.country},function(error){
        if(error){
            return false;
        }else{
            return true;
        }
    });
};