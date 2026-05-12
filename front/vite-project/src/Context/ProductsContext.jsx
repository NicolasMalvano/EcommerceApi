import { createContext, useState, useMemo } from "react";
import axios from "axios";

export const ProductsContext = createContext({
  products: [],
  visibleProducts: [],
  loading: false,
  page: 1,
  limit: 5,
  nextPage: () => {},
  prevPage: () => {},
});

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [limit] = useState(5);

 const getProducts = async (customPage = page) => {
  const res = await axios.get(
    `http://localhost:3000/products?page=${customPage}&limit=${limit}`
  );

  setProducts(res.data);
};

  const visibleProducts = useMemo(() => {
    const start = (page - 1) * limit;
    const end = start + limit;
    return products.slice(start, end);
  }, [products, page, limit]);

 const nextPage = () => {
  setPage(prev => prev + 1);
  getProducts(page + 1);
};

const prevPage = () => {
  if (page === 1) return;
  setPage(prev => prev - 1);
  getProducts(page - 1);
};

  const value = {
    products,
    visibleProducts,
    loading,
    page,
    limit,
    nextPage,
    prevPage,
    getProducts,
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};