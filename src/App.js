import React, { useReducer } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Auth from "./components/Auth";
import Events from "./components/Events/Events";
import Header from "./components/Header";
import Magazine from "./components/Magazine/Magazine";
import Notes from "./components/Notes/Notes";
import Review from "./components/Review/Review";
import SingleBlog from "./components/SingleBlog/SingleBlog";
import Blog from "./page/Blog";
import Lesson from "./page/Lesson";
import Login from "./page/Login";
import Member from "./page/Member";
import Watch from "./page/Watch";
import reducer from "./store/reducer";
import Store from "./store/Store";

function App() {
    return (
        <div className="App">
            <Store.Provider
                value={useReducer(reducer, {
                    user: {},
                    api: "https://aosserver.herokuapp.com/api",
                })}
            >
                <Header />
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Auth>
                                <h1>
                                    Ace of science Admin panel is under constraction. Please visit
                                    nav link above (admin user, blog, review etc)
                                </h1>
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
                        path="/blogs"
                        element={
                            <Auth>
                                <Blog />
                            </Auth>
                        }
                    />
                    <Route
                        path="/notes"
                        element={
                            <Auth>
                                <Notes />
                            </Auth>
                        }
                    />
                    <Route
                        path="/events"
                        element={
                            <Auth>
                                <Events />
                            </Auth>
                        }
                    />
                    <Route
                        path="/single-blog/:id"
                        element={
                            <Auth>
                                <SingleBlog />
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
                        path="/magazine"
                        element={
                            <Auth>
                                <Magazine />
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
