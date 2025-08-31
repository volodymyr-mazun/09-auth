
// ----------ОБГОРТКА ПРОЕКТА ДЛЯ ДОСТУПУ ДО  QUERYCLIENT----------
//  можна використовувати хуки useQuery, useMutation і керувати кешем запитів

"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

interface QueryProviderProps {
    children: React.ReactNode;
}

export default function QueryProvider({ children }: QueryProviderProps) {
    const [queryClient] = useState(() => new QueryClient({ defaultOptions: {
            queries: {
                staleTime: 1000 * 60 * 3, 
                refetchOnWindowFocus: false,
            },
        },
    })
);

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}