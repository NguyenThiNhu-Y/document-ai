import { Button, Container, Heading } from '@radix-ui/themes'
import styled from '@emotion/styled'
import { CSSProperties, useEffect, useState } from 'react'
import Iframe from 'react-iframe'
import { useDocumentSummary } from '@/api/documentAPI/documentAPI.hooks'
import { useParams } from 'react-router-dom'

type StyledNoteBtnProps = {
  x: number
  y: number
  display: CSSProperties['display']
}

const DocumentSummary = () => {
  const { iddocument = -1 } = useParams()
  const { data } = useDocumentSummary({ iddocument: +iddocument })
  const url = 'http://localhost:8000/get_content_file/' + iddocument

  const [coordinates, setCoordinates] = useState({ x: 0, y: 0, display: 'none' })
  useEffect(() => {
    const onMouseUp = () => {
      const s = window.getSelection()
      const oRange = s?.getRangeAt(0) //get the text range
      const oRect = oRange?.getBoundingClientRect()
      const x = oRect?.x || 0
      const y = oRect?.y || 0
      const width = oRect?.width || 0
      let display = 'none'
      if (x != 0) {
        display = 'block'
      }
      setCoordinates({ x: x + width, y, display })
    }

    document.addEventListener('mouseup', onMouseUp)

    return () => {
      document.removeEventListener('mouseup', onMouseUp)
    }
  }, [])

  return (
    // <ContainerStyled>
    //   <Iframe url={url} width='100%' height='100%' position='relative' />
    //   <DivSummary>
    //     <Heading size='3'>NỘI DUNG TÓM TẮT</Heading>
    //     <br></br>

    //     {data?.map((item) => (
    //       <div key={item.idsummary_document}>
    //         <PStyled>{item.summary}</PStyled>
    //         <br />
    //       </div>
    //     ))}
    //   </DivSummary>
    //   <DivButton>
    //     <ButtonStyle x={coordinates.x} y={coordinates.y} display={coordinates.display}>
    //       ghi chú
    //     </ButtonStyle>
    //   </DivButton>
    // </ContainerStyled>
    <div style={{ padding: '20px' }}>
      <Iframe url={url} width='100%' height='100%' position='relative' />
    </div>
  )
}

const ContainerStyled = styled.div({
  display: 'grid',
  gridTemplateColumns: '6fr 5fr 1fr',
  alignItems: 'flex-start',
  padding: '40px',
})

const DivSummary = styled.div({
  height: '100%',
  marginLeft: '40px',
})

const DivButton = styled.div({
  height: '100%',
  marginLeft: '40px',
})

const PStyled = styled.p({
  textAlign: 'justify',
})

const ButtonStyle = styled(Button)<StyledNoteBtnProps>((props) => ({
  position: 'absolute',
  top: props.y,
  left: props.x,
  marginLeft: '30px',
  display: props.display,
}))

export default DocumentSummary
