export const preloader = () => {
    setTimeout(function () {
        const preloader = document.querySelector('.preloaderI')
        preloader.classList.add('loaded_hiding')
        setTimeout(() => {
            preloader.classList.add('loaded')
        },300)
    }, 300)
}