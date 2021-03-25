import { useReducer, createContext } from 'react';
import { reducer } from './reducer';

const initialState = {
  isLoggedIn: false,
  accToken: '',
};

const store = createContext(initialState);
const { Provider } = store;

const StoreProvider = ({ children }) => {
  const [storeState, dispatch] = useReducer(reducer, initialState);
  return <Provider value={[storeState, dispatch]}>{children}</Provider>;
};

export { store, StoreProvider };
