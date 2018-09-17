# redux-action-boilerplate

## Installation

redux-action-boilterplate is available as an [npm package](https://www.npmjs.com/package/redux-action-boilerplate).

```sh
yarn add redux-action-boilerplate
// or
npm install --save redux-action-boilerplate
```

## Usage

This library exposes two constructor functions (class) to generate redux actions.
Sync creates synchronous actions. Async creates asynchronous actions.
Both functions accept the following parameters.

|name|type|isRequired|default|remarks|
|--|--|--|--|--|
|prefix|String|N|''|Will be prefixed to each and every single action names to prevent name conflicts. Usually equal to page name.|
|actions|[String]|Y||Action names must be unique under the same name space.|

The only difference between Sync and Async functions is that Sync creates one action for each action passed in, while Async maps three actions for each action it received to action, actionSuccess, and actionFailure.

### Naming convention

Action types are capitalised letters separated with underscore, i.e. FETCH_BOOKS.
Actions are letters in camel-case, i.e. fetchBooks.

### Sync

Create a synchronous action to change redux store visibility filter.

```javascript
// action.js
import { Sync } from 'redux-action-boilerplate';

export const sync = new Sync({
  /* Create a name space. */
  prefix: 'users',
  /* Create a synchronous action. */
  actions: ['setVisibilityFilter'],
});

// container.js
import { sync } from './action.js';

const {
  /**
   * Signature:
   * (payload) => ({ type: 'USERS/SET_VISIBILITY_FILTER', payload })
   */
  setVisibilityFilter,
} = sync;

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    /**
     * Dispatch an action to update visibility filter as seller.
     * i.e. payload = { role: 'seller' }
     */
    onVisibilityFilterSet: (payload) => {
      dispatch(setVisibilityFilter(payload));
    },
  };
};

// reducer.js
import { sync } from './action.js';

const { setVisibilityFilter } = sync;

const initialState = {
  users: [{
    id: '1',
    name: 'Alice',
    role: 'admin',
  }, {
    id: '2',
    name: 'Bill',
    role: 'seller',
  }],
  visibilityFilter: '',
};

export default function Reducer(state=initialState, action) {
  switch() {
  /**
   * Each synchronous action has a property TYPE equal to action name.
   * setVisibilityFilter.TYPE = 'USERS/SET_VISIBILITY_FILTER'
   */
    case setVisibilityFilter.TYPE:
      return {
        ...state,
        visibilityFilter: action.payload.role,
      };
    default:
      return state;
  }
}

// Legacy API:
import { sync } from './action.js';

import {
  setVisibilityFilter, // (payload) => ({ type: 'USERS/SET_VISIBILITY_FILTER', payload })
  SET_VISIBILITY_FILTER, // 'USERS/SET_VISIBILITY_FILTER'
} from sync;
```

### Async

```javascript
// action.js
import { Async } from 'redux-action-boilerplate';

export const async = new Async({
  prefix: 'users',
  /* Create an asynchronous action. Delete a user from redux store only if that user has been deleted from database */
  actions: ['deleteUser'],
});

// container.js
import { async } from './action.js';

const {
  /**
   * Signature:
   * (payload) => ({ type: 'USERS/DELETE_USER', payload })
   */
  deleteUser,
} = async;

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    /**
     * Dispatch an action to delete a user by user id.
     * i.e. payload = { id: '2' }
     */
    onUserDelete: (payload) => {
      dispatch(deleteUser(payload));
    },
  };
};

// reducer.js
import { async } from './action.js';

const { deleteUser } = async;

const initialState = {
  users: [{
    id: '1',
    name: 'Alice',
    role: 'admin',
  }, {
    id: '2',
    name: 'Bill',
    role: 'seller',
  }],
  /* API request status. */
  isLoading: false,
};

export default function Reducer(state=initialState, action) {
  switch() {
  /**
   * Each asynchronous action has a property TYPE equal to action name.
   * deleteUser.TYPE = 'USERS/DELETE_USER'
   */
    case deleteUser.TYPE:
      return {
        ...state,
      /* Toggle API request status. */
        isLoading: true,
      };
  /**
   * Each asynchronous action has a property SUCCESS.
   * deleteUser.TYPE = 'USERS/DELETE_USER_SUCCESS'
   */
    case deleteUser.SUCCESS:
    /* Delete user by user id. */
    const id = action.payload.id;
      return {
      ...state,
      users: state.users.filter((user) => user.id !== id),
      /* Toggle API request status. */
      isLoading: false,
      };
  /**
   * Each asynchronous action has a property FAILURE.
   * deleteUser.TYPE = 'USERS/DELETE_USER_FAILURE'
   */
    case deleteUser.FAILURE:
      return {
      ...state,
      /* Toggle API request status. */
      isLoading: false,
      };
    default:
      return state;
  }
}

// saga.js
import { put, takeLatest } from 'redux-saga/effects';
import { async } from './action.js';

const { deleteUser } = async;

function* deleteUserById(action) {
  try {
    /* ...AJAX */

  /* User id to delete from redux store. */
    const id = action.payload.id;

    /**
   * Each asynchronous action has a success action.
   * Signature:
     * (payload) => ({ type: 'USERS/DELETE_USER_SUCCESS', payload })
     * Dispatch success action.
     */
  yield put(deleteUser.success({ id }));
  } catch(err) {}
    /**
   * Each asynchronous action has a failure action.
   * Signature:
     * (payload) => ({ type: 'USERS/DELETE_USER_FAILURE', payload })
     * Dispatch failure action.
     */
  yield put(deleteUser.failure(err));
}

export default function* () {
  yield takeLatest(deleteUser.TYPE, deleteUserById);
}

// Legacy API:
import {
  fetchBooks, // (payload) => ({type: 'BOOK_LIST_PAGE/FETCH_BOOKS', payload})
  fetchBooksSuccess, // (payload) => ({type: 'BOOK_LIST_PAGE/FETCH_BOOKS_SUCCESS', payload})
  fetchBooksFailure, // (payload) => ({type: 'BOOK_LIST_PAGE/FETCH_BOOKS_FAILURE', payload})
  FETCH_BOOKS, // 'BOOK_LIST_PAGE/FETCH_BOOKS'
  FETCH_BOOKS_SUCCESS, // 'BOOK_LIST_PAGE/FETCH_BOOKS_SUCCESS'
  FETCH_BOOKS_FAILURE, // 'BOOK_LIST_PAGE/FETCH_BOOKS_FAILURE'
} from './action.js';
```