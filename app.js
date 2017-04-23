var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/:time', function(req, res){
  var str = req.params.time;
  var x = JSON.stringify(checkInputDate(str));
  res.send(x);
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});

function checkInputDate(str){
    var output = {"unixTime": 0, "naturalDate": 0};
    var p = Date.parse(str);
    if(isNaN(p)){
      output.unixTime = Number(str);
      output.naturalDate = convertUnixToNatural(str);
    } else {
      str = str.replace(/\"/g, "");
      output.naturalDate = str;
      output.unixTime = Date.parse(str);
    }
    return output;
}

function convertUnixToNatural(timeInMs){
    timeInMs = parseFloat(timeInMs);
    var d = new Date(timeInMs);
    var year = d.getFullYear();
    var month = months[d.getMonth()];
    var day = days[d.getDay()];
    var date = d.getDate();
    var ts = d.toTimeString();
    var naturalDate = day + " " + month + " " + date + " " + year + " " + ts;
    return naturalDate;
}


