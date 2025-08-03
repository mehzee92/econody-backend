var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var app = express();

// ROUTERS
var indexRouter = require('./routes/index');
var totpRouter = require('./routes/totp');
var authRouter = require('./routes/auth');
var dashboardRouter = require('./routes/dashboard');
var authAdminRouter = require('./routes/auth-admin');
var adminsRouter = require('./routes/admins');
var assetsRouter = require('./routes/assets');
var myAssetsRouter = require('./routes/my-assets');
var myStakesRouter = require('./routes/my-stakes');
var marketplaceRouter = require('./routes/marketplace');
var listingsRouter = require('./routes/listings');       // ✅ New
var categoriesRouter = require('./routes/categories');   // ✅ New
var uploadRouter = require('./routes/upload');           // ✅ New
var galleryRouter = require('./routes/gallery');    
var myVestings = require('./routes/my-vesting');  


// ALLOWED ORIGINS FOR CORS
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:3002',
  'http://localhost:3003',
  'http://localhost:3004',
  'http://localhost:3005',
  'http://localhost:3006',
  'http://localhost:3007',
  'http://localhost:3008',
  'https://admin.charcoin.org',
  'https://dapp.charcoin.org',
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // Allow Postman/curl
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Preflight support

// VIEW ENGINE SETUP
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// MIDDLEWARE
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// LOG ALL REQUESTS
app.use((req, res, next) => {
  console.log(`Request=> DTG: [${new Date().toISOString()}], Method: ${req.method}  Path:${req.url}`);
  next();
});


// ROUTES
app.use('/', indexRouter);
app.use('/api/totp', totpRouter);
app.use('/api/auth', authRouter);
app.use('/api/auth-admin', authAdminRouter);
app.use('/api/dashboard', dashboardRouter);
app.use('/api/admins', adminsRouter);
app.use('/api/assets', assetsRouter);
app.use('/api/my-assets', myAssetsRouter);
app.use('/api/my-stakes', myStakesRouter);
app.use('/api/my-vestings', myVestings);


app.use('/api/marketplace', marketplaceRouter);
app.use('/api/listings', listingsRouter);       
app.use('/api/categories', categoriesRouter); 
app.use('/api/gallery', galleryRouter); 

app.use('/api/upload', uploadRouter);           


app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: 'The requested resource was not found.',
  });
});



// ERROR HANDLER
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
