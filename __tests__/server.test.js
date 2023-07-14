'use strict';

const supertest = require('supertest');
const { server } = require('../src/server');
const mockRequest = supertest(server);
const { dbInstance } = require('../src/models/index');
// const { describe } = require('sequelize/types/query-types');


describe('web server', () => {
  beforeAll(async () => {
    await dbInstance.sync();
  });
  afterAll(async () => {
    await dbInstance.drop();
  });
  it('should respond with a 404 on an invalid route', () => {
    return mockRequest.get('/food').then((results) => {
      expect(results.status).toBe(404);
    });
  });
  it('should respond with a 404 on an invalid method', async () => {
    const response = await mockRequest.put('/food');
    expect(response.status).toBe(404);
  });
  it('can create a record', async () => {
    const newFood = {
      name: 'apple',
    };
    const response = await mockRequest.post('/food').send(newFood);
    expect(response.status).toBe(200);

    expect(response.body.id).toBeDefined();

    Object.keys(newFood).forEach((key) => {
      expect(newFood[key]).toEqual(response.body[key]);
    });
  });

  it('can get list of records', async () => {
    const response = await mockRequest.get('/food');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toEqual(1);
  });

  it('can get a record', async () => {
    const response = await mockRequest.get('/food/1');
    expect(response.status).toBe(200);
    expect(typeof response.body).toEqual('object');
    expect(response.body.id).toEqual(1);
  });

  it('can update a record', async () => {
    const data = { name: 'banana' };
    const response = await mockRequest.put('/food/1').send(data);
    expect(response.status).toBe(200);
    expect(typeof response.body).toEqual('object');
    expect(response.body.id).toEqual(1);
    expect(response.body.name).toEqual('banana');
  });

  it('can delete a record', async () => {
    const response = await mockRequest.delete('/food/1');
    expect(response.status).toBe(204);
    expect(response.body).toEqual({});

    const getResponse = await mockRequest.get('/food');
    expect(getResponse.body.length).toEqual(0);
  });
});
