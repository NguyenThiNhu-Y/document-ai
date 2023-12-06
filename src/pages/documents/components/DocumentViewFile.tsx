import { useEffect, useState } from 'react'
import styled from '@emotion/styled'

const DocumentViewFile = () => {
  const [content, setContent] = useState('')

  const fetchContent = async () => {
    const response = await fetch(
      'https://drive.google.com/file/d/1_d_UxiGcJVzouWX48UcGyBfPoHV_ovlZ/view?usp=share_link'
    )
    const text = await response.text()
    console.log(text)
    setContent(text)
  }

  useEffect(() => {
    fetchContent()
  }, [])

  return <embed>{content}</embed>
}

const PStyled = styled.p({
  textAlign: 'justify',
})

export default DocumentViewFile
