/* This is importing the `gsap` and `SplitText` plugins from the `gsap-shockingly-green`
library. */
import {
    gsap,
    SplitText,
    RoughEase,
    CustomEase
} from "../../vendor/gsap-shockingly-green/src/all";

/* This is registering the SplitText plugin. */
gsap.registerPlugin(SplitText, RoughEase, CustomEase);

/* This is importing the `switchPositions` function from the `components` folder. */
import switchPositions from '../../components/switchPositions'

import generateTextShadow from '../../components/generateTextShadow'


/* This is creating a variable called `$title` that is storing the value of the element with the
`class` of `js-texts-animation-1`. */
const $title = document.querySelector('.js-texts-animation-2-positionFlickering')

/* This is creating a timeline for each word in the text. */
positionFickering($title, {
    /* This is setting the in time duration of the animation for each word. */
    inDuration: 1,
    /* This is setting the out time duration of the animation for each word. */
    outDuration: 1,

    type: 'chars',

    styles: {
        textShadow: {
            color: '#fa22ff',
            opacity: 1,
            offsetX: 10,
            offsetY: -10,
            blur: 5
        }
    }
})



/**
 * This function takes an array of text elements, a total duration, and an object of options. It sets
 * the opacity of the text to 0, creates a timeline for each word, and sets the opacity of the words to
 * 1
 * @param $texts The element that contains the text.
 * @param optionsParam - {eachDuration, stagger, repeat, yoyo, repeatDelay}
 */

function positionFickering($texts, optionsParam) {
    if (!$texts) return

    /* This is creating a new instance of the SplitText plugin. */
    const $SplitTitle = new SplitText($texts);
    /* Creating a new array of the words in the text. */
    let $splitTexts
    const $splitLines = $SplitTitle.lines

    let options = {}

    /* Creating a new object called `options` that will be used to store the values of the parameters. */

    /* This is creating a new object called `defaults` that will be used to store the values of the
    parameters. */
    const defaults = {
        direction: 'bottom',
        inDuration: 1,
        outDuration: 1,
        eachDuration: function () {
            return this.inDuration / $splitTexts.length
        },
        stagger: function () {
            return 0
        },
        type: 'chars',
        repeat: -1,
        yoyo: true,
        repeatDelay: 0.1,
        styles: {
            textShadow: {
                color: 'green',
                opacity: 0,
                offsetX: 0,
                offsetY: 0,
                blur: 0
            }
        }
    }

    for (let prop in defaults) {
        $splitLines
        options[prop] = defaults[prop]
    }

    for (let prop in optionsParam) {
        options[prop] = optionsParam[prop]
    }


    /* This is creating a timeline for each word. */
    const tl = gsap.timeline({
        /* This is setting the timeline to repeat the animation. */
        repeat: options.repeat,

        /* This is setting where true causes the tween to go back and forth, alternating backward and forward on each repeat. */
        yoyo: options.yoyo,

        /* This is setting the delay between each repeat. */
        repeatDelay: options.repeatDelay,
        delay: 1,

        /* This is setting the out time duration of the animation for each word. */
        onRepeat: () => {
            tl.duration(options.outDuration);
        },

        /* This is setting the in time duration of the animation for each word. */
        onStart: () => {
            tl.duration(options.inDuration);
        },

    });


    const textShadow = generateTextShadow(options.styles.textShadow)


    if (options.type == 'words') {
        $splitTexts = $SplitTitle.words
    } else if (options.type == 'lines') {
        $splitTexts = $SplitTitle.lines
    } else if (options.type == 'chars') {
        $splitTexts = $SplitTitle.chars
    }

    let position = switchPositions(options.direction, 500)


    /* This is setting the visibility of the words to hidden and setting the y and x position of the
    words to the value of the object returned by the `switchPositions` function. */
    gsap.set($splitTexts, {
        opacity: 0,
        y: position.y,
        x: position.x,
        // textShadow: '0px 0px 0px #fff, 0px 0px 0px #fff, '+ textShadow,
    })

    console.log(options.eachDuration());

   
    /* This is setting the opacity of the words to 1 and the position of the words to 0. */
    tl
        .to($splitTexts, {
            y: 0,
            x: 0,
            duration: options.eachDuration(),
            ease: CustomEase.create("custom", "M0,0,C0,0,0.038,0.256,0.066,0.424,0.076,0.486,0.145,0.438,0.158,0.5,0.168,0.548,0.112,0.654,0.125,0.702,0.135,0.744,0.212,0.697,0.226,0.738,0.236,0.771,0.172,0.861,0.186,0.893,0.197,0.919,0.267,0.89,0.282,0.914,0.293,0.933,0.241,0.99,0.256,1.007,0.264,1.016,0.271,1.021,0.281,1.028,0.29,1.034,0.297,1.038,0.308,1.042,0.319,1.046,0.326,1.048,0.338,1.05,0.349,1.052,0.357,1.053,0.369,1.052,0.389,1.051,0.402,1.05,0.423,1.047,0.46,1.039,0.488,1.033,0.518,1.027,0.538,1.022,0.56,1.046,0.586,1.042,0.618,1.037,0.636,1.021,0.668,1.018,0.718,1.015,0.746,0.999,0.796,0.998,0.876,0.997,1,1,1,1"),
            stagger: {
                from: "random",
                grid: [0, 0],
                each:  options.eachDuration() / 10   
            }
        })
        .to($splitTexts, {
            opacity: 1,

            duration: options.eachDuration(),

            ease: "rough({ template: strong.inOut, strength: 50, points: 200, taper: both, randomize: false, clamp: false})",

            stagger: {
                from: "random",
                grid: [0, 0],
                each: options.eachDuration() / 10  
            }
        }, - options.eachDuration() / 2  )
}
