import "./App.css";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Main from "./pages/Main";
import Register from "./pages/Register";
import FirstScreen from "./pages/FirstScreen";
import { AuthProvider } from "./context/AuthProvider";
import { TodoProvider } from "./context/TodoProvider";

function App() {
  const token = localStorage.getItem("token");
  return (
    <BrowserRouter>
    <AuthProvider>
      <TodoProvider>
          <Routes>
            <Route path="/">
              <Route index element={<FirstScreen />} />
              {token ? (
                <>
                  <Route path="/Main" element={<Main />} />
                  <Route path="/" element={<Navigate to="/Main" />} />
                </>
              ) : (
                <>
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/" element={<Navigate to="/login" />} />
                </>
              )}
            </Route>
          </Routes>
      </TodoProvider>
    </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
