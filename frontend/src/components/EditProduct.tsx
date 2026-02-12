import { useEffect, useState } from 'react';
import { Product } from '../types/product';

interface EditProductModalProps {
  product: Product;
  onClose: () => void;
  onUpdate: (product: Product) => void;
}

export default function EditProductModal({ product, onClose, onUpdate }: EditProductModalProps) { 
  const [formData, setFormData] = useState<Product>(product); 
  useEffect(() => { setFormData(product); }, [product]); 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { 
    const { name, value } = e.target; 
    setFormData(prev => ({ 
      ...prev, 
      [name]: ['price', 'stock', 'volume', 'weight'].includes(name) 
      ? Number(value) 
      : value, 
    })); 
  }; 
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); onUpdate(formData); };

  return (

    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
     
      <div className="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-center">Editar Produto</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
          <input
            type="number"
            name="volume"
            value={formData.volume ?? ''}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
          <input
            type="number"
            name="weight"
            value={formData.weight ?? ''}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
          <input
            type="text"
            name="imageUrl"
            value={formData.imageUrl ?? ''}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Atualizar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
