import React, { useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { IoLogoDribbble } from "react-icons/io5";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import jwt_decode from "jwt-decode";

type TokenData = { exp: number; userId: string; name: string };

const getUserByToken = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return null;
  }

  const decoded = jwt_decode<TokenData>(token);

  return decoded.name;
};

const MainHeader: React.FC = () => {
  const [loginModalIsOpen, setLoginModalIsOpen] = useState<boolean>(false);
  const [registerModalIsOpen, setRegisterModalIsOpen] =
    useState<boolean>(false);

  const navigate = useNavigate();

  return (
    <Navbar className="px-5" bg="light" expand="lg">
      <Navbar.Brand as={Link} to="/">
        <IoLogoDribbble
          style={{
            width: "60px",
            height: "60px",
            color: "blue",
            cursor: "pointer",
          }}
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <div className="d-flex justify-content-between w-100">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/">
              Dashboard
            </Nav.Link>
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
            {getUserByToken() && (
              <div className="d-flex">
                <Nav.Link className="border" as={Link} to="/admin">
                  Go to admin panel
                </Nav.Link>
                <button className="mx-3 border border-primary rounded text-primary">
                  Hello,{" "}
                  <span className="text-primary">{getUserByToken()}</span>!
                </button>
                <button
                  className="me-5 text-primary border border-primary rounded"
                  onClick={() => {
                    localStorage.removeItem("token");
                    navigate("/", { replace: true });
                    window.location.reload();
                  }}
                >
                  Log out
                </button>
              </div>
            )}
          </Nav>
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MainHeader;
