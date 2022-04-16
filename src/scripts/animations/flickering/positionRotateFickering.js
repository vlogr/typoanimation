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
const $title = document.querySelector('.js-texts-animation-2-positionRotateFlickering')

/* This is creating a timeline for each word in the text. */
positionRotateFickering($title, {
    /* This is setting the in time duration of the animation for each word. */
    inDuration: 4,
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

function positionRotateFickering($texts, optionsParam) {
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
        repeatDelay: 2,
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

        /* This is setting the delay between each repeat. */
        repeatDelay: options.repeatDelay,
        delay: 1,

    });


    const textShadow = generateTextShadow(options.styles.textShadow)


    if (options.type == 'words') {
        $splitTexts = $SplitTitle.words
    } else if (options.type == 'lines') {
        $splitTexts = $SplitTitle.lines
    } else if (options.type == 'chars') {
        $splitTexts = $SplitTitle.chars
    }

    let xPositionDataArr = []
    let yPositionDataArr = []

    const dataArrX = [
        [0, 20, 0, -30, 0, 20, -200, 200, 100, -20,  0],
        [0, 0, 0, 100, 0, 20, -200, 200, 100, -20,  0],
    ]

    const dataArrY= [
        [-200, -150, 0],
        [200 , 20, 0],
        [250, 200, -20, 0],
        [-200, 20, 0],
        [-150, -100, 10, 0], 
        [130, 100, 300, 0],
        [-400, -300, 50, 0],
        [280, -340, 10, 0],
        [-300, 50, -10, 0],
        [-250, -200 , -10, 0],
        [50, 500, 0],
    ]

    if ($splitTexts.length > dataArrX.length) {
        const retio = Math.round($splitTexts.length / dataArrX.length) + 1

        for (let i = 0; i < retio; i++) {
            xPositionDataArr.push(...dataArrX)
            yPositionDataArr.push(...dataArrY)
        }

    } else {
        xPositionDataArr.push(...dataArrX)
        yPositionDataArr.push(...dataArrY)
    }

    let position = switchPositions(options.direction, 500)


    /* This is setting the visibility of the words to hidden and setting the y and x position of the
    words to the value of the object returned by the `switchPositions` function. */
    gsap.set($splitTexts, {
        visibility: 'hidden',
        y: -400
        // textShadow: '0px 0px 0px #fff, 0px 0px 0px #fff, '+ textShadow,
    })

    /* This is setting the opacity of the words to 1 and the position of the words to 0. */
    tl
        .to($splitTexts, {
            duration: options.inDuration,
            keyframes:  {
                visibility: ['visible', 'hidden', 'visible'] ,
                x: xPositionDataArr,
                y: 0,
                rotation: [0, 20, 45, 10, -45, 0],

            },

            y: 0,

            stagger: {
                from: "random",
                grid: [0, 0],
                each:  0.1
            }
        })
}
