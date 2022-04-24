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
    '.js-texts-animation-1-positonScaleWiggly')

/* This is creating a timeline for each word in the text. */
positonScaleWiggly($title, {
    /* This is setting the in time duration of the animation for each word. */
    inDuration: 0.6,
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

function positonScaleWiggly($texts, optionsParam) {
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
        [-50, -100, 10, 0], 
        [-150,  -20, -10, 0],
        [40, 60, 50, 30, -10, 0],
        [-100, -10, 10, 0],
        [-200, 20, -10, 0],
        [150, 10, -10, 0], 
        [60, 80, 20, -10, 0],
        [-200, -10, 10, 0],
        [-200, 20, -10, 0],
        [200, 250, 20, -10, 0],
        [60, 80, -10, 0],
        [150, -10, 10, 0],
    ]

    const dataArrY = [
        [0, 40, 30, -20, 0],
        [ 20, 60, -30, 0],
        [-50, -40, -10, 10, 0],
        [-100, 80, 10, -10, 0],
        [-40, -60, 20, -10, 0],
        [60, 50, 20, -10, 0],
        [60, 50, 20, -10, 0],
        [-60, -50, 50, -10, 0],
        [-50, -40, -10, 10,  0],
        [40, 50, 70, 20. ,-10,  0],
        [10, -50, -60, -30, 10, 0],
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
        scale: 0,
        // textShadow: '0px 0px 0px #fff, 0px 0px 0px #fff, '+ textShadow,
    })

    tl.to($splitTexts, {
        scale: 1,
        lazy: false,
        duration: options.inDuration,
        ease: "power4.in", 
        
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
        ease: "power4.in", 
            keyframes: {
                x: xPositionDataArr[i],
                y: yPositionDataArr[i],
                ease: 'none',
            }
        }, 0.01)

    })

}
