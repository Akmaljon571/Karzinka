import { Link, useNavigate } from 'react-router-dom'
import useStart from '../../hooks/useStart'
import './footer.scss'

function Footer() {
    const navigate = useNavigate()
    const { admin, kirish, setKirish, setBaza, setOpen } = useStart()
    const logOut = () => {
        fetch("http://localhost:8080/delUser", {
            method: "DELETE",
            headers: {
              token : kirish,
            }
        })
        .then(req => req.json())
        .then(data => {
            if (data) {
                localStorage.removeItem("day2_token")
                localStorage.removeItem("baza")
                setKirish("")
                setOpen({})
                setBaza({})
                navigate("/")
            }
        })
         
    }


      return (
        <footer className="footer">
                    <img src="https://web.lebazar.uz/resources/companygroup/1637747314712thumbnail.png" width={400} alt="" />
                <div className="footer_til--ota">
                    <h2 className='footer_h3'>Til</h2>
                    <div className="footer_til">
                        <span className='footer_internet'></span>
                        <span className={'footer_uz'}>O'zb</span>
                        <span className={'footer_uz'}>Рус</span>
                        <span className={'footer_uz'}>Eng</span>
                    </div>
                </div>
                <div className="footer_ulash">
                <h2 className='footer_h5'>Boglash</h2>
                <div className="img_otas">
                    <a href={'/'} className="footer_tg">.</a>
                    <a href={'/'} className="footer_insta">.</a>
                    <a href={'/'} className="footer_call">.</a>
                    <Link to={'/tolov'} className="footer_web">.</Link>
                </div>
                </div>
                {admin && <button onClick={logOut} style={{padding: "10px 15px", "border": "none", "borderRadius": "15px", "backgroundColor": "blue", "fontWeight": "700", "color": "white","cursor": "pointer", "marginTop": "50px"}}>Sing Out</button>}
        </footer>
    )
}

export default Footer