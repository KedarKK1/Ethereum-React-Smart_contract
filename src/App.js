import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import RegisterProduct from './pages/RegisterProduct';
import ApproveTrade from './pages/ApproveTrade';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="" element={<RegisterProduct />} />
          <Route path="/approve_trade" element={<ApproveTrade />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
