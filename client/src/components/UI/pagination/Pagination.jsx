import React, {useMemo, useState} from 'react';
import MyButton from "../button/MyButton";

const Pagination = ({totalPages, page, setPage}) => {
    const [pagesArray, setPagesArray] = useState([]);

    //Todo: move to pages.js
    useMemo(() => {
        for (let i = pagesArray.length; i < totalPages; i++) {
            pagesArray.push(i + 1)
        }
        setPagesArray(pagesArray)
    }, [totalPages]);

    return (
        <div className={'page__wrapper'}>
            {pagesArray.map(p =>
                <MyButton
                    key={p}
                    onClick={() => setPage(p)}
                    className={p === page ? 'page__current' : 'page'}
                >
                    {p}
                </MyButton>
            )}
        </div>
    );
};

export default Pagination;
