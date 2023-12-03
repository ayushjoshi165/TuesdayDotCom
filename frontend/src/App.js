// import logo from "./logo.svg";
import "./App.css";
import Home from "./components/Home";
import LoginSignup from "./components/Login-signup/LoginSignup";

function App() {
  return (
    <div className="App">
      <h1 className="tuesdaylogo">Tuesday.com</h1>
      <LoginSignup />
      <Home></Home>
      {/* <h1> Add New User</h1> */}
      {/* <UserForm></UserForm> */}
    </div>
  );
}

export default App;
