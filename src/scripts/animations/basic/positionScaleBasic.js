import { gsap, SplitText } from "../../vendor/gsap-shockingly-green/src/all";

gsap.registerPlugin(SplitText);

const $title = document.querySelector('.js-texts-animation-6')
const totalDuration = 2

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

gsap.set($words, {visibility: 'hidden', transformOrigin: 'center left', scale: 0,})
      
tl.to($words, {
  visibility: 'visible',
  rotate: 0,
  scale: 1,
  duration: duration,
  stagger: stagger,
})