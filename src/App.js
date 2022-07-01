import './App.css';
import 'bootswatch/dist/flatly/bootstrap.min.css';
import {
  Home,
  ProductDetail,
  Login,
  Purchases,
  UserInfo,
  SignUp,
} from './pages/Index';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { LoadingScreen, NavBar, ProtectedRoutes } from './components/Index';
import { useSelector } from 'react-redux';

function App() {
  const isLoading = useSelector((state) => state.isLoading);

  return (
    <HashRouter>
      <Container className="container">
        {isLoading && <LoadingScreen />}
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          <Route element={<ProtectedRoutes />}>
            <Route path="/purchases" element={<Purchases />} />
            <Route path="/user" element={<UserInfo />} />
          </Route>
        </Routes>
      </Container>
    </HashRouter>
  );
}

export default App;
