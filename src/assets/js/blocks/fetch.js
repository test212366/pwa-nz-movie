import {createSearchMovies, createSlides} from "./model";
import {createInfo, createURLYouTube, randomPage} from "./utils";
import {createFulterData} from "./preparingDataFilters";

const all = []

export async function preparingDataAll(currentPage = 1) {
    currentPage = randomPage(13)
    const API_KEY = 'd4121654-de25-4589-9d26-0694e00a8ae8'
    const API_URL = `https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_250_BEST_FILMS&page=${currentPage}`
    const resp = await fetch(API_URL, {
        headers: {
            "X-Api-Key": API_KEY
        }
    })
    const responceAll = await resp.json()
    all.push(responceAll.films)
    console.log(all)
    await createSlides(responceAll.films, 'recomend', true, 'recomendSlider', 'prevRecomend', 'nextRecomend')
    await preparingDataFulters(17, 1,false, 'fulters-det', 'detSlider', 'prevDet', 'nextDet')
    await preparingDataFulters(3, 1, false,'fulters-ring', 'ringSlider', 'prevRing', 'nextRing')
    await preparingDataTopAwait(1, 'await',false, 'awaitSlider', 'prevAwait', 'nextAwait')
    await preparingDataFulters(1750, 1, false,'anime', 'animeSlider', 'prevAnime', 'nextAnime')
    await preparingDataFulters(2, 1, false,'about', 'aboutSlider', 'prevAbout', 'nextAbout')
    await preparingDataFulters(6, 1, false,'comed', 'comedSlider', 'prevComed', 'nextComed')
    await preparingDataFulters(7, 1, false,'melodrams', 'melodramsSlider', 'prevMelodrams', 'nextMeloadrams')
    await preparingDataFulters(1, 1, false,'creppy', 'creppySlider', 'prevCreppy', 'nextCreppy')
    await preparingDataFulters(5, 1, false,'fant', 'fantSlider', 'prevFant', 'nextFant')
    await preparingDataFulters(15, 1, false,'short', 'shortSlider', 'prevShort', 'nextShort')
}
export async function preparingDataFulters(fulter, pageNumber,chose, append, slider, prev, next) {
    pageNumber = randomPage(5)
    const API_KEY = 'd4121654-de25-4589-9d26-0694e00a8ae8'
    const API_URL = `https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-filters?genre=${fulter}&order=YEAR&type=FILM&ratingFrom=0&ratingTo=10&yearFrom=1888&yearTo=2020&page=${pageNumber}`
    const resp = await fetch(API_URL, {
        headers: {
            "X-Api-Key": API_KEY
        }
    })
    const responceAll = await resp.json()
    all.push(responceAll.films)
    createSlides(responceAll.films,append,chose,  slider, prev, next)
}
export async function preparingDataTopAwait(page, append, chose, slider, prev, next) {
    const API_KEY = 'd4121654-de25-4589-9d26-0694e00a8ae8'
    const API_URL = `https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_AWAIT_FILMS&page=${page}`
    const resp = await fetch(API_URL, {
        headers: {
            "X-Api-Key": API_KEY
        }
    })
    const responceAll = await resp.json()
    all.push(responceAll.films)
    createSlides(responceAll.films, append, chose, slider, prev, next)
}
let id = ''
export const getId = async (name, raiting) => {
    await all.forEach(item => {
        item.forEach(film => {
            if(film.nameRu == name && film.rating == raiting ) {
                id = ''
                id = film.filmId
                return
            }
        })
    })
    getInfoforId(id)
}
async function getInfoforId(id) {
    if(id) {
        const API_KEY = 'd4121654-de25-4589-9d26-0694e00a8ae8'
        const API_URL = `https://kinopoiskapiunofficial.tech/api/v2.1/films/${id}`
        const resp = await fetch(API_URL, {
            headers: {
                "X-Api-Key": API_KEY
            }
        })
        const responce = await resp.json()
        await createInfo(responce.data)
        getYouTube(id)
    } else {
        const $description__wrapper = document.querySelector('.description__wrapper')
        $description__wrapper.innerHTML = `
        <div class="ErrorId">Ошибка: 401, похоже фильм/сериал/мультфильм низкорейтинговый :/</div>
        `
    }

}
async function getYouTube(id) {
    const API_KEY = 'd4121654-de25-4589-9d26-0694e00a8ae8'
    const API_URL = `https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}/videos`
    const resp = await fetch(API_URL, {
        headers: {
            "X-Api-Key": API_KEY
        }
    })
    const responce = await resp.json()
    createURLYouTube(responce.items)
}
export async function preparingDataForm(page = 1, text, more = false) {
    if(text && more) {
        const API_KEY = 'd4121654-de25-4589-9d26-0694e00a8ae8'
        const API_URL = `https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${text}&page=${page}`
        const resp = await fetch(API_URL, {
            headers: {
                "X-Api-Key": API_KEY
            }
        })
        const responce = await resp.json()
        if(responce.pagesCount <= page) {
            const $results = document.querySelector('.results')
            $results.insertAdjacentHTML('beforeend', `
                         <div class="slide small smallMargin">
                            <div class="see-more SearchSemore">Результатов больше нет</div>
                        </div>
                `)
            return
        }
        all.push(responce.films)
        await createSearchMovies(responce.films, text)
    } else {
        let inputValue = document.querySelector('.search__title-input')
        const text =  encodeURI(inputValue.value)
        inputValue.value = ''
        const API_KEY = 'd4121654-de25-4589-9d26-0694e00a8ae8'
        const API_URL = `https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${text}&page=${page}`
        const resp = await fetch(API_URL, {
            headers: {
                "X-Api-Key": API_KEY
            }
        })
        const responce = await resp.json()
        all.push(responce.films)
        await createSearchMovies(responce.films, text, true)
    }
}
export async function preparingDataFultersHeader(fulter,genre, page = 1, item) {
    const API_KEY = 'd4121654-de25-4589-9d26-0694e00a8ae8'
    const API_URL = `https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-filters?genre=${fulter}&order=YEAR&type=FILM&ratingFrom=0&ratingTo=10&yearFrom=1888&yearTo=2020&page=${page}`
    const resp = await fetch(API_URL, {
        headers: {
            "X-Api-Key": API_KEY
        }
    })
    const responceAll = await resp.json()
    all.push(responceAll.films)
    if(responceAll.pagesCount <= page) {
        const res = document.querySelector('.results__fulter-movies')
        res.insertAdjacentHTML('beforeend', `
                         <div class="slide small smallMargin">
                            <div class="see-more SearchSemore">Результатов больше нет</div>
                        </div>
                `)
        return
    }
    createFulterData(responceAll.films, genre, item)
}
export async function preparingDataTopPopular(item,page = 1) {
    if (item) {
        const API_KEY = 'd4121654-de25-4589-9d26-0694e00a8ae8'
        const API_URL = `https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=${item}`
        const resp = await fetch(API_URL, {
            headers: {
                "X-Api-Key": API_KEY
            }
        })
        const responceAll = await resp.json()
        all.push(responceAll.films)
        createFulterData(responceAll.films, 'Топ популярных фильмов', true, true)
        return
    }
    const API_KEY = 'd4121654-de25-4589-9d26-0694e00a8ae8'
    const API_URL = `https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=${page}`
    const resp = await fetch(API_URL, {
        headers: {
            "X-Api-Key": API_KEY
        }
    })
    const responceAll = await resp.json()
    all.push(responceAll.films)
    createFulterData(responceAll.films, 'Топ популярных фильмов', true, true)

}