import postApi from "./api/postApi"


(async ()=>{
    try {
        const queryParmas = {
            _page:1,
            _limit:6
        }
        const response = await postApi.getAll(queryParmas)
        console.log(response)
    } catch (error) {
        console.log(error)
    }

})()