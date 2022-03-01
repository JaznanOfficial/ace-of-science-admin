import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useStateValue } from "../store/Store";

export default function Header() {
    const [{ user }] = useStateValue();

    const logOut = () => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm("Are you sure to logout?")) {
            localStorage.clear();
            // eslint-disable-next-line no-restricted-globals
            location.reload();
        }
    };

    return (
        <>
            

            <Navbar bg="primary" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand href="#home">Ace Of Science</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            
                                <Link className="nav-link" to="adminusers">
                                    Admin-Users
                                </Link>
                                <Link className="nav-link" to="blog">
                                    Blog
                                </Link>
                                <Link className="nav-link" to="lesson">
                                    Lesson
                                </Link>
                                <Link className="nav-link" to="magazine">
                                    Magazine
                                </Link>
                                <Link className="nav-link" to="review">
                                    review
                                </Link>
                            

                            {user._id && (
                                
                                    <span className="text-white mt-1 ms-5">
                                        {user.name}
                                        <button
                                            className="btn btn-sm  btn-outline-danger mx-2"
                                            onClick={logOut}
                                        >
                                            LogOut
                                        </button>
                                    </span>
                                
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}
