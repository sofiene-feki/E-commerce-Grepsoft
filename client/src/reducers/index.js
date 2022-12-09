import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { searchReducer } from './serachReducer';
import { cartReducer } from './cartReducer';
import { drawerReducer } from './drawerReducer';
import { dialogReducer } from './dialogReducer';

const rootReducer = combineReducers({
  user: userReducer,
  search: searchReducer,
  cart: cartReducer,
  drawer: drawerReducer,
  dialog: dialogReducer,
});

export default rootReducer;
