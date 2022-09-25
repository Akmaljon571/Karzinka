import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useStart from "../../hooks/useStart";


function Admin() {
    const navigate = useNavigate()
    const { admin } = useStart()
    if (admin) navigate("/")




    return ( 
    <>
    Admin
   </>
    );
}

export default Admin;