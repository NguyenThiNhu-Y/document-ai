import { useEffect } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
const Loading = () => {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  return (
    <div
      className='h-screen z-50  flex justify-center items-center fixed top-0 bottom-0 left-0 right-0'
      style={{ background: 'rgba(0,0,0,0.5)' }}
    >
      <div className='animate-spin text-white'>
        <AiOutlineLoading3Quarters fontSize={40} />
      </div>
    </div>
  )
}
export default Loading
