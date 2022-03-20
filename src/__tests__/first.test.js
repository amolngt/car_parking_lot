const request = require('supertest')
const app = require('../app')
describe('User Endpoints', () => {
  it('should create a new user', async () => {
    const res = await request(app)
      .post('/v1/users/createUser')
      .send({
        name: "test1",
        class: 'A',
      })
    expect(res.statusCode).toEqual(201)
  });
  it('should get all user', async () => {
    const res = await request(app)
      .get('/v1/users/getUsers')
    expect(res.statusCode).toEqual(200)
  });
  it('should get user by id', async () => {
    const res = await request(app)
      .get('/v1/users/getUser/1')
    expect(res.statusCode).toEqual(200)
  });
  it('should update user', async () => {
    const res = await request(app)
    .patch('/v1/users/manageUsers')
    .send({
      name: "test1",
      class: 'A',
      id:1
    })
    expect(res.statusCode).toEqual(200)
  });
  it('should delete user', async () => {
    const res = await request(app)
      .delete('/v1/users/manageUsers')
      .send({
        id:1
      })
    expect(res.statusCode).toEqual(200)
  });
});