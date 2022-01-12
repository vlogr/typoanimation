import {
    gsap,
    SplitText
} from "../../vendor/gsap-shockingly-green/src/all";
import distributeByPosition from '../../util/distributeByPosition'


gsap.registerPlugin(SplitText);

const $title = document.querySelector('.js-texts-animation-4')
const totalDuration = 1
const $SplitTitle = new SplitText($title, {linesClass: 'js-texts-animation-4-line', wordsClass: "words"});
const $words = $SplitTitle.words
const $lines = $SplitTitle.lines

const duration = totalDuration / $lines.length
const stagger = duration * 1

const masterTl = gsap.timeline({
    repeat: -1,
    yoyo: true,
    repeatDelay: 1
});

$words.forEach(($word, i) => gsap.set($word, {zIndex: i}))

gsap.set($words, {
    visibility: 'hidden',
    y: 300,
    rotation: -130,
    textShadow: '-2px 2px 4px #fff, -2px -2px 3px #fff',
    scaleY: 1.3,
})

masterTl.to($words, {
    visibility: 'visible',
    y: 0,
    rotation: 0,
    textShadow: '0px 0px 0px #fff, 0px -0px 0px #fff',
    scaleY: 1, 
    duration: duration,
    stagger: distributeByPosition({
        amount: stagger,
        axis:"y",
        from: 'end'
      }),
})