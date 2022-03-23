import { Layout } from '~/components/Layout'
import { LoaderFunction } from 'remix'
import { requireUserId } from '~/util/session.server'

// If the user isn't logged in, redirect to the login screen
export const loader: LoaderFunction = async ({ request }) => {
  // Handles redirect if not authenticated
  await requireUserId(request)
  return null
}

export default function Index() {
  return <Layout>
    <div className="h-full flex justify-center items-center">
    </div>
  </Layout>
}
