import React, { useState } from 'react'
import Input from '@/pages/auth/components/Input'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'
import { Button, Text } from '@radix-ui/themes'
import { provider, auth } from '@/firebase/firebase'
import { signInWithPopup } from 'firebase/auth'
import { login, loginGG } from '@/api/authAPI/auth.api'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { createPortal } from 'react-dom'
import Loading from '@/pages/loading/Loading'

const Auth: React.FC = () => {
  const navigate = useNavigate()
  const [authData, setAuthData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [isLoading, setIsLoading] = useState(false)

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

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      const res = await login({ email: authData.email, password: authData.password })
      console.log('api login', res)
      if (res.status === 200) {
        navigate('/')
        console.log('200', res.data)
        if (res.message) {
          toast.success(res.message)
        }
      }
    } catch (err) {
      console.log(err)
    }
    setIsLoading(false)
  }
  const handleLoginWithGoogle = () => {
    signInWithPopup(auth, provider).then(async (res) => {
      if (res.user.email && res.user.displayName && res.user.photoURL) {
        setIsLoading(true)
        const response = await loginGG({
          email: res.user.email,
          username: res.user.displayName,
          avatar: res.user.photoURL,
        })
        if (response.status === 200) {
          console.log('200', response.data)

          if (response.message) {
            toast.success(response.message)
          }
          navigate('/')
        }
        console.log('api login', response)
        setIsLoading(false)
      }
    })
    // .catch((err) => {
    //   console.log(err, 'err')
    // })
  }
  return (
    <>
      {isLoading && createPortal(<Loading />, document.body)}
      <div className='flex justify-center items-center h-screen'>
        <div className='w-[20%]'>
          <h1 className='text-3xl font-semibold text-center'>
            {stateAuth === 'login' ? 'Welcome back' : 'Create your account'}
          </h1>
          <div className='p-4 mt-10'>
            <form onSubmit={handleSubmit}>
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
              <div
                onClick={handleLoginWithGoogle}
                className='mt-6 border rounded-md p-4 flex items-center font-semibold hover:cursor-pointer hover:bg-neutral-700'
              >
                <FcGoogle fontSize={26} className='mr-2' /> Continue with Google
              </div>
              <div className='mt-2 border rounded-md p-4 flex items-center font-semibold'>
                <FaGithub fontSize={26} className='mr-2' /> Continue with Google
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Auth
