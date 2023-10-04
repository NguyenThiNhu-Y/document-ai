import { useEffect, useRef, useState } from 'react'
import { Editor, EditorState } from 'draft-js'
import 'draft-js/dist/Draft.css'

export const TextEditor = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty())

  const editor = useRef<Editor>(null)

  const focusEditor = () => {
    editor.current?.focus()
  }

  useEffect(() => {
    focusEditor()
  }, [])

  return (
    <div onClick={focusEditor}>
      <header className='App-header'>Rich Text Editor Example</header>
      <Editor ref={editor} editorState={editorState} onChange={setEditorState} />
    </div>
  )
}
