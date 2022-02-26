import { createContext, useContext } from 'react';
const UserStore = createContext({
  user: {},
  api: 'https://aosserver.herokuapp.com/api/',
});
export default UserStore;
export const useStateValue = () => useContext(UserStore);
