import { Layout } from '~/components/Layout'
import { LoaderFunction } from 'remix'
import { requireUserId } from '~/util/session.server'
import { UserBar } from '~/components/UserBar'

// If the user isn't logged in, redirect to the login screen
export const loader: LoaderFunction = async ({ request }) => {
  // Handles redirect if not authenticated
  await requireUserId(request)
  return null
}

export default function Index() {
  return <Layout>
    <div className="h-full flex">
      {/* Left bar */}
      <UserBar>
        {
          new Array(30).fill(1).map((el, i) => (
            <div key={i} className="rounded-full h-24 w-24 bg-gray-400 mx-auto flex-shrink-0"></div>
          ))
        }
      </UserBar>
      {/* Right Side */}
      <div className="flex-1 flex flex-col">
        <div className="w-full px-6 flex items-center border-b-4 border-b-blue-900 border-opacity-30 h-20">
          <input type="text" className="w-2/5 rounded-xl px-3 py-2" placeholder="Search a message or name" />

        </div>
      </div>
    </div>
  </Layout>
}
