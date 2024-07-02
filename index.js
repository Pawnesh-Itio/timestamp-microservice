var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// DATE & Timestamp API ENDPOINT
app.get("/api/:date?", (req, res) => {
   const { date } = req.params;
   let inputDate;
   if (!date) {
    inputDate = new Date();
  } else {
    // Try to parse the provided date
    inputDate = isNaN(date) ? new Date(date) : new Date(parseInt(date, 10));
  }
  if (isNaN(inputDate.getTime())) {
    // If the date is invalid, return an error
    return res.json({ error: "Invalid Date" });
  }
  // Respond with the date in the required format
  res.json({
    unix: inputDate.getTime(),
    utc: inputDate.toUTCString()
  });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on http://localhost:' + listener.address().port);
});
