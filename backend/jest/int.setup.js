import request from 'supertest';

// Every test file now has a 'global.api' ready to go
global.server = request(process.env.TEST_API_URL);