import React, { useReducer } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Auth from './components/Auth';
import Header from './components/Header';
import Review from './components/Review/Review';
import Blog from './page/Blog';
import Lesson from './page/Lesson';
import Login from './page/Login';
import Member from './page/Member';
import Watch from './page/Watch';
import reducer from './store/reducer';
import Store from './store/Store';

function App() {
  return (
    <div className="App">
      <Store.Provider
        value={useReducer(reducer, {
          user: {},
          api: 'https://aosserver.herokuapp.com/api',
        })}
      >
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <Auth>
                <h1>Ace of science Admin panel is under constraction. Please visit nav link above (admin user, blog, review etc)</h1>
              </Auth>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="/adminusers"
            element={
              <Auth>
                <Member />
              </Auth>
            }
          />
          <Route
            path="/blog"
            element={
              <Auth>
                <Blog />
              </Auth>
            }
          />
          <Route
            path="/lesson"
            element={
              <Auth>
                <Lesson />
              </Auth>
            }
          />
          <Route
            path="/review"
            element={
              <Auth>
                <Review />
              </Auth>
            }
          />
          <Route
            path="/watch/:vid"
            element={
              <Auth>
                <Watch />
              </Auth>
            }
          />
        </Routes>
      </Store.Provider>
    </div>
  );
}

export default App;
