import boshSersa from '../../img/images.png'
import TolliqSersa from '../../img/800px-Heart_corazón.svg.png'
import useStart from '../../hooks/useStart';
import './user.scss'
import { useNavigate } from 'react-router-dom';
import { Button, Result } from 'antd';
import { useEffect } from 'react';



function User() {
  const { baza, setCount, count, kirish, render, admin} = useStart()
  const navigate = useNavigate()

    useEffect(() => {
      if (!admin) {
        navigate("/admin")
      }
    }, [admin]);

    const updateLike = (id) => {
       if (baza.data.like.includes(id)) {
        fetch("http://localhost:8080/likeUpdate", {
        method: "PUT",
        headers: {
          token : kirish,
          product: id
        }
       })
       setCount(count + 1)
       } else {
        fetch("http://localhost:8080/updateLike", {
        method: "PUT",
        headers: {
          token : kirish,
          product: id
        }
       })
       setCount(count + 1)
       }
    }

   

    const updateKarzinka = (id) => {
      if (!baza.data.producId.includes(id)) {
        fetch("http://localhost:8080/karzinkaUpdate", {
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
        <>
        <div className="kiyim">
            <ul className="kiyim_list">
              {render.length ? render.map(item => (
                        <li key={item.id} className="kiyim_item">
                         <div className="kiyim_nav">
                          <span className='bi'>
                             <img onClick={() => updateLike(item.id)} src={baza?.data.like.includes(item.id) ? TolliqSersa : boshSersa} className='boshSersa' width={20} height={20} alt="dc" />
                            {!item.status && <img onClick={() => updateKarzinka(item.id)} src="https://cdn-icons-png.flaticon.com/512/69/69986.png" className='boshKarzinka' width={20} height={20} alt="dc" />}
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
                    </ul>
                </div>
            </>
    );
}

export default User;