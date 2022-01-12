import {
    gsap,
    SplitText,
    CustomEase
} from "../../vendor/gsap-shockingly-green/src/all";

gsap.registerPlugin(SplitText, CustomEase);

const $title = document.querySelector('.js-texts-animation-5')
const totalDuration = 1.5

const $SplitTitle = new SplitText($title);
const $words = $SplitTitle.words
$words.forEach(($word, i) => gsap.set($word, {zIndex: i}))

$words.reverse()


const duration = totalDuration / $words.length
const stagger = duration / 2

const tl = gsap.timeline({
    repeat: -1,
    yoyo: true,
    repeatDelay: 1
});

gsap.set($words, {
    y: 100,
    scale: 0,
    textShadow: '8px -8px 15px #fff, 5px 5px 15px #fff',
    rotate: 180,
})

tl.to($words, {
    keyframes: [
        {
            y: 0,
            duration: duration,
            ease: CustomEase.create("custom", "M0,0 C0.482,0.174 0.478,0.136 0.7,0.3 0.856,0.462 0.898,0.52 1,1 "),
        },
        {
            rotation: 0,
            scale: 1,
            textShadow: '0px 0px 0px #fff, 0px 0px 0px #fff',
            duration: duration * 3,
            delay: -duration * 3,
        },
    ],
    stagger: stagger,
    
})
