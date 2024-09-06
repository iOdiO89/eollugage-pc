import { ROUTE } from 'constants/path'
import { QueryClient, useQuery } from '@tanstack/react-query'
import { getMy } from 'apis/my'
import { useAtom } from 'jotai'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { storeIdAtom } from 'utils/atom'

function useGetMy(queryClient?: QueryClient) {
  const navigate = useNavigate()
  const [, setStoreId] = useAtom(storeIdAtom)
  const query = useQuery({
    queryKey: ['getMy'],
    queryFn: () => getMy(),
  })

  useEffect(() => {
    if (query.isSuccess) {
      setStoreId(query.data.storeList[0].storeId)
      navigate(ROUTE.WAITING_MAIN, { state: 'login' })
    }
    // eslint-disable-next-line
  }, [query.isSuccess])

  return query.refetch
}

export { useGetMy }
