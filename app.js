const express = require('express');
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors     = require("cors");
const path  = require('path');
var https = require('https');
var fs = require('fs');
dotenv.config();

var options = {
  //  key: fs.readFileSync('../../ssl/privatekey.key'),
  //  cert: fs.readFileSync('../../ssl/certificate.pem')
};

// Connect to db
mongoose.connect('mongodb://localhost:27017/xpheno_db', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },(err) => {
    if(err) {
      console.log('connection err', err);
    } else {
      console.log('Database connected');
    }
});

// import routes
const BrandRoutes   = require("./routes/employee/employee");

app.use(express.json());
app.use(cors());

app.use("/api/employee",BrandRoutes);

app.use('/public/', express.static(path.join(__dirname, 'public')));

// simple route
app.get("/", (req, res) => {
  res.send(
    `<h1 style='text-align: center'>
          Wellcome to Myadmin Backend 
          <br><br>
          <b style="font-size: 182px;">😃👻</b>
      </h1>`
  );
});

// https.createServer(options, app).listen(3004,() => console.log("App running in port 3004 !"));

app.listen(3004,() => console.log("App running in port 3004 !"));
