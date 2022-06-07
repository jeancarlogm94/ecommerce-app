import "./App.css";
import "bootswatch/dist/flatly/bootstrap.min.css";
import { Home, ProductItem, Login, Purchases } from "./pages/Index";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import { LoadingScreen, NavBar } from "./components/Index";
import { useSelector } from "react-redux";

function App() {
  const isLoading = useSelector((state) => state.isLoading);

  return (
    <HashRouter>
      <Container>
        {isLoading && <LoadingScreen />}
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:id" element={<ProductItem />} />
          <Route path="/login" element={<Login />} />
          <Route path="/purchases" element={<Purchases />} />
        </Routes>
      </Container>
    </HashRouter>
  );
}

export default App;
