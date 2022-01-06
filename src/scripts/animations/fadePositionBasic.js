import { gsap, SplitText } from "../vendor/gsap-shockingly-green/src/all";

gsap.registerPlugin(SplitText);

const $title = document.querySelector('.js-texts-animation-2')

const $SplitTitle = new SplitText($title);
const $words = $SplitTitle.words

$words.reverse()

const tl = gsap.timeline({
  repeat: -1,
  yoyo: true,
  repeatDelay: 2
});

gsap.set($words, {autoAlpha: 0, y: 100})
      
tl.to($words, {
  autoAlpha: 1,
  y: 0,
  duration: 0.5,
  stagger: 0.2,
})