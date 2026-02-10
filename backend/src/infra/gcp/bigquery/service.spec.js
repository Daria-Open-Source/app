import bigQuery from './service.js';

describe('BigQuery Unit Tests', () => {
    
    // tests BigQuery connection
    it('Should connect to the BigQuery API', async () => {

        const bqResponse = await bigQuery.isConnected();
        
        // service should auto-connect
        expect(bqResponse).toBeTruthy();
    });
});