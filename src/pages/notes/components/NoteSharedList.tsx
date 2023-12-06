import { NoteRequest } from '@/api/noteAPI/noteAPI.type'
import { DEFAULT_PAGINATION } from '@/constants/common'
import { useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import { Box, Grid, Card, Flex } from '@radix-ui/themes'
import { Ring } from '@uiball/loaders'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import NoteItem from './NoteItem'
import { useNotes } from '@/api/noteAPI/noteAPI.hooks'

export interface NoteItemRespon {
  id: number
  title: string
  content: string
}

export const NoteSharedList = () => {
  return <></>
}
