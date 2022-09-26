import { DislikeOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import { notification } from 'antd';
import { message } from 'antd';
import { useNavigate, Link } from "react-router-dom"
import React from 'react';
import useStart from "./hooks/useStart";
const key = 'updatable';

function Prive() {
  const ism = useRef()  
  const pasword = useRef() 
  const [check, setCheck] = useState(true)
  const [observe, setObserve] = useState(false)
  const { setKirish, kirish, setBaza, open, setOpen} = useStart()
  const navigate = useNavigate()
  const [sing, setSing] = useState(false);


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

  const singUp = () => {
     if (ism.current.value != "" && pasword.current.value != "") {
      fetch("http://localhost:8080/singUp", {
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
      .then(data => {
        if (data) {
          setOpen(data)
        } else {
          notification.open({
            message: 'Bunday foydalanuvchi bor ',
            description:
              'Aka bunaqa foydalanuvchi bor Iltimos boshqa ism va password tanlang',
            icon: (
              <DislikeOutlined
                style={{
                  color: 'red',
                }}
           />
         ),
         });
        }
      })
      setObserve(false)
      ism.current.value = ""
      pasword.current.value = ""
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
      setBaza(open)
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

  console.log(open);

    return ( 
    <>
    {!sing ? <> <h1 className={`${check ? " logIn" : "logIn qizil"}`}>Log In</h1>
     <div className="form">
      <input ref={ism} className={`${check ? " form_input" : "form_input form_check"}`} required type="text" placeholder="Ismingiz" />
      <input ref={pasword} className={`${check ? " form_input" : "form_input form_check"}`} required type="password" placeholder="Password" />
      <Link to={"/"} onClick={() => setSing(true)}>Sing Up</Link>
      <button onClick={kirishss} className="form_button">SUBMIT</button>
     </div> </> :<> <h1 className={`${check ? " logIn" : "logIn qizil"}`}>Sing Up</h1>
     <div className="form">
      <input ref={ism} className={`${check ? " form_input" : "form_input form_check"}`} required type="text" placeholder="Ismingizni   kiriting!!!" />
      <input ref={pasword} className={`${check ? " form_input" : "form_input form_check"}`} required type="password" placeholder="Password   kiriting!!!" />
      <Link to={"/"} onClick={() => setSing(false)}>Log In</Link>
      <button onClick={singUp} className="form_button">SUBMIT</button>
     </div> </>}

    </> );
}

export default Prive;