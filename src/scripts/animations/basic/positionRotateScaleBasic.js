import {
    gsap,
    SplitText,
    CustomEase
} from "../../vendor/gsap-shockingly-green/src/all";

gsap.registerPlugin(SplitText, CustomEase);

const $title = document.querySelector('.js-texts-animation-5')
const totalDuration = 3.5

const $SplitTitle = new SplitText($title);
const $words = $SplitTitle.words
$words.forEach(($word, i) => gsap.set($word, {zIndex: i}))

$words.reverse()


const duration = totalDuration / $words.length
const stagger = duration / 4

const tl = gsap.timeline({
    repeat: -1,
    yoyo: true,
    repeatDelay: 1
});

gsap.set($words, {
    visibility: 'hidden',
    y: 120,
    scale: 0,
    rotate: 280,
})

tl.to($words, {
    keyframes: [{
            visibility: 'visible',
            duration: 0
        },
        {
            rotation: 0,
            scale: 1,
            duration: duration * 1.2,
            delay: 0,
            ease: CustomEase.create("custom", "M0,0 C0,0 0.192,0.2 0.512,0.518 0.948,0.716 0.964,0.844 1,1 ")
        },
        {
            y: 0,
            duration: duration,
            delay: 0,
            delay: -duration / 1.1,
            ease: CustomEase.create("custom", "M0,0 C0,0 0.529,0.385 0.586,0.59 0.685,0.951 0.826,0.95 1,1 ")
        },
    ],
    
    stagger: stagger,
})
