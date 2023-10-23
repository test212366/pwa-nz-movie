export function rotate(e) {
    const halfHeight = this.offsetHeight / 2
    this.style.transform =  `rotateX(`+(e.offsetY - halfHeight) / 5 +`deg) rotateY(` + - (e.offsetX - halfHeight) / 5 + 'deg)'
}
export function remove(e) {
    this.style.transition = 'all 0.4s ease'
    this.style.transform =  'rotateX(0) rotateY(0)'
}