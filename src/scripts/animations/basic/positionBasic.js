

/* This is importing the `gsap` and `SplitText` plugins from the `gsap-shockingly-green`
library. */
import {
    gsap,
    SplitText
} from "../../vendor/gsap-shockingly-green/src/all";

/* This is registering the SplitText plugin. */
gsap.registerPlugin(SplitText);

/* This is importing the `switchPositions` function from the `components` folder. */
import switchPositions from '../../components/switchPositions'



/* This is creating a variable called `$title` that is storing the value of the element with the
`class` of `js-texts-animation-1`. */
const $title = document.querySelector('.js-texts-animation-3')

/* This is creating a timeline for each word in the text. */
positionBasic($title)



/**
 * This function takes an array of text elements, a total duration, and an object of options. It sets
 * the opacity of the text to 0, creates a timeline for each word, and sets the opacity of the words to
 * 1
 * @param $texts The element that contains the text.
 * @param totalDuration - The total duration of the animation.
 * @param optionsParam - {eachDuration, stagger, repeat, yoyo, repeatDelay}
 */

function positionBasic($texts, totalDuration, optionsParam) {

    /* This is creating a new instance of the SplitText plugin. */
    const $SplitTitle = new SplitText($texts);
    /* Creating a new array of the words in the text. */
    const $words = $SplitTitle.words

    /* This is creating a default value for the parameters. */
    const defaultTotalDuration = totalDuration || 1 ,
          defaultEachDuration = defaultTotalDuration /$words.length,
          defaultStagger = defaultEachDuration / 2

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



    /* This is creating a variable called `position` that is storing the value of the object returned
    by the `switchPositions` function. */
    /**@readme please have look at switchPositions function from the `components` folder. there you will get idea about animations direction */
    let position = switchPositions('rightBottom', 300)


    /* This is setting the visibility of the words to hidden and setting the y and x position of the
    words to the value of the object returned by the `switchPositions` function. */
    gsap.set($words, {
        visibility: 'hidden',
        y: position.y,
        x: position.x
    })

    /* This is setting the visibility of the words to visible, setting the y and x position of the
    words to 0, setting the duration of the animation to the value of the `eachDuration` parameter,
    setting the stagger to start from the end of the animation, and setting the stagger to the value
    of
    the `stagger` parameter. */
    tl.to($words, {
        visibility: 'visible',
        y: 0,
        x: 0,
        /* This is setting the duration of the animation for each word. */
        duration: options.eachDuration,

        /* This is setting the stagger to start from the end of the animation. */
        stagger: {
            from: 'end', /** start center end */
            each: options.stagger
        },
    }).from($words, { // this is for motion blur'
        rotation: 0.01,
        textShadow: '0px 8px 8px #fff, 0px -6px 5px #fff',
        scaleY: 1.3,
        /* This is setting the duration of the animation for each word. */
        duration: options.eachDuration,
        /* This is setting the stagger to start from the end of the animation. */
        stagger: {
            from: 'end', /** start center end */
            each:  options.stagger
        },
    },0.02)
}

