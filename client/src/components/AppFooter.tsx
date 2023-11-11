import '../assets/css/AppFooter.css'
import '../assets/css/global.css'
import {Link} from "react-router-dom";


function AppFooter(){
return(

    <footer>
        <div className="footer_main">
            <div className="tag">
                <Link to="#Home">Home </Link>/
                <Link to="#About">About Us </Link>/
                <Link to="#Contact">Contact Us</Link>

            </div>
            <div className="tag">
                <div className="social_link">
                    <i className="fa-brands fa-facebook-f"></i>
                    <i className="fa-brands fa-instagram"></i>
                    <i className="fa-brands fa-twitter"></i>
                    <i className="fa-brands fa-linkedin-in"></i>
                </div>

            </div>
        </div>
    </footer>
)
}
export default AppFooter;
