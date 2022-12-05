import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import RegisterProduct from './pages/RegisterProduct';
import ApproveTrade from './pages/ApproveTrade';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import UserProfile from './pages/UserProfile';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route index element={<LoginPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/register/product" element={<RegisterProduct />} />
          <Route path="/approve-trade/:id" element={<ApproveTrade />} />
          <Route path="/user/profile/:id" element={<UserProfile />} />
          <Route path="/user/transactions/:id" element={<UserProfile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
