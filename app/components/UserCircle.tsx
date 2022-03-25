import { Profile } from '~/util/db.server';

export function UserCircle({ profile, onClick, className }: {
    profile: Profile,
    className?: string,
    onClick?: (...args: any) => any
}) {
    return (
        <div
            className={`${className} cursor-pointer bg-gray-400 rounded-full flex justify-center items-center`}
            style={{
                backgroundSize: "cover",
                ...(profile.profilePicture ? { backgroundImage: `url(${profile.profilePicture})` } : {}),
            }}
            onClick={onClick}
        >
            {
                !profile.profilePicture && (
                    <h2>{profile.firstName.charAt(0).toUpperCase()}{profile.lastName.charAt(0).toUpperCase()}</h2>
                )
            }
        </div>
    )
}