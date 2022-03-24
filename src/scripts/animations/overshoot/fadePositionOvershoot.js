/* This is importing the `gsap` and `SplitText` plugins from the `gsap-shockingly-green`
library. */
import {
    gsap,
    SplitText,
    RoughEase
} from "../../vendor/gsap-shockingly-green/src/all";

/* This is registering the SplitText plugin. */
gsap.registerPlugin(SplitText, RoughEase);

/* This is importing the `switchPositions` function from the `components` folder. */
import switchPositions from '../../components/switchPositions'

import generateTextShadow from '../../components/generateTextShadow'


/* This is creating a variable called `$title` that is storing the value of the element with the
`class` of `js-texts-animation-1`. */
const $title = document.querySelector('.js-texts-animation-1-overshoot')

/* This is creating a timeline for each word in the text. */
fadePositionOvershoot($title, {
    inDirection: 'bottom',
    outDirection: 'bottom',
    duration: 6,
    inDuration: 5,
    outDuration: 5,
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

function fadePositionOvershoot($texts, optionsParam) {
    if(!$texts) return

    /* This is creating a new instance of the SplitText plugin. */
    const $SplitTitle = new SplitText($texts);
    /* Creating a new array of the words in the text. */
    const $splitText = $SplitTitle.chars


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

        inEachDuration: function () {
            return this.inDuration / $splitText.length
        },

        inStagger: function () {
            return this.inEachDuration() /5
        },

        outEachDuration: function () {
            return this.outDuration / $splitText.length
        },

        outStagger: function () {
            return this.outEachDuration() / 5
        },

        stayTime: function () {
            return (this.duration - this.inDuration + this.outDuration) + this.inEachDuration()
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
    let inPosition = switchPositions(options.inDirection, 70)
    let outPosition = switchPositions(options.outDirection, 70)

    
    const textShadow =  generateTextShadow(options.styles.textShadow)

    /* This is setting the opacity of the words to 0 and the position of the words to the value of the
    object returned by the `switchPositions` function. */
    gsap.set($splitText, {
        opacity: 0,
        y: inPosition.y,
        x: inPosition.x,
        // textShadow: textShadow,
    })

    tl.to($splitText, {
        opacity: 1,
        y:0,
        x:0,
        duration: options.inEachDuration(),
        stagger: {
            from: 'start', /** start center end */
            each:  options.inStagger()
        },
        ease:"rough({ template: bounce.out, strength: 20, points: 2, taper: out, randomize: false, })",
    }).to($splitText, {
        opacity:0,
        y: outPosition.y,
        x: outPosition.x,
        duration: options.outEachDuration(),
        stagger: {
            from: 'start', /** start center end */
            each:  options.outStagger()
        },
        ease:"elastic.out(0.2, 0.2)",
    }, options.stayTime())
}
