var country;
var request = require('superagent');

exports.setModel = function (model) {
    country = model;
};

exports.create = function (req) {
    request
        .post('https://' + configMailchimp.instance + '.api.mailchimp.com/3.0/lists/')
        .set('Content-Type', 'application/json;charset=utf-8')
        .set('Authorization', 'Basic ' + new Buffer('any:' + configMailchimp.apiKey).toString('base64'))
        .send({
            'name': req.body.name,
            'contact': "noreply@pidelorapido.com",
            "permission_reminder": "You are receiving this email because you registered to PideloRapido services.",
            'campaign_defaults': {
                'from_name': "PideloRapido",
                'from_email': "noreply@pidelorapido.com",
                "subject": "PideloRapido",
                "language": "es"
            },
            'email_type_option': true
        })
        .end(function (err, response) {
            if (response.status < 300) {
                var newcountry = new country({
                    country: req.body.country,
                    key: req.body.key,
                    globalKey: req.body.globalKey
                });
                // console.log(req.body.countryId);
                // console.log(req.body.key);
                return newcountry.save(function (error, document) {
                    if (error) {
                        return [];
                    } else {
                        return document;
                    }

                });
            } else if (response.body.title === "List Exists") {
                res.send('List Exists');
            } else {
                res.send('List created failed');
                console.log(response.body);
            }
        });


};

exports.getKey = function (country1) {
    return new Promise(function (resolve, reject) {
        return country.findOne({ 'country': country1 }, function (error, country) {
            if (error) {
                return reject();
            } else {
                return resolve(country.key);
            }
        });
    });
};

exports.update = function (req) {
    return country.findOne({ 'country': req.body.country }, function (error, country) {
        if (error) {
            return [];
        } else {
            country.country = req.body.country;
            country.key = req.body.key;
            return country.save(function (error, country) {
                if (error) {
                    return [];
                } else {
                    return country;
                }
            });
        }
    });
};

exports.delete = function (req) {
    return country.remove({ country: req.body.country }, function (error) {
        if (error) {
            return false;
        } else {
            return true;
        }
    });
};