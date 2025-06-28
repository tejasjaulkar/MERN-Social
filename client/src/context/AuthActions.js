export const LoginStart = (userCredentials) => ({
    type: "LoginStart",
});

export const LoginSuccess = (user) => ({
    type: "LoginSuccess",
    payload: user,
});

export const LoginFailure = (error) => ({
    type: "LoginFailure",
    payload: error,
});