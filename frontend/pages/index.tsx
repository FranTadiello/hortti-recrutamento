import { useEffect, useState } from 'react';
import { api } from '../src/services/api';
import { Product } from '../src/types/product';
import ProductForm from '../src/components/ProductForm';
import ProductList from '../src/components/ProductList';
import { deleteProduct } from '../src/services/productService';
import EditProductModal from '../src/components/EditProduct';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/products')
      .then(res => setProducts(res.data))
      .finally(() => setLoading(false));
  }, []);

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
  };
  const handleUpdate = async (updated: Product) => {
    try {
      const res = await api.put(`/products/${updated.id}`, updated);
      setProducts(prev => prev.map(p => (p.id === updated.id ? res.data : p)));
      setEditingProduct(null);
      alert("Produto atualizado com sucesso!");
    } catch {
      alert("Erro ao atualizar produto. Tente novamente.");
    }
  };

  const handleDelete = async (product: Product) => {
    const confirmDelete = window.confirm(`Tem certeza que deseja excluir o produto "${product.name}"?`);
    if (!confirmDelete) return;

    try {
      await deleteProduct(product.id);
      setProducts(prev => prev.filter(p => p.id !== product.id));
      alert("Produto deletado com sucesso!");
    } catch (err) {
      alert("Erro ao deletar produto. Tente novamente.");
    }
  };


  if (loading) return <p>Carregando...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Hortti Inventory</h1>

      <ProductForm onCreated={(newProduct) => setProducts(prev => [...prev, newProduct])} />

      <ProductList products={products} onEdit={handleEdit} onDelete={handleDelete} />

       {editingProduct && (
        <EditProductModal product={editingProduct} onClose={() => setEditingProduct(null)}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
}
