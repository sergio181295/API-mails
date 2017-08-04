var express    = require('express');        
var app        = express();                 
var request = require('superagent');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var router = express.Router();           
var port =8080;       

var configMailchimp = require("config").get("api").get("mailchimp");

var db = require("./database/db");

router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

/******************** /SIGNUP ************************/
router.post('/signup', function (req, res) {
    request
        .post('https://' + configMailchimp.instance + '.api.mailchimp.com/3.0/lists/' + configMailchimp.listId + '/members/')
        .set('Content-Type', 'application/json;charset=utf-8')
        .set('Authorization', 'Basic ' + new Buffer('any:' + configMailchimp.apiKey ).toString('base64'))
        .send({
          'email_address': req.body.email,
          'status': 'subscribed',
          'merge_fields': {
            'FNAME': req.body.firstName,
            'LNAME': req.body.lastName
          }
        })
            .end(function(err, response) {
              if (response.status < 300 ) {
                db.user.create(req,response.body)
                .then(function(a){
                  res.send("New user added");
                  // res.send(a);
                })
                .catch(function(){
                  res.send("Error inserting user into the database.");
                }); 
              } else if(response.body.title === "Member Exists"){
                res.send('Member Exists');
              }else{
                res.send('Sign Up Failed');
                console.log(response.body);
              }
          });
});

/******************** /FIND ************************/
router.get('/find',function(req,res){
  db.user.find(req.query)
  .then(function(a){
    res.send(a);
  })
  // res.send(req.query);
});

/******************** /LIST ************************/
router.post("/list",function(req, res){
  // console.log(req.body);
  db.country.create(req)
  .then(function(a){
    //res.send(a);
    res.send("New country added.");
  })
  .catch(function(){
    res.send("New country failed.");
  });  
});

router.put("/list",function(req,res){
  db.country.update(req)
  .then(function(a){
    res.send("Country updated.");
    // res.send(a);
  })
  .catch(function(a){
    res.send("Countre update failed.");
    // res.send(a);
  });
});

router.delete("/list", function(req,res){
  db.country.delete(req)
  .then(function(a){
    res.send("Country deleted.");
    // res.send(a);
  })
  .catch(function(a){
    res.send("Countre deleted failed.");
    // res.send(a);
  });
});




// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

app.listen(port);
console.log('Escuchando puerto: ' + port);