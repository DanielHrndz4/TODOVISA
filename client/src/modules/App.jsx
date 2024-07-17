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
import Steps from "./screens/steps/Steps";
import FormsComplete from "./components/complete_forms/FormsComplete";
import Guide from "./screens/pdf/Guide";

function App(){
  return (  
    <Router>
      <Routes>
        <Route exact path="/signup" element={<Register></Register>} />
        <Route exact path="/signin" element={<Login></Login>} />
        <Route exact path="/forgotpassword" element={<ForgotPassword></ForgotPassword>} />
        <Route exact path="/" element={<Home></Home>} />
        <Route exact path="/steps" element={<Steps></Steps>} />
        <Route exact path="/vipro/:country/" element={<MainVIPRO></MainVIPRO>} />
        <Route exact path="/qualifications" element={<Qualification></Qualification>} />
        <Route exact path="/guide" element={<Guide></Guide>} />
        <Route exact path="/forms/:id" element={<FormsComplete></FormsComplete>} />
        <Route exact path="/country/:country" element={<CountryScreen></CountryScreen>} />
      </Routes>
    </Router>
  );
}

export default App;
