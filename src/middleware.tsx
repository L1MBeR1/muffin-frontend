import { NextRequest, NextResponse } from 'next/server'

import { APP_PAGES } from './config/pages-url.config'
import { EnumTokens } from './services/auth-token.service'

export async function middleware(request: NextRequest) {
	const { cookies } = request

	const refreshToken = cookies.get(EnumTokens.REFRESH_TOKEN)?.value

	if (!refreshToken) {
		return NextResponse.redirect(new URL(APP_PAGES.HOME, request.url))
	}
	console.log(cookies)
	return NextResponse.next()
}

export const config = {
	matcher: ['/profile/:path*']
}
