import * as type from "../type";
  
  const initialState = {
    userData:[],
    isLoggedIn:false
    
  };
  
  export default function reducer(state = initialState, action) {
    switch (action.type) {
      case type.LOGIN:
        return {
          ...state,
          userData:action.payload,
          isLoggedIn:true
        };
      case type.USER_SIGN_UP:
        return {
          ...state,
          userSignupDate:action.payload
        };
      
  
      default:
        return state;
    }
  }
  