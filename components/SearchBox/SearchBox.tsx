
// --------КОМПОНЕНТ ФОРМИ ПОШУКУ, ЗА КЛЮЧОВИМ СЛОВОМ----------
// при зміні інпута оновлює query
// поле порожнє - показує помилку
// є текст - викликає onChange(query) і очищає інпут

import css from "./SearchBox.module.css";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

interface SearchBoxProps {
    value: string;
    onChange: (value: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ onChange, value = "", }) => {
    const [query, setQuery] = useState(value);
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!query.trim()) {
            toast.error("Please enter a search query.");
            return;
        }
            onChange(query);
            setQuery("");
    };

    return (
        <div className={css.search}>
            <form className={css.searchForm} onSubmit={handleSubmit}>
                <input type="text" placeholder="Search notes..." value={query} onChange={handleInputChange} className={css.searchInput} />
                <button type="submit" className={css.searchButton}>Find</button>
            </form>
        </div>
    );
};

export default SearchBox;