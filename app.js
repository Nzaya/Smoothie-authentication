const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://admin:admin@sharoncluster.duxb0rt.mongodb.net/node-auth';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
app.get('*', checkUser); //apply the checkUser middleware in all get routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));
app.use(authRoutes);

// cookies
//* MaxAge is the time limit here the cookie will expire after 1 day
//* secure means the cookie is only gonna be sent when we have a https connection
//* httpOnly means we can't access the cookie in the javascript 
// app.get('/set-cookies', (req,res) =>{
  // res.setHeader('Set-Cookie', 'newUser=true'); //setting cookie without middleware
//   res.cookie('newUser', false); //using the middleware cookie-parser
  // res.cookie('isEmployee', true, {maxAge: 1000 * 60 * 60 *24, secure:true, httpOnly:true});
//   res.cookie('isEmployee', true, {maxAge: 1000 * 60 * 60 *24, httpOnly:true});

//   res.send('you got the cookies')

// });

// app.get('/read-cookies', (req,res) =>{
//   const cookies = req.cookies;
//   console.log(cookies.newUser); //to grab a specific cookie

//   res.json(cookies);

// });
