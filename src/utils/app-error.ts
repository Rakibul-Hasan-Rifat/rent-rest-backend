class AppError extends Error {

    constructor(public statusCode: number, public massage: string, public errorDetails?: string) {
        super(massage)
        this.statusCode = statusCode
        this.errorDetails = errorDetails
        Error.captureStackTrace(this, this.constructor)
    }
}

export default AppError