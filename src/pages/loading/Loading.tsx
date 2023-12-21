import { AiOutlineLoading3Quarters } from 'react-icons/ai'
const Loading = () => {
  return (
    <div
      className='h-screen z-50  flex justify-center items-center absolute top-0 bottom-0 left-0 right-0'
      style={{ background: 'rgba(0,0,0,0.5)' }}
    >
      <div className='animate-spin text-white'>
        <AiOutlineLoading3Quarters fontSize={58} />
      </div>
    </div>
  )
}
export default Loading
