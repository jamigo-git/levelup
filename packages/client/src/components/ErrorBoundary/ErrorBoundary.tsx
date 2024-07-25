import { message } from 'antd'
import { Component, ReactNode, ErrorInfo } from 'react'

type ErrorBoundaryProps = {
  fallback?: ReactNode
  children: ReactNode
  errorMessage?: string
}

type ErrorBoundaryState = {
  hasError: boolean
  errorShown: boolean
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, errorShown: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (!this.state.errorShown && this.props.errorMessage) {
      message.error(this.props.errorMessage)
      this.setState({ errorShown: true })
    }
    console.error(error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || null
    }
    return this.props.children
  }
}

export default ErrorBoundary
