import express from 'express';
import usersRouter from './domains/users/router';

const app = express();

// implements a usersRouter
app.use('/api/users/', usersRouter);

app.get('/ping', (req, res) => {
    return res.status(200).json({ msg: 'pinged' });
});

app.get('/', (req, res) => {
    return res.status(200).json({ msg: 'home' });
});

export default app;