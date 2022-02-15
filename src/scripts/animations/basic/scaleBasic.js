
/* This is importing the `gsap` and `SplitText` plugins from the `gsap-shockingly-green`
library. */
import {
    gsap,
    SplitText,
    CustomEase
} from "../../vendor/gsap-shockingly-green/src/all";

/* This is registering the plugin with the `gsap` library. */
gsap.registerPlugin(SplitText, CustomEase);



/* This is creating a variable called `$title` that is storing the value of the element with the
`class` of `js-texts-animation-1`. */
const $title = document.querySelector('.js-texts-animation-7')

/* This is creating a timeline for each word in the text. */
scaleBasic($title)



/**
 * This function takes an array of text elements, a total duration, and an object of options. It sets
 * the opacity of the text to 0, creates a timeline for each word, and sets the opacity of the words to
 * 1
 * @param $texts The element that contains the text.
 * @param totalDuration - The total duration of the animation.
 * @param optionsParam - {eachDuration, stagger, repeat, yoyo, repeatDelay}
 */

function scaleBasic($texts, totalDuration, optionsParam) {

    /* This is creating a new instance of the SplitText plugin. */
    const $SplitTitle = new SplitText($texts);

    /* This is creating a variable called `$words` that is storing the value of the element with the
    `class` of `words`. It is also creating a variable called `$chars` that is storing the value of
    the element with the
    `class` of `chars`. */
    const $words = $SplitTitle.words
    const $chars = $SplitTitle.chars

    /* This is reversing the order of the words and characters. */
    $words.reverse()
    $chars.reverse()

    /* This is creating a default value for the parameters. */
    const defaultTotalDuration = totalDuration || 1.2 ,
          defaultEachDuration = defaultTotalDuration /$words.length,
          defaultStagger = defaultEachDuration / 1.9

    /* Creating a new object called `options` that will be used to store the values of the parameters. */
    let options = {}

    /* This is creating a new object called `defaults` that will be used to store the values of the
    parameters. */
    const defaults = {
        totalDuration: defaultTotalDuration,
        eachDuration: defaultEachDuration,
        stagger: defaultStagger,
        repeat: -1,
        yoyo: true,
        repeatDelay: 2
    }

    for (let prop in defaults) {
        options[prop] = defaults[prop]
    }

    for (prop in optionsParam) {
        options[prop] = optionsParam[prop]
    }


    /* This is creating a new instance of the TimelineMax plugin. */
    const mastertl = gsap.timeline({
         /* This is setting the timeline to repeat the animation. */
         repeat: options.repeat,

         /* This is setting where true causes the tween to go back and forth, alternating backward and forward on each repeat. */
         yoyo: options.yoyo,

         /* This is setting the delay between each repeat. */
         repeatDelay: options.repeatDelay
    });

    /* This is setting the scale of the characters to 0 and the transform origin to the top center. */
    gsap.set($chars, {
        scale: 0,
        transformOrigin: 'top center'
    })

    /* This is setting the duration of the animation for each word. */
    mastertl.to($words, {
        duration:  options.eachDuration,
        /* Setting the stagger of the timeline. */
        stagger: options.stagger,
    })

    /* This is creating a timeline for each word in the text. */
    $words.forEach($word => {
        const charsTl = gsap.timeline()
        /* This is setting the delay of the timeline for each word. */
        charsTl._delay = -options.stagger
        /* This is adding the timeline to the master timeline. */
        mastertl.add(charsTl)

        /* This is looping through each child node of each word and checking if it is an element or a
        document. If it is an element or a document, it will add a timeline to the character and set
        the
        scale to 1. */
        $word.childNodes.forEach(node => {
            if (node instanceof Element ||
                node instanceof HTMLDocument) {
                charsTl.to(node, {
                    scale: 1,
                    duration: options.eachDuration,
                    /* This is setting the easing of the timeline to a sine curve. */
                    ease: "sine.out",
                }, 0)

            }
        })
    })

}


