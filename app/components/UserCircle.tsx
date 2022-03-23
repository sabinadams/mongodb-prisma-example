import { Profile } from '~/util/db.server'

export function UserCircle({ profile }: {
    profile: Profile
}) {
    return (
        <div className="rounded-full h-24 w-24 bg-gray-400 mx-auto flex-shrink-0">
            <h2>{profile.firstName.charAt(0).toUpperCase()}{profile.lastName.charAt(0).toUpperCase()}</h2>
        </div>
    )
}