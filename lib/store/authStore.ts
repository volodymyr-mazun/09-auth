
// --------ФАЙЛ, СТВОРЕННЯ ГЛОБАЛЬНОГО СТАНУ ДЛЯ АВТОРИЗАЦІЇ--------
// за допомогою бібліотеки Zustand
// дозволяє створювати store — глобальне сховище даних

import { User } from "@/types/user";
import { create } from "zustand";

type AuthState = {
    user: User | null;
    isAuthenticated: boolean;
        setUser: (user: User) => void;
        clearAuth: () => void;
        
};

// user - збережений користувач
// isAuthenticated - булевий прапорець (авторизований чи ні)
// setUser(user) - функція для встановлення користувача
// clearAuth() - функція для очищення стану

export const useAuthStore = create<AuthState>()((set) => ({
    user: null,
    isAuthenticated: false,
    setUser: (user: User) => set({ user, isAuthenticated: true }),
    clearAuth: () => set({ user: null, isAuthenticated: false }),
}));