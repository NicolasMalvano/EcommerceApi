import styles from "../../Components/Cards/ProductCard.module.css";

const ProductCard = ({ product }) => {
  const { name, description, price, brand, imgUrl } = product;

  return (
    <div className={styles.card}>
      
      {/* Imagen */}
      <div className={styles.imageContainer}>
        <img src={imgUrl} alt={name} />
      </div>

      {/* Info */}
      <div className={styles.content}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.description}>{description}</p>

        <p className={styles.brand}>{brand}</p>

        <div className={styles.footer}>
          <span className={styles.price}>${price}</span>
          <button className={styles.button}>Comprar</button>
        </div>
      </div>

    </div>
  );
};

export default ProductCard;