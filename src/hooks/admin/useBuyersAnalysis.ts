import { useQuery } from '@tanstack/react-query'

import { IProductsOrders } from '@/types/product.types'

import { productService } from '@/services/product.service'

const useBuyersAnalysis = (data: IProductsOrders = {}) => {
	return useQuery({
		queryKey: ['buyersAnalysis'],
		queryFn: () => productService.getBuyersAnalysis(data),
		staleTime: 600000,
		retry: 0
	})
}

export default useBuyersAnalysis
