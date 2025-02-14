import React from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { logout } from '../slices/authSlice'; // Импортируем метод logout
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const refreshToken = localStorage.getItem('refreshToken');

    if (refreshToken) {
      try {
        // Отправляем запрос на сервер для выхода
        const response = await axios.post('http://localhost:4200/api/logout', { refreshToken });

        if (response.status === 200) {
          // Вызываем метод logout для обновления состояния в Redux
          dispatch(logout());

          // Перенаправляем на страницу авторизации
          navigate('/login');
        } else {
          console.error('Ошибка при выходе');
        }
      } catch (error) {
        console.error('Ошибка при запросе logout:', error);
      }
    }
  };

  return (
    <div>
      <h1>Главная</h1>
      {/* Кнопка выхода */}
      <button onClick={handleLogout}>Выход</button>
    </div>
  );
};

export default HomePage;
