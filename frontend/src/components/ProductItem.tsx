import { Product } from '../types/product';

interface ProductItemProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

export default function ProductItem({ product, onEdit, onDelete }: ProductItemProps) {
  return (
    <div className="flex items-center justify-between bg-white shadow rounded-lg p-4 mb-4">
      <div className="flex items-center gap-4">
        {product.imageUrl && (
          <img
            src={`http://localhost:3001${product.imageUrl}`}
            alt={product.name}
            className="w-20 h-20 object-cover rounded-md"
          />
        )}
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
          <p className="text-sm text-gray-500">{product.category}</p>
          <p className="text-sm text-gray-700">R$ {product.price}</p>
          <p className="text-xs text-gray-400">Estoque: {product.stock}</p>
          {product.volume && <p className="text-xs text-gray-400">Volume: {product.volume}</p>}
          {product.weight && <p className="text-xs text-gray-400">Peso: {product.weight} kg</p>}
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => onEdit(product)}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Editar
        </button>
        <button
          onClick={() => onDelete(product)}
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Deletar
        </button>
      </div>
    </div>
  );
}
