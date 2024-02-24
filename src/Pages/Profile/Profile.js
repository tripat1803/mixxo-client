import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Context/AllContext/UserContext";
import Page from "./components/Page";
import Error from "../../Components/Error";
import Loader from "../../Components/Loader";
import { Route, Routes } from "react-router-dom";
import Account from "./components/Account";
import Order from "./components/Order";

const Profile = ({ comp }) => {

  let user = useContext(UserContext);
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (user.mongoUser) {
      setError(false);
    } else {
      setError(true);
    }
  }, [user.mongoUser]);

  useEffect(() => {
    setLoader(user.loader);
  }, [user.loader]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {loader && <Loader />}
      {!loader &&
        (error ? (
          <Error />
        ) : (
          <Page>
            <Routes>
              <Route path="/account" element={<Account />} />
              <Route path="/order" element={<Order />} />
            </Routes>
          </Page>
        ))}
    </>
  );
};

export default Profile;
