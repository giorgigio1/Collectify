import { useNavigate } from "react-router-dom";
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

const Header = () => {
  const navigate = useNavigate();

  return (
    <header
      className="d-flex justify-content-between align-items-center bg-light"
      style={{ height: "80px" }}
    >
      <button
        className="ms-5 text-primary border-black"
        onClick={() => navigate("/")}
      >
        Go to main page
      </button>
      <div>
        <button className="me-3">
          Hello, <span className="text-primary">{getUserByToken()}</span>!
        </button>
        <button
          className="me-5 text-primary"
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/", { replace: true });
          }}
        >
          Log out
        </button>
      </div>
    </header>
  );
};

export default Header;
