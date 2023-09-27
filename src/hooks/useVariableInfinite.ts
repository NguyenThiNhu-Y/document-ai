import { useRef } from 'react'
import { VariableSizeList } from 'react-window'

export const useVariableInfinite = <ItemData>(defaultItemHeight = 50) => {
  const rowHeights = useRef<Record<number, number>>({})
  const listRef = useRef<VariableSizeList<ItemData>>(null)

  const getRowHeight = (index: number) => {
    return rowHeights.current[index] || defaultItemHeight
  }

  const setRowHeight = (index: number, size: number) => {
    listRef.current?.resetAfterIndex(0)
    rowHeights.current = { ...rowHeights.current, [index]: size }
  }

  return {
    getRowHeight,
    setRowHeight,
    listRef,
  }
}
