import {
    gsap,
    SplitText
} from "../../vendor/gsap-shockingly-green/src/all";

gsap.registerPlugin(SplitText);

const $title = document.querySelector('.js-texts-animation-3')
const totalDuration = 1

const $SplitTitle = new SplitText($title);
const $words = $SplitTitle.words

const duration = totalDuration / $words.length
const stagger = duration / 2

const tl = gsap.timeline({
    repeat: -1,
    yoyo: true,
    repeatDelay: 2
});

gsap.set($words, {
    visibility: 'hidden',
    y: 300,
    
})

tl.to($words, {
    visibility: 'visible',
    y: 0,
    duration: duration,
    stagger: {
        from: 'end',
        each: stagger
    },
}).from($words, {
    rotation: 0.01,
    textShadow: '0px 8px 8px #fff, 0px -6px 5px #fff',
    scaleY: 1.3,
    duration: duration,
    stagger: {
        from: 'end',
        each: stagger
    },
},0.02)
