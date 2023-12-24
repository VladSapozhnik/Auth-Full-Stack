const bcrypt = require('bcryptjs');
const {validationResult} = require("express-validator");
const { client } = require('../db/db');

class authController {
    async registration (req, res) {
        const database = client.db('Users').collection('auth');

        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({messages: 'errors registration', errors});
            }

            const {username, password} = req.body;
            const candidate = await database.findOne({username});

            if (candidate) {
                return res.status(400).json({messages: 'user exists'});
            }

            const hashPassword = bcrypt.hashSync(password, 8);

            await database.insertOne({
                username,
                password: hashPassword,
                tests: []
            });

            return res.status(201).json({messages: 'successfully created user'})
        } catch (e) {
            console.log(e);
            res.status(400).json({messages: 'auth error'})
        }
    }

    async updateUser(req, res) {
        try {
            const database = client.db('Users').collection('auth');
            const {hash, questionOne, questionTwo, questionThree } = req.body;
            
            const user = await database.findOne({password: JSON.parse(hash)});

            if (!user) {
                return res.status(400).json({messages: 'User is not found'});
            }

            if (user.tests.length > 0) {
                return res.status(400).json({messages: 'You have already passed the test'});
            }

            const date = Date.now();
            await database.updateOne({password: JSON.parse(hash)}, {$set: {tests: [
                {
                    id: `${date}`,
                    questionOne
                },
                {
                    id: `${date + 1}`,
                    questionTwo
                }, 
                {
                    id: `${date + 2}`,
                    questionThree
                }
            ]}})

            return res.status(200).json({messages: 'successful update'});
            // const user = await User.findOne({password: JSON.parse(hash)});
            // console.log(hash, questionOne, questionTwo, questionThree);

            // const result = await User.updateMany({password: JSON.parse(hash)}, {tests: {questionOne, questionTwo, questionThree}});
            // console.log(result)
        } catch (e) {
            console.log(e);
            res.status(400).json({messages: 'update error'})
        }
    }

    async login(req, res) {
        try {
            const database = client.db('Users').collection('auth');
            const errors = validationResult(req);
            
            const {username, password} = req.body;
            const user = await database.findOne({username});

            if (!errors.isEmpty()) {
                return res.status(400).json({messages: 'errors login', errors});
            }

            if (!user) {
                return res.status(400).json({message: 'User is not found'})
            }

            const validPassword = bcrypt.compareSync(password, user.password);

            if (!validPassword) {
                return res.status(400).json({message: 'Wrong password entered'})
            }

            return res.json({
                id: user._id,
                hash: user.password
            })
        } catch (e) {
            console.log(e);
            res.status(400).json({messages: 'auth error'})
        }
    }

    async getUsers(req, res) {
        try {
            const database = client.db('Users').collection('auth');
            const candidate = await database.find().toArray();

            return res.json(candidate);
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = new authController();