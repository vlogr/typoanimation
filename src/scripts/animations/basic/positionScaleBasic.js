import {
    gsap,
    SplitText,
    CustomEase
} from "../../vendor/gsap-shockingly-green/src/all";

gsap.registerPlugin(SplitText, CustomEase);


const $title = document.querySelector('.js-texts-animation-6')
const totalDuration = 2

const $SplitTitle = new SplitText($title);
const $words = $SplitTitle.words

$words.reverse()

const duration = totalDuration / $words.length
const stagger = duration / 3

const tl = gsap.timeline({
    repeat: -1,
    yoyo: true,
    repeatDelay: 2
});

gsap.set($words, {
    visibility: 'hidden',
    transformOrigin: 'center left',
    scale: 0,
    textShadow: '-2px 2px 4px #fff, -2px -2px 3px #fff',
})

tl.to($words, {
    visibility: 'visible',
    rotate: 0,
    scale: 1,
    textShadow: '0px 0px 0px #fff, 0px 0px 0px #fff',
    duration: duration,
    stagger: stagger,
    ease: CustomEase.create("custom", "M0,0 C0.482,0.174 0.478,0.136 0.7,0.3 0.856,0.462 0.898,0.52 1,1 "),
})
