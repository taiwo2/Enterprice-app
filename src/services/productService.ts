import api, { EndPoints } from '../api/axios';
import { ProductType } from 'models/productType';
export async function getProductAxios() {
  return await api.get<ProductType[]>(EndPoints.products);
}
export async function postProductAxios(product: ProductType) {
  return await api.post<ProductType>(EndPoints.products, product);
}
