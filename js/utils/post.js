import dayjs from "dayjs"
import postApi from "../api/postApi"
import { maxWord, setTextContent } from "./common"
export function createElement(post) {
    if(!post) return
    const elementTemplate = document.getElementById('postItemTemplate')
    if(!elementTemplate) return
    const elementClone = elementTemplate.content.firstElementChild.cloneNode(true)
    if(!elementClone) return
 
    const thumbnail = elementClone.querySelector('[data-id="thumbnail"]')
 
    if(thumbnail){
         thumbnail.src = post.imageUrl
         thumbnail.addEventListener('error',()=>{
             thumbnail.src = `https://via.placeholder.com/1378x400?Text=thumbnail`
         })
    }
    // const descriptionMax = `${.slice(140)} &#x2026;`
    
    // console.log(descriptionMax)
    setTextContent(elementClone,'[data-id="title"]',post.title)
    setTextContent(elementClone,'[data-id="description"]',post.description)
    setTextContent(elementClone,'[data-id="author"]',post.author)
    setTextContent(elementClone,'[data-id="timeSpan"]',`-${dayjs(post.createdAt).fromNow()}`)
 
    //attach events
    //go to detail when click div.post-item
    const divElement = elementClone.firstElementChild
    if(divElement){
       divElement.addEventListener('click',(event)=>{
           const menuEdit = divElement.querySelector('[data-id="menu"]')
           if(menuEdit && menuEdit.contains(event.target)) return
        window.location.assign(`/post-detail.html?id=${post.id}`)
       })
    }

    const edit = divElement.querySelector('[data-id="edit"]')
    edit.addEventListener('click',()=>{
        window.location.assign(`/add-edit-post.html?id=${post.id}`)
    })

    const remove = divElement.querySelector('[data-id="remove"]')
    remove.addEventListener('click',()=>{
        const customEvent = new CustomEvent('post-delete',{
            bubbles:true,
            detail:post
        })
        remove.dispatchEvent(customEvent)
    })

 
    return elementClone
 
 }
 
export function renderPostList(postList){
     if(!Array.isArray(postList)) return
 
     const ulElementList = document.getElementById('postsList')
     if(!ulElementList) return
     ulElementList.textContent = ''
     postList.forEach(post=>{
         const elementLi =  createElement(post)
         ulElementList.appendChild(elementLi)
     })
     return ulElementList
 }