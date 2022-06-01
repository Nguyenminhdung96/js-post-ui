function showModal(modalElement){
    const modal = new window.bootstrap.Modal(modalElement)
    if(modal){
        modal.show()
    }
}

export function renderLightBox({modalId,imgSelector,prevSelector,nextSelector}){
    const modalElement = document.getElementById(modalId)
    // console.log(modalElement);
    if(!modalElement) return
    
    const imgElement = modalElement.querySelector(imgSelector)
    const prevBtn = modalElement.querySelector(prevSelector)
    const nextBtn = modalElement.querySelector(nextSelector)
    if(!imgElement || !prevBtn || !nextBtn) return
 
    let listImg = []
    let currentIndex = 0

    function showImg(currentIndex){
        imgElement.src = listImg[currentIndex].src
    }

    document.addEventListener('click',(event)=>{
        const {target} = event
       
        if(target.tagName !== 'IMG' && !target.dataset.ligthBox) return

        listImg = document.querySelectorAll(`img[data-ligthBox="ligthBox"]`)
        currentIndex = [...listImg].findIndex(img=>img === target)
        // console.log({target,currentIndex,listImg})
        showImg(currentIndex)
        showModal(modalElement)
    })

    prevBtn.addEventListener('click',(e)=>{
        currentIndex = (currentIndex - 1 + listImg.length) % listImg.length
        showImg(currentIndex)
        
    })
    nextBtn.addEventListener('click',(e)=>{
        currentIndex = (currentIndex + 1) % listImg.length
        showImg(currentIndex)
    })

}
