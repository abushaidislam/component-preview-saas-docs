import React from 'react'

interface ErrorBoundaryProps {
  children: React.ReactNode
  onError?: (err: Error) => void
  resetKey: string | number
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

class PreviewErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error) {
    this.props.onError?.(error)
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps) {
    if (prevProps.resetKey !== this.props.resetKey && this.state.hasError) {
      this.setState({ hasError: false, error: null })
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-rose-950/80 border border-rose-800 text-rose-200 rounded-lg text-xs font-mono max-w-md mx-auto my-6 shadow-xl">
          <div className="font-semibold text-rose-100 flex items-center space-x-1.5 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-500" />
            <span>Runtime Error in Component</span>
          </div>
          <p className="whitespace-pre-wrap text-rose-300">{this.state.error?.message}</p>
        </div>
      )
    }
    return this.props.children
  }
}
export { PreviewErrorBoundary }
