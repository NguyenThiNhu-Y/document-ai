import { Heading } from '@radix-ui/themes'
import styled from '@emotion/styled'
import Iframe from 'react-iframe'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { useTheme } from '@emotion/react'
import { useGetSimilaryDocument } from '@/api/documentAPI/documentAPI.hooks'

const DocumentSimilary = () => {
  const { iddocument = -1 } = useParams()
  const [url, setUrl] = useState('http://localhost:8000/get_content_file/' + iddocument)
  const [selectedItem, setSelectedItem] = useState('')
  const { colors } = useTheme()

  // const data = [
  //   'https://www.cit.ctu.edu.vn/~dtnghi/oss/python.pdf',
  //   'https://tinhte.vn/thread/20-tai-lieu-lap-trinh-python-co-ban-den-nang-cao-hay-nhat.2995572/',
  //   'https://topdev.vn/blog/20-tai-lieu-python-hoc-thiet-thuc-nhat-de-tro-thanh-lap-trinh-vien-chuyen-nghiep/',
  //   'https://codegym.vn/blog/giao-trinh-python-pdf/',
  //   'https://howkteam.vn/d/tai-lieu-python-tieng-viet-co-ban-vo-duy-tuan-97',
  //   'https://cuongquach.com/tai-lieu-python-tieng-viet-co-ban-vo-duy-tuan.html',
  //   'http://thpt-chuyennguyenquangdieu.dongthap.edu.vn/thu-vien2/tai-lieu-chuyen-mon/chuyen-tin/10t-gia-o-tri-nh-la-p-tri-nh-python-co-ba-n-nho-m-ta-c-gia-.html',
  //   'https://codegym.vn/blog/tai-lieu-hoc-ngon-ngu-lap-trinh-python/',
  //   'https://www.vniteach.com/2022/08/12/tron-bo-tai-lieu-hoc-lap-trinh-python-co-ban/',
  //   'https://blog.freec.asia/sach-lap-trinh-python/',
  //   'https://www.slideshare.net/man2017/gio-trnh-lp-trnh-python-cn-bn-trn-nht-quang-phm-vn-khoapdf',
  //   'https://topdev.vn/blog/tai-lieu-python/',
  // ]

  const { data } = useGetSimilaryDocument({ iddocument: +iddocument })
  const onViewUrl = (url: string) => {
    setUrl(url)
    setSelectedItem(url)
  }
  return (
    <ContainerStyled>
      <DivSummary>
        <Heading size='3'>DANH SÁCH CÁC TÀI LIỆU TƯƠNG TỰ</Heading>
        <br></br>

        <StyledDiv>
          {data?.map((item, index) => (
            <div>
              <PStyled
                style={{ backgroundColor: item === selectedItem ? colors.irisA3 : '' }}
                onClick={() => {
                  onViewUrl(item)
                }}
              >
                {(index += 1) + ': ' + item}
              </PStyled>
              <br />
            </div>
          ))}
        </StyledDiv>
      </DivSummary>
      <Iframe url={url} width='100%' height='100%' position='relative' />
    </ContainerStyled>
  )
}

const StyledDiv = styled.div({
  height: '100%',
  overflow: 'auto',
  marginRight: '40px',
})

const ContainerStyled = styled.div({
  display: 'grid',
  gridTemplateColumns: '6fr 6fr',
  alignItems: 'flex-start',
  padding: '40px',
})

const DivSummary = styled.div({
  height: '100%',
  marginLeft: '40px',
})

const PStyled = styled.button((props) => ({
  textAlign: 'justify',
  marginBottom: '20px',
  padding: '5px',
  '&:hover': {
    backgroundColor: props.theme.colors.irisA3,
  },
}))

export default DocumentSimilary
