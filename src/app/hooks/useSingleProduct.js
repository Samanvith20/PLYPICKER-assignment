
import { useState, useEffect } from 'react';
import axios from 'axios';

const useSingleProduct = (id) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const response = await axios.get(`/api/products/${id}`);
          setProduct(response.data);
        } catch (err) {
          console.error('Error fetching product:', err);
          setError(err);
        } finally {
          setLoading(false);
        }
      };

      fetchProduct();
    }
  }, [id]);

  return { product, loading, error };
};

export default useSingleProduct;
