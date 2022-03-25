import { Layout } from '~/components/Layout'
import { json, LoaderFunction, useLoaderData, Outlet } from 'remix'

import { UserBar } from '~/components/UserBar'
import { TopBar } from '~/components/TopBar'
import { Kudo } from '~/components/Kudo'
import { RecentKudosBar } from '~/components/RecentKudosBar'

import { getUser, requireUserId } from '~/util/session.server'
import { Prisma, Kudo as IKudo, Profile } from '~/util/db.server'
import { getOtherUsers } from '~/util/users.server'
import { getRecentKudos, getFilteredKudos } from '~/util/kudos.server'

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

    // Pull out our search & sort criteria
    const url = new URL(request.url);
    const sort = url.searchParams.get("sort");
    const filter = url.searchParams.get("filter");

    let sortFilter: Prisma.KudoOrderByWithRelationInput = {}
    if (sort) {
        if (sort === 'date') {
            sortFilter = {
                createdAt: 'desc'
            }
        }
        if (sort === 'sender') {
            sortFilter = {
                author: {
                    profile: {
                        firstName: 'asc'
                    }
                }
            }
        }
        if (sort === 'emoji') {
            sortFilter = {
                style: {
                    emoji: 'asc'
                }
            }
        }
    }

    let textFilter: Prisma.KudoWhereInput = {}
    if (filter) {
        textFilter = {
            OR: [
                {
                    message: {
                        mode: 'insensitive',
                        contains: filter
                    }
                },
                {
                    author: {
                        OR: [
                            { profile: { is: { firstName: { mode: 'insensitive', contains: filter } } } },
                            { profile: { is: { lastName: { mode: 'insensitive', contains: filter } } } },
                        ]
                    }
                },
            ]
        }
    }

    // Select all the users for the users bar (except yourself)
    const users = await getOtherUsers(userId)
    const recentKudos = await getRecentKudos()
    const kudos = await getFilteredKudos(userId, sortFilter, textFilter)

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
                    <div className="w-full p-10 flex flex-col gap-y-4">
                        {
                            kudos.map((kudo: KudoWithAuthor) =>
                                <Kudo key={kudo.id} kudo={kudo} profile={kudo.author.profile} />
                            )
                        }
                    </div>
                    <RecentKudosBar kudos={recentKudos} />
                </div>
            </div>
        </div>
    </Layout>
}
