import React, { useContext, useEffect, useState } from "react";
import PageComponent from "../../Components/PageComponent";
import { UserContext } from "../../Context/AllContext/UserContext";
import Page from "./components/Page";
import Error from "../../Components/Error";
import Loader from "../../Components/Loader";

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
      {!loader && (error ? <Error/> : <PageComponent component={[<Page comp={comp} />]} />)}
    </>
  );
};

export default Profile;