const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Note = require('./models/Note');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
    .connect(
        'mongodb+srv://hyoahn:losalamos@cluster0.1rjsfle.mongodb.net/notesdb'
    )
    .then(() => {
        app.get('/', (req, res) => {
            // req is what we send from frontend to this server
            // res is what we send from server to the frontend
            //res.send('This is the Home page');
            res.json({
                message: 'API is working!',
            });
        });

        const noteRouter = require('./routes/Note');
        app.use('/notes', noteRouter); // /notes/add or /notes/update
    });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running at PORT: ${PORT}`);
});
