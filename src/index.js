const express = require("express");
const path = require("path");
const client = require("prom-client"); // Import Prometheus client
const app = express();
const LogInCollection = require("./mongo");
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Path configurations
const tempelatePath = path.join(__dirname, '../tempelates');
const publicPath = path.join(__dirname, '../public');

app.set('view engine', 'hbs');
app.set('views', tempelatePath);
app.use(express.static(publicPath));

// ✅ Setup Prometheus Registry
const register = new client.Registry();
client.collectDefaultMetrics({ register });

// Custom metrics for logins and signups
const loginCounter = new client.Counter({
    name: 'app_logins_total',
    help: 'Total number of successful logins',
    registers: [register]
});

const signupCounter = new client.Counter({
    name: 'app_signups_total',
    help: 'Total number of successful signups',
    registers: [register]
});

// 📌 Routes
app.get('/signup', (req, res) => {
    res.render('signup');
});

app.get('/', (req, res) => {
    res.render('login');
});

// ✅ Prometheus `/metrics` Endpoint
app.get('/metrics', async (req, res) => {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
});

// ✅ Metrics Dashboard
app.get('/metrics-view', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/metrics.html'));
});

app.post('/signup', async (req, res) => {
    try {
        const { name, password } = req.body;

        const existingUser = await LogInCollection.findOne({ name });

        if (existingUser) {
            return res.send("User already exists");
        }

        const newUser = new LogInCollection({ name, password });
        await newUser.save();

        signupCounter.inc(); // Increment signup count
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

        loginCounter.inc(); // Increment login count
        res.status(201).render("home", { naming: name });
    } catch (error) {
        console.error(error);
        res.status(500).send("Login error");
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
