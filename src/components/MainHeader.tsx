import React, { useState } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { IoLogoDribbble } from "react-icons/io5";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";

const MainHeader: React.FC = () => {
  const [loginModalIsOpen, setLoginModalIsOpen] = useState<boolean>(false);
  const [registerModalIsOpen, setRegisterModalIsOpen] =
    useState<boolean>(false);

  const navigate = useNavigate();

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand as={Link} to="/">
        <IoLogoDribbble
          style={{ width: "60px", height: "60px", color: "blue" }}
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <div className="d-flex justify-content-between">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/main">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/dashboard">
              Dashboard
            </Nav.Link>
            <NavDropdown title="Collections" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/collection/1">
                Collection 1
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/collection/2">
                Collection 2
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link onClick={() => setLoginModalIsOpen(true)}>Login</Nav.Link>
            {loginModalIsOpen && (
              <LoginModal
                loginModalIsOpen={loginModalIsOpen}
                setLoginModalIsOpen={setLoginModalIsOpen}
                registerModalIsOpen={registerModalIsOpen}
                setRegisterModalIsOpen={setRegisterModalIsOpen}
              />
            )}
            <Nav.Link onClick={() => setRegisterModalIsOpen(true)}>
              Register
            </Nav.Link>
            {registerModalIsOpen && (
              <RegisterModal
                setLoginModalIsOpen={setLoginModalIsOpen}
                registerModalIsOpen={registerModalIsOpen}
                setRegisterModalIsOpen={setRegisterModalIsOpen}
              />
            )}
            <Nav.Link
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/");
              }}
            >
              Logout
            </Nav.Link>
            <Nav.Link href="#">Language</Nav.Link>
            <Nav.Link href="#">Theme</Nav.Link>
            <Nav.Link className="border" as={Link} to="/admin">
              Go to admin panel
            </Nav.Link>
          </Nav>
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MainHeader;
