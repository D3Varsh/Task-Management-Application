const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://devarsh12092003:<password>@clusterdev.txww7ae.mongodb.net/?retryWrites=true&w=majority&appName=ClusterDev', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});
const bcrypt = require('bcrypt');
const User = require('./models/User');

app.post('/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      username: req.body.username,
      password: hashedPassword
    });
    await newUser.save();
    res.status(201).send('User registered successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error registering user');
  }
});
const jwt = require('jsonwebtoken');

app.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(404).send('User not found');
    }
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      return res.status(401).send('Invalid password');
    }
    const token = jwt.sign({ userId: user._id }, 'secret_key');
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error logging in');
  }
});
function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) {
      return res.status(401).send('Unauthorized');
    }
    jwt.verify(token, 'secret_key', (err, user) => {
      if (err) {
        return res.status(403).send('Forbidden');
      }
      req.user = user;
      next();
    });
  }
  app.get('/protected-route', authenticateToken, (req, res) => {
    res.send('Protected route');
  });
  const Task = require('./models/Task');

app.post('/add-task', authenticateToken, async (req, res) => {
  try {
    const newTask = new Task({
      description: req.body.description,
      user: req.user.userId
    });
    await newTask.save();
    res.status(201).send('Task added successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error adding task');
  }
});

  
  

