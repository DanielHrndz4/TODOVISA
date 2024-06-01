import ForgotPassword from "./screens/forgotpassword/ForgotPassword";
import Home from "./screens/home/Home";
import Login from "./screens/login/SignIn";
import Register from "./screens/register/SignUp";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

function App(){
  return (  
    <Router>
      <Routes>
        <Route exact path="/signup" element={<Register></Register>} />
        <Route exact path="/signin" element={<Login></Login>} />
        <Route exact path="/forgotpassword" element={<ForgotPassword></ForgotPassword>} />
        <Route exact path="/" element={<Home></Home>} />
      </Routes>
    </Router>
  );
}

export default App;
