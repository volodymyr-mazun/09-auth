
// ----------КОМПОНЕНТ ВІДПОВІДАЄ ЗА ПЕРЕВІРКУ КОРИСТУВАЧА НА АВТОРИЗАЦІЮ----------
// користувач є — зберігає його дані в глобальному стейті
// користувача немає — очищає стейт і перенаправляє на /sign-in

"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getSession, logoutUser } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";

type Props = { children: React.ReactNode };

const isPrivatePath = (p: string) => p.startsWith("/notes") || p.startsWith("/profile");  //перевірка чи шлях приватний, для доступу потрібна авторизація

export default function AuthProvider({ children }: Props) {
    const router = useRouter();
    const pathname = usePathname();
    const { setUser, clearAuth } = useAuthStore();
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        let active = true;

        (async () => {
            try {
                const user = await getSession();

            if (!active) return;

            if (user) {
                setUser(user);
            } else {
                clearAuth();
            if (isPrivatePath(pathname)) {
                router.replace(`/sign-in?from=${pathname}`);
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
    }, [pathname, router, setUser, clearAuth]);

    if (checking) return null; 

    return <>{children}</>;
}