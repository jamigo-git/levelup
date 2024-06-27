class CustomError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'CustomError'
    this.status = status
  }
}

export default CustomError
