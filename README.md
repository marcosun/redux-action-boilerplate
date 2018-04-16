# redux-action-boilerplate

## Install
    yarn add redux-action-boilerplate

## Usage

    // syncAction.js
    import {Sync} from 'redux-action-boilerplate';
    
    export default new Sync({
      prefix: 'bookListPage',
      actions: ['toggle'],
    });
    
    // in other files
    import {
      toggle, // => (payload) => {return {type: 'BOOK_LIST_PAGE/TOGGLE', payload,};}
      TOGGLE, // => 'BOOK_LIST_PAGE/TOGGLE'
    } from './syncAction.js';

    // asyncAction.js
    import {Async} from 'redux-action-boilerplate';
    
    export default new Async({
      prefix: 'bookListPage',
      actions: ['fetchBooks'],
    });
    
    // in other files
    import {
      fetchBooks, // => (payload) => {return {type: 'BOOK_LIST_PAGE/FETCH_BOOKS', payload,};}
      fetchBooksSuccess, // => (payload) => {return {type: 'BOOK_LIST_PAGE/FETCH_BOOKS_SUCCESS', payload,};}
      fetchBooksFailure, // => (payload) => {return {type: 'BOOK_LIST_PAGE/FETCH_BOOKS_FAILURE', payload,};}
      FETCH_BOOKS, // => 'BOOK_LIST_PAGE/FETCH_BOOKS'
      FETCH_BOOKS_SUCCESS, // => 'BOOK_LIST_PAGE/FETCH_BOOKS_SUCCESS'
      FETCH_BOOKS_FAILURE, // => 'BOOK_LIST_PAGE/FETCH_BOOKS_FAILURE'
    } from './asyncAction.js';
