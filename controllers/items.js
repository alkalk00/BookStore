const User = require("../model/users");
const bcrypt = require("bcrypt");
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

  // try {
  //   const { username, email, password } = req.body;

  //   if (!(email && password && username)) {
  //     res.status(400).send("All input is required");
  //   }

  //   const oldUser = await User.findOne({ email });

  //   if (oldUser) {
  //     return res.status(409).send("User Already Exist. Please Login");
  //   }
    
  //   encryptedPassword = await bcrypt.hash(password, 10);

  //   const user = await User.create({
  //     username,
  //     email,
  //     password: encryptedPassword,
  //   });

  //   const token = jwt.sign(
  //     { user_id: user._id, email },
  //     process.env.TOKEN_KEY,
  //     {
  //       expiresIn: "2h",
  //     }
  //   );
  //   user.token = token;

  //   res.status(201).redirect('/login');
  // } catch (err) {
  //   console.log(err);
  // }

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

  // try {
  //   const { username, password } = req.body;

  //   if (!(username && password)) {
  //     res.status(400).send("All input is required");
  //   }
  //   const user = await User.findOne({ username });

  //   if (user && (await bcrypt.compare(password, user.password))) {
  //     // Create token
  //     const token = jwt.sign(
  //       { user_id: user._id, username },
  //       process.env.TOKEN_KEY,
  //       {
  //         expiresIn: "2h",
  //       }
  //     );

  //     // save user token
  //     user.token = token;

  //     // user
  //     res.status(200).redirect('/');
  //   }
  //   res.status(400).send('Invalid Usernaem or Password');
  // } catch (err) {
  //   console.log(err);
  // }
};

exports.logout = async (req,res)=>{
  res.cookie('jwt','',{maxAge: 1});
  const result = await User.findByIdAndDelete(req.params.id)
  res.redirect('/login');
}