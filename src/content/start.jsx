import { createContext, useEffect, useState } from "react";


export const State = createContext()


export const StatePriveder = ({ children }) => {
    const token = JSON.parse(localStorage.getItem("day2_token"))
    const localAdmin = JSON.parse(localStorage.getItem("admin"))
    const userBaza = JSON.parse(localStorage.getItem("baza"))
    const [kirish, setKirish] = useState(token || "");
    const [baza, setBaza] = useState(userBaza || {});
    const [count, setCount] = useState(0);
    const [render, setRender] = useState([]);
    const [renderSerach, setRenderSerach] = useState(render)
    const [admin, setAdmin] = useState(localAdmin || true)
    const [open, setOpen] = useState({});
    const [port, setPort] = useState("https://karzinkabackent.herokuapp.com/");

    useEffect(() => {
        localStorage.setItem("admin", JSON.stringify(admin))
    }, [admin]);

    useEffect(() => {
        if (kirish) {
            fetch(port + "rout", {
                method: "GET",
                headers:{
                    'Content-type': 'application/json',
                    'token': kirish
                }
            })
            .then(req => req.json())
            .then(data => setBaza(data))
        }
    }, [kirish, count, port]);

    useEffect(() => {
        if (kirish) {
            fetch(port + 'product',{
            method: "GET",
            headers: {
                token : kirish,
            }})
            .then((response) => response.json())
            .then((data) => {setRender(data); setRenderSerach(data)});
        }
    }, [setRender, setRenderSerach, count, kirish, port]);

    useEffect(() => {
       if (baza.length) {
        localStorage.setItem("baza", JSON.stringify(baza))
       }
    }, [baza]);
     
    const data = {setKirish, kirish, baza, setBaza, count, setCount, render, setRender, renderSerach, setRenderSerach, admin, setAdmin, open, setOpen, port, setPort}
   
    return <State.Provider value={data}>{ children }</State.Provider>
}