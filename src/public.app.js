import useStart from "./hooks/useStart";
import Routess from "./routes/routes";
import { useNavigate } from "react-router-dom"
import { useEffect } from "react";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";

function Public() {
    const { baza, setBaza, setAdmin, open } = useStart()
    const navigate = useNavigate()

    useEffect(() => {
       if (baza?.data?.role == "admin") {
        setAdmin(false)
        navigate("/admin")
       }
      }, [baza]);


    return ( 
        <>
         <Header />
         <Routess />
         <Footer />
        </>
     );
}

export default Public;