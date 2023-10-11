import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { User } from '@/types/user'
import Cookies from 'js-cookie' // Import js-cookie
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'

// Define a user type or interface

// Create the context
export interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  setIsAuthenticated: (isAuthenticated: boolean) => void
  setUser: (user: User | null) => void
  //   login: any
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Custom hook to access the context
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Create a provider component
interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const router = useRouter()
  const pathname = usePathname() // Get the current route from the router

  useEffect(() => {
    // set isAuthenticated to true if have cookie in browser name 'jwt'
    if (Cookies.get('jwt')) {
      setIsAuthenticated(true)
    }
  }, [])

  useEffect(() => {
    // set isAuthenticated to true if have cookie in browser name 'jwt'
    if (Cookies.get('jwt') && pathname !== 'login' && pathname !== 'register') {
      router.push(pathname)
    }
    if (!Cookies.get('jwt') && pathname !== '/login' && pathname !== '/register') {
      router.push('/login')
      return
    }
  }, [router, pathname])

  const logout = () => {
    // Implement your logout logic here
    // Typically, you would clear the user data (e.g., remove cookies or clear local storage)
  }

  // Provide user, login, and logout values to the context
  const contextValues: AuthContextType = {
    user,
    setUser,
    logout,
    isAuthenticated,
    setIsAuthenticated
  }

  return <AuthContext.Provider value={contextValues}>{children}</AuthContext.Provider>
}
