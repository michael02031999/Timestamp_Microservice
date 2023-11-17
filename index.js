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
app.get("/api/hello", function(req, res) {
  res.json({ greeting: 'hello API' });
});


app.get("/api/", (req, res)=> {
  let date = new Date();
  res.json({
    "unix": date.getTime(),
    "utc": date.toUTCString()
  })

})

app.get("/api/:date", (req, res) => {

  if (new Date(req.params.date) == "Invalid Date") {

    if (isNaN(parseInt(req.params.date))) {

      return res.json({ error: "Invalid Date" });

    }

    req.params.date = parseInt(req.params.date)
  }


  const presentDate = new Date(req.params.date);

  const utc = presentDate.toUTCString();

  const unix = Math.floor(presentDate.getTime())

  return res.status(200).json({
    unix: unix,
    utc: utc
  })
})


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
