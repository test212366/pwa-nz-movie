import {preparingDataFultersHeader} from "./fetch";

const allgenres = [
    {
        "id": 1750,
        "genre": "Аниме"
    },
    {
        "id": 22,
        "genre": "Биография"
    },
    {
        "id": 3,
        "genre": "Боевики"
    },
    {
        "id": 13,
        "genre": "Вестерн"
    },
    {
        "id": 19,
        "genre": "Военный"
    },
    {
        "id": 17,
        "genre": "Детективы"
    },
    {
        "id": 456,
        "genre": "Детский"
    },
    {
        "id": 20,
        "genre": "Для взрослых"
    },
    {
        "id": 12,
        "genre": "Документальный"
    },
    {
        "id": 8,
        "genre": "Драма"
    },
    {
        "id": 27,
        "genre": "Игра"
    },
    {
        "id": 23,
        "genre": "История"
    },
    {
        "id": 6,
        "genre": "Комедии"
    },
    {
        "id": 1747,
        "genre": "Концерт"
    },
    {
        "id": 15,
        "genre": "Короткометражки"
    },
    {
        "id": 16,
        "genre": "Криминал"
    },
    {
        "id": 7,
        "genre": "Мелодрамы"
    },
    {
        "id": 21,
        "genre": "Музыка"
    },
    {
        "id": 14,
        "genre": "Мультфильмы"
    },
    {
        "id": 9,
        "genre": "Мюзикл"
    },
    {
        "id": 28,
        "genre": "Новости"
    },
    {
        "id": 10,
        "genre": "Приключения"
    },
    {
        "id": 25,
        "genre": "Реальное ТВ"
    },
    {
        "id": 11,
        "genre": "Семейный"
    },
    {
        "id": 24,
        "genre": "Спорт"
    },
    {
        "id": 26,
        "genre": "Ток-шоу"
    },
    {
        "id": 4,
        "genre": "Триллер"
    },
    {
        "id": 1,
        "genre": "Ужасы"
    },
    {
        "id": 2,
        "genre": "Фантастика"
    },
    {
        "id": 18,
        "genre": "Фильм-нуар"
    },
    {
        "id": 5,
        "genre": "Фэнтези"
    },
    {
        "id": 1751,
        "genre": "Церемония"
    }
]
export let fulterItem
let currentpage = 1
export function preparingDataFulter(fulter) {
    if(fulter) {
        fulterItem = fulter
        allgenres.forEach(fulterItem => {
            if (fulterItem.genre == fulter) {
                preparingDataFultersHeader(fulterItem.id, fulterItem.genre)
            }
        })
    } else {
        allgenres.forEach(fulterI => {
            if (fulterI.genre == fulterItem) {
                currentpage++
                preparingDataFultersHeader(fulterI.id, fulterI.genre, currentpage, false)
            }
        })
    }
}
export function createFulterData(filmsArray, name, item = true, itemF = false) {
    const results = document.querySelector('.results__fulter-wrapper')
    if(item) results.innerHTML = ''
    results.insertAdjacentHTML('beforeend', `
                <div class="results__fulter-title">${name}</div>
                <div class="results__fulter-movies"></div>
    `)
    const resultsMovies = document.querySelector('.results__fulter-movies')
    filmsArray.forEach(film => {
        let countries = '', genres = ''
        film.genres.forEach(genre => genres += `${genre.genre}, `)
        film.countries.forEach(item => countries += `${item.country}, `)
        resultsMovies.insertAdjacentHTML('beforeend', `
                         <div class="slide small smallMargin">
                            <div class="overlay">
                                <div class="desc">
                                    <div class="raiting">${film.rating}</div>
                                    <div class="year">${film.year}</div>
                                    <div class="countries">${countries}</div>
                                    <div class="filters">${genres}</div>
                                    <div class="d-show"></div>
                                </div>
                            </div>
                            <img class="preview" width="200px" height="300px" src=${film.posterUrlPreview} alt=${film.nameEn}>
                            <div class="slider__title">${film.nameRu}</div>
                            <div class="see__trailer">Смотреть трейлер</div>
                        </div>
        `)
        if (film.rating > 7.0) {
            const raiting = resultsMovies.querySelector('.raiting')
            raiting.style.borderBottom = '2px solid green'
            return
        } else if(film.rating <= 7.0 && film.rating >= 4.0) {
            const raiting = resultsMovies.querySelector('.raiting')
            raiting.style.borderBottom = '2px solid yellow'
            return
        } else if (film.rating <= 4.0) {
            const raiting = resultsMovies.querySelector('.raiting')
            raiting.style.borderBottom = '2px solid red'
            return
        }
    })
    if(itemF) {
        resultsMovies.insertAdjacentHTML('beforeend', `
                        <div class="slide">
                            <div class="see-morePopular">Посмотреть всё</div>
                        </div>
    `)
    } else {
        resultsMovies.insertAdjacentHTML('beforeend', `
                        <div class="slide">
                            <div class="see-moreFulters">Посмотреть всё</div>
                        </div>
    `)
    }

    document.body.style.overflow = 'hidden'
    const $results__fulter = document.querySelector('.results__fulter')
    $results__fulter.classList.add('activeFulter')
}
export function closeFulters() {
    fulterItem = ''
    document.body.style.overflow = 'visible'
    const $results__fulter = document.querySelector('.results__fulter')
    $results__fulter.classList.remove('activeFulter')
}