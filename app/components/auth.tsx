"use client";
import ModalComponent from "./parent/modal";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useRef, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from "react-redux";
import { setAuthModal } from "../redux/recipeSlider";
import api from "../utils/api";
import {User} from "../interfaces/interface"
import { ToastContainer, toast } from "react-toastify";

const AuthModal = () => {
  const [isLogin, setIsLogin] = useState(false);
  const dispatch = useDispatch()
    
  function toggleAuth(){
    setIsLogin((prev) => !prev);
  }

  return (
    <ModalComponent>
      <div className=" relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-1/3 w-full sm:h-auto">
      <CloseIcon onClick={()=> dispatch(setAuthModal(false))} className="absolute top-3 right-3 cursor-pointer text-gray-500"/>
        <div className="bg-white px-4 pb-4 pt-5 sm:p-7 sm:pb-4">
          {isLogin ? <LoginModal toggleAuth={toggleAuth}/> : <SignupModal toggleAuth={toggleAuth}/>}
        </div>
      </div>

    </ModalComponent>
  );
};

const LoginModal = ({toggleAuth} : {toggleAuth : ()=> void}) => {
  const [passwordShown, setPasswordShown] = useState(false);
  const dispatch = useDispatch()
  const username = useRef<HTMLInputElement | null>(null)
  const passwordRef = useRef<HTMLInputElement | null>(null)
  const [messageErrors, setMessageErrors] = useState({
    usernameError: "",
    passwordError: "",
  });


  const validateForm = () => {
    if(!username.current?.value){
      toast.success("Username or Email is required")
      return false
    }

    else if(!passwordRef.current?.value){
      toast.error("Password is required")
      return false
    }

    return true
  }

  const loginHandler = async()=>{
    // Handle login logic here

    if(!validateForm()){
      return
    }
    
    let query = ""

    if(username.current && username.current?.value.includes("@")){
      query = `email : "${username.current?.value}"`
    }

    else{
      query = `username : "${username.current?.value}"`
    }

    const passwordValue = passwordRef.current?.value


    try{
      const response = await api.post("/graphql", {
        query : `mutation {
          login(${query} , password: "${passwordValue}" ) {
            message,
            code
          }
        }`
      });

      if(response.data.data.login.code === 200){
        toast.success(`Welcome back, ${username.current?.value}!`)
        dispatch(setAuthModal(false))
      }
    }
    catch(err){
      toast.error((err as any)?.response?.data.data.login.message || "An error occurred")
    }
  }


  return (
    <>
      {/* Modal Content */}

      <h3 className="font-bold text-3xl mb-3 mt-2 text-center">Login</h3>
      <form className="mt-10 space-y-6">
        <div>
          <h2 className="text-lg font-medium mb-1">Email or Username</h2>
          <input
            name="name"
            ref={username}
            className={`border rounded w-full py-2 px-3 ${messageErrors.usernameError ? "border-red-500" : "border-slate-300"} border-slate-300 text-gray-700 bg-white focus:border-gray-700 focus:ring-gray-700 focus:border-1.75 focus:outline-none`}
            type="text"
            placeholder="Email or Username"
          />
          <p className="text-red-500 text-sm ml-0.5">{messageErrors.usernameError}</p>
        </div>
        <div>
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium mb-1">Password</h2>
            <p className="text-primary text-base cursor-pointer hover:text-orange-400">Forgot password?</p>
          </div>

          <div className="relative">
            <input
              ref={passwordRef}
              type={passwordShown ? "text" : "password"}
              className={`border rounded w-full py-2 px-3 ${messageErrors.passwordError ? "border-red-500" : "border-slate-300"} text-gray-700 bg-white focus:border-gray-700 focus:ring-gray-700 focus:border-1.75 focus:outline-none`}
              placeholder="Password"
            />
            <button
              type="button"
              onClick={() => setPasswordShown((prev) => !prev)}
              className="absolute inset-y-0 end-0 flex items-center z-20 px-3 cursor-pointer rounded-e-md focus:outline-hidden  text-neutral-500"
            >
              {passwordShown ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </button>
          </div>
          <p className="text-red-500 text-sm ml-0.5">{messageErrors.passwordError}</p>
        </div>
      </form>
      <div className=" mt-10 mb-5 py-3">
        <button
        onClick={loginHandler}
          type="submit"
          className="w-full bg-primary py-2.5 text-xl font-medium text-white rounded hover:bg-orange-400 focus:outline-none"
        >
          Login
        </button>
        <p className="mt-10 text-center text-lg font-medium">
          Not a member? <span onClick={toggleAuth} className="text-primary cursor-pointer hover:text-orange-400">Signup now</span>
        </p>
      </div>

    </>
  );
};



const SignupModal = ({toggleAuth} : {toggleAuth : ()=> void}) => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
  const dispatch = useDispatch()

  const [userData, setUserData] = useState<User>({ username: "", email: "", password: "", confirmPassword: "" });

  const [messageErrors, setMessageErrors] = useState({
    usernameError: "",
    emailError: "",
    passwordError: "",
    confirmPasswordError: "",
  });

  const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  }

  const validateForm = () => {
    setMessageErrors({
      usernameError: "",
      emailError: "",
      passwordError: "",
      confirmPasswordError: "",
    });  // Reset error messages


    if(!userData.username){
      setMessageErrors((prev) => ({ ...prev, usernameError: "Username is required" }));
      return false;
    }

    else if(!userData.email){
      setMessageErrors((prev) => ({ ...prev, emailError: "Email is required" }));
      return false;
    }
    else if(!userData.password){
      setMessageErrors((prev) => ({ ...prev, passwordError: "Password is required" }));
      return false;
    }
    else if(userData.password.length < 8){
      setMessageErrors((prev) => ({ ...prev, passwordError: "Password must be at least 8 characters" }));
      return false;
    }

    else if(userData.password !== userData.confirmPassword){
      setMessageErrors((prev) => ({ ...prev, confirmPasswordError: "Passwords do not match" }));
      return false;
    }

    return true
  }

  const signupHandler = async()=>{

    if(!validateForm()){
      return
    }

    try{  
      const response = await api.post("/graphql", {
        query : `mutation {
          signup(username: "${userData.username}" , email: "${userData.email}" , password: "${userData.password}" ) {
            message,
            code
          }
        }`
      });

      if(response.data.data.signup.code === 200){
        toast.success(`Welcome, ${userData.username}!`)
        dispatch(setAuthModal(false))
      }
      else {
        if(response.data.data.signup.message.includes("username")){
          setMessageErrors((prev) => ({ ...prev, usernameError: response.data.data.signup.message }));
        }
        else {
          setMessageErrors((prev) => ({ ...prev, emailError: response.data.data.signup.message }));
        }
      }
    }
    catch(err){
      toast.error((err as any)?.response?.data.data.login.message || "An error occurred")
    }

  }

  return (
    <>
      {/* Modal Content */}

      <h3 className="font-bold text-3xl mb-3 mt-2 text-center">Create an Account</h3>
      <form className="mt-10 space-y-4">
        <div>
          <h2 className="text-lg font-medium mb-1">Username</h2>
          <input
            name="username"
            onChange={handleChange}
            value={userData.username}
            className={`border rounded w-full py-2 px-3 ${messageErrors.usernameError ? "border-red-500" : "border-slate-300"}  text-gray-700 bg-white focus:border-gray-700 focus:ring-gray-700 focus:border-1.75 focus:outline-none`}
            type="text"
            placeholder="Username"
          />
          <p className="text-red-500 text-sm ml-0.5">{messageErrors.usernameError}</p>
        </div>
        <div>
          <h2 className="text-lg font-medium mb-1">Email</h2>
          <input
            name="email"
            onChange={handleChange}
            value={userData.email}
            className={`border rounded w-full py-2 px-3 ${messageErrors.emailError ? "border-red-500" : "border-slate-300"} text-gray-700 bg-white focus:border-gray-700 focus:ring-gray-700 focus:border-1.75 focus:outline-none`}
            type="text"
            placeholder="Email"
          />
          <p className="text-red-500 text-sm ml-0.5">{messageErrors.emailError}</p>
        </div>
        <div>
          <h2 className="text-lg font-medium mb-1">Password</h2>
          <div className="relative">
            <input
              type={passwordShown ? "text" : "password"}
              name="password"
              onChange={handleChange}
              value={userData.password}
              className={`border rounded w-full py-2 px-3 ${messageErrors.passwordError ? "border-red-500" : "border-slate-300"} text-gray-700 bg-white focus:border-gray-700 focus:ring-gray-700 focus:border-1.75 focus:outline-none`}
              placeholder="Password"
            />
            <button
              type="button"
              onClick={() => setPasswordShown((prev) => !prev)}
              className="absolute inset-y-0 end-0 flex items-center z-20 px-3 cursor-pointer rounded-e-md focus:outline-hidden  text-neutral-500"
            >
              {passwordShown ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </button>

          </div>
          <p className="text-red-500 text-sm ml-0.5">{messageErrors.passwordError}</p>
          {/* <p className="text-primary mt-1">Forgot password?</p> */}
        </div>
        <div>
          <h2 className="text-lg font-medium mb-1">Confirm Password</h2>
          <div className="relative">
            <input
              type={confirmPasswordShown ? "text" : "password"}
              name="confirmPassword"
              onChange={handleChange}
              value={userData.confirmPassword}
              className={`border rounded w-full py-2 px-3 ${messageErrors.confirmPasswordError ? "border-red-500" : "border-slate-300"} text-gray-700 bg-white focus:border-gray-700 focus:ring-gray-700 focus:border-1.75 focus:outline-none`}
              placeholder="Confirm Password"
            />
            <button
              type="button"
              onClick={() => setConfirmPasswordShown((prev) => !prev)}
              className="absolute inset-y-0 end-0 flex items-center z-20 px-3 cursor-pointer rounded-e-md focus:outline-hidden  text-neutral-500"
            >
              {confirmPasswordShown ? (
                <VisibilityOffIcon />
              ) : (
                <VisibilityIcon />
              )}
            </button>
          </div>
          
          <p className="text-red-500 text-sm ml-0.5">{messageErrors.confirmPasswordError}</p>
        </div>
      </form>
      <div className="mt-10 mb-5 py-3">
        <button
          type="submit"
          onClick={signupHandler}
          className="w-full bg-primary py-2.5 text-xl font-medium text-white rounded hover:bg-orange-400 focus:outline-none"
        >
          Signup
        </button>
        <p className="mt-10 text-center text-lg font-medium">
          Already have an account?{" "}
          <span onClick={toggleAuth} className="text-primary cursor-pointer hover:text-orange-400">Login now</span>
        </p>
      </div>
    </>
  );
};


export default AuthModal;