// class ApiError extends Error{
//     constructor(
//         statusCode,
//         message = "something went wrong",
//         errors = [],
//         stack = "" 
//     ){
//         super(message),
//         this.statusCode = statusCode
//         this.data = null
//         this.message = message
//         this.success = false;
//         this.errors = errors;

//         if(stack){
//             this.stack = stack;
//         }else{
//             Error.captureStackTrace(this,this.constructor)
//         }
//     }
// }
// export { ApiError }

class ApiError extends Error {
  constructor(statusCode, message = "Something went wrong", errors = [], stack = "") {
    super(message);
    this.statusCode = statusCode;
    this.success = false;

    // If developer passed a string instead of an array, convert it
    this.errors = Array.isArray(errors) ? errors : [{ field: null, message: errors || message }];
    this.stack = stack || new Error().stack;
  }
}

export { ApiError }
