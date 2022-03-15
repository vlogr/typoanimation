import gsap from "../vendor/gsap-shockingly-green/src/gsap-core";

function generateTextShadow(options) {

    const colorArr = gsap.utils.splitColor(options.color)

    if(colorArr.length < 4) {
        colorArr.push(options.opacity)
    }

    const color = colorArr.toString()

    return `${options.offsetX}px ${options.offsetY}px ${options.blur}px rgba(${color})`
}


export default generateTextShadow
