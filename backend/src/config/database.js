const mongoose = require('mongoose')

const dataConnect = async ()=>{
    await mongoose.connect('mongodb://localhost:27017/devconnect');
};

module.exports = dataConnect;
