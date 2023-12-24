const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const routerAuth = require("./Router/AuthRouter.js");
const {runDB} = require("./db/db.js");
const PORT = process.env.PORT || 4500;

const app = express();

app.use(cors())
app.use(express.json());
app.use('/auth', routerAuth);

const serverStart = async () => {
    try {
        await mongoose.connect('mongodb+srv://vladbars2:vlad34299@cluster0.7eahc4t.mongodb.net/')
        runDB();
        app.listen(PORT, () => console.log('Server started on port ' + PORT));
    } catch (e) {
        console.log(e);
    }
}

serverStart();

