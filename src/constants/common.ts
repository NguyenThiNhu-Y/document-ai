import { PAGE_LIMIT } from '@/api/common.constants'
import { FILE_TYPES } from '@/constants/common.enum'
import { AiFillFileWord, AiFillFilePdf } from 'react-icons/ai'

export const DEFAULT_PAGINATION = {
  iduser: 1,
  page_size: PAGE_LIMIT,
  current_page: 1,
}

export const FILE_ICONS = {
  [FILE_TYPES.PDF]: AiFillFilePdf,
  [FILE_TYPES.DOC]: AiFillFileWord,
  [FILE_TYPES.DOCX]: AiFillFileWord,
}
