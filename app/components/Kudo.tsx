import { UserCircle } from '~/components/UserCircle'
import { Profile, Kudo as IKudo } from '~/util/db.server'

export function Kudo({ profile, kudo }: { profile: Profile, kudo: Partial<IKudo> }) {
    const colorMap = {
        RED: 'text-red-400',
        GREEN: 'text-green-400',
        BLUE: 'text-blue-400',
        WHITE: 'text-white',
        YELLOW: 'text-yellow-300'
    }
    const backgroundColorMap = {
        RED: 'bg-red-400',
        GREEN: 'bg-green-400',
        BLUE: 'bg-blue-400',
        WHITE: 'bg-white',
        YELLOW: 'bg-yellow-300'
    }

    const emojiMap = {
        THUMBSUP: '👍',
        PARTY: '🎉',
        HANDSUP: '🙌🏻'
    }

    return (
        <div className={`flex ${backgroundColorMap[kudo.style?.backgroundColor || 'RED']} p-4 rounded-xl w-full gap-x-2 relative`}>
            <div>
                <UserCircle profile={profile} className="h-16 w-16" />
            </div>
            <div className="flex flex-col">
                <p className={`${colorMap[kudo.style?.textColor || 'WHITE']} font-bold text-lg whitespace-pre-wrap break-all`} >{profile.firstName} {profile.lastName}</p>
                <p className={`${colorMap[kudo.style?.textColor || 'WHITE']} whitespace-pre-wrap break-all`}>{kudo.message}</p>
            </div>
            <div className="absolute bottom-4 right-4 bg-white rounded-full h-10 w-10 flex items-center justify-center text-2xl">
                {emojiMap[kudo.style?.emoji || 'THUMBSUP']}
            </div>
        </div>
    )
}