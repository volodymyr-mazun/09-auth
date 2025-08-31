
// ---------ФАЙЛ, НАЛАШТУВАННЯ BASEURL, ДЛЯ ФРОНТЕНД ТА БЕКЕНД---------

import axios from "axios";

const isBrowser = typeof window !== "undefined";     //window, код виконується у браузері (true - клієнтська частина, false - серверна частина)
const SITE = process.env.NEXT_PUBLIC_API_URL!;       //беремо адресу сайту з .env ( http://localhost:3000 або https://my-app.vercel.app)

export default axios.create({
    baseURL: isBrowser ? "/api" : `${SITE}/api`,
    withCredentials: true,                           //axios буде відправляти cookies, session ID, токени разом із запитами
});
