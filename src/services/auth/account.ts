import { useApi } from '/@src/composable/useApi'
import { useUserSession } from '/@src/stores/userSession'

const api = useApi()
const userSession = useUserSession()

export async function authenticateUser(route: string, body: object) {
  try {
    const { data: token } = await api.post(route, body)
    userSession.setToken(token)

    const { data } = await api.get('/me')
    userSession.setUser(data)
  } catch (err: any) {
    throw err
  }
}
