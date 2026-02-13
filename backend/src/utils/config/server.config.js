import bigQuery from './../../infra/gcp/bigquery/service.js';
// import { FireStoreWrapper } from './../../infra/gcp/firestore.js';
// import { CloudBucketWrapper } from './../../infra/gcp/cloudbucket.js';

export const allServicesConnected = async () => {

    const services = [bigQuery];
    //    FireStoreWrapper,
    //    CloudBucketWrapper
    //];

    // calls the isConnected function on every service, and waits for all to resolve
    const results = await Promise.all(services.map(s => s.isConnected()));
    
    // returns if every connect was successful
    return results.every(status => status === true);
};