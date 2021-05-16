import {createContext} from 'react';

export const CurrentPageContext = createContext({
    currentPage: 0,
    setCurrentPage: () => {}
})