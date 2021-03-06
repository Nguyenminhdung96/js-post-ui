import postApi from "./api/postApi"
import { initPagination,handleSeach,renderPostList,renderPagination,toast } from './utils'
import dayjs from "dayjs"
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)



async function handleFilterChange(filterName,filterValue){
    const url = new URL(window.location)

    if(filterName)url.searchParams.set(filterName,filterValue)
    
    if(filterName === 'title_like') url.searchParams.set('_page',1)
    history.pushState({},'',url)


    const queryParams = new URLSearchParams(window.location.search)
    console.log(queryParams.toString())
    const { data, pagination } = await postApi.getAll(queryParams)
    renderPagination(pagination)
    renderPostList(data)
}


function registerPostDeletePost(){
    document.addEventListener('post-delete',async (e)=>{
       try {
        // console.log(e.detail)
        const post = e.detail
        // console.log(post)
        await postApi.remove(post.id)
        await handleFilterChange()
        
       } catch (error) {
           console.log(error)
           toast.errors(error.message)
       }

    })
}


(async () => {

    try {
        const url = new URL(window.location)
        if (!url.searchParams.get('_page')) url.searchParams.set('_page', 1)
        if (!url.searchParams.get('_limit')) url.searchParams.set('_limit', 6)
        history.pushState({}, '', url)
        const queryParams = url.searchParams

        initPagination({
            element:'postsPagination',
            defaultParams:queryParams,
            onChange: page=>handleFilterChange('_page',page)
        })
        handleSeach({
            element:'SeachPost',
            defaultParams:queryParams,
            onChange: seachValue=>handleFilterChange('title_like',seachValue)
        })

        registerPostDeletePost()
        // const queryParams1 = new URLSearchParams(window.location.search)
        // console.log(queryParams1.get('_limit'))

        // const { data, pagination } = await postApi.getAll(queryParams)
        // console.log(data);
        // if(!data){
        //     return
        // }
        handleFilterChange()
        
        // renderPostList(data)
        // renderPagination(pagination)
        
    } catch (error) {
        console.log('log error main', error);

    }
})()
