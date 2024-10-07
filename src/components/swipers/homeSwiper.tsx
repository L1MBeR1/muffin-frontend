'use client'

import { Button } from '@nextui-org/react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'

import blank from '@/images/webps/blank.webp'
import homeSwiper1 from '@/images/webps/homeSwiper1.webp'
import homeSwiper2 from '@/images/webps/homeSwiper2.webp'
import homeSwiper3 from '@/images/webps/homeSwiper3.webp'
import { padding } from '@/theme/padding'

function NavigationButtons() {
	const swiper = useSwiper()

	const handleNext = () => {
		swiper.slideNext()
	}

	const handlePrev = () => {
		swiper.slidePrev()
	}

	return (
		<div
			className={`absolute top-0 right-0 z-10 flex flex-row space-x-4 py-28 ${padding}`}
		>
			<Button
				className='rounded-full'
				color='primary'
				size='md'
				isIconOnly
				onClick={handlePrev}
			>
				<ChevronLeft />
			</Button>
			<Button
				className='rounded-full'
				color='primary'
				size='md'
				isIconOnly
				onClick={handleNext}
			>
				<ChevronRight />
			</Button>
		</div>
	)
}

function HomeSwiper() {
	const slides = [
		{
			id: 1,
			image: homeSwiper1,
			title: 'Клубничный маффин',
			tag: 'Новая продукция'
		},
		{
			id: 2,
			image: homeSwiper2,
			title: 'Лимонный чизкейк',
			tag: 'Новая продукция'
		},
		{
			id: 3,
			image: homeSwiper3,
			title: 'Итальянский панеттоне',
			tag: 'Новая продукция'
		}
	]

	return (
		<div className={`w-full h-screen relative`}>
			<Swiper
				modules={[Autoplay]}
				spaceBetween={0}
				autoplay={{ delay: 10000 }}
				loop={true}
				slidesPerView={1}
				className='w-full h-full'
			>
				{slides.map(slide => (
					<SwiperSlide key={slide.id}>
						<div className={`relative w-full h-full`}>
							<Image
								src={slide.image ? slide.image : blank}
								alt={slide.title}
								fill
								priority={true}
								className='absolute top-0 left-0 w-full h-full object-cover'
							/>
							<div
								className={`${padding} absolute bottom-0 left-0 w-full py-24 text-white space-y-7`}
							>
								<p className='mt-2 text-lg'>{slide.tag}</p>

								<h2 className='text-8xl font-bold max-w-3xl'>{slide.title}</h2>
								<Button
									className='rounded-full font-semibold'
									color='primary'
									size='lg'
									endContent={<ChevronRight />}
								>
									Заказать сейчас
								</Button>
							</div>
						</div>
					</SwiperSlide>
				))}
				<NavigationButtons />
			</Swiper>
		</div>
	)
}

export default HomeSwiper
