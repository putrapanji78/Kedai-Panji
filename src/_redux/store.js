import { createStore, combineReducers} from 'redux';


import categories from '../_reducers/categories';
import menusdb from '../_reducers/menusdb';
import menus from '../_reducers/menus';


// this global states
const reducers = combineReducers({
  categories,
  menus,
  menusdb
})

const store = createStore(
  reducers
);

export default store