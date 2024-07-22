import { useState } from 'react'
import NavBarItem from './navBarItem'
import styled from 'styled-components'

type VerticalNavProps = {
  items: { name: string; count?: number; onClick: () => void }[]
}

export default function NavBar({ items }: VerticalNavProps) {
  const [focusedIdx, setFocusedIdx] = useState<number>(0)

  const onClickItem = (i: number, onClick: () => void) => {
    setFocusedIdx(i)
    onClick()
  }

  return (
    <Container>
      {items.map((item, i) => (
        <NavBarItem
          name={item.name}
          count={item.count}
          isFocused={i === focusedIdx}
          onClick={() => onClickItem(i, item.onClick)}
        />
      ))}
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`
