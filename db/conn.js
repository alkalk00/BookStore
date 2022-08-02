const mongoose = require('mongoose');

const DB = `mongodb+srv://souvikd:souvikd@cluster0.bkibm.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(DB, { useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to Database')  

  })
  .catch(error => console.error(error))