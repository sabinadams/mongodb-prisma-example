import { Layout } from '~/components/Layout'
import { LoaderFunction } from 'remix'
import { authenticator } from '~/util/auth.server'

export const loader: LoaderFunction = async ({ request }) => {
  return await authenticator.isAuthenticated(request, {
    failureRedirect: '/login'
  })
}

export default function Index() {
  return <Layout>
    <div className="h-full flex justify-center items-center">

    </div>
  </Layout>
}
