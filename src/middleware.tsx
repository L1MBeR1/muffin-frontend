import { NextRequest, NextResponse } from 'next/server'

import { APP_PAGES } from './config/pages-url.config'

export async function middleware(request: NextRequest) {
	const authToken = request.cookies.get('accessToken')?.value

	if (!authToken) {
		return NextResponse.redirect(new URL(APP_PAGES.HOME, request.url))
	}

	console.log('Access token found in cookies:', authToken)

	return NextResponse.next()
}

export const config = {
	matcher: ['/profile/:path*']
}
