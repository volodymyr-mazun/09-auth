
// ----------КОМПОНЕНТ ВІДОБРАЖАЄ КНОПКИ НАВІГАЦІЇ ЗАЛЕЖНО ВІД СТАТУСУ КОРИСТУВАЧА----------
// користувач увійшов - Profile, email та Logout
// користувач не увійшов - Login та Register
// при виході очищається

'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@/lib/store/authStore';
import { logoutUser } from '@/lib/api/clientApi';
import css from './AuthNavigation.module.css';

export default function AuthNavigation() {
    const router = useRouter();
    const pathname = usePathname();                          //визначити, яка зараз сторінка (/profile, /sign-in, /sign-up).
    const qc = useQueryClient();                             //клієнт React Query для очищення кешу.

// ----------Стан зі стора----------
    const isAuthenticated = useAuthStore(s => s.isAuthenticated);
    const user = useAuthStore(s => s.user);
    const clearAuth = useAuthStore(s => s.clearAuth);

// ----------Перевірка активних сторінок----------
    const isProfile = pathname.startsWith('/profile');
    const isLogin = pathname.startsWith('/sign-in');
    const isRegister = pathname.startsWith('/sign-up');

// ----------handleLogout----------
    const handleLogout = async () => {
    try {
        await logoutUser();
    } finally {
        clearAuth();
        qc.clear();
        router.replace(`/sign-in?from=${pathname}`);
        }
    };

    return isAuthenticated ? (
        <>
            <li className={css.navigationItem}>
                <Link href="/profile" prefetch={false} className={`${css.navigationLink} ${isProfile ? css.active : ''}`} aria-current={isProfile ? 'page' : undefined} >Profile</Link>
            </li>
            <li className={css.navigationItem}>
                <p className={css.userEmail}>{user?.email}</p>
                <button type="button" onClick={handleLogout} className={css.logoutButton}>Logout</button>
            </li>
        </>
    ) : (
        <>
            <li className={css.navigationItem}>
                <Link href="/sign-in" prefetch={false} className={`${css.navigationLink} ${isLogin ? css.active : ''}`} aria-current={isLogin ? 'page' : undefined} >Login</Link>
            </li>
            <li className={css.navigationItem}>
                <Link href="/sign-up" prefetch={false} className={`${css.navigationLink} ${isRegister ? css.active : ''}`} aria-current={isRegister ? 'page' : undefined} >Register</Link>
            </li>
        </>
    );
}
