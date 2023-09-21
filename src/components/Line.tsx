import styled from '@emotion/styled'
import { Flex } from '@radix-ui/themes'

const Line = () => {
  return (
    <Flex width={'auto'} align={'center'} gap={'0'} position={'relative'}>
      <VLeftLine />
      <DivStyled />
      <VRightLine />
    </Flex>
  )
}

const DivStyled = styled.div((props) => ({
  backgroundColor: props.theme.colors.gray5,
  height: '1px',
  flex: 1,
}))

const VLeftLine = styled.div((props) => ({
  backgroundColor: props.theme.colors.gray5,
  height: '1px',
  width: '9px',
  transform: 'rotate(90deg)',
  position: 'absolute',
  left: '1px',
  top: '0',
}))

const VRightLine = styled.div((props) => ({
  backgroundColor: props.theme.colors.gray5,
  height: '1px',
  width: '9px',
  transform: 'rotate(90deg)',
  position: 'absolute',
  right: '1px',
  top: '0',
}))

export default Line
