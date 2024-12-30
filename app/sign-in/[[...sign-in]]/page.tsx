import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className='max-w-screen-2xl mx-auto'>
      <div className='w-full min-h-screen flex justify-center items-center'>
        <SignIn />
      </div>
    </div>
  )
}