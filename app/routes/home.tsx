import { Layout } from '~/components/Layout'
import { json, LoaderFunction, useLoaderData, Outlet } from 'remix'
import { getUser, requireUserId } from '~/util/session.server'
import { UserBar } from '~/components/UserBar'
import { TopBar } from '~/components/TopBar'
import { RecentKudosBar } from '~/components/RecentKudosBar'
import { prisma } from '~/util/db.server'
import { UserWithProfile } from '~/util/interfaces'

interface LoaderResponse {
    users: UserWithProfile[],
    user: UserWithProfile,
    recentKudos: { recipient: UserWithProfile }[]
}

// If the user isn't logged in, redirect to the login screen
export const loader: LoaderFunction = async ({ request }) => {
    // Handles redirect if not authenticated
    const userId = await requireUserId(request)
    const user = await getUser(request)

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

    return json({
        users,
        recentKudos,
        user
    })
}

export default function Index() {
    const { recentKudos, users, user } = useLoaderData<LoaderResponse>()
    return <Layout>
        <Outlet />
        <div className="h-full flex">
            <UserBar users={users} />
            <div className="flex-1 flex flex-col">
                <TopBar user={user} />
                <div className="flex-1 flex">
                    <div className="w-full">

                    </div>
                    <RecentKudosBar kudos={recentKudos} />
                </div>
            </div>
        </div>
    </Layout>
}
