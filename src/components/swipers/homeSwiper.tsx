'use client'

import Image from 'next/image'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
// Import required modules
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import blank from '@/images/webps/blank.webp'

function HomeSwiper() {
	const slides = [
		{
			id: 1,
			image: '/path/to/image1.jpg',
			title: 'Заголовок 1',
			description: 'Описание первого слайда'
		},
		{
			id: 2,
			image: '/path/to/image2.jpg',
			title: 'Заголовок 2',
			description: 'Описание второго слайда'
		},
		{
			id: 3,
			image: '/path/to/image3.jpg',
			title: 'Заголовок 3',
			description: 'Описание третьего слайда'
		},
		{
			id: 4,
			image: '/path/to/image3.jpg',
			title: 'Заголовок 4',
			description: 'Описание третьего слайда'
		}
	]

	return (
		<div className='w-full h-screen'>
			<Swiper
				modules={[Navigation, Pagination, Autoplay]}
				spaceBetween={0}
				navigation
				pagination={{ clickable: true }}
				autoplay={{ delay: 5000 }}
				loop={true}
				slidesPerView={1}
				className='w-full h-full'
			>
				{slides.map(slide => (
					<SwiperSlide key={slide.id}>
						<div className='relative w-full h-full'>
							<Image
								src={blank}
								alt={slide.title}
								fill
								priority={true}
								className='absolute top-0 left-0 w-full h-full'
							/>
							<div className='absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/80 to-transparent text-white'>
								<h2 className='text-3xl font-bold'>{slide.title}</h2>
								<p className='mt-2 text-lg'>{slide.description}</p>
							</div>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	)
}

export default HomeSwiper
