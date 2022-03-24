import { UserWithProfile } from "~/util/interfaces"
import { SearchBox } from "./SearchBox"
import { SelectBox } from "./SelectBox"
import { useNavigate } from "remix"
import { UserCircle } from "./UserCircle"

export function TopBar({ user }: { user: UserWithProfile }) {
    const navigate = useNavigate()

    return (
        <form className="w-full px-6 flex items-center gap-x-4 border-b-4 border-b-blue-900 border-opacity-30 h-20">
            <SearchBox className="w-full rounded-xl px-3 py-2" containerClassName='w-2/5' />
            <SelectBox
                value={'date'}
                className="w-full rounded-xl px-3 py-2 text-gray-400"
                containerClassName='w-40'
                options={[{
                    name: 'Date',
                    value: 'date'
                }, {
                    name: 'Sender Name',
                    value: 'sender'
                }, {
                    name: 'Emoji',
                    value: 'emoji'
                }]}
            />
            <button type="submit" className="rounded-xl bg-yellow-300 font-semibold text-blue-600 px-3 py-2 transition duration-300 ease-in-out hover:bg-yellow-400 hover:-translate-y-1">
                Search
            </button>
            <div className="flex-1" />
            <UserCircle
                profile={user.profile}
                onClick={() => navigate('/home/profile')}
                className="h-14 w-14 transition duration-300 ease-in-out hover:scale-110 hover:border-2 hover:border-yellow-300"
            />
        </form>
    )
}