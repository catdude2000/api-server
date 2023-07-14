'use strict';

const supertest = require('supertest');
const { server } = require('../src/server');
const mockRequest = supertest(server);
const { dbInstance } = require('../src/models/index');
const { DESCRIBE } = require('sequelize/types/query-types');
const { INET } = require('sequelize');

DESCRIBE('web server', () => {
  beforeAll(async () => {
    await dbInstance.sync();
  });
  afterAll(async () => {
    await dbInstance.drop();
  });
  it('should respond with a 404 on an invalid route', () => {
    return mockRequest.get('/foobar').then((results) => {
      expect(results.status).toBe(404);
    });
  });
  it('should respond with a 404 on an invalid method', async () => {
    const response = await mockRequest.put('/foobar');
    expect(response.status).toBe(404);
  });
  it('can create a record', async () => {
    const person = {
      firstName: 'MJ',
      lastName: 'McBarksalot',
    };
    const response = await mockRequest.post('/people').send(person);
    expect(response.status).toBe(200);

    expect(response.body.id).toBeDefined();

    Object.keys(person).forEach((key) => {
      expect(person[key]).toEqual(response.body[key]);
    });
  });

  it('can get list of records', async () => {
    const response = await mockRequest.get('/people');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toEqual(1);
  });

  it('can get a record', async () => {
    const response = await mockRequest.get('/people/1');
    expect(response.status).toBe(200);
    expect(typeof response.body).toEqual('object');
    expect(response.body.id).toEqual(1);
  });

  it('can update a record', async () => {
    const data = { lastName: 'Russert' };
    const response = await mockRequest.put('/people/1').send(data);
    expect(response.status).toBe(200);
    expect(typeof response.body).toEqual('object');
    expect(response.body.id).toEqual(1);
    expect(response.body.lastName).toEqual('Russert');
  });

  it('can delete a record', async () => {
    const response = await mockRequest.delete('/people/1');
    expect(response.status).toBe(204);
    expect(response.body).toEqual({});

    const getResponse = await mockRequest.get('/people');
    expect(getResponse.body.length).toEqual(0);
  });
});
