import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Registration from "./components/Registration";
import Login from "./components/Login";
import UserManagementTable from "./components/UserManagementTable";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Main from "./components/Main";

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/register" element={<Registration />} /> */}
        {/* <Route path="/login" element={<Login />} /> */}
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<UserManagementTable />} />
        </Route>
        {/* <Route path="/*" element={<Navigate to="/login" />} /> */}
        <Route path="/" element={<Main />} />
      </Routes>
    </Router>
  );
}

export default App;
