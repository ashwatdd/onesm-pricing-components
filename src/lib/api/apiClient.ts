import ky from 'ky'

export const api = ky.create({
  prefixUrl: `${import.meta.env.PUBLIC_ONESM_BACKEND_URL}/v1`,
})
