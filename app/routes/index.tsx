import { Layout } from '~/components/Layout'
import { json, LoaderFunction, useLoaderData } from 'remix'
import { requireUserId } from '~/util/session.server'
import { UserBar } from '~/components/UserBar'
import { SearchBar } from '~/components/SearchBar'
import { RecentKudosBar } from '~/components/RecentKudosBar'
import { prisma } from '~/util/db.server'
import { UserIdWithProfile } from '~/util/interfaces'

interface LoaderResponse {
  users: UserIdWithProfile[],
  recentKudos: { recipient: UserIdWithProfile }[]
}

// If the user isn't logged in, redirect to the login screen
export const loader: LoaderFunction = async ({ request }) => {
  // Handles redirect if not authenticated
  const userId = await requireUserId(request)

  // Select all the users for the users bar (except yourself)
  const users = await prisma.user.findMany({
    select: {
      id: true,
      profile: true
    },
    where: {
      id: { not: userId }
    }
  })

  // Select the most recent three kudos
  const recentKudos = await prisma.kudos.findMany({
    take: 3,
    orderBy: {
      createdAt: 'desc'
    },
    select: {
      recipient: {
        select: {
          id: true,
          profile: true
        }
      }
    }
  })

  return json({ users, recentKudos })
}

export default function Index() {
  const { recentKudos, users } = useLoaderData<LoaderResponse>()
  return <Layout>
    <div className="h-full flex">
      {/* Left bar */}
      <UserBar users={users} />
      {/* Right Side */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <SearchBar />
        {/* Main Section */}
        <div className="flex-1 flex">
          <div className="w-full">

          </div>
          <RecentKudosBar kudos={recentKudos} />
        </div>
      </div>
    </div>
  </Layout>
}
