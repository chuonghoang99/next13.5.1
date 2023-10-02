import cookie from 'js-cookie'

export const getCmsToken = () => {
  return cookie.get('ACCESS_TOKEN')
}

export const setCmsToken = (val: any) => {
  return cookie.set('ACCESS_TOKEN', JSON.stringify(val))
}

export const removeCmsToken = () => {
  return cookie.remove('ACCESS_TOKEN')
}
