import { LoaderFunction, redirect } from 'remix'
import { requireUserId } from '~/util/session.server'


// If the user isn't logged in, redirect to the login screen
export const loader: LoaderFunction = async ({ request }) => {
  // Handles redirect if not authenticated
  await requireUserId(request)
  return redirect('/home')
}
