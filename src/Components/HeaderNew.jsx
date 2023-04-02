import React, { useContext, useEffect, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  Avatar,
  IconButton,
} from "@mui/material";
import { CartContext } from "../Context/AllContext/CartContext";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/AllContext/UserContext";
import { CategoryContext } from "../Context/AllContext/CategoryContext";
import { Link } from "react-router-dom";

export default function HeaderNew() {
  let user = useContext(UserContext);
  let cart = useContext(CartContext);
  let category = useContext(CategoryContext);
  let navigate = useNavigate();
  let location = useLocation();
  const [cartData, setCartData] = useState([]);
  const [procart, setcart] = useState(false);
  const [model, setModel] = useState(false);
  const [nav, setnav] = useState(false);
  const [signup, setsignup] = useState(false);
  const [drawer, setDrawer] = useState("-150%");
  const [checkCart, setCheckCart] = useState(false);
  const [background, setBackground] = useState("transparent");
  const [txtColor, setTxtColor] = useState("black");
  const [mongo, setMongo] = useState();
  const [position, setPosition] = useState("fixed");

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (e) => {
    e.preventDefault();
    let text = String(e.target.innerText);
    if (text === "My Account" || text.includes("My Account")) {
      navigate("/profile/account");
    } else if (text === "Orders" || text.includes("Orders")) {
      navigate("/profile/order");
    } else if (text === "Logout" || text.includes("Logout")) {
      user.signoutUser();
    }
    setAnchorEl(null);
  };

  const toggleModel = () => {
    setModel(!model);
  };
  const toggleSign = () => {
    setsignup(!signup);
  };

  const togglecart = () => {
    if (procart) {
      setCheckCart(false);
    }
    setcart(!procart);
  };

  useEffect(() => {
    setCartData(cart.cart);
  }, [cart.cart]);

  useEffect(() => {
    if (window.pageYOffset === 0 && location.pathname === "/") {
      setBackground("transparent");
    } else {
      setBackground("white");
    }

    if (location.pathname !== "/") {
      setPosition("sticky");
    } else {
      setPosition("fixed");
    }
  }, [location.pathname]);

  window.onscroll = function () {
    // var currentScrollPos = window.pageYOffset;
    if (window.pageYOffset === 0 && location.pathname === "/") {
      setBackground("transparent");
    } else {
      setBackground("white");
    }
  };

  useEffect(() => {
    if (model) {
      document.body.classList.add("active-model");
    } else {
      document.body.classList.remove("active-model");
    }
  }, [model]);

  useEffect(() => {
    if (signup) {
      document.body.classList.add("active-model");
    } else {
      document.body.classList.remove("active-model");
    }
  }, [signup]);

  useEffect(() => {
    setMongo(user.mongoUser);
  }, [user.mongoUser]);

  const navLinks = [
    {
      name: "SHOP",
      link: "/shop",
    },
    {
      name: "REVIEWS",
      link: "#review",
    },
    {
      name: "ABOUT US",
      link: "/about",
    },
  ];
  return (
    <div className="lg:px-20 px-10">
      <div className="hidden md:flex items-center justify-evenly">
        {/* Logo */}
        <div className="flex-1 pt-1">
          <Link to="/">
            <img
              className="lg:w-32 w-24"
              src={require("../Assets/logo.png")}
              alt="mainLogo"
            />
          </Link>
        </div>

        {/* Links */}
        <div className=" flex-grow border border-black py-2 px-5 rounded-full flex items-center justify-evenly gap-6 font-bold font-pop">
          {navLinks.map((val,key) => {
            return <Link key={`link_${key}`} to={val.link}>{val.name} </Link>;
          })}
          <div className="border border-[#D6AB81] rounded-full w-[max-content] p-2">
            <svg
              width="23"
              height="23"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 24C7.35 24 6.015 25.35 6.015 27C6.015 28.65 7.35 30 9 30C10.65 30 12 28.65 12 27C12 25.35 10.65 24 9 24ZM0 0V3H3L8.4 14.385L6.375 18.06C6.135 18.48 6 18.975 6 19.5C6 21.15 7.35 22.5 9 22.5H27V19.5H9.63C9.42 19.5 9.255 19.335 9.255 19.125L9.3 18.945L10.65 16.5H21.825C22.95 16.5 23.94 15.885 24.45 14.955L29.82 5.22C29.94 5.01 30 4.755 30 4.5C30 3.675 29.325 3 28.5 3H6.315L4.905 0H0ZM24 24C22.35 24 21.015 25.35 21.015 27C21.015 28.65 22.35 30 24 30C25.65 30 27 28.65 27 27C27 25.35 25.65 24 24 24Z"
                fill="black"
              />
            </svg>
          </div>
        </div>

        {/* User Icon */}
        <div className="flex-1 flex justify-end">
          {mongo ? (
            <IconButton
              id="fade-button"
              aria-controls={open ? "fade-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <Avatar
                sx={{
                  background: "#C07E49",
                  color: "white",
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
              >
                {mongo.firstname[0]}
              </Avatar>
            </IconButton>
          ) : (
            <AccountCircleIcon
              onClick={toggleModel}
              sx={{
                color: txtColor,
                "&:hover": {
                  cursor: "pointer",
                },
              }}
              fontSize="large"
            />
          )}
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden flex items-center justify-between border border-black px-4 my-3 rounded-full">
        {/* Logo */}
        <div className="flex-1 pt-1">
          <Link to="/">
            <img
              className="w-20 h-10 object-cover"
              src={require("../Assets/logo.png")}
              alt="mainLogo"
            />
          </Link>
        </div>

        {/* Other logos */}
        <div className="flex gap-3 items-center">
          {/* cart */}
          <button className="border border-black rounded-full p-1">
            <img
              className="w-5"
              // src={require("../Assets/shopCart.svg").default}
              alt=""
            />
          </button>

          {/* Setting */}
          <button className="border border-black rounded-full p-1">
            <img
              className="w-5"
              // src={require("../Assets/setting.svg").default}
              alt=""
            />
          </button>
        </div>
      </div>
    </div>
  );
}
