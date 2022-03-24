import { Layout } from '~/components/Layout'
import { json, LoaderFunction, useLoaderData, Outlet } from 'remix'
import { getUser, requireUserId } from '~/util/session.server'
import { UserBar } from '~/components/UserBar'
import { TopBar } from '~/components/TopBar'
import { Kudo } from '~/components/Kudo'
import { RecentKudosBar } from '~/components/RecentKudosBar'
import { prisma, Kudo as IKudo, Profile } from '~/util/db.server'

interface KudoWithAuthor extends IKudo {
    author: {
        profile: Profile
    }
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

    const kudos = await prisma.kudo.findMany({
        select: {
            id: true,
            style: true,
            message: true,
            author: {
                select: {
                    profile: true
                }
            }
        },
        where: {
            recipientId: userId
        }
    })
    // Select the most recent three kudos
    const recentKudos = await prisma.kudo.findMany({
        take: 3,
        orderBy: {
            createdAt: 'desc'
        },
        select: {
            style: {
                select: {
                    emoji: true
                }
            },
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
        user,
        kudos
    })
}

export default function Index() {
    const { recentKudos, users, user, kudos } = useLoaderData()

    return <Layout>
        <Outlet />
        <div className="h-full flex">
            <UserBar users={users} />
            <div className="flex-1 flex flex-col">
                <TopBar user={user} />
                <div className="flex-1 flex">
                    <div className="w-full p-10">
                        {
                            kudos.map((kudo: KudoWithAuthor) => (
                                <Kudo key={kudo.id} kudo={kudo} profile={kudo.author.profile} />
                            ))
                        }
                    </div>
                    <RecentKudosBar kudos={recentKudos} />
                </div>
            </div>
        </div>
    </Layout>
}
