import React from 'react'
import { Icon } from '@iconify/react/dist/iconify.js'
import Textinput from '../Components/textinput'
const Login = () => {
  return (
    <div className='w-full h-full flex flex-col items-center'>
      <div className='p-1 border-b border-solid border-gray-200 w-full flex justify-center'>
      <Icon icon="logos:spotify" width="180" height={100} />
      </div>
      <div className='form flex flex-col'>
        <label htmlFor="">Username:</label>

          <Textinput/>
          <label htmlFor="">Password:</label>
          <Textinput/>
      </div>
      
      </div>
  )
}

export default Login