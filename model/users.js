const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserModel = mongoose.Schema({
    username: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    token:{type: String}
})
https://itsastampede615821596.files.wordpress.com/2021/01/how-many-brendan-fraser-mummy-movies-are-there.jpg
UserModel.pre('save', async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    
    next();
})

UserModel.statics.login = async function(email,password){
    const user = await this.findOne({email});

    if(user){
        const auth = await bcrypt.compare(password,user.password);
        if(auth){
            return user;
        }throw Error('incorrect password');
    }throw Error('incorrect Email');
}

const model = mongoose.model('BookUsers',UserModel);

module.exports = model;