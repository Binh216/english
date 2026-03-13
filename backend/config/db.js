const mongoose = require('mongoose');

const connectDB = async () => {
   try {
        await mongoose.connect(process.env.MONGODB_CONNECTIONSTRING,{
            maxPoolSize: 50, // tăng số kết nối tối đa
            socketTimeoutMS: 60000 // tăng thời gian chờ
        });
        console.log("DB connect successfull")
    } catch (error) {
        console.error("Lỗi kết nối DB:",error);
        process.exit(1);
    }
};

module.exports = connectDB;
