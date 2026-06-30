import { BrowserRouter, Route, Routes } from "react-router-dom";

import Loading from "./components/Loading";

import Home from "./pages/Home";

function App() {
  return (
    <div className="vw-100 vh-100 overflow-auto">
      <Loading />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
