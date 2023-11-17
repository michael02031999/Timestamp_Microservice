// index.js
// where your node app starts

// init project
var express = require('express');
const port = 5000; 

var app = express();


// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  console.log(res);
  res.sendFile(__dirname + '/views/index.html');
  //res.end(<h1>Hello World motherfucker</h1>)
});


// your first API endpoint... 
app.get("/api", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date", (req, res) => {
  //console.log(req.params);
  //onsole.log("This works");
  console.log(req.params.date);
  console.log(typeof(req.params.date));
  //console.log(Date(req.params))

  if (new Date(req.params.date) == "Invalid Date") {
    console.log("this is unix");

    req.params.date = parseInt(req.params.date)
  }


  const presentDate = new Date(req.params.date);
  console.log(presentDate);

  const utc = presentDate.toUTCString();
  //const easternTime = presentDate.toLocaleString("en-US", {timeZone: "America/New_York"});

  console.log(utc);

  const unix = Math.floor(presentDate.getTime())
 // const utc = easternTime.toUTCString();
  //console.log(utc);
 
  //const dt = Date.parse(req.params)
  return res.status(200).json({
    "unix": unix,
    "utc": utc})
})


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
