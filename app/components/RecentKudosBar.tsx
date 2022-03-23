export function RecentKudosBar() {
    return (
        <div className="w-1/5 border-l-4 border-l-yellow-300 flex flex-col items-center">
            <h2 className="text-xl text-yellow-300 font-semibold my-6">Recent Kudos</h2>
            <div className="h-full flex flex-col gap-y-10 mt-10">
                {
                    new Array(3).fill(1).map((el, i) => (
                        <div key={i} className="rounded-full h-24 w-24 bg-gray-400 mx-auto flex-shrink-0">
                            {/* Profile Pictures */}
                        </div>
                    ))
                }
            </div>
        </div>
    )
}