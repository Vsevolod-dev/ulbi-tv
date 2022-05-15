import {useMemo} from "react";

export const getPageCount = (totalCount, limit) => {
    return Math.ceil(totalCount / limit)
}

export const usePagination = (totalPages, pagesArray) => {
    useMemo(() => {
        for (let i = pagesArray.length; i < totalPages; i++) {
            pagesArray.push(i + 1)
        }
    }, [totalPages]);

    return pagesArray
}