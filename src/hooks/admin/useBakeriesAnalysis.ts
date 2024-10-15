import { useQuery } from '@tanstack/react-query'

import { IProductsOrders } from '@/types/product.types'

import { productService } from '@/services/product.service'

const useBakeriesAnalysis = (data: IProductsOrders = {}) => {
	return useQuery({
		queryKey: ['bakeriesAnalysis'],
		queryFn: () => productService.getBakeriesAnalysis(data),
		staleTime: 600000,
		retry: 0
	})
}

export default useBakeriesAnalysis
