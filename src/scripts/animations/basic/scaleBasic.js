import {
    gsap,
    SplitText,
} from "../../vendor/gsap-shockingly-green/src/all";

gsap.registerPlugin(SplitText);

const $title = document.querySelector('.js-texts-animation-7')
const totalDuration = 1.2

const $SplitTitle = new SplitText($title);
const $words = $SplitTitle.words
const $chars = $SplitTitle.chars

$words.reverse()
$chars.reverse()

const duration = totalDuration / $words.length
const stagger = duration / 1.9

const mastertl = gsap.timeline({
    repeat: -1,
    yoyo: true,
    repeatDelay: 1
});

gsap.set($chars, {
    scale: 0,
    transformOrigin: 'top center'
})

mastertl.to($words, {
    duration: duration,
    stagger: stagger,
})

$words.forEach($word => {
    const charsTl = gsap.timeline()
    charsTl._delay = -stagger
    mastertl.add(charsTl)

    $word.childNodes.forEach(node => {
        if (node instanceof Element ||
            node instanceof HTMLDocument) {
            charsTl.to(node, {
                scale: 1,
                duration: duration,
                ease: "sine.out",
            }, 0)

        }
    })
})
