import styles from "./home.module.css";
import { Link } from "react-router-dom";
import Navbar from "../../Components/NavBar/NavBar";
const Home = () => {
  return (

    <>
    <Navbar> </Navbar>
    <div className={styles.container}>
      
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>CompraTodo</h1>
          <h2>Tecnología al mejor precio</h2>
          <p>Encontrá lo último en hardware, periféricos y gadgets</p>
        </div>
        <Link to={"/products"} className={styles.cta}>VER PRODUCTOS</Link>
      </section>

      {/* CATEGORÍAS */}
      <section className={styles.categories}>
        <h3>Categorías destacadas</h3>
        <div className={styles.grid}>
          <div className={styles.card}>Monitores</div>
          <div className={styles.card}>Teclados</div>
          <div className={styles.card}>Mouse</div>
          <div className={styles.card}>Auriculares</div>
        </div>
      </section>

      {/* OFERTAS */}
      <section className={styles.offers}>
        <h3>Ofertas del día</h3>
        <div className={styles.grid}>
          <div className={styles.product}>
            <p>Monitor Gamer 24"</p>
            <span>$299.999</span>
          </div>
          <div className={styles.product}>
            <p>Teclado Mecánico RGB</p>
            <span>$89.999</span>
          </div>
          <div className={styles.product}>
            <p>Mouse Gaming</p>
            <span>$45.999</span>
          </div>
        </div>
      </section>

      {/* BENEFICIOS */}
      <section className={styles.benefits}>
        <div>🚚 Envíos a todo el país</div>
        <div>💳 Cuotas sin interés</div>
        <div>🔒 Compra segura</div>
      </section>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <p>© 2026 CompraTodo - Todos los derechos reservados</p>
      </footer>

    </div>
    </>
  );
};

export default Home;