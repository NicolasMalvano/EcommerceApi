import { useEffect, useContext } from "react";
import { ProductsContext } from "../../Context/ProductsContext";
import ProductCard from "../../Components/Cards/ProductCard";
import styles from "./Products.module.css";
import { Link } from "react-router-dom";

const Products = () => {
  const { products, getProducts, loading, prevPage, nextPage, page } = useContext(ProductsContext);

  useEffect(() => {
    getProducts();
  }, []);

  return (

    <div className={styles.container}>
      
      <h1 className={styles.title}>Nuestros Productos</h1>

      {loading ? (
        <p className={styles.loading}>Cargando productos...</p>
      ) : products.length === 0 ? (
        <p className={styles.empty}>No hay productos disponibles</p>
      ) : (
        <div className={styles.grid}>
          {products.map((product) => (
            <ProductCard key={product.id || product.name} product={product} />
          ))}
        </div>
        
      )}
      
      <div className={styles.pagination}>
      <button onClick={prevPage}>Anterior</button>
      <span>Página {page}</span>
      <button onClick={nextPage}>Siguiente</button>
      </div>
     
     <Link to={"/home"} className={styles.home}>VOLVER AL HOME</Link>
    
    </div>
   
  );
};

export default Products;