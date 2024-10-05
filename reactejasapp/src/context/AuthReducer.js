const AuthReducer = (state, action) => {
      console.log("AuthReducer action:", action);  // Log the action
      switch (action.type) {
        case "LoginStart":
          return {
            user: null,
            isFetching: true,
            error: false,
          };
        case "LoginSuccess":
          console.log("LoginSuccess payload:", action.payload); // Log the payload
          return {
            user: action.payload,
            isFetching: false,
            error: false,
          };
        case "LoginFailure":
          return {
            user: null,
            isFetching: false,
            error: true,
          };
        default:
          return state;
      }
    };
    
    export default AuthReducer;
    