import { useQuery } from '@tanstack/react-query'

import { IProductsOrders } from '@/types/product.types'

import { productService } from '@/services/product.service'

const useSalesChartAnalysis = (data: IProductsOrders = {}) => {
	return useQuery({
		queryKey: ['salesChartAnalysis'],
		queryFn: () => productService.getSalesChartAnalysis(data),
		staleTime: 600000,
		retry: 0
	})
}

export default useSalesChartAnalysis
