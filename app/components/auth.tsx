"use client";
import ModalComponent from "./parent/modal";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from "react-redux";
import { setAuthModal } from "../redux/recipeSlider";

const AuthModal = () => {
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useDispatch()
    
  function toggleAuth(){
    setIsLogin((prev) => !prev);
  }

  return (
    <ModalComponent>
      <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-1/3 w-full sm:h-auto">
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

  return (
    <>
      {/* Modal Content */}

      <h3 className="font-bold text-3xl mb-3 mt-2 text-center">Login</h3>
      <form className="mt-10 space-y-6">
        <div>
          <h2 className="text-lg font-medium mb-2">Email or Username</h2>
          <input
            name="name"
            className="border rounded w-full py-2 px-3 border-slate-300 text-gray-700 bg-white focus:border-gray-700 focus:ring-gray-700 focus:border-1.75 focus:outline-none"
            type="text"
            placeholder="Email or Username"
          />
        </div>
        <div>
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium mb-2">Password</h2>
            <p className="text-primary text-base cursor-pointer hover:text-orange-400">Forgot password?</p>
          </div>

          <div className="relative">
            <input
              type={passwordShown ? "text" : "password"}
              className="border rounded w-full py-2 px-3 border-slate-300 text-gray-700 bg-white focus:border-gray-700 focus:ring-gray-700 focus:border-1.75 focus:outline-none"
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
          {/* <p className="text-primary mt-1">Forgot password?</p> */}
        </div>
      </form>
      <div className="bg-gray-50 mt-10 mb-5 py-3">
        <button
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

  return (
    <>
      {/* Modal Content */}

      <h3 className="font-bold text-3xl mb-3 mt-2 text-center">Create an Account</h3>
      <form className="mt-10 space-y-6">
        <div>
          <h2 className="text-lg font-medium mb-2">Username</h2>
          <input
            name="name"
            className="border rounded w-full py-2 px-3 border-slate-300 text-gray-700 bg-white focus:border-gray-700 focus:ring-gray-700 focus:border-1.75 focus:outline-none"
            type="text"
            placeholder="Username"
          />
        </div>
        <div>
          <h2 className="text-lg font-medium mb-2">Email</h2>
          <input
            name="name"
            className="border rounded w-full py-2 px-3 border-slate-300 text-gray-700 bg-white focus:border-gray-700 focus:ring-gray-700 focus:border-1.75 focus:outline-none"
            type="text"
            placeholder="Email"
          />
        </div>
        <div>
          <h2 className="text-lg font-medium mb-2">Password</h2>

          <div className="relative">
            <input
              type={passwordShown ? "text" : "password"}
              className="border rounded w-full py-2 px-3 border-slate-300 text-gray-700 bg-white focus:border-gray-700 focus:ring-gray-700 focus:border-1.75 focus:outline-none"
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
          {/* <p className="text-primary mt-1">Forgot password?</p> */}
        </div>
        <div>
          <h2 className="text-lg font-medium mb-2">Confirm Password</h2>
          <div className="relative">
            <input
              type={confirmPasswordShown ? "text" : "password"}
              className="border rounded w-full py-2 px-3 border-slate-300 text-gray-700 bg-white focus:border-gray-700 focus:ring-gray-700 focus:border-1.75 focus:outline-none"
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
          {/* <p className="text-primary mt-1">Forgot password?</p> */}
        </div>
      </form>
      <div className="bg-gray-50 mt-10 mb-5 py-3">
        <button
          type="submit"
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