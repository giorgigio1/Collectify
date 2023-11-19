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
import Card from "./components/Card";
import Head from "./components/Head";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/user-management" element={<UserManagementTable />} />
        </Route>
        <Route path="/*" element={<Navigate to="/login" />} />
        <Route path="/card" element={<Card />} />
        <Route path="/head" element={<Head />} />
      </Routes>
    </Router>
  );
}

export default App;
