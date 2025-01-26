const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://aswinsagar12:admin@userdb.5rm0i.mongodb.net/userdb?retryWrites=true&w=majority&appName=userdb")
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