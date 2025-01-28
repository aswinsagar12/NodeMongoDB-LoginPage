// Import required modules
const request = require('supertest');
const express = require('express');
const app = require('../src/index'); // Adjust path if needed
const LogInCollection = require('../src/mongo');

// // Mock the LogInCollection methods
// jest.mock('../mongo', () => ({
//     findOne: jest.fn(),
//     save: jest.fn()
// }));

describe('User Authentication Routes', () => {

    afterEach(() => {
        jest.clearAllMocks(); // Clear mocks after each test
    });

    describe('GET /signup', () => {
        it('should render the signup page', async () => {
            const response = await request(app).get('/signup');
            expect(response.status).toBe(200);
        });
    });

    describe('GET /', () => {
        it('should render the login page', async () => {
            const response = await request(app).get('/');
            expect(response.status).toBe(200);
        });
    });

    describe('POST /signup', () => {
        it('should create a new user if it does not already exist', async () => {
            LogInCollection.findOne.mockResolvedValue(null); // No existing user
            LogInCollection.prototype.save = jest.fn().mockResolvedValueOnce({});

            const response = await request(app).post('/signup').send({
                name: 'testuser',
                password: 'password123'
            });

            expect(response.status).toBe(201);
            expect(LogInCollection.findOne).toHaveBeenCalledWith({ name: 'testuser' });
            expect(LogInCollection.prototype.save).toHaveBeenCalled();
        });

        it('should return a message if user already exists', async () => {
            LogInCollection.findOne.mockResolvedValue({ name: 'testuser' });

            const response = await request(app).post('/signup').send({
                name: 'testuser',
                password: 'password123'
            });

            expect(response.text).toBe('User already exists');
        });

        it('should return an error if signup fails', async () => {
            LogInCollection.findOne.mockImplementation(() => {
                throw new Error('Database error');
            });

            const response = await request(app).post('/signup').send({
                name: 'testuser',
                password: 'password123'
            });

            expect(response.status).toBe(500);
        });
    });

    describe('POST /login', () => {
        it('should log in a user with correct credentials', async () => {
            LogInCollection.findOne.mockResolvedValue({
                name: 'testuser',
                password: 'password123'
            });

            const response = await request(app).post('/login').send({
                name: 'testuser',
                password: 'password123'
            });

            expect(response.status).toBe(201);
        });

        it('should return a message if user is not found', async () => {
            LogInCollection.findOne.mockResolvedValue(null);

            const response = await request(app).post('/login').send({
                name: 'nonexistent',
                password: 'password123'
            });

            expect(response.text).toBe('User not found');
        });

        it('should return a message if the password is incorrect', async () => {
            LogInCollection.findOne.mockResolvedValue({
                name: 'testuser',
                password: 'password123'
            });

            const response = await request(app).post('/login').send({
                name: 'testuser',
                password: 'wrongpassword'
            });

            expect(response.text).toBe('Incorrect password');
        });

        it('should return an error if login fails', async () => {
            LogInCollection.findOne.mockImplementation(() => {
                throw new Error('Database error');
            });

            const response = await request(app).post('/login').send({
                name: 'testuser',
                password: 'password123'
            });

            expect(response.status).toBe(500);
        });
    });
});
