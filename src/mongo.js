require('dotenv').config();
const mongoose = require("mongoose");

const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Mongoose connected to MongoDB Atlas');
    })
    .catch((e) => {
        console.log('Failed to connect to MongoDB:', e);
    });

const logInSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

const LogInCollection = mongoose.model('LogInCollection', logInSchema);

module.exports = LogInCollection;