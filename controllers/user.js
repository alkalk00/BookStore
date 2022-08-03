const user = require('../model/users');
const UserReminders = require('../model/userReminders');

exports.reminders = (req,res)=>{
    // const res = user.findById(req.parms.id);
    const data = new UserReminders(req.body);

    data.save(function(err){
        if(err){
            return next(err);
        }else{
            alert('data saved successfully');
        }
    })
}

