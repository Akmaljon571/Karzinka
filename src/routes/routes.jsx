import { Routes, Route } from "react-router-dom"
import Admin from "../components/admin/admin";
import Like from "../components/like/like";
import Karzinka from "../components/karzinka/karzinka";
import User from "../components/user/user";
import Error from "../components/error/error";


function Routess() {
    return ( 
        <>
           <Routes>
             <Route path="/" element={<User />} />
             <Route path="/admin" element={<Admin />} />
             <Route path="/karzinka" element={<Karzinka />} />
             <Route path="/like" element={<Like />} />
             <Route path="/*" element={<Error />} />
           </Routes>
        </> 
    );
}

export default Routess;