import { requestAuth } from '@/config/axiosConfig'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { username, password } = await request.json()

  const loginAxios = (data: { username: string; password: string }) => {
    return requestAuth({
      method: 'post',
      url: '/oauth/login',
      data,
    })
  }

  const res = await loginAxios({ username, password })

  return NextResponse.json(res.data)
}
