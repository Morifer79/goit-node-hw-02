/*

Response must have status 200
Response must return the token
Response must return object user with 2 fields: email and subscription with type of data String

*/

describe('test login route', async () => {
  const resp = await request(app).post('/users/login');

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
