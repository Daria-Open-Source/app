import bq from './../../infra/gcp/bigquery.js';
// import { FireStoreWrapper } from './../../infra/gcp/firestore.js';
// import { CloudBucketWrapper } from './../../infra/gcp/cloudbucket.js';

export async function allServicesConnected() {

    const services = [bq];
    //    FireStoreWrapper,
    //    CloudBucketWrapper
    //];

    const allServicesConnected = services.every(async service => await service.isConnected());
    return allServicesConnected == true;
}