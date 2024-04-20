const express = require('express');
const router = express.Router();
const User = require('../models/user.model.js');

const {getUsers,getUsers,createUser,updateUser,deleteUser} =  require("../controllers/user.controller.js")


router.get('/users', getUsers);
router.get('/users/:id', getUsers);
router.post('/users', createUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);


module.exports = router;
