'use client'

import L from 'leaflet'
import 'leaflet.heat'
import 'leaflet/dist/leaflet.css'
import { useEffect } from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'

import marker from '@/images/marker.png'

const bakeryIcon = new L.Icon({
	iconUrl: marker.src,
	iconRetinaUrl: marker.src,
	iconSize: [50, 50],
	iconAnchor: [12, 41],
	popupAnchor: [13, -34],
	shadowUrl: ''
})

const CustomAttribution = () => {
	const map = useMap()
	useEffect(() => {
		map.attributionControl.setPrefix(false)
	}, [map])
	return null
}

const BakeriesMarkers = ({ bakeries }: { bakeries: any[] }) => {
	return (
		<>
			{bakeries.map(bakery => (
				<Marker
					key={bakery.id}
					position={[bakery.latitude, bakery.longitude]}
					icon={bakeryIcon}
				>
					<Popup>
						<strong>{bakery.address}</strong>
						<br />
						Заказов: {bakery.orderCount}
					</Popup>
				</Marker>
			))}
		</>
	)
}

const HeatmapLayer = ({ points }: { points: [number, number, number][] }) => {
	const map = useMap()

	useEffect(() => {
		const heatLayer = (window as any).L.heatLayer(points, { radius: 56 }).addTo(
			map
		)

		return () => {
			map.removeLayer(heatLayer)
		}
	}, [map, points])

	return null
}

const OrdersHeatMap = ({
	bakeries,
	orderAddresses
}: {
	bakeries: any[]
	orderAddresses: { latitude: number; longitude: number }[]
}) => {
	const heatData: [number, number, number][] = orderAddresses.map(
		address =>
			[address.latitude, address.longitude, 1] as [number, number, number]
	)

	return (
		<MapContainer
			center={[52.28, 104.294]}
			zoom={12}
			style={{ height: '100%', width: '100%' }}
		>
			<TileLayer
				url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
			/>
			<CustomAttribution />
			<BakeriesMarkers bakeries={bakeries} />

			{heatData.length > 0 && <HeatmapLayer points={heatData} />}
		</MapContainer>
	)
}

export default OrdersHeatMap
