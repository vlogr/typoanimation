import {
    gsap,
    SplitText
} from "../vendor/gsap-shockingly-green/src/all";

gsap.registerPlugin(SplitText);

const $title = document.querySelector('.js-texts-animation-8')
const totalDuration = 0.8
const delays = [.25, .50]
const shadows =
    `10px 10px 40px #fff, 10px 10px 40px #fff, 10px 10px 30px #fff,  5px 5px 30px #fff, 5px 5px 60px #fff,  0px 0px 20px #fff,   0px 0px 40px #fff,  0px 0px 40px #fff, 3px 3px 0px #fff, 5px 5px 0px #fff , 8px 8px 0px #fff , 12px 12px 0px #fff , 16px 16px 0px #fff , 20px 20px 0px #fff`

const $SplitTitle = new SplitText($title);
const $words = $SplitTitle.words

// $words.reverse()

const duration = totalDuration / $words.length
const stagger = duration / 1

const tl = gsap.timeline({
    repeat: -1,
    repeatDelay: 2
});

gsap.set($words, {
    visibility: 'hidden'
})

tl.to($words, {
        visibility: 'visible',
        duration: 0,
        stagger: 0.28,
    }, 0)
    .from($words, {
        x: 100,
        y: 120,
        stagger: 0.28,
        duration: 0.1

    }, 0)
    .from($words, {
        textShadow: shadows,
        stagger: 0.28,
        duration: 0.7
    }, 0.01)
