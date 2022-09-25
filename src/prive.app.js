import { DislikeOutlined   } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import { notification } from 'antd';
import { message } from 'antd';
import { useNavigate } from "react-router-dom"
import React from 'react';
import useStart from "./hooks/useStart";
const key = 'updatable';

function Prive() {
  const ism = useRef()  
  const pasword = useRef() 
  const [open, setOpen, kirish, setBaza] = useState({});
  const [check, setCheck] = useState(true)
  const [observe, setObserve] = useState(false)
  const { setKirish} = useStart()
  const navigate = useNavigate()


  useEffect(() => {
    if (!kirish) {
      navigate("/")
    }
  }, [kirish]);


  useEffect(() => {
     if (observe) {
      fetch("http://localhost:8080/login", {
        method: "POST",
        body:JSON.stringify({
          name: ism.current.value,
          password: pasword.current.value
        }),
        headers: {
          'Content-type': 'application/json',
        }
      })
      .then(req => req.json())
      .then(data => setOpen(data))
      setObserve(false)
      ism.current.value = ""
      pasword.current.value = ""
     }
  }, [setObserve, setOpen, observe]);

  const kirishss = () => {
    if (ism.current.value != "" && pasword.current.value != "") {
         setObserve(true)
    } else{
      setCheck(false)
      setTimeout(() => {
        setCheck(true)
      }, 1000);
      notification.open({
        message: 'Iltimos formani toldiring',
        description:
          'Agar siz formani toldirmasangiz biz malumotlaringizni tekshira olmaymiz. Iltimos!!! formani toldirishingizni sorab qolamiz',
        icon: (
          <DislikeOutlined
            style={{
              color: 'red',
            }}
          />
        ),
      });
    }
  }


  useEffect(() => {
    if (open?.status == 200) {
      localStorage.setItem("day2_token", JSON.stringify(open.token))
      message.loading({
        content: 'Loading...',
        key,
      });
      setTimeout(() => {
        message.success({
          content: 'Loaded!',
          key,
          duration: 2,
        });
      }, 1000);
      setKirish(open?.token)
      if (open?.token) {
        localStorage.setItem("baza", JSON.stringify(open))
      }
    } else if (open?.status == 401) {
      setCheck(false)
      setTimeout(() => {
        setCheck(true)
      }, 1000);
      message.error('This is an error message')
    }
  }, [open]);


    return ( 
    <>
    <h1 className={`${check ? " logIn" : "logIn qizil"}`}>Log In</h1>
     <div className="form">
      <input ref={ism} className={`${check ? " form_input" : "form_input form_check"}`} required type="text" placeholder="Ismingiz" />
      <input ref={pasword} className={`${check ? " form_input" : "form_input form_check"}`} required type="password" placeholder="Password" />
      <button onClick={kirishss} className="form_button">SUBMIT</button>
     </div>

    </> );
}

export default Prive;