import axiosClient from "./axiosClient"

const postApi = {
    getAll(params){
        const url='/posts'
        return axiosClient.get(url,{params})
    },
    getId(id){
        const url=`/posts/${id}`
        return axiosClient.get(url)
    },

    add(data){
        const url='/posts'
        return axiosClient.get(url,data)
    },
    update(data){
        const url=`/posts/${data.id}`
        return axiosClient.patch(url,data)
    },
    remove(id){
        const url=`/posts/${id}`
        return axiosClient.patch(url)
    },

}

export default postApi