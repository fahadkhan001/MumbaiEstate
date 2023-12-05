//for error handling like not long enough password

export const errorHandler=(statusCode,message)=>{
    const error = new Error();
    error.statusCode=statusCode
    error.message=message
    return error;
}