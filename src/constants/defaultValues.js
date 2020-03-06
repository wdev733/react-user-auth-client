export const defaultStartPath = '/home'; 

export const defaultLocale='en';
export const localeOptions=[
    {id:'en',name:'English'},
    {id:'es',name:'Español'},
];

// export const apiUrl = "http://localhost:3001/api/";
export const apiUrl = "http://18.188.5.223:3001/api/";

export const loginErrorType = {
  AUTH_SUCCESS: 9999,
  EMAIL: 1,
  PASSWORD: 2,
  INVALID_PASSWORD: 3
};

export const loginErrorTypeText = type => {
  if (type === loginErrorType.AUTH_SUCCESS) {
    return "";
  } else if (type === loginErrorType.EMAIL) {
    return "Email is required.";
  } else if (type === loginErrorType.PASSWORD) {
    return "Password is required.";
  } else if (type === loginErrorType.INVALID_PASSWORD) {
    return "Password is not correct.";
  } else {
    return "Unknown Error";
  }
};