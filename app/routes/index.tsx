import { Layout } from '~/components/Layout'
import { LoaderFunction } from 'remix'
import { requireUserId } from '~/util/session.server'
import { UserBar } from '~/components/UserBar'

// If the user isn't logged in, redirect to the login screen
export const loader: LoaderFunction = async ({ request }) => {
  // Handles redirect if not authenticated
  await requireUserId(request)
  return null
}

export default function Index() {
  return <Layout>
    <div className="h-full flex">
      {/* Left bar */}
      <UserBar>
        {
          new Array(30).fill(1).map((el, i) => (
            <div key={i} className="rounded-full h-24 w-24 bg-gray-400 mx-auto flex-shrink-0">
              {/* Profile Pictures */}
            </div>
          ))
        }
      </UserBar>
      {/* Right Side */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="w-full px-6 flex items-center border-b-4 border-b-blue-900 border-opacity-30 h-20">
          <div className="flex items-center w-2/5 ">
            <input type="text" className="w-full rounded-xl px-3 py-2" placeholder="Search a message or name" />
            <svg className="w-4 h-4 fill-current text-gray-400 -ml-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" /></svg>
          </div>
          <div className="flex items-center mr-7">
            <select className="w-40 ml-4 rounded-xl px-3 py-2 text-gray-400 appearance-none">
              <option value="date">Date</option>
              <option value="sender">Sender Name</option>
              <option value="emoji">Emoji</option>
            </select>
            <svg className="w-4 h-4 fill-current text-gray-400 -ml-7 mt-1 pointer-events-none" viewBox='0 0 140 140' xmlns='http://www.w3.org/2000/svg'><g><path d='m121.3,34.6c-1.6-1.6-4.2-1.6-5.8,0l-51,51.1-51.1-51.1c-1.6-1.6-4.2-1.6-5.8,0-1.6,1.6-1.6,4.2 0,5.8l53.9,53.9c0.8,0.8 1.8,1.2 2.9,1.2 1,0 2.1-0.4 2.9-1.2l53.9-53.9c1.7-1.6 1.7-4.2 0.1-5.8z' /></g></svg>
          </div>
          <button className="rounded-xl bg-yellow-300 font-semibold text-blue-600 px-3 py-2 transition duration-300 ease-in-out hover:bg-yellow-400 hover:-translate-y-1">
            Search
          </button>
          <div className="flex-1" />
          <div className="h-14 w-14 bg-gray-400 rounded-full">
            {/* Profile Picture */}
          </div>
        </div>
        {/* Main Section */}
        <div className="flex-1 flex">
          <div className="w-full">
            {/* <h2>Main</h2> */}
          </div>
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
        </div>
      </div>
    </div>
  </Layout>
}
