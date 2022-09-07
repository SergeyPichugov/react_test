import React from 'react';
import { getPagesArray } from '../../../utils/pages';

const Pagination = ({totalPages, page, changePage}) => {
    let pagesArray = getPagesArray(totalPages)

    return (
        <div className="page__wrapper">
            {pagesArray.map((p, i) => (
                <span
                    onClick={() => changePage(p)}
                    key={i}
                    className={page === p ? 'page page_current' : 'page'}
                >
                    {p}
                </span>
            ))}
        </div>
     );
}

export default Pagination;