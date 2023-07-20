// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api', (req, res)=> {
    res.json({
      unix: Date.now(),
      utc: new Date().toUTCString()
    })
})

// your first API endpoint... 
app.get("/api/hello", function(req, res) {
  res.json({ greeting: 'hello API' });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});

app.get('/api/:date', (req, res) => {
  const request = req.params.date;
  
  const date = new Date(request);
  console.log("original date: ", date);
  let newDate = new Date(date).toUTCString();
  let timeStamp = new Date(date);
  console.log("timeStamp date: ", !isNaN(timeStamp));
  
  const unixT= timeStamp.getTime();
  
  console.log("req.unix", unixT);
  if (!isNaN(timeStamp)) {
    res.json({
      unix: unixT,
      utc: newDate
    })
  } else {
    let maDate = new Date(request * 1);
    console.log("maDate: ", !isNaN(maDate));
    if (!isNaN(maDate)) {
      res.json({
        unix: request * 1,
        utc: maDate.toUTCString()
      })
    } else {
      res.json({
        error: "Invalid Date"
      })
    }
  }
})

