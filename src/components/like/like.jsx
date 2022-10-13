import { useEffect, useState } from "react";
import TolliqSersa from '../../img/800px-Heart_corazón.svg.png'
import { Button, Result } from 'antd'
import { useNavigate } from "react-router-dom";
import useStart from "../../hooks/useStart";


function Like() {
    const { setCount, count, kirish, port} = useStart()
    const [render, setRender] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        fetch(port + "like", {
            method: "GET",
            headers: {
              token : kirish,
            }
        })
        .then(req => req.json())
        .then(data => setRender(data))
    }, [count, setRender, port, kirish]);

    const updateLike = (id) => {
        fetch(port + "likeUpdate", {
            method: "PUT",
            headers: {
              token : kirish,
              product: id
            }
           })
           setCount(count + 1)
    }


    return ( <ul className="kiyim_list">
    {render.length ? render.map(item => (
              <li key={item.id} className="kiyim_item">
               <div className="kiyim_nav">
                <span className='bi'>
                <img onClick={() => updateLike(item.id)} src={TolliqSersa} className='boshSersa' width={20} height={20} alt="dc" />
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
          </ul>  );
}

export default Like;