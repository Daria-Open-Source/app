import { bq } from './bigquery.js';

// tests BigQuery connection
test('Connecting to BigQuery API', () => {
    
    // service should auto-connect
    expect(bq.isConnected() == true);
});