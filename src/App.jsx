import { GlobalStyle } from "./Components/GlobalStyle.js";
import Home from "./Components/Home.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "./Components/Profile.jsx";

function App() {
  return (
    <>
      <Router>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/profile/:name" element={<Profile />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
