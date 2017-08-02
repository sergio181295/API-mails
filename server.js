var express    = require('express');        
var app        = express();                 
var bodyParser = require('body-parser');
var request = require('superagent');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port =8080;       
var router = express.Router();           

router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

//DATOS QUE SOLICITA MAILCHIMP
var mailchimpInstance   = 'us16';
var listUniqueId        = '093b169080';
var mailchimpApiKey     = '2d4b32b10a50a205412f6bcfd88fd2de-us16';

router.post('/signup', function (req, res) {
    request
        .post('https://' + mailchimpInstance + '.api.mailchimp.com/3.0/lists/' + listUniqueId + '/members/')
        .set('Content-Type', 'application/json;charset=utf-8')
        .set('Authorization', 'Basic ' + new Buffer('any:' + mailchimpApiKey ).toString('base64'))
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
                res.send('Signed Up');
                console.log(response.body);
              } else if(response.body.title === "Member Exists"){
                res.send('Member Exists');
              }else{
                res.send('Sign Up Failed');
              }
          });
});

var conexion = require("./conexion");


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

app.listen(port);
console.log('Escuchando puerto: ' + port);