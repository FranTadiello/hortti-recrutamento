import { useState } from 'react';
import { Product } from '../types/product';
import { api } from '../services/api';

interface ProductFormProps {
  onCreated: (product: Product) => void; 
}

export default function ProductForm({ onCreated }: ProductFormProps) {
  const [formData, setFormData] = useState<Omit<Product, 'id'>>({
    name: '',
    category: '',
    price: 0,
    stock: 0,
    volume: undefined,
    weight: undefined,
    imageUrl: undefined,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: ['price', 'stock', 'volume', 'weight'].includes(name)
        ? Number(value)
        : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post('/products', formData);
      onCreated(res.data);
      setFormData({
        name: '',
        category: '',
        price: 0,
        stock: 0,
        volume: undefined,
        weight: undefined,
        imageUrl: undefined,
      });
    } catch (err) {
      console.error('Erro ao criar produto:', err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-lg p-6 mb-6 max-w-lg mx-auto"
    >
      <h2 className="text-2xl font-bold text-gray-800">Cadastrar Produto</h2>

      <div className="mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nome</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 w-full border rounded p-2 focus:ring focus:ring-green-300"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Categoria</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="mt-1 w-full border rounded p-2 focus:ring focus:ring-green-300"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Preço</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="mt-1 w-full border rounded p-2 focus:ring focus:ring-green-300"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Estoque</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className="mt-1 w-full border rounded p-2 focus:ring focus:ring-green-300"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Volume</label>
            <input
              type="number"
              name="volume"
              value={formData.volume ?? ''}
              onChange={handleChange}
              className="mt-1 w-full border rounded p-2 focus:ring focus:ring-green-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Peso (kg)</label>
            <input
              type="number"
              name="weight"
              value={formData.weight ?? ''}
              onChange={handleChange}
              className="mt-1 w-full border rounded p-2 focus:ring focus:ring-green-300"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">URL da Imagem</label>
          <input
            type="text"
            name="imageUrl"
            value={formData.imageUrl ?? ''}
            onChange={handleChange}
            className="mt-1 w-full border rounded p-2 focus:ring focus:ring-green-300"
          />
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
      >
        Salvar Produto
      </button>
    </form>
  );
}
