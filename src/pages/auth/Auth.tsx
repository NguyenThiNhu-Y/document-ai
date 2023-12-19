import React, { useState } from 'react'
import Input from '@/pages/auth/components/Input'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'
import { Button, Text } from '@radix-ui/themes'

const Auth: React.FC = () => {
  const [authData, setAuthData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [stateAuth, setStateAuth] = useState('login')
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthData({
      ...authData,
      [e.target.name]: e.target.value,
    })
  }
  const toggleStateAuth = () => {
    setStateAuth((pre) => (pre === 'login' ? 'register' : 'login'))
  }
  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='w-[20%]'>
        <h1 className='text-3xl font-semibold text-center'>
          {stateAuth === 'login' ? 'Welcome back' : 'Create your account'}
        </h1>
        <div className='p-4 mt-10'>
          <form>
            <Input
              value={authData.email}
              onChange={handleChange}
              name='email'
              placeholder='Email'
              id='email'
              type='email'
              className='mb-6'
            />
            <Input
              value={authData.password}
              onChange={handleChange}
              name='password'
              placeholder='Password'
              id='password'
              type='password'
              className='mb-8'
            />
            {stateAuth === 'register' && (
              <Input
                value={authData.confirmPassword}
                onChange={handleChange}
                name='confirmPassword'
                placeholder='Confirm Password'
                id='confirmPassword'
                type='password'
                className='mb-8'
              />
            )}
            <Button type='submit' className='w-full py-4'>
              <Text>Continue</Text>
            </Button>
          </form>
          <p className='text-center mt-4'>
            {stateAuth === 'login' ? "Don't have an account?" : 'Already have an account?'}
            <span
              onClick={toggleStateAuth}
              className='cursor-pointer font-semibold text-main-color ml-2'
            >
              {stateAuth === 'login' ? 'Sign up' : 'Login'}
            </span>
          </p>
          <div className='border-t mt-4'>
            <div className='mt-6 border rounded-md p-4 flex items-center font-semibold hover:cursor-pointer'>
              <FcGoogle fontSize={26} className='mr-2' /> Continue with Google
            </div>
            <div className='mt-2 border rounded-md p-4 flex items-center font-semibold'>
              <FaGithub fontSize={26} className='mr-2' /> Continue with Google
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Auth
