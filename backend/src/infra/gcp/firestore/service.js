//src/infra/gcp/firestore/service.js
import { db } from "./config.js"; 

//Create wrapper
class FirestoreWrapper {
    #db;
    constructor(dbInstance) {
        this.#db = dbInstance;
    }

    //Ensure firestore is connected
    async isConnected() {
        try {
            await this.#db.listCollections();
            return true;
        } catch (e) {
            return false;
        }
    }

    async queryCollection(name) {
        const snapshot = await this.#db.collection(name).limit(10).get();
        return snapshot.docs.map(doc => doc.data());
    }
}

export const fsService = new FirestoreWrapper(db);