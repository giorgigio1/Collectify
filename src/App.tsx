import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import UserManagementTable from "./components/UserManagementTable";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Main from "./components/Main";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<UserManagementTable />} />
        </Route>
        <Route path="/*" element={<Navigate to="/" />} />
        <Route path="/" element={<Main />} />
      </Routes>
    </Router>
  );
}

export default App;
