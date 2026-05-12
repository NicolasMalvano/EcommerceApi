import { Link } from "react-router-dom";
import Styles from "./ErrorPage.module.css"

const ErrorPage = () => {
    
    return(
        <div className={Styles.container}>

        <h1>ERROR 404</h1>
        <h2>Página no encontrada</h2>
        
        <Link to="/login" className={Styles.link}>Volver al inicio</Link>
        
        </div>
    )
}

export default ErrorPage;