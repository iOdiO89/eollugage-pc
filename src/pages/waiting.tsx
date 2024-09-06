import OrderCard from 'components/orderCard'
import { useAtom } from 'jotai'
import { Container, CardContainer, TabTitle, Loading } from 'styles/shared'
import { modalDetailAtom, modalShowAtom, waitingCountAtom } from 'utils/atom'
import { useGetWaitingOrder } from 'hooks/apis/paymentHistory'
import { parseOrder, sortOrder } from 'utils/order'
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { OrbitProgress } from 'react-loading-indicators'

export default function WaitMain() {
  const location = useLocation()
  const [waitingCount] = useAtom(waitingCountAtom)
  const [isAudioPlayable, setIsAudioPlayable] = useState<boolean>(false)
  const [, setModalShow] = useAtom(modalShowAtom)
  const [, setModalDetail] = useAtom(modalDetailAtom)

  const { data: orderList, isLoading } = useGetWaitingOrder()

  let audioContext: AudioContext | null = null
  const checkAudioContext = () => {
    if (!audioContext) audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()

    if (audioContext.state === 'suspended') audioContext.resume().then(() => setIsAudioPlayable(true))
    else setIsAudioPlayable(true)
  }

  useEffect(() => {
    if (location.state !== null) {
      if (location.state === 'login') {
        window.addEventListener('click', checkAudioContext)

        return () => window.removeEventListener('click', checkAudioContext)
      } else document.getElementById(location.state)?.scrollIntoView({ behavior: 'smooth' })
    }
    // eslint-disable-next-line
  }, [location.state])

  useEffect(() => {
    if (!isAudioPlayable) {
      setModalDetail({
        title: 'title',
        description: 'are you ready to start?',
        blackButtonText: 'yes',
        onClickBlackButton: () => setModalShow(false),
      })
      setModalShow(true)
    }
  }, [isAudioPlayable, setModalShow, setModalDetail])

  return (
    <Container>
      <TabTitle>승인 대기 {waitingCount}</TabTitle>
      {isLoading ? (
        <Loading>
          <OrbitProgress color="#6f6f6f" size="small" />
        </Loading>
      ) : (
        <CardContainer>
          {sortOrder(orderList, 'PENDING').map((order, i) => (
            <div id={order.paymentHistoryId} key={order.orderHistoryId}>
              <OrderCard
                orderHistoryId={order.orderHistoryId}
                paymentHistoryId={order.paymentHistoryId}
                status={order.state}
                time={order.createdAt}
                tableNumber={order.tableNumber}
                totalPrice={order.totalPrice}
                orders={parseOrder(order.orderDetail)}
              />
            </div>
          ))}
        </CardContainer>
      )}
    </Container>
  )
}
