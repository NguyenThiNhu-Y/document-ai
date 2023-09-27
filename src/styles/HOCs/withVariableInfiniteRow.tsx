import { useRef, useEffect, ComponentType } from 'react'
import { ListChildComponentProps } from 'react-window'

type InfiniteRowProps<Data> = ListChildComponentProps<Data> & {
  setRowHeight: (index: number, height: number) => void
}

const withVariableInfiniteRow = <Props extends object>(Component: ComponentType<Props>) => {
  return ({ index, style, data, setRowHeight }: InfiniteRowProps<Props>) => {
    const rowRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
      if (rowRef.current) {
        setRowHeight(index, rowRef.current.clientHeight)
      }
      // eslint-disable-next-line
    }, [rowRef])

    return (
      <div style={style}>
        <div ref={rowRef}>
          <Component {...data} />
        </div>
      </div>
    )
  }
}

export default withVariableInfiniteRow
