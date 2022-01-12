import {
    gsap,
    SplitText
} from "../../vendor/gsap-shockingly-green/src/all";

gsap.registerPlugin(SplitText);

const $title = document.querySelector('.js-texts-animation-1')
const totalDuration = 1


const $SplitTitle = new SplitText($title);
const $words = $SplitTitle.words

const duration = totalDuration / $words.length
const stagger = duration

const tl = gsap.timeline({
    repeat: -1,
    yoyo: true,
    repeatDelay: 2
});

gsap.set($words, {
    autoAlpha: 0
})

tl.to($words, {
    autoAlpha: 1,
    duration: duration,
    stagger: {
        from: 'end',
        each: stagger
    },
})
