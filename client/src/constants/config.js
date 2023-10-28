//API notification

export const API_NOTIFICATION_MESSAGES={
    loading:{
        title:"Loading.....",
        message:"data is being loaded please wait"

    },
    success:{
        title:'success',
        message:'Data succesfully loaded'
    },
    responseFailure:{
        title:'Error',
        message:"An Error occured while fetching Response from the server tryy againi later"
    },
    requestFailure:{
        title:'error',
        message:'error occur while parsing the data'
    },
    networkError:{
        title:'error',
        message:'unable to connect please check internet availability'
    }
}

//api service call 

export const SERVICE_URLS={
    userSignup:{url:"/signup",method:"POST"}
}