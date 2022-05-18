export function setTextContent(li,dataSet,title){
    if(!li) return
    const elementContent = li.querySelector(dataSet)
    elementContent.textContent = title

}

export function getElement(id){
    if(!id) return
    return document.getElementById(id)
}