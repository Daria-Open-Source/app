// this tests the backend
describe('Test deploying the app', () => {
    it('should get a 200 after hitting /', async () => {
        const response = await server
            .get('/')
            .set('Accept', 'application/json');
        
        expect(response.status).toBe(200);
        expect(response.body.msg).toBe('Hello World!');
    });
});