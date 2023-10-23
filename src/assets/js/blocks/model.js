import {create} from "./utils";
import {createSwiper} from "../swiper";
import {preparingDataForm} from "./fetch";

export function createSlides(data, append, chose = false, slider, prev, next) {
    const recomend = document.querySelector(`.` + append)
    data.forEach(film => {
        let countries = '', genres = ''
        film.genres.forEach(genre => genres += `${genre.genre}, `)
        film.countries.forEach(item => countries += `${item.country}, `)
        const item = create('div', 'swiper-slide')
        item.insertAdjacentHTML('afterbegin', `
                         <div class="slide">
                            <div class="overlay">
                                <div class="chose">Выбор PWA-NZ</div>
                                <div class="desc">
                                    <div class="raiting">${film.rating}</div>
                                    <div class="year">${film.year}</div>
                                    <div class="countries">${countries}</div>
                                    <div class="filters">${genres}</div>
                                    <div class="length">${film.filmLength} Часа</div>
                                    <div class="d-show"></div>
                                </div>
                            </div>
                            <img class="preview" width="200px" height="300px" src=${film.posterUrlPreview} alt=${film.nameEn}>
                            <div class="slider__title">${film.nameRu}</div>
                            <div class="see__trailer">Смотреть трейлер</div>
                        </div>
        `)
        const ovelay = item.querySelector('.overlay')
        if(!chose) ovelay.removeChild(ovelay.querySelector('.chose'))
        const desc = item.querySelector('.desc')
        if (!film.filmLength) desc.removeChild(item.querySelector('.length'))
        if(!film.rating) return item.querySelector('.raiting').textContent = 0
        if (film.rating > 7.0) {
            const raiting = item.querySelector('.raiting')
            raiting.style.borderBottom = '2px solid green'
        } else if(film.rating <= 7.0 && film.rating > 4.0) {
            const raiting = item.querySelector('.raiting')
            raiting.style.borderBottom = '2px solid yellow'
        } else if (film.rating <= 4.0) {
            const raiting = item.querySelector('.raiting')
            raiting.style.borderBottom = '2px solid red'
        }
        recomend.appendChild(item)
    })
    createSwiper(slider, prev, next)
}
export function openSearch () {
    const overlay = document.querySelector('.search__title')
    overlay.classList.add('activeSearch')
    const title = document.querySelector('.search__title-wrapper ')
        title.classList.add('activeSearch')
    document.body.style.overflow = 'hidden'
}
export function closeSearch() {
    document.body.style.overflow = 'visible'
    const $header = document.querySelector('.header')
    $header.style.paddingRight = '0px'
    const overlay = document.querySelector('.search__title')
    overlay.classList.remove('activeSearch')
    const title = document.querySelector('.search__title-wrapper ')
    title.classList.remove('activeSearch')
    const $results = document.querySelector('.results')
    $results.innerHTML = ''
    $results.classList.remove('resa')
    const searchWrapper = document.querySelector('.search__title-wrapper')
    searchWrapper.style.marginTop = '9rem'

}
let currentPage = 1
export async function createSearchMovies(dataArray, text, newP) {
    const $results = document.querySelector('.results')
    if(newP) $results.innerHTML = ''
    await dataArray.forEach(film => {
        let countries = '', genres = ''
        film.genres.forEach(genre => genres += `${genre.genre}, `)
        film.countries.forEach(item => countries += `${item.country}, `)
        $results.insertAdjacentHTML('beforeend', `
                         <div class="slide small smallMargin">
                            <div class="overlay small">
                                <div class="desc small">
                                    <div class="raiting">${film.rating}</div>
                                    <div class="year">${film.year}</div>
                                    <div class="countries">${countries}</div>
                                    <div class="filters">${genres}</div>
                                    <div class="length">${film.filmLength} Часа</div>
                                    <div class="d-show"></div>
                                </div>
                            </div>
                            <img class="preview small" width="200px" height="300px" src=${film.posterUrlPreview} alt=${film.nameEn}>
                            <div class="slider__title">${film.nameRu}</div>
                            <div class="see__trailer">Смотреть трейлер</div>
                        </div>
             `)
        if (film.rating > 7.0) {
            const raiting = $results.querySelector('.raiting')
            raiting.style.borderBottom = '2px solid green'
        } else if(film.rating <= 7.0 && film.rating > 4.0) {
            const raiting = $results.querySelector('.raiting')
            raiting.style.borderBottom = '2px solid yellow'
        } else if (film.rating <= 4.0) {
            const raiting = $results.querySelector('.raiting')
            raiting.style.borderBottom = '2px solid red'
        }
     })
    $results.classList.add('resa')
    const searchWrapper = document.querySelector('.wrap-sear')
    const premiers = searchWrapper.querySelector('.premiers')
    searchWrapper.style.marginTop = '0rem'
    if (premiers) {
        searchWrapper.removeChild(premiers)
    }
    $results.insertAdjacentHTML('beforeend', `
                         <div class="slide small smallMargin">
                            <div class="see-more SearchSemore">Загрузить ещё</div>
                        </div>
    `)
    const seeMore = $results.querySelector('.SearchSemore')

    seeMore.addEventListener('click', () => {
        currentPage++
        preparingDataForm(currentPage,text, true)
        $results.removeChild(seeMore.parentNode)
    })
}
