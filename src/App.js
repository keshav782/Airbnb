import "./App.css";
import { Routes, Route } from "react-router-dom";
import { IndexPage } from "./pages/IndexPage";
import { LoginPage } from "./pages/LoginPage";
import { Layout } from "./components/Layout";
import { RegisterPage } from "./pages/RegisterPage";
import axios from "axios";
import { UserContextProvider } from "./contextApi/UserContext";
import { AccountPage } from "./pages/AccountPage";
import { PlacePage } from "./pages/PlacePage";
import { PostPage } from "./pages/PostPage";
import { BookingPages } from "./pages/BookingPages";
import { BookingPage } from "./pages/BookingPage";

axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;
function App() {
  return (

    <UserContextProvider>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<IndexPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/account/:subpage?" element={<AccountPage/>} />
        <Route path="/account/:subpage/:placeId" element={<AccountPage/>} />
        <Route path="/account/:subpage/:placeId/:id" element={<AccountPage/>} />
        <Route path="/account/places/new/:id" element={<PlacePage/>} />
        <Route path="/place/:id" element={<PostPage/>} />
        <Route path="/account/booking/:id" element={<BookingPage/>} />
        <Route path="/account/booking" element={<BookingPages/>} />
        
      </Route>
    </Routes>
    </UserContextProvider>
  );
}

export default App;
