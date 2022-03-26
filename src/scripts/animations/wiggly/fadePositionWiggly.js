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
const $title = document.querySelector('.js-texts-animation-1-wiggly')

/* This is creating a timeline for each word in the text. */
fadePositionWiggly($title, {
    inDirection: 'bottom',
    outDirection: 'bottom',
    duration: 4,
    inDuration: 1,
    outDuration: 2,
    styles: {
        textShadow: {
            color: 'green',
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
 * @param totalDuration - The total duration of the animation.
 * @param optionsParam - {eachDuration, stagger, repeat, yoyo, repeatDelay}
 */

function fadePositionWiggly($texts, optionsParam) {
    if(!$texts) return

    /* This is creating a new instance of the SplitText plugin. */
    const $SplitTitle = new SplitText($texts);
    /* Creating a new array of the words in the text. */
    const $splitText = $SplitTitle.chars;


    /* Creating a new object called `options` that will be used to store the values of the parameters. */
    let options = {}

    /* This is creating a new object called `defaults` that will be used to store the values of the
    parameters. */
    const defaults = {
        inDirection: 'top',
        outDirection: 'bottom',

        duration: 5,
        inDuration: 1,
        outDuration: 1,


        stayTime: function () {
            return (this.duration - this.inDuration + this.outDuration) 
        },

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
        options[prop] = defaults[prop]
    }
    10
    for (let prop in optionsParam) {
        options[prop] = optionsParam[prop]
    }


    /* This is creating a timeline for each word. */
    const tl = gsap.timeline({
        /* This is setting the timeline to repeat the animation. */
        repeat: -1,
        repeatDelay: 2,

    });



    /* This is creating a variable called `position` that is storing the value of the object returned
    by the `switchPositions` function. */
    /**@readme please have look at switchPositions function from the `components` folder. there you get idea about animations direction */
    let inPosition = switchPositions(options.inDirection, 200)
    let outPosition = switchPositions(options.outDirection, 200)

    
    const textShadow =  generateTextShadow(options.styles.textShadow)

    let arr = [ ]

    const dataArr = [200, -200, -20, -170, 320, 70, 290, 300, 160, 40, 200, -40, -220, -190]

    if($splitText.length > dataArr.length) {
        const retio =  Math.round($splitText.length / dataArr.length ) + 1

        for (let i = 0; i < retio; i++) {
            arr.push(...dataArr)
        }

    }else{ 
        arr.push(...dataArr)
    }


    $splitText.forEach((text, i) => {
        gsap.set(text, {
            y: arr[i]
        })
    })


    /* This is setting the opacity of the words to 0 and the position of the words to the value of the
    object returned by the `switchPositions` function. */
    gsap.set($splitText, {
        opacity: 0,
        perspective: 400,
        // textShadow: textShadow,
    })

    tl.to($splitText, {
        opacity: 1,
        duration: options.inDuration + 0.5,
        stagger: {
            from: "random",
            grid: [0, 0],
            each: 0
        },
    }).to($splitText, {
        y:0,
        x:0,
        duration: options.inDuration,
        ease: CustomEase.create("custom", "M0,0 C0,0 0.129,-0.1 0.192,-0.038 0.232,0.002 0.296,0.054 0.316,0.142 0.507,0.585 1,1 1,1 "),
        stagger: {
            from: "random",
            grid: [0, 0],
            each: 0
        },
    },0)
}
