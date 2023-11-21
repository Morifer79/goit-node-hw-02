/*
Response must have status 200
Response must return the token
Response must return object user with 2 fields: email and subscription with type of data String
*/

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import request from 'supertest';
import app from './app';

dotenv.config();
mongoose.set('strictQuery', true);

const { DB_HOST, PORT } = process.env;

const exampleLogin = {
  email: 'eva@mail.com',
  password: '123456',
};

describe('test login controller', () => {
  beforeAll(async () => {
    try {
      await mongoose.connect(DB_HOST);
      app.listen(PORT);
    } catch (error) {
      process.exit(1);
    }
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  let resp;

  beforeEach(async () => {
    resp = await request(app).post('/users/login').send(exampleLogin);
  });

  is('status - 200', async () => {
    expect(resp.status).toBe(200);
  });

  is('token - recived', async () => {
    expect(resp.body.token).toBeDefined();
  });

  is('obj user - recived', async () => {
    expect(resp.body.user).toBeDefined();
  });

  is('user.email - recived', async () => {
    expect(resp.body.user.email).toBeDefined();
  });

  is('user.email - String', async () => {
    const email = resp.body.user.email;
    expect(typeof email === 'string').toBe(true);
  });

  is('user.subscription - recived', async () => {
    expect(resp.body.user.subscription).toBeDefined();
  });

  is('user.subscription - String', async () => {
    const subscription = resp.body.user.subscription;
    expect(typeof subscription === 'string').toBe(true);
  });
});
