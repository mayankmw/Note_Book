const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'mayank$$';

//Validations for creating user
var userValidations = [
  body('name').isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
  body('email').isEmail().withMessage('Invalid email address'),
  body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long'),
];
//Validations for authenticating a user
var userValidationsAuth = [
  body('email').isEmail().withMessage('Invalid email address'),
  body('password').exists().withMessage('Password cannot be blank'),
];
//ROUTE1: Create a user using: POST "/api/auth/createuser". Login not required
router.post('/createuser', userValidations, async(req, res) => {
      // If there are errors ,return bad request and error
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        // check if the email exists already
        let user =await User.findOne({email: req.body.email});
        if(user){
          return res.status(400).json({error:"Email already exists"})
        }

        const salt=await bcrypt.genSalt(10);
        const secPass =await bcrypt.hash(req.body.password, salt);

        // creating a new user 
         user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
          });
          const data = {
            user : {
              id : user.id
            } 
          }
          const authtoken = jwt.sign(data, JWT_SECRET);
          console.log(authtoken);
          
          // res.json(user)
          res.json({authtoken})
    }
);

//ROUTE2: Authenticate a user using: POST "/api/auth/createuser". Login not required
router.post('/login', userValidationsAuth, async(req, res) => {
// If there are errors ,return bad request and error
const errors = validationResult(req);
if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
}

const {email, password} = req.body;
try {
  let user = await User.findOne({email});
  if (!user) {
    return res.status(400).json({error: "User does not exist"});
  }

  const passwordCompare =await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    return res.status(400).json({error: "Wrong Password"});
  }

  const data = {
    user : {
      id : user.id
    } 
  }
  const authtoken = jwt.sign(data, JWT_SECRET);
  res.json({authtoken})

} catch (error) {
  console.log(error.message);
  res.status(500).send("Internal server error");
}

})

//ROUTE3: Get loggedIn user details using: POST "api/auth/getuser" Login required
router.post('/getuser', fetchuser, async(req, res) => {

try {
  userId = req.user.id;
  const user = await User.findById(userId).select("-password");
  res.send(user)
} catch (error) {
  console.log(error.message);
  res.status(500).send("Internal server error");
}
})
module.exports = router;

