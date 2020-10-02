var mongoUtil = require( './mongoUtil' );
const express = require('express');
let bodyParser = require('body-parser');

let jwt = require('jsonwebtoken');
let config = require('./config');
let middleware = require('./middleware');

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

class HandlerGenerator {
    login (req, res) {
      let username = req.body.username;
      let password = req.body.password;
      // For the given username fetch user from DB
      let mockedUsername = 'admin';
      let mockedPassword = 'admin@123$';
  
      if (username && password) {
        if (username === mockedUsername && password === mockedPassword) {
          let token = jwt.sign({username: username},
            config.secret,
            { expiresIn: '1hr' // expires in 1 hour
            }
          );
          // return the JWT token for the future API calls
          res.json({
            success: true,
            message: 'Authentication successful!',
            token: token
          });
        } else {
          res.send(403).json({
            success: false,
            message: 'Incorrect username or password'
          });
        }
      } else {
        res.send(400).json({
          success: false,
          message: 'Authentication failed! Please check the request'
        });
      }
    }
    index (req, res) {
      res.json({
        success: true,
        message: 'Index page'
      });
    }
}
  

mongoUtil.connectToServer(( err, client ) => {
    if (err) console.log(err);
    let handlers = new HandlerGenerator();
    // HomePage Route
    app.get('/', (req, res) => {
        res.send("Hello World ! What do u want to check?")
    })
    app.post('/login', handlers.login);
    // Ventilators Routes
    const ventilatorRoutes = require('./routes/ventilators');
    // Hospitals Routes
    const hospitalRoutes = require('./routes/hospitals');
    app.use('/hospitals', middleware.checkToken, hospitalRoutes);
    app.use('/ventilators', middleware.checkToken, ventilatorRoutes);
});


// Port number
app.listen(1234);