import { Container } from '@radix-ui/themes'
import DocumentsHeader from '@documentComponents/DocumentsHeader'
import DocumentList from '@documentComponents/DocumentList'

const Documents = () => {
  return (
    <Container size='3' pt={'9'}>
      <DocumentsHeader />
      <DocumentList />
    </Container>
  )
}

export default Documents
