export function setTextContent(li,dataSet,title){
    if(!li) return
    const elementContent = li.querySelector(dataSet)
    if(elementContent){
        elementContent.textContent = title
    }

}

export function getElement(id){
    if(!id) return
    return document.getElementById(id)
}


export function setFieldValue(formField,dataSet,value){
    if(!formField) return
    const elementContent = formField.querySelector(dataSet)
    if(!elementContent){
        console.log('fail',dataSet);
    }
    if(elementContent) elementContent.value = value
   

}

export function setBackgroundForm(form,idForm,imgUrl){
    if(!form) return
    const elementContent = form.querySelector(idForm)
    if(elementContent) elementContent.style.backgroundImage  = `url(${imgUrl})`

}


export function randomId(n){
    return Math.round(Math.random()*n)

}

export function maxWord(desription){
    return `${desription.slice(140)}&#8230;`
}