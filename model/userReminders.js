const mongoose = require('mongoose');

const ReminderModel = mongoose.Schema({
    subject: {type: String, required: true},
    email: {type:String,required: true},
    time: {type: Number, required: true},
    date: {type: Date, required:true,}

})

const userReminder = mongoose.model('reminders',ReminderModel);

module.exports = userReminder;