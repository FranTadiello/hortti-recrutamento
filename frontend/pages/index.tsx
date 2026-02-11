import { useEffect, useState } from 'react';
import { api } from '../src/services/api';

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  imageUrl?: string;
};

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/products')
      .then(res => setProducts(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Carregando...</p>;

  return (
    <div style={{ padding: 24 }}>
      <h1>Hortti Inventory</h1>

      {products.map(product => (
        <div key={product.id} style={{ marginBottom: 16 }}>
          <h3>{product.name}</h3>
          <p>{product.category}</p>
          <p>R$ {product.price}</p>

          {product.imageUrl && (
            <img
              src={`http://localhost:3001${product.imageUrl}`}
              width={150}
            />
          )}
        </div>
      ))}
    </div>
  );
}
