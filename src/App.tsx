import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from '@/layout/Layout'
import Documents from '@/pages/documents/Documents'
import ChatSection from '@/pages/chatSection/ChatSection'
import Mindmaps from '@/pages/mindmaps/Mindmaps'
import Note from '@/pages/notes/Note'
import DocumentSummary from '@/pages/documents/components/DocumentSummary'
import NoteCreate from '@/pages/notes/components/NoteCreate'
import Auth from '@/pages/auth/Auth'
import { Toaster } from 'react-hot-toast'
import '@/app.css'

function App() {
  return (
    <>
      <Toaster position='top-center' reverseOrder={false} />
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Navigate to='documents' />} />
          <Route path='documents' element={<Documents />} />
          <Route path='new-chat/:iddocument' element={<ChatSection />} />
          <Route path='chat/:chatID' element={<ChatSection />} />
          <Route path='mindmaps/:iddocument' element={<Mindmaps />} />
          <Route path='notes' element={<Note />} />
          <Route path='create-note' element={<NoteCreate />} />
          <Route path='summary/:iddocument' element={<DocumentSummary />} />
        </Route>
        <Route path='auth' element={<Auth />} />
        <Route path='*' />
      </Routes>
    </>
  )
}

export default App
