import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useStateValue } from '../store/Store';

export default function Header() {
  const [{ user }] = useStateValue();

  const logOut = () => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('Are you sure to logout?')) {
      localStorage.clear();
      // eslint-disable-next-line no-restricted-globals
      location.reload();
    }
  };

  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Link className="navbar-brand" to="/">
            AOS
          </Link>

          <Nav className="me-auto">
            <Link className="nav-link" to="adminusers">
              AdminUsers
            </Link>
            <Link className="nav-link" to="blog">
              Blog
            </Link>
            <Link className="nav-link" to="lesson">
              Lesson
            </Link>
          </Nav>
          <span className="text-white">{user.name}</span>

          {user._id && (
            <button
              className="btn btn-sm  btn-outline-danger mx-2"
              onClick={logOut}
            >
              LogOut
            </button>
          )}
        </Container>
      </Navbar>
    </>
  );
}
