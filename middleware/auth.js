const jwt = require("jsonwebtoken");
const User = require('../model/users')

exports.checking = (req,res,next)=>{
  const token = req.cookies.jwt;

  if(token){
    jwt.verify(token,'helloworld',(err,decodedToken)=>{
      if(err){
        console.log(err.message);
        res.redirect('/login')
      }else{
        // console.log(decodedToken);
        next();
      }
    })
  }else{
    res.redirect('/login')
  }
}

exports.checkuser = (req,res,next)=>{
  const token = req.cookies.jwt;

  if(token){
    jwt.verify(token,'helloworld', async (err,decodedToken)=>{
      if(err){
        console.log(err.message);
        res.locals.user = null
      }else{
        // console.log(decodedToken);
        const user = await User.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    })
  }else{
    res.locals.user = null
    next();
  }
    
}
