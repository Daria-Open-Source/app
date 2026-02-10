import express from 'express';

const app = express();

app.get('/ping', (req, res) => {
    return res.status(200).json({ msg: 'pinged' });
});

app.get('/', (req, res) => {
    return res.status(200).json({ msg: 'home' });
});

export default app;