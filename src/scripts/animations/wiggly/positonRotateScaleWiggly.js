/* This is importing the `gsap` and `SplitText` plugins from the `gsap-shockingly-green`
library. */
import {
    gsap,
    SplitText,

} from "../../vendor/gsap-shockingly-green/src/all";

/* This is registering the SplitText plugin. */
gsap.registerPlugin(SplitText,);

/* This is importing the `switchPositions` function from the `components` folder. */
import switchPositions from '../../components/switchPositions'

import generateTextShadow from '../../components/generateTextShadow'


/* This is creating a variable called `$title` that is storing the value of the element with the
`class` of `js-texts-animation-1`. */
const $title = document.querySelector(
    '.js-texts-animation-1-positonRotateScaleWiggly')

/* This is creating a timeline for each word in the text. */
positonRotateScaleWiggly($title, {
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

function positonRotateScaleWiggly($texts, optionsParam) {
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
        direction: 'top',
        inDuration: 1,
        outDuration: 1,
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

        /* This is setting the delay between each repeat. */
        repeatDelay: options.repeatDelay,

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
        [20, 0], 
        [-200, 0],
        [50, 60, 5, 0],
        [-100, -10, 0],
        [-200, 20, 0],
        [150, 10, 0], 
        [60, 80, 20, 0],
        [-200, -10, 0],
        [-200, 10, 0],
        [200, 250, 20, 0],
        [60, 80, 10, 0],
        [150, 10, 0],
    ]

    const dataArrY = [
        [-30, 0],
        [-0, 0],
        [40, 0],
        [60, 50, 0],
        [-40, -60, 0],
        [60, 50, 0],
        [60, 50, 0],
        [-60, -50, 0],
        [-10, 0],
        [40, 0],
        [40, 0],
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


    gsap.set($splitTexts, {
        rotateY: 360,
        perspective: 400,
        scale: 0,
        visibility: 'hidden'
        // textShadow: '0px 0px 0px #fff, 0px 0px 0px #fff, '+ textShadow,
    })

    tl.to($splitTexts, {
        visibility: 'visible',
        rotateY: 0,
        scale: 1,
        lazy: false,
        duration: options.inDuration,
        stagger: {
            from: "random",
            grid: [0, 0],
            each: 0.03
        },
        ease: 'none',
    })

    $splitTexts.forEach((text, i) => {

        tl.to(text, {
        duration: options.inDuration * 1.45,
        
            keyframes: {
                x: xPositionDataArr[i],
                y: yPositionDataArr[i],
                ease: 'none',
            }
        }, 0.01)

    })

}
