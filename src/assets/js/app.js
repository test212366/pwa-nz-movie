
import {remove, rotate} from "./blocks/tilt";
import {preloader} from "./blocks/preloader";
import {preparingDataAll, preparingDataForm, preparingDataTopPopular} from "./blocks/fetch";
import {transformSlide} from "./blocks/utils";
import {closeSearch, openSearch} from "./blocks/model";
import {closeFulters, preparingDataFulter} from "./blocks/preparingDataFilters";
export let currentpageI = 1
document.body.onload = async function () {
    await preparingDataAll()
    const cards = document.querySelectorAll('.slide')
    cards.forEach((item, i) => {
        item.addEventListener('mousemove', rotate)
        item.addEventListener('mouseleave', remove)
    })
    await preloader()
    const form = document.getElementById('searchForm')
    await form.addEventListener('submit',e => {
        e.preventDefault()
        preparingDataForm()
    })

}
document.body.addEventListener('click', e => {
    if (e.target.classList.contains('d-show')){
        return transformSlide(e.target.parentNode.parentNode.parentNode)
    }
    if(e.target.classList.contains('overlay')) return transformSlide(e.target.parentNode)
    if (e.target.classList.contains('description__overlay')) {
        document.querySelector('.description__wrapper').classList.remove('active')
        document.querySelector('.description__overlay').classList.remove('active')
        setTimeout(() => {
            document.querySelector('.description__wrapper').innerHTML = ''
        },1000)
        document.body.style.overflow = 'visible'
        document.body.style.paddingRight = '0'
        return
    }
    if(e.target.classList.contains('svg')) return openSearch()
    if(e.target.classList.contains('close')) return closeSearch()
    if(e.target.classList.contains('search__title')) return closeSearch()
    if(e.target.classList.contains('nav__items-filter')) return preparingDataFulter(e.target.textContent)
    if(e.target.classList.contains('see-moreFulters')) {
        const res = document.querySelector('.results__fulter-movies')
        res.removeChild(e.target.parentNode)
        return preparingDataFulter()
    }
    if(e.target.classList.contains('back') || e.target.classList.contains('backArrow')) return closeFulters()
    if(e.target.classList.contains('allrecomend'))return preparingDataTopPopular()
    if(e.target.classList.contains('see-morePopular')) {
        currentpageI++
        return preparingDataTopPopular(currentpageI)
    }
})

