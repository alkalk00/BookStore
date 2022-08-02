const User = require("../model/users");
const jwt = require("jsonwebtoken");
require("dotenv").config();


exports.homepage = (req,res)=>{
  res.render('home');
}

exports.signup_get = (req, res) => {
  res.render("sginup");
};

const maxAge = 3*24*60*60;
const createToken = (id)=>{
  return jwt.sign({id},'helloworld',{
    expiresIn: maxAge
  })
}

exports.signup_post = async (req, res) => {

  const {username,email,password} = req.body;
  try {
    const user = await  User.create({
      username,email,password
    })

    const token = createToken(user._id);
    res.cookie('jwt',token,{httpOnly: true, maxAge: maxAge*1000})
    res.status(201).json({user: user._id});
    
  } catch (error) {
    console.log(error)
    res.status(400).send('Failed to signup');
  }

};

exports.login_get = (req, res) => {
  res.render("signin");
};

exports.login_post = async (req, res) => {

  const {email,password} = req.body;
  
  try {
    const user = await User.login(email,password);

    const token = createToken(user._id);
    res.cookie('jwt',token,{httpOnly: true, maxAge: maxAge*1000})

    res.status(200).json({user: user._id});
  } catch (error) {
    res.status(400).json({});
  }
};

exports.logout = async (req,res)=>{
  // res.cookie('jwt','',{maxAge: 1});
  // await User.findByIdAndDelete(req.params.id)
  res.redirect('/login');
}