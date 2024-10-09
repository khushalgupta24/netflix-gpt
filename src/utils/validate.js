export const checkValidData = (email, pwd) => {
    const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email);
    const isPwdValid = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/.test(pwd);

    if(!isEmailValid) return "Email ID is not valid";
    if(!isPwdValid) return "Invalid Password";

    return null;
    
}