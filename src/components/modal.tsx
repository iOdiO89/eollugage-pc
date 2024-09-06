import styled from 'styled-components'

export interface ModalProps {
  title?: string
  description?: string
  grayButtonText?: string
  blackButtonText?: string
  onClickGrayButton?: () => void
  onClickBlackButton?: () => void
}

export default function Modal({
  title,
  description,
  grayButtonText,
  blackButtonText,
  onClickGrayButton,
  onClickBlackButton,
}: ModalProps) {
  return (
    <Container>
      <Panel>
        <Title>{title}</Title>
        <Description>{description}</Description>
        <ButtonContainer>
          {grayButtonText !== undefined && <GrayButton onClick={onClickGrayButton}>{grayButtonText}</GrayButton>}
          <BlackButton onClick={onClickBlackButton}>{blackButtonText}</BlackButton>
        </ButtonContainer>
      </Panel>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: rgba(22, 22, 22, 0.5);
`
const Panel = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 40px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  min-width: 368px;
`

const Title = styled.div`
  font-size: 32px;
  font-weight: 600;
  color: #161616;
  margin-bottom: 24px;
  width: 100%;
`
const Description = styled.div`
  font-size: 18px;
  font-weight: 400;
  color: #161616;
  margin-bottom: 32px;
  width: 100%;
`
const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 24px;
`
const GrayButton = styled.div`
  background-color: #e0e0e0;
  color: #6f6f6f;
  border-radius: 8px;
  font-size: 20px;
  font-weight: 600;
  padding: 20px 32px;
  width: 100%;
  text-align: center;
  cursor: pointer;
`
const BlackButton = styled.div`
  border-radius: 8px;
  padding: 20px 32px;
  font-size: 20px;
  font-weight: 600;
  background-color: #131313;
  color: white;
  width: 100%;
  text-align: center;
  cursor: pointer;
`
