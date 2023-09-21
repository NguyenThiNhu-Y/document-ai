import { format } from 'date-fns'

export const formatDateTime = (date: number | Date, template = 'MMM dd, yyyy') => {
  return format(date, template)
}
