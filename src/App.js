import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";
import { AuthContextComponent } from "./contexts/authContext";
import CollectionsDetail from "./pages/CollectionsDetail.page";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import UsersDetailPage from "./pages/Usersdetail.page";
import UsersPage from "./pages/UsersPage";

function App() {
  return (
    <div className="App">
      <Toaster />
      <AuthContextComponent>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/collections/:idColl" element={<CollectionsDetail />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/users/:idUser" element={<UsersDetailPage />} />
        </Routes>
      </AuthContextComponent>
    </div>
  );
}

export default App;
