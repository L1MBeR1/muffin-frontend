import { IProductsOrders } from '@/types/product.types'

import { axiosWithAuth } from '@/api/interceptors'

class ProductService {
	private BASE_URL = '/product'

	async getProductsOrders(data: IProductsOrders) {
		const response = await axiosWithAuth.post(`${this.BASE_URL}/orders`, data)
		return response.data
	}

	async getBuyersAnalysis(data: IProductsOrders) {
		const response = await axiosWithAuth.post(`${this.BASE_URL}/buyers`, data)
		return response.data
	}

	async getBakeriesAnalysis(data: IProductsOrders) {
		const response = await axiosWithAuth.post(`${this.BASE_URL}/bakeries`, data)
		return response.data
	}
	async getSalesChartAnalysis(data: IProductsOrders) {
		const response = await axiosWithAuth.post(`${this.BASE_URL}/chart`, data)
		return response.data
	}

	async getCustomerCoordinates(data: IProductsOrders) {
		const response = await axiosWithAuth.post(
			`${this.BASE_URL}/coordinates`,
			data
		)
		return response.data
	}

	async getAllProductsForSelect() {
		const response = await axiosWithAuth.get(`${this.BASE_URL}/all/select`)
		return response.data
	}
}

export const productService = new ProductService()
