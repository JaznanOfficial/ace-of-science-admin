import React, { useEffect }  from 'react';
import axios from 'axios';
import {  useLocation, useNavigate } from 'react-router-dom';
import { useStateValue } from '../store/Store';

export default function Auth({ children }) {
  const rlocation = useLocation();
  const nv=useNavigate()
  const [{ user, api }, dispatch] = useStateValue();

  useEffect(() => {
  
  if (localStorage.getItem('_atoken')) {
    if (!user?._id) {
      axios
        .get(api + '/adminuser/me', {
          headers: {
            token: localStorage.getItem('_atoken'),
          },
        })
        .then((res) => {
        
          dispatch({ type: 'setUser', payload: res.data });
        })
        .catch((err) => {
          localStorage.removeItem('_atoken');
         nv('/login?to=' + rlocation.pathname)
        });
    }
  }else nv('/login?to=' + rlocation.pathname)
}, [api, dispatch, nv, rlocation.pathname, user?._id])


  if (user?._id) return children;
  else return <h2>Loading </h2>;
}
