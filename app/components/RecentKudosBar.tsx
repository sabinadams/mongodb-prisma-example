import { Profile } from '~/util/db.server'
import { UserIdWithProfile } from '~/util/interfaces';
import { UserCircle } from './UserCircle';

export function RecentKudosBar({ kudos }: {
    kudos: { recipient: UserIdWithProfile }[]
}) {
    return (
        <div className="w-1/5 border-l-4 border-l-yellow-300 flex flex-col items-center">
            <h2 className="text-xl text-yellow-300 font-semibold my-6">Recent Kudos</h2>
            <div className="h-full flex flex-col gap-y-10 mt-10">
                {kudos.map((kudo) => <UserCircle key={kudo.recipient.id} profile={kudo.recipient.profile} />)}
            </div>
        </div>
    )
}