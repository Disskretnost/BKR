
require('dotenv').config();
const errorMiddlewares = require('./midllewares/errorMiddlewares')
const express = require('express');
const sequelize = require('./db');
const models = require('./models');  
const cors = require('cors');

const router = require('./routes/index');

const app = express();
require('dotenv').config({ path: '../.env' });  // Указываем путь к файлу .env на один уровень выше
app.use(express.json());  
app.use(cors({
  credentials: true,  // Разрешаем передачу cookies
  origin: process.env.CORS_CLIENT
}));
app.use('/api', router);
app.use(errorMiddlewares);

const start = async () => {
  try {
    await sequelize.authenticate();  // Подключаемся к базе данных
    await sequelize.sync({ alter: true });  // Синхронизируем модели с базой данных (рекомендуется с { alter: true })
    app.listen(process.env.SERVER_PORT, () => {
      console.log(`Сервер запущен на порту ${process.env.SERVER_PORT}`);
    });
  } catch (e) {
    console.error('Ошибка при запуске сервера:', e);
  }
};

start();
