const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');

// create a user using: POST "/api/auth/". Doesn't require authentication
router.post('/',[
    body('name').isLength({ min: 3}),
    body('email').isEmail(),
    body('password').isLength({ min: 5}),
    ],(req,res)=>{
        const result = validationResult(req);
        if (result.isEmpty()) {
          return res.send(`/api/auth/, ${req.body}!`);
        }
      
        res.send({ errors: result.array() });
    res.send(req.body)
})

module.exports = router;