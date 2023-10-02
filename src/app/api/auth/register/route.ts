import { NextResponse } from 'next/server'

// Handles GET requests to /api
// export async function GET(request: Request) {
//   console.log('request', request)

//   const { username, password } = await request.json()

//   console.log('XXX', username, password)

//   return NextResponse.json({ message: 'Hello World' })
// }

// Handles POST requests to /api
export async function POST(request: Request) {
  const { username, password } = await request.json()

  return NextResponse.json({ message: 'Hello World' })
}
