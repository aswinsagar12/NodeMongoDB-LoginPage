const express = require("express");
const path = require("path");
const app = express();
const LogInCollection = require("./mongo");
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Path configurations
const tempelatePath = path.join(__dirname, '../tempelates');
const publicPath = path.join(__dirname, '../public');

// View engine setup
app.set('view engine', 'hbs');
app.set('views', tempelatePath);
app.use(express.static(publicPath));

// Routes
app.get('/signup', (req, res) => {
    res.render('signup');
});

app.get('/', (req, res) => {
    res.render('login');
});

app.post('/signup', async (req, res) => {
    try {
        const { name, password } = req.body;

        // Check if user already exists
        const existingUser = await LogInCollection.findOne({ name });

        if (existingUser) {
            return res.send("User already exists");
        }

        // Create new user
        const newUser = new LogInCollection({ name, password });
        await newUser.save();

        res.status(201).render("home", { naming: name });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error during signup");
    }
});

app.post('/login', async (req, res) => {
    try {
        const { name, password } = req.body;

        const user = await LogInCollection.findOne({ name });

        if (!user) {
            return res.send("User not found");
        }

        if (user.password !== password) {
            return res.send("Incorrect password");
        }

        res.status(201).render("home", { naming: name });
    } catch (error) {
        console.error(error);
        res.status(500).send("Login error");
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});