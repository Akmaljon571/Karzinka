import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
import useStart from "../../hooks/useStart";
import "./admin.scss"
import { Modal } from 'antd';
import React, { useRef, useState } from 'react';
import {
    Form,
    Input,
  } from 'antd';

function Admin() {
    const proName = useRef()
    const narx = useRef()
    const img = useRef()
    const navigate = useNavigate()
    const [proId, setProId] = useState(0);
    const { setCount, count, render, admin} = useStart()
    if (admin) navigate("/")
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPencil, setIsPencil] = useState(false);
    const [penBaza, setPenBaza] = useState({})
  
    const handleOk = () => {
      setIsModalOpen(false);
      fetch('http://localhost:8080/delProduct',{
            method: "DELETE",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: proId,
            })
        })
        .then((response) => response.json())
        .then((data) => console.log(data))
        setCount(count + 1)
    };
  
    const handleCancel = () => {
      setIsModalOpen(false);
    };

    const handleCance = () => {
      setIsPencil(false);
    };

    const handleOkey = () => {
        fetch('http://localhost:8080/putPro',{
            method: "PUT",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: proId,
                proName: proName.current.input.value,
                narx: narx.current.value,
                img: img.current.value
            })
        })
        .then((response) => response.json())
        .then((data) => console.log(data))
        console.log(proId, proName.current.input.value, narx.current.value, img.current.value);
        setCount(count + 1)
        setIsPencil(false)
    }

    const pencel =  (id) => {
        const tanlangan = render.find(e => e.id == id)
        setProId(id)
        setPenBaza(tanlangan)
        setIsPencil(true)
    }


    return ( 
     <>
        <div className="kiyim">
            <ul className="kiyim_list">
              {render.length ? render.map(item => (
                  <li key={item.id} className="kiyim_item">
                        {isModalOpen &&  <Modal title="Qaroriz qat'iymi" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>Oka hoz ochirmoqchi bolgan mahsulotingiz bazadan ham ochiriladi keyin qayta tiklanmaydi</Modal>}
                         <div className="kiyim_nav">
                            <img onClick={() => {setIsModalOpen(true); setProId(item.id)}} src="https://cdn.iconscout.com/icon/free/png-256/delete-752-546711.png" style={{marginTop: "10px", "position":"absolute"}} width={25} height={25} alt="" />
                            <img onClick={() => {pencel(item.id)}} src="https://icones.pro/wp-content/uploads/2022/07/icone-crayon-rouge.png" style={{marginTop: "65px", "position":"absolute"}} width={15} height={15} alt="" />
                         <img src={item.img} height='237' className='kiyim_image' width='219' alt="" />
                         </div>
                         {isPencil && <Modal title="Basic Modal" open={isPencil} onOk={handleOkey} onCancel={handleCance}>
                                <Form
                                    labelCol={{
                                    span: 4,
                                    }}
                                    wrapperCol={{
                                    span: 14,
                                    }}
                                    layout="horizontal"
                                >
                                    
                                    
                                    <Form.Item>
                                    <Input defaultValue={penBaza?.proName} ref={proName} placeholder="Product nomi"/>
                                    </Form.Item>
                                        <input defaultValue={penBaza?.narx} ref={narx} className="ant-input" placeholder="Product Narxi" style={{width: "58%", "marginBottom": "24px"}} type="text" />
                                        <input defaultValue={penBaza?.img} ref={img} className="ant-input" placeholder="Product Rasmi" style={{width: "58%", "marginBottom": "24px"}} type="text" />
                                </Form>
                            </Modal>}
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

export default Admin;