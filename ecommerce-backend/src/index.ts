import dotenv from 'dotenv';
dotenv.config();

import express from 'express';

import productsRouter from './products/routes/productsRouter';
import categoriesRouter from './products/routes/categoriesRouter';
import cartRouter from './cart/router/cartRouter';
import userRouter from './users/routes/usersRouter';
import authRouter from './users/auth/routes/authRouter';

import { errorMiddleware } from './utils/errorMiddleware';

const app = express();
app.use(express.json());

const PORT = process.env.PORT ?? 3000;

app.get('/api/ping', (_req, res) => {
    console.log('someone pinged here');
    res.send('pong');
});

app.use('/api/products', productsRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/cart', cartRouter);

app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);

app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`);
    console.log(`ping GET: http://localhost:${PORT}/api/ping`);
    console.log(`products GET: http://localhost:${PORT}/api/products`);
    console.log(`categories GET: http://localhost:${PORT}/api/categories`);
    console.log(`users GET: http://localhost:${PORT}/api/users`);
});
