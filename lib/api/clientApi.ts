
// --------ФАЙЛ, МІСТИТЬ ГОТОВІ ФУНКЦІЇ ДЛЯ АВТОРИЗАЦІЇ---------
// функції для роботи з користувачем (getMe, updateUser)
// функції для роботи з нотатками (fetchNotes, fetchNoteById, createNote, deleteNote)
// ізольовує усі HTTP-запити в одному місці

import api from "./api";                                               //інстанс
import { User } from "@/types/user";
import { Note, CreateNotePayload } from "@/types/note";                //типізовані обєкти

export interface NotesHttpResponse {                                   //інтерфейс відповідь з бекенду
    notes: Note[];
    totalPages: number;                                                //ксть сторнінок для пагінації
}

// ----------ФУНКЦІЇ АВТОРИЗАЦІЇ----------
export async function registerUser(email: string, password: string): Promise<User> {     //створює нового користувача
    const { data } = await api.post<User>("/auth/register", { email, password });
    return data;
}

export async function loginUser(email: string, password: string): Promise<User> {        //логін користувача
    const { data } = await api.post<User>("/auth/login", { email, password });
    return data;
}

export async function logoutUser(): Promise<void> {                                      //вихід з системи
    await api.post("/auth/logout");
}

export async function getSession(): Promise<boolean> {                                   //перевірка чи активна сесія
    const { data } = await api.get<User | null>("/auth/session");
    return Boolean(data);
}

export async function checkClientSession(): Promise<boolean> {                           //допоміжна, викликає getSession()
    return getSession();
}


// ---------РОБОТА З ПРОФІЛЕМ-------  
export async function getMe(): Promise<User> {                                           //отримує дані про користувача
    const { data } = await api.get<User>("/users/me");
    return data;
}

export async function updateUser(payload: { username?: string; email?: string }): Promise<User> {  
    const { data } = await api.patch<User>("/users/me", payload);                        //оновлює дані користувача
    return data;
}

// --------РОБОТА З НОТАТКАМИ-------                                                     //отримати список нотаток
export async function fetchNotes(params: { search?: string; page?: number; perPage?: number; tag?: string; }): Promise<NotesHttpResponse> {
    const { tag, ...rest } = params ?? {};
    const finalParams = { ...rest, ...(tag && tag !== "All" ? { tag } : {}) };
    const { data } = await api.get<NotesHttpResponse>("/notes", { params: finalParams });
    return data;
}

export async function fetchNoteById(id: string): Promise<Note> {                         //отримує одну нотатку
    const { data } = await api.get<Note>(`/notes/${id}`);
    return data;
}

export async function createNote(note: CreateNotePayload): Promise<Note> {               //створює нову нотатку
    const { data } = await api.post<Note>("/notes", note);
    return data;
}

export async function deleteNote(id: string): Promise<Note> {                            //видаляє нотатку
    const { data } = await api.delete<Note>(`/notes/${id}`);
    return data;
}