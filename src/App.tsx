import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from '@/layout/Layout'
import Documents from '@/pages/documents/Documents'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Navigate to='documents' />} />
        <Route path='documents' element={<Documents />} />
        <Route path='chat/:chatID' />
      </Route>
      <Route path='public'>
        <Route path='login' />
        <Route path='register' />
      </Route>
      <Route path='*' />
    </Routes>
  )
}

export default App
