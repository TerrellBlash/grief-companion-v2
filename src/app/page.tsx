import { redirect } from 'next/navigation'

export default function Home() {
  // Redirect to dashboard home on app launch
  redirect('/dashboard/home')
}
