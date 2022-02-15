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
const $title = document.querySelector('.js-texts-animation-6')

/* This is creating a timeline for each word in the text. */
positionScaleBasic($title)



/**
 * This function takes an array of text elements, a total duration, and an object of options. It sets
 * the opacity of the text to 0, creates a timeline for each word, and sets the opacity of the words to
 * 1
 * @param $texts The element that contains the text.
 * @param totalDuration - The total duration of the animation.
 * @param optionsParam - {eachDuration, stagger, repeat, yoyo, repeatDelay}
 */

function positionScaleBasic($texts, totalDuration, optionsParam) {

    /* This is creating a new instance of the SplitText plugin. */
    const $SplitTitle = new SplitText($texts);
    /* Creating a new array of the words in the text. */
    const $words = $SplitTitle.words

    $words.reverse()

    /* This is creating a default value for the parameters. */
    const defaultTotalDuration = totalDuration || 2 ,
          defaultEachDuration = defaultTotalDuration /$words.length,
          defaultStagger = defaultEachDuration / 3

    /* Creating a new object called `options` that will be used to store the values of the parameters. */
    let options = {}

    /* This is creating a new object called `defaults` that will be used to store the values of the
    parameters. */
    const defaults = {
        direction: 'bottom',
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


    /* This is creating a timeline for each word. */
    const tl = gsap.timeline({
        /* This is setting the timeline to repeat the animation. */
        repeat: options.repeat,

        /* This is setting where true causes the tween to go back and forth, alternating backward and forward on each repeat. */
        yoyo: options.yoyo,

        /* This is setting the delay between each repeat. */
        repeatDelay: options.repeatDelay
    });



    /* This is setting the visibility of the words to hidden, the transformOrigin to center left, the
    scale to 0, and the textShadow to -2px 2px 4px #fff, -2px -2px 3px #fff. */
    gsap.set($words, {
        visibility: 'hidden',
        transformOrigin: 'center left',
        scale: 0,
        textShadow: '-2px 2px 4px #fff, -2px -2px 3px #fff',
    })

    /* This is setting the visibility of the words to visible, the transformOrigin to center left, the
    scale to 1, and the textShadow to 0px 0px 0px #fff, 0px 0px 0px #fff. */
    tl.to($words, {
        visibility: 'visible',
        rotate: 0,
        scale: 1,
        textShadow: '0px 0px 0px #fff, 0px 0px 0px #fff',
        duration: options.eachDuration,
        stagger: options.stagger,
        ease: CustomEase.create("custom", "M0,0 C0.482,0.174 0.478,0.136 0.7,0.3 0.856,0.462 0.898,0.52 1,1 "),
    })

}

