import dayjs from "dayjs"
import { setTextContent } from "./common"
import relativeTime from 'dayjs/plugin/relativeTime'
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
 
    setTextContent(elementClone,'[data-id="title"]',post.title)
    setTextContent(elementClone,'[data-id="description"]',post.description)
    setTextContent(elementClone,'[data-id="author"]',post.author)
    setTextContent(elementClone,'[data-id="timeSpan"]',`-${dayjs(post.createdAt).fromNow()}`)
 
 
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