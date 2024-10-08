import { IProductsOrders } from '@/types/product.types'

import { axiosWithAuth } from '@/api/interceptors'

class ProductService {
	private BASE_URL = '/product'

	async getProductsOrders(data: IProductsOrders) {
		const response = await axiosWithAuth.post(`${this.BASE_URL}/orders`, data)
		return response.data
	}
	async getAllProductsForSelect() {
		const response = await axiosWithAuth.get(`${this.BASE_URL}/all/select`)
		return response.data
	}
}

export const productService = new ProductService()
