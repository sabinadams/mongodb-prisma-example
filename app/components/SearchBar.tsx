import { SearchBox } from "./SearchBox"
import { SelectBox } from "./SelectBox"
export function SearchBar() {
    return (
        <div className="w-full px-6 flex items-center gap-x-4 border-b-4 border-b-blue-900 border-opacity-30 h-20">
            <SearchBox className="w-full rounded-xl px-3 py-2" containerClassName='w-2/5' />
            <SelectBox className="w-full rounded-xl px-3 py-2 text-gray-400" containerClassName='w-40'>
                <option value="date">Date</option>
                <option value="sender">Sender Name</option>
                <option value="emoji">Emoji</option>
            </SelectBox>
            <button className="rounded-xl bg-yellow-300 font-semibold text-blue-600 px-3 py-2 transition duration-300 ease-in-out hover:bg-yellow-400 hover:-translate-y-1">
                Search
            </button>
            <div className="flex-1" />
            <div className="h-14 w-14 bg-gray-400 rounded-full">
                {/* Profile Picture */}
            </div>
        </div>
    )
}