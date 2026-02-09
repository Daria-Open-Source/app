import bigQuery from './../../infra/gcp/bigQuery/service.js';
// import { FireStoreWrapper } from './../../infra/gcp/firestore.js';
// import { CloudBucketWrapper } from './../../infra/gcp/cloudbucket.js';

export async function allServicesConnected() {

    const services = [bigQuery];
    //    FireStoreWrapper,
    //    CloudBucketWrapper
    //];

    const allServicesConnected = services.every(async service => await service.isConnected());
    return allServicesConnected == true;
}