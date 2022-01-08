import { gsap, SplitText } from "../../vendor/gsap-shockingly-green/src/all";

gsap.registerPlugin(SplitText);

const $title = document.querySelector('.js-texts-animation-7')
const totalDuration = 2

const $SplitTitle = new SplitText($title);
const $words = $SplitTitle.words
const $chars = $SplitTitle.chars

$words.reverse()

const  duration = totalDuration / $words.length
const stagger = duration / 1.5

const mastertl = gsap.timeline({
  repeat: -1,
  yoyo: true,
  repeatDelay: 2
});

gsap.set($chars, {scale: 0, transformOrigin: 'top center'})

mastertl.to($words, {
  duration: duration,
  stagger: stagger,
})

$words.forEach($word => {
  const charsTl = gsap.timeline()
  mastertl.add(charsTl)

  $word.childNodes.forEach(node => {
    charsTl.to(node, {scale: 1, duration: duration, force3d: true}, -duration)
  })
})


