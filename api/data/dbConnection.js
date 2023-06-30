const mongoose = require("mongoose");

require("dotenv").config()
require("../data/foods-model")
require("./users-model")

mongoose.connect(process.env.DB_URL,{useNewUrlParser:true, useUnifiedTopology:true});


mongoose.connection.on(process.env.DB_CONNECTED, function(){
    console.log(process.env.SMS_MONGOOSE_CONNECTED+ process.env.PORT);

})

mongoose.connection.on(process.env.DB_DISCONNECTED,function(){
    console.log(process.env.SMS_MONGOOSE_DISCONNECTED+ process.env.PORT);
});

mongoose.connection.on(process.env.DB_ERROR,function(err){
    console.log(process.env.SMS_MONGOOSE_CONNECTION_ERROR+ err)
});

process.on(process.env.DB_SIGINT,function(){
    mongoose.connection.close(function(){
        console.log(process.env.SMS_MONGOOSE_DISCONNECTED_BY_APP+ process.env.PORT)
        process.exit(0);
    })
})