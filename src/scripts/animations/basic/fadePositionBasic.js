import { gsap, SplitText } from "../../vendor/gsap-shockingly-green/src/all";

gsap.registerPlugin(SplitText);

const $title = document.querySelector('.js-texts-animation-2')
const totalDuration = 1.5

const $SplitTitle = new SplitText($title);
const $words = $SplitTitle.words

$words.reverse()

const  duration = totalDuration / $words.length
const stagger = duration / 2

const tl = gsap.timeline({
  repeat: -1,
  yoyo: true,
  repeatDelay: 2
});

gsap.set($words, {autoAlpha: 0, y: 100})
      
tl.to($words, {
  autoAlpha: 1,
  y: 0,
  duration: duration,
  stagger: stagger,
})