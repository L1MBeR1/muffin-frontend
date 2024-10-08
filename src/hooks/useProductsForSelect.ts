import { useQuery } from '@tanstack/react-query'

import { productService } from '@/services/product.service'

const useProductsForSelect = () => {
	return useQuery({
		queryKey: ['productsForSelect'],
		queryFn: () => productService.getAllProductsForSelect(),
		staleTime: 600000,
		retry: 0
	})
}

export default useProductsForSelect
