import api, { EndPoints } from 'api/axios';
import { SaleType } from '../models/salesType';
export async function getSalesAxios() {
  return await api.get<SaleType[]>(EndPoints.sales);
}
