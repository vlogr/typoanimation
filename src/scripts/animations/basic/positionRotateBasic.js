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
const $title = document.querySelector('.js-texts-animation-4')

/* This is creating a timeline for each word in the text. */
positionRotateBasic($title)



/**
 * This function takes an array of text elements, a total duration, and an object of options. It sets
 * the opacity of the text to 0, creates a timeline for each word, and sets the opacity of the words to
 * 1
 * @param $texts The element that contains the text.
 * @param totalDuration - The total duration of the animation.
 * @param optionsParam - {eachDuration, stagger, repeat, yoyo, repeatDelay}
 */

function positionRotateBasic($texts, totalDuration, optionsParam) {

    /* This is creating a new instance of the SplitText plugin. */
    const $SplitTitle = new SplitText($texts);
    /* Creating a new array of the words in the text. */
    const $words = $SplitTitle.words
    const $lines = $SplitTitle.lines

    /* This is creating a default value for the parameters. */
    const defaultTotalDuration = totalDuration || 0.9 ,
          /* This is dividing the total duration by the number of lines. */
          defaultEachDuration = defaultTotalDuration /$lines.length,
          defaultStagger = defaultEachDuration / 5

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
    let position = switchPositions('bottom', 300)


    /* This is setting the z-index of each word to the index of the word in the array. */
    $words.forEach(($word, i) => gsap.set($word, {zIndex: i}))

    /* This is setting the visibility of the words to hidden, the y position of the words to the value
    of the object returned by the `switchPositions` function, the x position of the words to the
    value of the object returned by the `switchPositions` function, the rotation of the words to
    -130, the text shadow of the words to `-2px 6px 6px #fff, 2px -4px 6px #fff`, and the scaleY of
    the words to 1.3. */
    gsap.set($words, {
        visibility: 'hidden',
        y: position.y,
        x: position.x,
        rotation: -130,
        textShadow: '-2px 6px 6px #fff, 2px -4px 6px #fff',
        scaleY: 1.3,
    })

    tl.to($words, {
       /* This is creating a keyframe animation for each word. */
        keyframes:[
            /* This is setting the visibility of the words to visible, and the duration of the
            animation to 0. */
            {
                visibility: 'visible',
                duration: 0
            },
            /* This is setting the y position of the words to 0, the x position of the words to 0, the
            rotation of the words to 0, the duration of the animation to the value of the
            `eachDuration` parameter, and the delay between each word to 0. */
            {
                y: 0,
                x: 0,
                rotation: 0,

                /* This is setting the duration of the animation to the value of the `eachDuration`
                parameter. */
                duration: options.eachDuration,
                /* This is setting the delay between each word. */
                delay: 0
            },
            /* This is setting the text shadow of the words to `0px 0px 0px #fff, 0px -0px 0px #fff`,
            and
            the scaleY of the words to 1. */
            {
                textShadow: '0px 0px 0px #fff, 0px -0px 0px #fff',
                scaleY: 1,
                /* This is setting the duration of the animation to the value of the `eachDuration`
                parameter
                multiplied by 2. */
                duration: options.eachDuration * 2,
                /* This is setting the delay between each word. */
                delay: - options.eachDuration - 0.1
            }
        ],

        /* This is setting the stagger to start at the end of the animation. */
        stagger: {
            from: 'end', /** @options 'start' 'center' 'end' */
            each: options.stagger
        },
    })
}

