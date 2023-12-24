const request = require('supertest');
const express = require("express");
const app = express();

// import {app} from "../../src/app";
// const {app} = require('')

describe('/auth', () => {
    // beforeAll(async () => {
    //     await request(app).delete('/__tests__/data')
    // })

    it ('should return 200 and empty array', async () => {
        const data = {username: 'username', password: 'username'};

        await request(app).get('/auth/login').send(data).expect(404, {})
    })
})