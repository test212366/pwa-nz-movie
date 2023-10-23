import {getId} from "./fetch";

export const create = (tag, classItem = '', text = '') => {
    const item = document.createElement(tag)
    item.classList.add(classItem)
    item.textContent = text
    return item
}
export const transformSlide = async (slide) => {
    const img = slide.querySelector('.preview')
    const desc = slide.querySelector('.overlay')
    img.classList.add('small')
    desc.classList.add('small')
    await setTimeout(() => {
        img.classList.remove('small')
        desc.classList.remove('small')
    } ,300)
    document.querySelector('.description__overlay').classList.add('active')
    document.querySelector('.description__wrapper').classList.add('active')
    getId(slide.querySelector('.slider__title').textContent, slide.querySelector('.raiting').textContent)
}
export const createInfo = (data) => {
    let countries = '', fulters = ''
    data.genres.forEach(fulter => {
        fulters += fulter.genre + ', '
    })
    data.countries.forEach(country => {
        countries += country.country + ', '
    })
    const $description__wrapper = document.querySelector('.description__wrapper')
    $description__wrapper.innerHTML = ''
    const wrap = create('div', 'wrapper-info')
    if(!data.filmLength) data.filmLength = '~01:30'
    wrap.insertAdjacentHTML('afterbegin', `
                 <div class="description__wrapper-title">${data.nameRu}</div>
                <div class="description__wrapper-titleEn"><span class="blue">EN:<span> ${data.nameEn}</div>
                <div class="description__wrapper-genres"><span class="blue">Жанр:<span> ${fulters}</div>
                <div class="description__wrapper-destributors"><span> ${countries}<span> ${data.distributors} ${data.distributorRelease} ${data.year + ', '} ${data.filmLength} Часа</div>
                <div class="description__wrapper-country"><span class="blue">Страна премьеры:<span> ${data.premiereWorldCountry}</div>
                <div class="description__wrapper-premier-world"><span>Дата премьеры в мире:<span> ${data.premiereWorld}</div>
                <div class="description__wrapper-premier-ru"><span>Дата премьеры в России:<span> ${data.premiereRu}</div>
                <div class="description__wrapper-filmslogan"><span class="blue">Слоган фильма:<span> ${data.slogan}</div>
                <div class="description__wrapper-desFilm"><span class="blue">Описание:<span> ${data.description}</div>
                <div class="description__wrapper-poster">
                  <img class="preview" width="200px" height="300px" src=${data.posterUrlPreview} alt=${data.nameEn}>
                  <div class="description__wrapper-trailer"></div>
                </div>
                
                <div class="description__wrapper-type">${data.type}</div>
                <div class="description__wrapper-age">${data.ratingAgeLimits}+</div>
                <div class="description__wrapper-facts"><span class="blue">Факты: <span>${data.facts}</div>
    `)
    const nameEn = wrap.querySelector('.description__wrapper-titleEn'),
        slogan = wrap.querySelector('.description__wrapper-filmslogan'),
        premierRu = wrap.querySelector('.description__wrapper-premier-ru'),
        facts = wrap.querySelector('.description__wrapper-facts'),
        premierContry = wrap.querySelector('.description__wrapper-country'),
        premierAll = wrap.querySelector('.description__wrapper-premier-world'),
        desc = wrap.querySelector('.description__wrapper-desFilm'),
        age = wrap.querySelector('.description__wrapper-age')
    if(!data.nameEn) wrap.removeChild(nameEn)
    if(!data.ratingAgeLimits) age.textContent = '0+'
    if(!data.slogan) wrap.removeChild(slogan)
    if(!data.premiereRu) wrap.removeChild(premierRu)
    if(!data.premiereWorldCountry) wrap.removeChild(premierContry)
    if(!data.premiereWorld) wrap.removeChild(premierAll)
    if(!data.description) wrap.removeChild(desc)
    if(data.facts == false) wrap.removeChild(facts)
    $description__wrapper.appendChild(wrap)
    document.body.style.overflow = 'hidden'
    document.body.style.paddingRight = '10px'
    const $header = document.querySelector('.header')
    $header.style.paddingRight = '10px'
}
export function randomPage(number) {
    number -= 1
    return Math.floor(Math.random() * number + 1)
}
export function createURLYouTube(dataArray) {
    let currentURL
    dataArray.forEach(item => {
        if(item.site == 'YOUTUBE' && !currentURL && item.name == 'Трейлер' || item.site == 'YOUTUBE' && !currentURL && item.name == 'Трейлер (дублированный)'|| item.site == 'YOUTUBE' && !currentURL && item.name == 'Тизер-трейлер (дублированный)' || item.site == 'YOUTUBE' && !currentURL && item.name == 'Трейлер №1' || item.site == 'YOUTUBE' && !currentURL && item.name == 'Трейлер №2' || item.site == 'YOUTUBE' && !currentURL && item.name == 'Фрагмент (дублированный)')  {
            currentURL = item.url
            preparingDataURL(currentURL)
        }
    })
    if (!currentURL) {
        preparingDataURL('NotFound')
    }
}
function preparingDataURL(data) {
    const trailer = document.querySelector('.description__wrapper-trailer')
    if (data == 'NotFound'){
        return trailer.innerHTML = `<div class="noFind">Трейлер не найден :/</div>`
    } else if(data.includes('https://www.youtube.com/v/')) {
        let yURL = data.replace('https://www.youtube.com/v/', '')
        trailer.innerHTML = `<iframe class="youtube" width="560" height="305" src="https://www.youtube.com/embed/${yURL}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
    }
    else if(data.includes('https://www.youtube.com/watch?v=')) {
        let yURL = data.replace('https://www.youtube.com/watch?v=', '')
        trailer.innerHTML = `<iframe class="youtube" width="560" height="305" src="https://www.youtube.com/embed/${yURL}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
    } else if(data.includes('https://youtu.be/')) {
        let yURL = data.replace('https://youtu.be/', '')
        trailer.innerHTML = `<iframe class="youtube" width="560" height="305" src="https://www.youtube.com/embed/${yURL}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
    } else if(data.includes('http://www.youtube.com/v/')) {
        let yURL = data.replace('http://www.youtube.com/v/', '')
        trailer.innerHTML = `<iframe width="560" height="305" src="https://www.youtube.com/embed/${yURL}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
    }else if(data.ignore('https://www.youtube.com/watch?&v=')) {
        let yURL = data.replace('https://www.youtube.com/watch?&v=', '')
        trailer.innerHTML = `<iframe class="youtube" width="560" height="305" src="https://www.youtube.com/embed/${yURL}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
    }

}