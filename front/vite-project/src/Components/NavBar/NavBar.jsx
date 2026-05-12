import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useContext } from "react";
import { UsersContext } from "../../Context/UsersContext";
import Swal from 'sweetalert2'

const Navbar = () => {
  const navigate = useNavigate();
  const {logoutUser} = useContext(UsersContext)

  const handleLogOut = () => {
          logoutUser()
           Swal.fire({
            icon: "warning",
            title: "Sesión cerrada correctamente"
      
        }).then(() => {
            navigate("/login");
        })
      };

  return (
    <nav className={styles.navbar}>
      
      {/* Logo */}
      <div className={styles.logo}>
        <Link to="/home">CompraTodo</Link>
      </div>

      {/* Links */}
      <div className={styles.links}>
        <Link to="/home">Home</Link>
        <Link to="/products">Productos</Link>
      </div>

      {/* User */}
      <div className={styles.user}>
        <span className={styles.username}>Usuario</span>
        <button onClick={handleLogOut} className={styles.logout}>
          Logout
        </button>
      </div>

    </nav>
  );
};

export default Navbar;