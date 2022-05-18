import debounce from 'lodash.debounce'
export function handleSeach({element,defaultParams,onChange}){
    try {
        const elementSeach = document.getElementById(element)
        if(!elementSeach) return
        // const queryParams  = new URLSearchParams(window.location.search)

        if(defaultParams.get('title_like')){
            elementSeach.value = defaultParams.get('title_like')
        }
        const debounces = debounce(e=>{
            onChange(e.target.value)
        },300)
        elementSeach.addEventListener('input',debounces)
    } catch (error) {
        console.log(error)
    }

}
