
export function initPagination({element,defaultParams,onChange}){
    const elementPagination = document.getElementById(element)
    if(!elementPagination) return
   

    const prev = elementPagination.firstElementChild
    if(prev){
        prev.addEventListener('click',(e)=>{
            // e.preventDefault()
            // const page = Number.parseInt(elementPagination.dataset.page) || 1
            // if(page >= 2) onChange?.(page-1)
            handlePrev(e,onChange)

        })
    }
    const next = elementPagination.lastElementChild
    if(next){
        next.addEventListener('click',(e)=>{
            // e.preventDefault()
            // const page = Number.parseInt(elementPagination.dataset.page) || 1
            // const totalRows = Number.parseInt(elementPagination.dataset.totalPages)
            // if(page < totalRows) onChange?.(page+1)
            handleNext(e,onChange)
        })
    }
}

export function handlePrev(e,onChange){
    e.preventDefault()
    const ulPagination =  document.getElementById('postsPagination')
    const page = Number.parseInt(ulPagination.dataset.page)
    if(page <= 1){
        return
    }else{
        onChange(page - 1 )
    }
}
export function handleNext(e,onChange){
    e.preventDefault()
    const ulPagination =  document.getElementById('postsPagination')
    const page = Number.parseInt(ulPagination.dataset.page)
    const totalRows = Number.parseInt(ulPagination.dataset.totalPages)
    console.log(page);
    if(page >= totalRows){
        return
    }else{
        onChange(page + 1 )
    }
}

export function renderPagination(pagination){
    if(!pagination) return

    const ulPagination =  document.getElementById('postsPagination')
    if(!ulPagination) return

    const {_page,_limit,_totalRows } = pagination
    const totalPage = Math.ceil(_totalRows/_limit)
    ulPagination.dataset.page = _page
    ulPagination.dataset.totalPages = totalPage

    if(_page < 2){
        ulPagination.firstElementChild?.classList.add('disabled')
    }else{
        ulPagination.firstElementChild?.classList.remove('disabled')
    }

    if(_page >= totalPage){
        ulPagination.lastElementChild?.classList.add('disabled')
    }else{
        ulPagination.lastElementChild?.classList.remove('disabled')
    }



}



