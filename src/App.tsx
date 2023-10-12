import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from '@/layout/Layout'
import Documents from '@/pages/documents/Documents'
import ChatSection from '@/pages/chatSection/ChatSection'
import Mindmaps from '@/pages/mindmaps/Mindmaps'
import Note from '@/pages/notes/Note'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Navigate to='documents' />} />
        <Route path='documents' element={<Documents />} />
        <Route path='new-chat' element={<ChatSection />} />
        <Route path='chat/:chatID' element={<ChatSection />} />
        <Route path='mindmaps' element={<Mindmaps />} />
        <Route path='notes' element={<Note />} />
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
