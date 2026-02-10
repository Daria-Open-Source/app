export default async () => {
    console.log("\nStopping Testcontainer...");
    await global.__CONTAINER__.stop();
};