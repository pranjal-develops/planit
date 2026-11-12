import { useSelector } from 'react-redux';
import type { RootState } from '../../../store/store';

const EditProfile = () => {
        const { user} = useSelector((state: RootState) => state.auth);
        
  return (
    <div className='bg-[oklch(0.118_0.062_110)] text-white w-screen h-screen flex justify-center items-center overflow-auto'>
      <div className="w-full flex justify-around">
        <div className="flex flex-row h-full items-start justify-start mx-2">
            <img src={user?.pfp} alt="pfp"
             className=' w-80 h-80 rounded-full'/>
        </div>
        <div className="flex flex-col gap-5">
          <div className='flex flex-row'>
            <input type="text" value={user?.firstName}
           className='border border-white p-2 rounded-2xl flex justify-center items-center mx-2' />
            <input type="text" value={user?.lastName} 
           className='border border-white p-2 rounded-2xl flex justify-center items-center mx-2' />
          </div>
          <input
          type='text'
          value= {user?.username}
          // onChange={}
           className='border border-white p-2 rounded-2xl flex justify-center items-center mx-2'>
          </input>
          <input
          type='email'
          value= {user?.email}
          // onChange={}
           className='border border-white p-2 rounded-2xl flex justify-center items-center mx-2'>
          </input>
        </div>
      </div>
    </div>
  )
}

export default EditProfile