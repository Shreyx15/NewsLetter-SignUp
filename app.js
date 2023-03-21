const express = require("express");
const app = express();
const bodyParser = require("body-parser",);
const https = require("https");

const { urlencoded } = require("body-parser");
const { url } = require("inspector");
const { response } = require("express");
const { sendMail } = require('./sendmail');
const { sendsms } = require('./sendSMS');
const { error } = require("console");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function (req, res) {
    const Fname = req.body.Firstname;
    const Lname = req.body.Lastname;
    const Email = req.body.email;
    console.log(Fname, Lname, Email);

    var data = {
        members: [
            {
                email_address: Email,
                status: "subscribed",
                merge_fields: {
                    FNAME: Fname,
                    LNAME: Lname
                }
            }
        ]
    };



    const jSONdata = JSON.stringify(data);
    const url = "https://us8.api.mailchimp.com/3.0/lists/407527eb4c";

    const options = {
        method: "POST",
        auth: "Shrey1:5cd6eb3538bf116b762ef14db1341af8-us8"
    };

    const request = https.request(url, options, function (response) {

        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
            sendMail();
            // sendsms();

        }
        else {
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data", function (data) {
            console.log(JSON.parse(data));
        })
    });
    request.write(jSONdata);
    request.end();


});

app.post("/failure", function (req, res) {
    res.redirect("/");
});

app.get('/getusers', function (req, res) {

    const API_KEY = "5cd6eb3538bf116b762ef14db1341af8-us8";
    const options = {
        protocol: 'https:',
        host: "us8.api.mailchimp.com",
        path: '/3.0/lists/407527eb4c',
        method: "GET",
        headers: {
            'Authorization': `apikey ${API_KEY}`,
            'Content-Type': 'application/json'
        }
    }

    const request = https.request(options, (response) => {
        console.log(response.statusCode);
        response.on("data", function (data) {
            process.stdout.write(data);
        })
    });

    request.on('error', (error) => {
        console.log(error);
    });

    request.end();
});

app.listen(process.env.PORT || 3000, function () {
    console.log("port 3000 is running now");
})

// Audience ID  - 407527eb4c
// key - eaa3a90482c484d3ee5c00186782bf8d-us8