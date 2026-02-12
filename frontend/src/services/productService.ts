import { api } from './api';

export const deleteProduct = async (id: number) => {
  return api.delete(`/products/${id}`);
};
