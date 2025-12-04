var express = require('express');
var router = express.Router();
const passport = require('passport');
let DB = require('../config/db');
let userModel = require('../models/user');
const e = require('connect-flash');
let User = userModel.User;

/* GET home page. (Ensures that site opens on home)*/
router.get('/', function (req, res, next) {
  res.render('home', { title: 'Home',
    displayName: req.user?req.user.displayName:""
   });
});

/* GET home page. */
router.get('/home', function (req, res, next) {
  res.render('home', { title: 'Home',displayName: req.user?req.user.displayName:"" });
});

/* GET about page. */
router.get('/about', function (req, res, next) {
  res.render('about', { title: 'About',displayName: req.user?req.user.displayName:"" });
});

// Get method for login
router.get('/login', function (req, res, next) {
  if (!req.user) {
    res.render('auth/login',
      {
        title: 'Login',
        message: req.flash('loginMessage')
      }

    )
  }
  else {
    return res.redirect("/")
  }
});

// Post method for login
router.post('/login', function (req, res, next) {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      req.flash('loginMessage', 'AuthenticationError');
      return res.redirect('/login');
    }
    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.redirect("/tasks")
    })
  })(req, res, next)
});

// Get method for register
router.get('/register', function (req, res, next) {
  if (!req.user) {
    res.render('auth/register',
      {
        title: 'Register',
        message: req.flash('registerMessage')
      }

    )
  }
  else {
    return res.redirect("/")
  }
});

// Post method for register
router.post('/register', function (req, res, next) {
  let newUser = new User({
    username: req.body.username,
    //password: req.body.password,
    email: req.body.email,
    displayName: req.body.displayName
  })
  User.register(newUser, req.body.password, (err) => {
    if (err) {
      console.log("Error:Inserting the new user");
      if (err.name == "UserExistingError") {
        req.flash('registerMessage', 'Registration Error:User already Exist');
      }
      return res.render('auth/register',
        {
          title: 'Register',
          message: req.flash('registerMessage')
        }
      )
    }
    else {
      return passport.authenticate('local')(req, res, () => {
        res.redirect("/tasks");
      })
    }
  })
});

// Get method for logout
router.get('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err)
    }
  })
  res.redirect("/");
})

// Get method for Change Password 
router.get('/change-password', (req, res) => {
  if (!req.user) return res.redirect('/login');
  res.render('auth/changePassword', { 
    title: 'Change Password', 
    message: null 
  });
});

// Post method for Change 
router.post('/change-password', async (req, res) => {
  if (!req.user) return res.redirect('/login');

  const { currentPassword, newPassword, confirmPassword } = req.body;

  if (newPassword !== confirmPassword) {
    return res.render('auth/changePassword', { 
      title: 'Change Password',
      message: 'New passwords do not match!' 
    });
  }

  try {
    await req.user.changePassword(currentPassword, newPassword);
    res.render('auth/changePassword', { 
      title: 'Change Password',
      message: 'Password changed successfully!' 
    });
  } catch (err) {
    res.render('auth/changePassword', { 
      title: 'Change Password',
      message: 'Current password is incorrect.' 
    });
  }
});

// Get method for Reset Password 
router.get('/reset-password', (req, res) => {
  res.render('auth/resetPassword', { 
    title: 'Reset Password',
    message: null 
  });
});

// Post method for Reset Password 
router.post('/reset-password', async (req, res) => {
  const { username, newPassword, confirmPassword } = req.body;

  if (newPassword !== confirmPassword) {
    return res.render('auth/resetPassword', { 
      title: 'Reset Password',
      message: 'Passwords do not match' 
    });
  }

  try {
    let user = await User.findOne({ username });
    if (!user) return res.render('auth/resetPassword', { 
      title: 'Reset Password',
      message: 'User not found' 
    });

    await user.setPassword(newPassword);
    await user.save();

    res.render('auth/resetPassword', { 
      title: 'Reset Password',
      message: 'Password reset successfully!' 
    });
  } catch (err) {
    res.render('auth/resetPassword', { 
      title: 'Reset Password',
      message: 'Error resetting password' 
    });
  }
});

module.exports = router;