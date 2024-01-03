import React, { useContext, useState } from 'react'
import Input from '@/pages/auth/components/Input'
import { FcGoogle } from 'react-icons/fc'
import { Button, Text } from '@radix-ui/themes'
import { provider, auth } from '@/firebase/firebase'
import { signInWithPopup } from 'firebase/auth'
import { loginGG } from '@/api/authAPI/auth.api'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { createPortal } from 'react-dom'
import Loading from '@/pages/loading/Loading'
import { APP_CONTEXT } from '@/context'
import { useLogin } from '@/api/authAPI/auth.hooks'
import { ResponseAuth } from '@/api/authAPI/authAPI.types'

const Auth: React.FC = () => {
  const navigate = useNavigate()
  const context = useContext(APP_CONTEXT)
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
          if (context.setUserData) {
            context.setUserData(response.data.user)
          }
          if (response.message) {
            toast.success(response.message, {
              style: {
                fontSize: '13px',
              },
            })
          }
          navigate('/')
        }
        setIsLoading(false)
      }
    })
  }

  const { mutate: mutateLogin } = useLogin()
  const onLogin = () => {
    mutateLogin(
      {
        email: authData.email,
        password: authData.password,
      },
      {
        onSuccess: (data) => {
          onSuccess(data)
        },
      }
    )
  }

  const onSuccess = (data: ResponseAuth) => {
    if (context.setUserData) {
      context.setUserData({
        email: data ? data.data.user.email : '',
        username: data ? data?.data.user.username : '',
        avatar: data ? data?.data.user.avatar : '',
        iduser: data ? data?.data.user.iduser : 0,
      })
      localStorage.setItem('DOCUMENT_AI_USER', data ? '' + data?.data.user.iduser : '')
      const userInfo = {
        email: data ? data.data.user.email : '',
        username: data ? data.data.user.username : '',
        avatar: data ? data.data.user.avatar : '',
        iduser: data ? data.data.user.iduser : '',
      }

      // Convert the userInfo object to a JSON string
      const userInfoString = JSON.stringify(userInfo)

      // Save the JSON string to localStorage
      localStorage.setItem('DOCUMENT_AI_USER_INFO', userInfoString)
    }
    navigate('/documents')
  }
  return (
    <>
      {isLoading && createPortal(<Loading />, document.body)}
      <div className='flex justify-center items-center h-screen'>
        <div className='w-[20%]'>
          <h1 className='text-3xl font-semibold text-center'>
            {stateAuth === 'login' ? 'Mừng bạn trở lại' : 'Tạo tài khoản'}
          </h1>
          <div className='p-4 mt-10'>
            <Input
              value={authData.email}
              onChange={handleChange}
              name='email'
              placeholder='Email'
              id='email'
              type='email'
              className='mb-4'
            />
            <Input
              value={authData.password}
              onChange={handleChange}
              name='password'
              placeholder='Mật khẩu'
              id='password'
              type='password'
              className='mb-4'
            />
            {stateAuth === 'register' && (
              <Input
                value={authData.confirmPassword}
                onChange={handleChange}
                name='confirmPassword'
                placeholder='Xác nhận mật khẩu'
                id='confirmPassword'
                type='password'
                className='mb-8'
              />
            )}
            <Button className='w-full py-4' onClick={onLogin}>
              <Text>Tiếp tục</Text>
            </Button>
            <p className='text-center mt-4 text-sm'>
              {stateAuth === 'login' ? 'Bạn chưa có tài khoản?' : 'Bạn đã có tài khoản?'}
              <span
                onClick={toggleStateAuth}
                className='cursor-pointer font-semibold text-main-color ml-2 text-sm'
              >
                {stateAuth === 'login' ? 'Đăng ký' : 'Đăng nhập'}
              </span>
            </p>
            <div className='border-t mt-4'>
              <div
                onClick={handleLoginWithGoogle}
                className='mt-6 border rounded-sm p-2 text-sm flex items-center font-semibold hover:cursor-pointer hover:bg-neutral-700'
              >
                <FcGoogle fontSize={26} /> <span className='ml-4'>Tiếp tục với Google</span>
              </div>
              {/* <div className='mt-2 border rounded-sm p-4 flex items-center font-semibold'>
                <FaGithub fontSize={26} className='mr-2' /> Continue with Google
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Auth
