import useStart from "../../hooks/useStart";
import { Badge, Modal } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {
  Form,
  Input,
} from 'antd';

function Header() {
    const navigate = useNavigate()
    const { baza, setRender, renderSerach, admin, setCount, count, port } = useStart()
    const [link, setLink] = useState("/");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const proName = useRef()
    const narx = useRef()
    const img = useRef()

      const handleOk = () => {
        setIsModalOpen(false);
        if (proName.current.input.value !== "" && narx.current.value !== "" && img.current.value !== "") {
          fetch(port + 'postProduct',{
            method: "POST",
            headers: {
               "Content-Type": "application/json"
            },
            body: JSON.stringify({
                 proName: proName.current.input.value,
                 narx: narx.current.value,
                 img: img.current.value
            })})
            .then((response) => response.json())
            .then((data) => console.log(data));
            setCount(count + 1)
        }
      };

      const handleCancel = () => {
        setIsModalOpen(false);
      };


    useEffect(() => {
      if (baza?.data?.role === "admin") {
       setLink("/admin")
      } else if (baza?.data?.role === "user") {
       setLink("/")
      }
    }, [baza]);

    const onSearch = e => {
        navigate(`${link}`)
        if (e.target.value.length) {
          setRender(renderSerach.filter(w => w.proName.toLowerCase().includes(e.target.value.toLowerCase())))
        } else {
          console.log(e.target.value);
          setRender(renderSerach)
        }
      }

    return ( 
        <header className="header">
        <div className="header">
          <div className="navbar">
            <Link to="/" className="header_logo_link">
              <img width={200} height={60} src="https://web.lebazar.uz/resources/companygroup/1637747314712thumbnail.png" alt="kompany_logo" />
            </Link>
            <div className="header_search">
              <input
                type="text"
                onChange={onSearch}
                className="header_input"
                placeholder={"Search"}
              />
              <span className="header_svg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-search"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
              </span>
            </div>
            <div className="tell_Link">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="currentColor"
                className="bi bi-telephone"
                viewBox="0 0 16 16"
              >
                <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
              </svg>
              <a className="tell_nomer" href="tel:+998900456961">
                <span className="tell_admin">Admin</span>
                +998900456961
              </a>
            </div>          
           {admin ? <div className="navbar_svg">
              <Link to="/like">
                <Badge count={baza.data.like ? baza?.data?.like?.length : ""}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    fill="currentColor"
                    className="bi bi-heart"
                    viewBox="0 0 16 16"
                  >
                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                  </svg>
                </Badge>
              </Link>
              <Link to="/karzinka">
                <Badge count={baza.data.producId ? baza?.data?.producId?.length : ""}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    fill="currentColor"
                    className="bi bi-cart4"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
                  </svg>
                </Badge>
              </Link>
            </div> : <button onClick={() => setIsModalOpen(true)} className="proQosh">Product Qo'shish +</button>}
          
          </div>
        </div>

        {isModalOpen && <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
       
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
          <Input ref={proName} placeholder="Product nomi"/>
        </Form.Item>
           <input ref={narx} className="ant-input" placeholder="Product Narxi" style={{width: "58%", "marginBottom": "24px"}} type="text" />
           <input ref={img} className="ant-input" placeholder="Product Rasmi" style={{width: "58%", "marginBottom": "24px"}} type="text" />
      </Form>
      </Modal>}
        
      </header>
     );
}

export default Header;