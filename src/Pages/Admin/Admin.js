import React, { useContext, useEffect, useState } from 'react';
import Error from '../../Components/Error';
import { UserContext } from '../../Context/AllContext/UserContext';

function Admin({component, server, server2}){
    let user = useContext(UserContext);
    const [flag, setFlag] = useState(false);
    const [flag3, setflag3] = useState(false);
    const [flag2, setFlag2] = useState(false);

    useEffect(() => {
        setFlag(user.mongoUser?.role === "admin");
    }, [user.mongoUser]);

    useEffect(() => {
		setFlag2(server);
	}, [server]);

	useEffect(() => {
		setflag3(server2);
	}, [server2]);

    return(
        <>
            {
                (flag) ? ((!flag2 || !flag3) ? (component) : <Error/>) : <Error/>
            }
        </>
    );
}

export default Admin;