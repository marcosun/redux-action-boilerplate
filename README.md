# redux-action-boilerplate

## Install
    yarn add redux-action-boilerplate

## Usage

This library exposes two constructor functions (class) to generate redux actions.
Sync creates synchronous actions. Async creates asynchronous actions.
Both functions accept the following parameters.

|name|type|isRequired|default|remarks|
|--|--|--|--|--|
|prefix|String|N|''|Will be prefixed to each and every single action to prevent name conflicts. Recommended to set as page name.|
|actions|[String]|Y||Action names must be unique under the same name space|

The only difference between Sync and Async functions is that Sync creates one action for each action passed in, while Async maps three actions for each action it received: action, actionSuccess, and actionFailure.

### Naming convention

Action types are capitalised letters separated with underscore, i.e. FETCH_BOOKS.
Actions are camel cased letters, i.e. fetchBooks.

### Sync

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
    
    or:
    import {
      toggle, // => (payload) => {return {type: 'BOOK_LIST_PAGE/TOGGLE', payload,};}
    } from './syncAction.js';
    const {
      TYPE // => 'BOOK_LIST_PAGE/TOGGLE'
    } = toggle

### Async

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


    or: 
    import {
      fetchBooks, // => (payload) => {return {type: 'BOOK_LIST_PAGE/FETCH_BOOKS', payload,};}
    } from './asyncAction.js';
        
    const {
      success, // => (payload) => {return {type: 'BOOK_LIST_PAGE/FETCH_BOOKS_SUCCESS', payload,};}
      failure, // => (payload) => {return {type: 'BOOK_LIST_PAGE/FETCH_BOOKS_FAILURE', payload,};}
      TYPE, // => 'BOOK_LIST_PAGE/FETCH_BOOKS'
      SUCCESS, // => 'BOOK_LIST_PAGE/FETCH_BOOKS_SUCCESS'
      FAILURE, // => 'BOOK_LIST_PAGE/FETCH_BOOKS_FAILURE'
    } = fetchBooks;
