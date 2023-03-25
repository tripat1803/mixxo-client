import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../Config/firebase";
import { UserContext } from "../../../Context/AllContext/UserContext";
import { createUser } from "../../../Utils/mongodb";

const Signup = (props) => {
  let user = useContext(UserContext);
  let navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Validation
  const [passwordValidation, setPasswordValidation] = useState(false);
  const [nameValidation, setNameValidation] = useState(false);
  const [emailValidation, setEmailValidation] = useState(false);
  const [validation, setValidation] = useState(false);

  let namePattern = /^[a-zA-Z ]([\Wa-zA-Z]){2,30}$/;
  let emailPattern = /^([_\-.0-9a-zA-Z]+)@([_\-.0-9a-zA-Z]+)(\.)([a-zA-Z]){2,7}$/;

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password.length <= 8) {
      setPasswordValidation(true);
      setPassword("");
    } else {
      setPasswordValidation(false);
    }
    if (name.match(namePattern) === null) {
      setNameValidation(true);
      setName("");
    } else {
      setNameValidation(false);
    }
    if(email.match(emailPattern) === null){
      setEmailValidation(true);
      setEmail("");
    } else {
      setEmailValidation(false);
    }
    // console.log(email.match(pattern));
    if (email !== "" && name !== "" && password !== "") {
      setValidation(false);
      if (password.length >= 8 && name.match(namePattern) !== null && email.match(emailPattern) !== null) {
        user.setLoader(true);
        await user
          .createFirebaseUser(email, password)
          .then((userCreds) => {
            if (userCreds) {
              user.setUser(userCreds.user);
              createUser({
                firebase_id: userCreds.user.uid,
                firstname: name.trim().split(" ")[0],
                lastname: name.trim().split(" ")[1],
                email: email,
              }).then((res) => {
                user.setMongoUser(res.data);
                user.setLoader(false);
              }).catch(() => {
                toast.error("Server error occured");
                auth.currentUser.delete();
                user.setLoader(false);
              });
              navigate("/");
            }
          })
          .catch(() => {
            user.setLoader(false);
          });
        props.data();
        setName("");
        setEmail("");
        setPassword("");
      }
    } else {
      setValidation(true);
    }
  };

  return (
    <div
      className="fixed bg-[rgba(0,0,0,0.6)] top-0 left-0 right-0 bottom-0 flex items-center justify-center z-30 h-[100vh]"
      onClick={props.data}
    >
      <div
        className="w-[80%] md:w-[80%] max-w-[900px] h-[max-content] bg-[#efd2ac] text-black rounded-[80px] overflow-hidden flex flex-col md:flex-row absolute popcon"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="hidden md:block w-full md:w-[45%]">
          <img src={require("../../../Assets/cup.jpeg")} style={{
            height: "100%",
          }} />
        </div>
        <div className="py-10 md:py-[48px] p-[24px] w-full md:w-[55%] flex md:flex-col items-center justify-center">
          <div className="w-full md:w-[80%] h-[80%] flex flex-col items-center justify-center gap-[1rem]">
            <p className="font-cookie text-4xl font-[700] text-[#8b5f4d] text-center">
              Wanna Join Us On The Chocolatey Ride
            </p>
            <input
              value={name}
              className={`w-full md:w-[100%] lg:w-[80%]  rounded-[100px] border-none p-[16px] text-[1rem] outline-none placeholder:text-[1rem] placeholder:font-[500] ${(nameValidation) ? "placeholder:text-[rgb(255,0,0)]" : "placeholder:text-black"} mt-4`}
              onChange={(e) => {
                setName(e.target.value);
              }}
              type="text"
              placeholder={(nameValidation) ? "Invalid Input" : "NAME"}
            />
            {/* <br></br> */}
            <input
              value={email}
              type="text"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className={`w-full md:w-[100%] lg:w-[80%]  rounded-[100px] border-none p-[16px] text-[1rem] outline-none placeholder:text-[1rem] placeholder:font-[500] ${(emailValidation) ? "placeholder:text-[rgb(255,0,0)]" : "placeholder:text-black"} placeholder:text-black`}
              placeholder={(emailValidation) ? "Invalid Input" : "EMAIL"}
            />
            <input
              value={password}
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className={`w-full md:w-[100%] lg:w-[80%]  rounded-[100px] border-none p-[16px] text-[1rem] outline-none placeholder:text-[1rem] placeholder:font-[500] ${(passwordValidation) ? "placeholder:text-[rgb(255,0,0)]" : "placeholder:text-black"}`}
              placeholder={(passwordValidation) ? "Enter strong password" : "PASSWORD"}
            />
            <p style={{
              color: "red",
              fontSize: "12px",
              width: "80%"
            }}>{(validation) && "*Please fill all the fields"}</p>
            <button
              className="w-[60%] bg-primary text-[#faebd7] rounded-[100px] text-[16px] border-none p-[16px] "
              onClick={(e) => handleSignUp(e)}
            >
              SIGN UP
            </button>
            <div className="text-center">
              <span className="mr-[8px]">Already have an account?</span>
              <button
                className="bg-transparent border-none text-primary text-sm font-[600]"
                onClick={() => {
                  props.data();
                  props.name();
                }}
              >
                <span style={{ fontWeight: "600" }}>SIGN IN</span>
              </button>
            </div>
          </div>
        </div>
        {/* Footer */}
      </div>
    </div>
  );
};

export default Signup;
