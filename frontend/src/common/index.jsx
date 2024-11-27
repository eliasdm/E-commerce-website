
const backendDomain="http://localhost:4000";

const summaryApi= {
    signup:{
        url:`${backendDomain}/api/auth/signup`,
        method:"post"
    },
    signin:{
        url:`${backendDomain}/api/auth/login`,
        method:"post"
    },
    current_user:{
        url:`${backendDomain}/api/users/u`,
        method:"get"
    },
    logout:{
        url:`${backendDomain}/api/auth/logout`,
        method:"get"
    }
}

export default summaryApi