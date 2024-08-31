import { statusType } from '@components/orderChip'
import { OrderHistory, PaymentHistory } from 'apis/paymentHistory'
import dayjs from 'dayjs'

interface SortedOrderType extends OrderHistory {
  totalPrice: number
  tableNumber: number
  state: statusType
}

export const sortOrder = (payments: PaymentHistory[] | undefined, status: string) => {
  if (payments === undefined) return []

  const selectedOrders: SortedOrderType[][] = payments.map(orders =>
    orders.orderHistoryResponseDtoList
      .filter(order => order.status === status)
      .map(order => {
        return {
          ...order,
          tableNumber: orders.tableNumber,
          totalPrice: orders.totalPrice,
          state: returnStatus(orders, order),
        }
      }),
  )
  return selectedOrders.flat().sort((a, b) => dayjs(b.createdAt).diff(dayjs(a.createdAt)))
}

const returnStatus = (orders: PaymentHistory, currentOrder: OrderHistory) => {
  orders.orderHistoryResponseDtoList.sort((a, b) => dayjs(a.createdAt).diff(dayjs(b.createdAt)))

  if (currentOrder.orderHistoryId === orders.orderHistoryResponseDtoList[0].orderHistoryId) {
    if (currentOrder.status === 'PENDING') return 'new'
    else if (currentOrder.status === 'APPROVED') return 'single'
  } else {
    if (currentOrder.status === 'PENDING') return 'extra'
    else if (currentOrder.status === 'APPROVED') return 'multi'
  }

  return 'new'
}
