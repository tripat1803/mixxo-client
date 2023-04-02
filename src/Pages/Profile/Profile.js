import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Context/AllContext/UserContext";
import Page from "./components/Page";
import Error from "../../Components/Error";
import Loader from "../../Components/Loader";
import ScreenComponent2 from "../../Components/ScreenComponent2";

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

  return (
    <>
      {loader && <Loader/>}
      {!loader && (error ? <Error/> : <ScreenComponent2 background={"rgba(255, 248, 239, 1)"} component1={[<Page comp={comp} />]} />)}
    </>
  );
};

export default Profile;