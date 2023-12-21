import { UserType } from '@/@types/user'
import { createContext, useState, ReactNode, Dispatch, SetStateAction } from 'react'

interface AppContextProps {
  children: ReactNode
}

interface AppContextValue {
  userData: UserType | null
  setUserData?: Dispatch<SetStateAction<UserType | null>>
}

export const APP_CONTEXT = createContext<AppContextValue>({
  userData: null,
  setUserData: undefined,
})

export const AppProvider: React.FC<AppContextProps> = ({ children }) => {
  const [userData, setUserData] = useState<UserType | null>(null)

  const contextValue: AppContextValue = {
    userData,
    setUserData,
  }

  return <APP_CONTEXT.Provider value={contextValue}>{children}</APP_CONTEXT.Provider>
}
