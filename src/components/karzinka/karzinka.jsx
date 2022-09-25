import useStart from '../../hooks/useStart';
import { useEffect, useState } from 'react';
import { Button, Result } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';



function Karzinka() {
    const { baza, setCount, count, kirish, admin} = useStart()
    const [render, setRender] = useState([]);
    const navigate = useNavigate()
    useEffect(() => {
        fetch("http://localhost:8080/karzinka", {
            method: "GET",
            headers: {
              token : kirish,
            }
        })
        .then(req => req.json())
        .then(data => setRender(data))
    }, [count]);

    const updateKarzinka = (id) => {
        if (baza.data.producId.includes(id)) {
          fetch("http://localhost:8080/updateKarzinka", {
          method: "PUT",
          headers: {
            token : kirish,
            product: id
          }
         })
        }
        setCount(count + 1)
      }

    return (  
    <ul className="kiyim_list">
    {render.length ? render.map(item => (
              <li key={item.id} className="kiyim_item">
               <div className="kiyim_nav">
                <span className='bi'>
                {!item.status &&   <img onClick={() => updateKarzinka(item.id)} src="https://cdn-icons-png.flaticon.com/512/3221/3221845.png" className='boshKarzinka' width={20} height={20} alt="dc" />}
                </span>  
                
               <img src={item.img} height='237' className='kiyim_image' width='219' alt="" />
               </div>
               <div className="kiyim_narx">
                  <h3 className='kiyim_h3'>{item.proName}</h3>
                  <div className="kiyim_sp">
                    <span className="kiyimNarx">{item.narx}</span>                             
                  </div>
               </div>
              </li>
          )) :  <Result
          style={{margin: "-100px auto 0 auto"}}
          status="404"
          title="500"
          subTitle="Sorry, the page you visited does not exist."
          extra={<Button onClick={() => navigate("/")} type="primary">Back Home</Button>}
        />}
          </ul> );
}

export default Karzinka;