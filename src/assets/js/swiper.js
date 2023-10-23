export function createSwiper(slider, prev, next) {
    const swiper = new Swiper('.' + slider, {
        navigation: {
            nextEl: '.' + next,
            prevEl: '.' + prev
        },
        slidesPerView: 3,
        spaceBetween: 30,
        autoHeight: true,

        breakpoints: {
            1470: {
                slidesPerView: 6
            },
            1060: {
                slidesPerView: 5
            },
            440: {
                slidesPerView: 4
            }
        }
    })
}
