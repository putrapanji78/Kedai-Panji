import { createStore, combineReducers} from 'redux';


import categories from '../_reducers/categories';
import menusdb from '../_reducers/menusdb';
import menus from '../_reducers/menus';
import orders from '../_reducers/orders';
import bill from '../_reducers/viewBill';


// this global states
const reducers = combineReducers({
  categories,
  menus,
  menusdb,
  orders,
  bill
})

const store = createStore(
  reducers
);

export default store