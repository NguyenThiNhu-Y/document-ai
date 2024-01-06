import Iframe from 'react-iframe'

const DocumentViewPage = () => {
  const url = 'http://localhost:8000/get_content_file/' + 57
  return <Iframe url={url} width='100%' height='100%' position='relative' />
}
export default DocumentViewPage
