import { randomId, setBackgroundForm, setFieldValue, setTextContent } from "./common"
import * as yup from 'yup'
import debounce from "lodash.debounce"

const ImageSounce = {
    PICSUM:'picsum',
    UPLOAD:'upload',
}

function setFormValue(form,formValue){
    setFieldValue(form,`[name='title']`,formValue?.title)
    setFieldValue(form,`[name='author']`,formValue?.author)
    setFieldValue(form,`[name='description']`,formValue?.description)
    setFieldValue(form,`[name='imageUrl']`,formValue?.imageUrl)
    

    setBackgroundForm(document,'#postHeroImage',formValue.imageUrl)
}

function getValueForm(formElement){
    // S1
    // const values = {}
    // const arrField = ['title','author','description','imgUrl']
    // arrField.forEach((name)=>{
    //     const field = formElement.querySelector(`[name="${name}"]`)
    //    if(field){
    //     values[name] = field.value
    //    }
    // })
    // return values
    //S2
    const formDataValues = {}
    const data = new FormData(formElement)
    for(const [key,value] of data){
        formDataValues[key] = value
        // console.log('data key',key,value);
    }

    return formDataValues
}



function getPostSchema(){
    return yup.object().shape({
        title: yup.string().required('please enter title'),
        author: yup
        .string()
        .required('please enter arthor').test('at-least-two-works',
        'please enter least two works',
        (value) => value.split(' ').filter((x)=>
            !!x && x.length > 2).length >= 2),
        description:yup.string(),
        imageSource:yup.string().required('please select an image sounce').oneOf([ImageSounce.PICSUM,ImageSounce.UPLOAD]),
        imageUrl:yup.string().when('imageSource',{
            is:ImageSounce.PICSUM,
            then:yup.string().required('please click change img').url(`please enter a valid url`)
        }),
        image:yup.mixed().when('imageSource',{
            is:ImageSounce.UPLOAD,
            then: yup.mixed()
            .test('required','please select an image to upload',(file)=>{ return file?.name})
            .test('max-3mb','the image too large (max 3mb)',(file)=>{
                const MAX_SIZE = 60*1024*1024
                const fileSize = file?.size || 0
                return fileSize <= MAX_SIZE
            })
        })
        
        
    })
}

function setFieldError(form,name,err){
    const element =  form.querySelector(`[name="${name}"]`)
  
        if(element){
            element.setCustomValidity(err)
            setTextContent(element.parentElement,'.invalid-feedback',err)
    }
}

async function validatePostForm(formElement,formValues){
    
    try {
        const arrName = ['title','author','imageUrl','image']
        arrName.forEach( (name) =>setFieldError(formElement,name,''))
        const schema = getPostSchema()
        await schema.validate(formValues,{ abortEarly: false})
    } catch (error) {
       
            // console.log('error name',error)
            const errorLog = {}
            if(error.name = 'validationError' && Array.isArray(error.inner)){

                for(const validationError of error.inner){
                    const name = validationError.path
                    // console.log(name);
                    if(errorLog[name]) continue
                    setFieldError(formElement,name,validationError.message)
                    errorLog[name] = true
            }
            }
    }

    //add was-validated class to form element
    const isValid = formElement.checkValidity()
    if(!isValid){
        formElement.classList.add('was-validated')

    }
    return isValid
}


async function validateFormField(form,formValues,name){
    try {
        setFieldError(form,name,'')
        const schema = getPostSchema()
        await schema.validateAt(name,formValues)

    } catch (error) {
        setFieldError(form,name,error.message)
    }
    const field = form.querySelector(`[name="${name}"]`)
    // console.log(field.parentElement)
    if(field && !field.checkValidity()){
        field.parentElement.classList.add('was-validated')
    }

}

function showLoading(form){
    const btnSubmit = form.querySelector(`[name="submit"]`)
    if(btnSubmit){
        btnSubmit.disabled = true
        btnSubmit.textContent = `save...`
    }
}
function hideLoading(form){
    const btnSubmit = form.querySelector(`[name="submit"]`)
    if(btnSubmit){
        btnSubmit.disabled = false
        btnSubmit.textContent = `save`
    }
}

function randomImg(form){
    const btnImg =  document.getElementById('postChangeImage')
    if(!btnImg) return
    btnImg.addEventListener('click',()=>{
    
        const idImg = `https://picsum.photos/id/${randomId(1000)}/1378/400`
        setFieldValue(form,`[name='imageUrl']`,idImg)
        setBackgroundForm(document,'#postHeroImage',idImg)
        validateFormField(form,{imageSource:ImageSounce.PICSUM,imageUrl:idImg},'imageUrl')
    })
   
}

function rederImageSource(form,valueSource){
    const controlList = form.querySelectorAll('[data-id="imageSource"]')
    if(controlList){
        controlList.forEach(control=>{
            control.hidden = control.dataset.imageSource !== valueSource
        })
    } 
}

function initRadioImageSource(form){
    const radioList = form.querySelectorAll(`[name="imageSource"]`)
    if(!radioList) return
    radioList.forEach(radio=>{
        radio.style.cursor = 'pointer'
        radio.addEventListener('change',(event)=>{
            rederImageSource(form,event.target.value)
        })
    })
    
}

function initUploadImg(form){
    const inpuImage = form.querySelector(`[name="image"]`)
    if(!inpuImage) return
    inpuImage.addEventListener('change',(event)=>{
        const file =event.target.files[0]
        if(file){
            const imageUrl =  URL.createObjectURL(file)
            // console.log(blodUrl)
            setBackgroundForm(document,'#postHeroImage',imageUrl)
        }
        validateFormField(form,{imageSource:ImageSounce.UPLOAD,image:file},'image')
    })
}

function initTitle(form){
    const inpuImage = form.querySelector(`[name="title"]`)
    if(!inpuImage) return
    const debounces = debounce(e=>{
        validateFormField(form,{title:e.target.value},'title')
    },300)
    inpuImage.addEventListener('input',debounces)
}
function initAuthor(form){
    const inpuImage = form.querySelector(`[name="author"]`)
    if(!inpuImage) return
    const debounces = debounce(e=>{
        validateFormField(form,{author:e.target.value},'author')
    },300)
    inpuImage.addEventListener('input',debounces)
}
function initValidationOnchange(form){
    const listName = ['title','author']
    const debounces = debounce((event,name)=>{
        // console.log('name',name);
        validateFormField(form,{[name]:event.target.value},name)
    },300)
    listName.forEach(name=>{
        const field = form.querySelector(`[name="${name}"]`)

        field.addEventListener('input',(event)=>{
            // console.log('name',x);
            debounces(event,name)
        })
    })
}

export function initPostForm({formId,defaultValue,onSubmit}){
    const formElement = document.getElementById(formId)
    if(!formElement) return
    let submitting = false
    setFormValue(formElement,defaultValue)
    randomImg(formElement)
    initRadioImageSource(formElement)
    initUploadImg(formElement)
    // initTitle(formElement)
    // initAuthor(formElement)
    initValidationOnchange(formElement)

    formElement.addEventListener('submit', async (event)=>{
        event.preventDefault()
        if(submitting){
            console.log('submitting');
            return
        }
        submitting = true
        showLoading(formElement)
        const formValues =  getValueForm(formElement)
        formValues.id = defaultValue.id
        // console.log('submit',formValues)
        //validation
        // if valid trigger submit callback
        // show error
        const isValid = await validatePostForm(formElement,formValues)
        // console.log(isValid)
      
        if(isValid){
            await onSubmit?.(formValues)
        }
        hideLoading(formElement)
        submitting = false
    })

}