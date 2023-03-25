import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../Context/AllContext/UserContext";
import "../../../styles/index.css";

const Popup = (props) => {
  let user = useContext(UserContext);
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();
    user.setLoader(true);
    if (email !== "" && password !== "") {
      await user
        .loginFirebaseUser(email.toLowerCase(), password)
        .then((userCreds) => {
          if (userCreds) {
            user.setUser(userCreds.user);
            user.getMongoUser(userCreds.user);
            navigate("/");
          }
        })
        .catch((err) => {
          user.setLoader(false);
        });
      props.data();
    }
    setEmail("");
    setPassword("");
  };

  return (
    <div
      className="fixed bg-[rgba(0,0,0,0.6)] top-0 left-0 right-0 bottom-0 flex items-center justify-center z-30 min-h-[100vh]"
      onClick={props.data}
    >
      <div
        className="w-[80%] sm:w-[70%] md:w-[80%] lg:w-[80%] max-w-[900px] h-[max-content] bg-[#efd2ac] text-black rounded-[80px] overflow-hidden flex flex-col md:flex-row absolute popcon"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="hidden md:block w-full md:w-[45%]">
          <img src={require("../../../Assets/cup.jpeg")} style={{
            height: "100%",
          }} />
        </div>
        <div className="py-10 md:py-[48px] p-[24px] w-full md:w-[55%] flex md:flex-col items-center justify-center">
          <div className="w-full md:w-[80%] h-[80%] flex flex-col items-center justify-center gap-[1rem]">
            <p className="font-cookie text-4xl text-center font-[700] w-[90%] text-[#8b5f4d] mb-[-2%] tracking-[0.1rem] ">
              Wanna Join Us On The Chocolatey Ride
            </p>
            <input
              value={email}
              className="w-full md:w-[100%] lg:w-[80%] rounded-[100px] border-none p-[16px] text-[1rem] outline-none placeholder:text-[1rem] placeholder:font-[500] placeholder:text-black mt-2 "
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="text"
              placeholder="EMAIL"
            ></input>
            <input
              value={password}
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="w-full md:w-[100%] lg:w-[80%] rounded-[100px] border-none p-[16px] text-[1rem] outline-none placeholder:text-[1rem] placeholder:font-[500] placeholder:text-black mb-2 "
              placeholder="PASSWORD"
            ></input>
            <button
              className="w-[60%] bg-primary text-[#faebd7] rounded-[100px] text-[16px] border-none p-[16px] "
              onClick={handleSignIn}
            >
              SIGN IN
            </button>
            <div className="w-full text-center">
              <span className="mr-[8px]">Doesn't have an account?</span>
              <button
                className="bg-transparent border-none text-primary text-md font-[600]"
                onClick={() => {
                  props.name();
                  props.data();
                }}
              >
                Sign up
              </button>
              {/* <button
                className="bg-transparent border-none text-primary text-md font-[600]"
                onClick={props.data}
              >
                Forgot Password
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
