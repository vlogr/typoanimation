import { gsap, SplitText } from "../../vendor/gsap-shockingly-green/src/all";

gsap.registerPlugin(SplitText);

const $title = document.querySelector('.js-texts-animation-5')
const totalDuration = 3

const $SplitTitle = new SplitText($title);
const $words = $SplitTitle.words

$words.reverse()

const  duration = totalDuration / $words.length
const stagger = duration / 3

const tl = gsap.timeline({
  repeat: -1,
  yoyo: true,
  repeatDelay: 2
});

gsap.set($words, {visibility: 'hidden', y: 120, scale: 0, rotate: 200, })
      
tl.to($words, {
  visibility: 'visible',
  y: 0,
  scale: 1,

  duration: duration,
  stagger: stagger,
}).to($words, {
  rotate: 0,

  duration: duration,
  stagger: duration / 3.2,
},0)