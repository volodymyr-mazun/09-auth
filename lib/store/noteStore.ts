
// --------ФАЙЛ, СТВОРЕННЯ ГЛОБАЛЬНОГО СТАНУ ДЛЯ РОБОТИ З НОТАТКОЮ----------
// зберігає чернетку нотатки (draft → title, content, tag)
// дозволяє оновлювати чернетку (setDraft)
// дозволяє очищати  (clearDraft)
// автоматично зберігає стан у localStorage завдяки persist

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { NoteTag } from "@/types/note";

const initialDraft = {
    title: "",
    content: "",
    tag: "Todo" as NoteTag,
};

interface NoteStore {
    draft: typeof initialDraft;
    setDraft: (note: Partial<typeof initialDraft>) => void;
    clearDraft: () => void;
}

export const useNoteStore = create<NoteStore>()(
    persist(
        (set) => ({
            draft: initialDraft,
            setDraft: (note) =>
        set((state) => ({
            draft: { ...state.draft, ...note },
        })),
        clearDraft: () => set({ draft: initialDraft }),
        }),
            {
                name: "note-draft",
            }
    )
);