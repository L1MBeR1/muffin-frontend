import { useQuery } from '@tanstack/react-query'

import { IProductsOrders } from '@/types/product.types'

import { productService } from '@/services/product.service'

const useProductOrders = (data: IProductsOrders = {}) => {
	return useQuery({
		queryKey: ['productOrders'],
		queryFn: () => productService.getProductsOrders(data),
		staleTime: 600000,
		retry: 0
	})
}

export default useProductOrders
