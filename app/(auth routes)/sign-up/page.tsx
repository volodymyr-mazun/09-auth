
// ----------КОМПОНЕНТ ФОРМИ РЕЄСТРАЦІЇ КОРИСТУВАЧА-----------
// форма з полями email і password
// react-query (useMutation) для відправки запиту на бекенд (registerUser)
// реєстрація успішна - зберігає користувача у Zustand (useAuthStore) і перенаправляє на /profile
// сталася помилка - показує її повідомлення

"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";                         //глобальний Zustand store (зберігає юзера)
import css from "./SignUpPage.module.css";

interface ApiError {
    response?: { data?: { message?: string } };
}

export default function SignUpPage() {
    const router = useRouter();
    const setUser = useAuthStore((s) => s.setUser);                          //зберігає користувача у Zustand після реєстрації
    const [error, setError] = useState("");                                  //локальний стан для повідомлення про помилку

    const { mutate, isPending } = useMutation({
        mutationFn: ({ email, password }: { email: string; password: string }) =>
            registerUser(email, password),
        onSuccess: (user) => {
            setUser(user);
            router.replace("/profile");
        },
        onError: (err: ApiError) => {
            setError(err?.response?.data?.message || "Registration failed");
        },
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();                                                   //блокує перезавантаження сторінки
        const fd = new FormData(e.currentTarget);                             //дістає email і password з полів
        mutate({                                                              //запускає API-запит на реєстрацію
            email: String(fd.get("email") || ""),
            password: String(fd.get("password") || ""),
        });
    };

    return (
        <main className={css.mainContent}>
            <h1 className={css.formTitle}>Sign up</h1>
            <form className={css.form} onSubmit={handleSubmit}>
                <div className={css.formGroup}>
                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" name="email" className={css.input} autoComplete="email" required onChange={() => error && setError("")} />
                </div>

                <div className={css.formGroup}>
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" name="password" className={css.input} autoComplete="new-password" required onChange={() => error && setError("")} />
                </div>

                <div className={css.actions}>
                    <button type="submit" className={css.submitButton} disabled={isPending} aria-busy={isPending} >{isPending ? "Registering..." : "Register"}</button>
                </div>

                {error && <p className={css.error}>{error}</p>}
            </form>
        </main>
    );
}