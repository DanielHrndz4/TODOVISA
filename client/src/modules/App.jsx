import ForgotPassword from "./screens/forgotpassword/ForgotPassword";
import MainVIPRO from "./screens/form/MainVIPRO";
import Home from "./screens/home/Home";
import Login from "./screens/login/SignIn";
import Register from "./screens/register/SignUp";
import CountryScreen from "./screens/countrys/CountryScreen";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Qualification from "./components/qualification/Qualification";
import Payment from "./components/payment/Payment";

function App(){
  return (  
    <Router>
      <Routes>
        <Route exact path="/signup" element={<Register></Register>} />
        <Route exact path="/signin" element={<Login></Login>} />
        <Route exact path="/forgotpassword" element={<ForgotPassword></ForgotPassword>} />
        <Route exact path="/" element={<Home></Home>} />
        <Route exact path="/vipro/:country/" element={<MainVIPRO></MainVIPRO>} />
        <Route exact path="/payment" element={<Payment></Payment>} />
        <Route exact path="/qualifications" element={<Qualification></Qualification>} />
        <Route exact path="/country/:country" element={<CountryScreen></CountryScreen>} />
      </Routes>
    </Router>
  );
}

export default App;
