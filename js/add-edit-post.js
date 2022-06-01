import postApi from "./api/postApi"
import { initPostForm, toast } from "./utils"

function removeUnUseFields(formValues){
    const payload = {...formValues}
    if(payload.imageSource === 'picsum'){
        delete payload.image
    }else{
        delete payload.imageUrl
    }
    delete payload.imageSource
    if(!payload.id) delete payload.id
    return payload
}

function jsontoFormData(payload){
    const formdata =  new FormData()
    for(const key in payload){
        formdata.set(key,payload[key])
    }
    return formdata
}

async function handleSubmit(formValue){

    try {
        const payload = removeUnUseFields(formValue)
        const formData = jsontoFormData(payload)
        const idSubmit = formData.get('id') ?
        await postApi.updateFormData(formData):
        await postApi.addFormData(formData)
        toast.success('info success!!!')

        setTimeout(()=>{
            window.location.assign(`/post-detail.html?id=${idSubmit.id}`)
        },2000)
      
        // console.log('id submit',idSubmit.id)
        
    } catch (error) {
        console.log('add edit fail',error)
    }
}

(async ()=>{
    try {
        const searchParams = new URLSearchParams(window.location.search)
        const postId = searchParams.get('id')

        const defaultValue = postId ? await postApi.getById(postId) : {
            title:'',
            description:'',
            author:'',
            imageUrl:''
        } 

        // console.log(defaultValue)
        initPostForm({
            formId:'postForm',
            defaultValue,
            onSubmit:handleSubmit
        })


    } catch (error) {
        console.log(error);
    }



})()