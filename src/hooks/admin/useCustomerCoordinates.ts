import { useQuery } from '@tanstack/react-query'

import { IProductsOrders } from '@/types/product.types'

import { productService } from '@/services/product.service'

const useCustomerCoordinates = (data: IProductsOrders = {}) => {
	return useQuery({
		queryKey: ['customerCoordinates'],
		queryFn: () => productService.getCustomerCoordinates(data),
		staleTime: 600000,
		retry: 0
	})
}

export default useCustomerCoordinates
