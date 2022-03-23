import { Layout } from '~/components/Layout'
import { LoaderFunction } from 'remix'
import { requireUserId } from '~/util/session.server'
import { UserBar } from '~/components/UserBar'
import { SearchBar } from '~/components/SearchBar'
import { RecentKudosBar } from '~/components/RecentKudosBar'

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
            <div key={i} className="rounded-full h-24 w-24 bg-gray-400 mx-auto flex-shrink-0">
              {/* Profile Pictures */}
            </div>
          ))
        }
      </UserBar>
      {/* Right Side */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <SearchBar />
        {/* Main Section */}
        <div className="flex-1 flex">
          <div className="w-full">

          </div>
          <RecentKudosBar />
        </div>
      </div>
    </div>
  </Layout>
}
