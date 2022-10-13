import useStart from '../../hooks/useStart';
import { useEffect, useState } from 'react';
import { Button, Result } from 'antd';
import React from 'react';
import "./karzinka.scss"
import udalit from "../../img/udalit.png";
import { useNavigate } from 'react-router-dom';



function Karzinka() {
    const { baza, setCount, count, kirish, port} = useStart()
    const [render, setRender] = useState([]);
    const navigate = useNavigate()
    useEffect(() => {
        fetch(port + "karzinka", {
            method: "GET",
            headers: {
              token : kirish,
            }
        })
        .then(req => req.json())
        .then(data => setRender(data))
    }, [count, port, kirish]);

    const updateKarzinka = (id) => {
        if (baza.data.producId.includes(id)) {
          fetch(port + "updateKarzinka", {
          method: "PUT",
          headers: {
            token : kirish,
            product: id
          }
         })
        }
        setCount(count + 1)
      }

    return   <>
         {render.length ? render.map(key => 
            <li key={key.id} className="sotuv_ota">
              <div className="sotuv_left">
                <div className="sotuv_header">
                  <img src={key.img} width={250} height={230} alt="" />
                  <div className="sotuv_header--div"></div>
                </div>
                <div className="sotuv_main">
                  <h2 className="sotuv_main--h2">{key.proName}</h2>
                  <p className="sotuv_main--p">{key.narx}</p>
                </div>
                <div className="sotuv_footer">
                  <img
                    src={udalit}
                    onClick={() => updateKarzinka(key.id)}
                    id={key.id}
                    className="sotuv_footer--udalit"
                    alt="udalit"
                  />
                  <p className="sotuv_footer--narx">{key.narx}</p>
                </div>
              </div>
              <div className="sanoq_rigth">
                <div className="sanoq_rigth--header">
                  <div className="sanoq_rigth--top">
                    <h2 className="sanoq_rigth--h2">Narx</h2>
                    <p className="sanoq_rigth--p">{key.narx}</p>
                  </div>
                  <button onClick={() => navigate("/tolov")} className="sanoq_bottom--btn">
                    To'lovga o'tish
                  </button>
                </div>
                <div className="sanoq_rigth--footer">
                  <div className="sanoq_rigth--top">
                    <h2 className="sanoq_rigth--h2">Admin</h2>
                    <p className="sanoq_rigth--p">+998900456961</p>
                  </div>
                  <a
                    href={ "tel:+998900456961" }
                    className="sanoq_bottom--link "
                  >
                    +998900456961
                  </a>
                </div>
              </div>
            </li>) : <Result
          style={{margin: "-100px auto 0 auto"}}
          status="404"
          title="500"
          subTitle="Sorry, the page you visited does not exist."
          extra={<Button onClick={() => navigate("/")} type="primary">Back Home</Button>}
         /> }
      </> 
}

export default Karzinka;