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
  Navigate
} from "react-router-dom";
import Qualification from "./components/qualification/Qualification";
import Steps from "./screens/steps/Steps";
import FormsComplete from "./components/complete_forms/FormsComplete";
import Guide from "./screens/pdf/Guide";
import OTP from "./screens/OTP/OTP";

function App(){
  return (  
    <Router>
      <Routes>
        <Route exact path="https://todovisa.com/signup" element={<Register></Register>} />
        <Route exact path="https://todovisa.com/signin" element={<Login></Login>} />
        <Route exact path="https://todovisa.com/forgotpassword" element={<ForgotPassword></ForgotPassword>} />
        <Route exact path="https://todovisa.com/" element={<Home></Home>} />
        <Route exact path="https://todovisa.com/steps" element={<Steps></Steps>} />
        <Route exact path="https://todovisa.com/vipro/:country/" element={<MainVIPRO></MainVIPRO>} />
        <Route exact path="https://todovisa.com/qualifications" element={<Qualification></Qualification>} />
        <Route exact path="https://todovisa.com/guide" element={<Guide></Guide>} />
        <Route exact path="https://todovisa.com/forms/:id" element={<FormsComplete></FormsComplete>} />
        <Route exact path="https://todovisa.com/country/:country" element={<CountryScreen></CountryScreen>} />
        <Route exact path="https://todovisa.com/validation_code/:email" element={<OTP></OTP>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
