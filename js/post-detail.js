import dayjs from "dayjs";
import postApi from "./api/postApi";
import {setTextContent,renderLightBox} from './utils/index'

function renderPostDetail(post){


//render postDetailTitle
//render postDetailAuthor
//render postDetailTimeSpan
//render postDetailDescription
setTextContent(document,'#postDetailTitle',post.title)
setTextContent(document,'#postDetailAuthor',post.author)
setTextContent(document,'#postDetailTimeSpan',dayjs(post.updatedAt).format('- DD/MM/YYYY - h:mm A'))
setTextContent(document,'#postDetailDescription',post.description)


//render postHeroImage
//render goToEditPageLink
const postImg = document.getElementById('postHeroImage')
if(postImg){
    postImg.style.backgroundImage = `url(${post.imageUrl})`
    postImg.addEventListener('error',()=>{
        postImg.style.backgroundImage = `https://via.placeholder.com/1378x400?Text=thumbnail`
    })
}
const editLink = document.getElementById('goToEditPageLink')
if(editLink){
    editLink.innerHTML = `<i class="fas fa-edit"></i> Edit Post`
    editLink.href = `/add-edit-post.html?id=${post.id}`
}



}

(async () =>{
    renderLightBox({
        modalId:'lightBox',
        imgSelector:'img[data-id="imgLightBox"]',
        prevSelector:'button[data-id="prevLightBox"]',
        nextSelector:'button[data-id="nextLightBox"]',
    })
    try {
        const url = new URL(window.location)
        const postId = url.searchParams.get('id')

        if(!postId){
            console.log('not id');
            return
        }
    
        const post = await postApi.getById(postId)
        
        renderPostDetail(post)


    } catch (error) {
        console.log(error);
    }
})()