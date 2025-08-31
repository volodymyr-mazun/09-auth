
// ----------КОМПОНЕНТ СТВОРЮЄ ДИНАМІЧНЕ ПЕРЕМИКАННЯ МІЖ СТОРІНОК----------
// pageCount — скільки всього сторінок
// currentPage — яка сторінка зараз активна
// onPageChange — функція, що викликається при зміні сторінки

import ReactPaginate from 'react-paginate';
import css from './Pagination.module.css';

interface PaginationProps {
    pageCount: number;                     
    currentPage: number;                  
    onPageChange: (item: { selected: number }) => void; 
}

const Pagination = ({ pageCount, currentPage, onPageChange }: PaginationProps) => {
    return (
        <ReactPaginate
            previousLabel={'← Назад'}
            nextLabel={'Вперед →'}
            pageCount={pageCount}
            onPageChange={onPageChange}
            forcePage={currentPage - 1}       
            containerClassName={css.pagination}
            pageClassName={css.page}
            activeClassName={css.active}
            previousClassName={css.previous}
            nextClassName={css.next}
            disabledClassName={css.disabled}
        />
    );
};

export default Pagination;