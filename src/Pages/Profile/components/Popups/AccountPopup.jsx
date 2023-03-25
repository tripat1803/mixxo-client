import { Box, Button, styled, TextareaAutosize } from "@mui/material";
import { getIdToken } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { publicApi } from "../../../../Api/Api";
import { UserContext } from "../../../../Context/AllContext/UserContext";

const Input = styled("input")(() => ({
  padding: "12px 16px",
  borderRadius: "20px",
  marginTop: "14px",
  width: "100%",
  background: "transparent",
  border: "2px solid black",
  overflow: "hidden",
  "&::-webkit-input-placeholder": {
    color: "black",
  },
  "&:focus": {
    background: "transparent",
    border: "2px solid black",
    outline: "none",
  },
}));

const LongInput = styled(TextareaAutosize)(() => ({
  width: "100%",
  background: "transparent",
  borderRadius: "20px",
  marginTop: "14px",
  padding: "16px",
  outline: "none",
  border: "2px solid black",
  "&::-webkit-input-placeholder": {
    color: "black",
  },
}));

function AccountPopup({ bool, setBool, setDetailsFlag }) {
  let user = useContext(UserContext);
  const [firebaseUser, setFirebaseUser] = useState();

  const [mobile, setMobile] = useState("");
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [address, setAddress] = useState("");

  const [loader, setLoader] = useState(false);

  // Validation
  const [phoneValidation, setPhoneValidation] = useState(false);
  const [pinValidation, setPinValidation] = useState(false);
  const [validation, setValidation] = useState(false);

  const handleAddDetail = async () => {
    let token = await getIdToken(firebaseUser);
    if (token) {
      if (mobile.length !== 10 || !Number.isNaN(mobile)) {
        setPhoneValidation(true);
        setMobile("");
      } else {
        setPhoneValidation(false);
      }
      if (pincode.length !== 6 || !Number.isNaN(pincode)) {
        setPinValidation(true);
        setPincode("");
      } else {
        setPhoneValidation(false);
      }
      if (
        mobile !== "" &&
        pincode !== "" &&
        city !== "" &&
        state !== "" &&
        address !== ""
      ) {
        setValidation(false);
        if (
          (mobile.length !== 10 || !Number.isNaN(mobile)) &&
          (pincode.length !== 6 || !Number.isNaN(pincode))
        ) {
          setLoader(true);
          publicApi
            .post(
              "/shipping/create",
              {
                mobile: Number(mobile),
                city: city,
                state: state,
                pincode: Number(pincode),
                address: address,
              },
              {
                headers: {
                  authorization: token,
                },
              }
            )
            .then(() => {
              user.setMongoFlag(true);
              setDetailsFlag(true);
              setBool(false);
              setMobile("");
              setCity("");
              setAddress("");
              setState("");
              setPincode("");
              setLoader(false);
            })
            .catch(() => {
              setLoader(false);
            });
        }
      } else {
        setValidation(true);
      }
    }
  };

  useEffect(() => {
    setFirebaseUser(user.user);
  }, [user.user]);

  return (
    <>
      <Box
        sx={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: "30",
          padding: "64px 16px",
          overflowY: "scroll",
          width: { md: "30%", lg: "30%", xl: "30%", sm: "60%", xs: "80%" },
          minHeight: "100vh",
        }}
      >
        <Box
          sx={{
            padding: "16px",
            background: "#EFD2AC",
            borderRadius: "20px",
            maxWidth: "500px",
            width: "100%",
          }}
        >
          <Input
            value={mobile}
            sx={
              phoneValidation
                ? {
                    "&::placeholder": {
                      color: "red",
                    },
                  }
                : {
                    "&::placeholder": {
                      color: "black",
                    },
                  }
            }
            onChange={(e) => {
              setMobile(e.target.value);
            }}
            placeholder={phoneValidation ? "Length should be of 10" : "Mobile"}
          />
          <Input
            value={pincode}
            sx={
              pinValidation
                ? {
                    "&::placeholder": {
                      color: "red",
                    },
                  }
                : {
                    "&::placeholder": {
                      color: "black",
                    },
                  }
            }
            onChange={(e) => {
              setPincode(e.target.value);
            }}
            placeholder={pinValidation ? "Invalid Input" : "Pincode"}
          />
          <Input
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
            }}
            placeholder="City"
          />
          <Input
            value={state}
            onChange={(e) => {
              setState(e.target.value);
            }}
            placeholder="State"
          />
          <LongInput
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
            placeholder="Address"
            style={{
              height: "150px",
            }}
          />
          <p
            style={{
              color: "red",
              fontSize: "12px",
            }}
          >
            {validation && "*Please fill all the fields"}
          </p>
          <Button
            onClick={() => {
              if (!loader) {
                handleAddDetail();
              }
            }}
            sx={{
              bgcolor: "#8B5F4D",
              borderRadius: "100px",
              border: "2px solid #8B5F4D",
              fontSize: "1.1rem",
              fontWeight: "bold",
              transition: "all 0.5s",
              textTransform: "none",
              fontFamily: "Montserrat",
              color: "white",
              "&:hover": { bgcolor: "white", color: "#8B5F4D" },
              marginTop: "14px",
              width: "100%",
            }}
            variant="contained"
          >
            ADD DETAIL
          </Button>
        </Box>
      </Box>
      <Box
        onClick={() => {
          setBool(false);
        }}
        sx={{
          position: "fixed",
          top: "0%",
          left: "0%",
          background: "rgb(0,0,0,0.4)",
          width: "100vw",
          minHeight: "100vh",
          zIndex: "29",
        }}
      ></Box>
    </>
  );
}

export default AccountPopup;
