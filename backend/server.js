const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/GForm', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

// Create Schema and Model
const formSchema = new mongoose.Schema({
    name: String,
    email: String,
    contact: String,
    course: String,
    year: String,
    semester: String
});
const Form = mongoose.model('Form', formSchema, 'Form'); // Replace 'form_collection_name' with your desired collection name

// Define API endpoint
app.post('/submit', (req, res) => {
    const newForm = new Form(req.body);
    newForm.save()
        .then(() => res.json('Form submitted!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});