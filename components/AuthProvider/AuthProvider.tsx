
// ----------КОМПОНЕНТ ВІДПОВІДАЄ ЗА ПЕРЕВІРКУ КОРИСТУВАЧА НА АВТОРИЗАЦІЮ----------
// зміна URL (pathname) перевіряє, чи є в користувача сесія
// немає - очищає стан і відправляє на сторінку логіну
// сесія є - завантажує дані користувача (getMe) і зберігає в глобальний стейт
// дані отримати не вдалося - вихід з акаунту

"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { checkClientSession, getMe, logoutUser } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";

type Props = { children: React.ReactNode };

const isPrivatePath = (p: string) => p.startsWith("/notes") || p.startsWith("/profile");    //функція, яка визначає, чи шлях вимагає авторизації

export default function AuthProvider({ children }: Props) {
    const router = useRouter();
    const pathname = usePathname();                                                         //поточний маршрут
    const { setUser, clearAuth } = useAuthStore();                                          //працює з глобальним станом юзера
    const [checking, setChecking] = useState(true);

    useEffect(() => {                                                                       //асинхронна перевірка
        let active = true;

    (async () => {
        try {
            const hasSession = await checkClientSession();

            if (!active) return;

            if (!hasSession) {
                clearAuth();                                                                //очищає стан юзера (clearAuth)

                if (isPrivatePath(pathname)) {
                    router.replace(`/sign-in?from=${encodeURIComponent(pathname)}`);        //сторінка приватна, додає параметр from
                return;
                }
            return;
            }

            try {
                const me = await getMe();                                                   //якщо є сесія, пробує отримати дані користувача
                
                if (!active) return;
                setUser(me);
            } catch {
                clearAuth();
                
                if (isPrivatePath(pathname)) {
                    try { await logoutUser(); } catch {}
                        router.replace(`/sign-in?from=${encodeURIComponent(pathname)}`);     //Якщо це не вдалось, скидає стан і відправляє на логін
                        return;
                }
            }
        } catch {
            clearAuth();
            
            if (isPrivatePath(pathname)) {
                try { await logoutUser(); } catch {}
                router.replace(`/sign-in?from=${encodeURIComponent(pathname)}`);
                return;
            }
        } finally {
            if (active) setChecking(false);
        }
    })();

        return () => { active = false; };

    }, [pathname, clearAuth, router, setUser]);

    if (checking) return null;

    return <>{children}</>;
}
