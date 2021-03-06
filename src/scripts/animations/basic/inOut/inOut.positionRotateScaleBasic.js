/* This is importing the `gsap` and `SplitText` plugins from the `gsap-shockingly-green`
library. */
import {
    gsap,
    SplitText
} from "../../../vendor/gsap-shockingly-green/src/all";

/* This is importing the `switchPositions` function from the `components` folder. */
import switchPositions from '../../../components/switchPositions'

import generateTextShadow from '../../../components/generateTextShadow'


/* This is registering the plugin. */
gsap.registerPlugin(SplitText);



/* This is creating a variable called `$title` that is storing the value of the element with the
`class` of `js-texts-animation-1`. */
const $title = document.querySelector('.js-texts-animation-5-inOut')

/* This is creating a timeline for each word in the text. */
positionRotateScaleBasic($title, {
    inDirection: 'left',
    outDirection: 'right',
    duration: 5,
    inDuration: 1,
    outDuration: 1,
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
 * @param optionsParam - {eachDuration, stagger, repeat, yoyo, repeatDelay}
 */

function positionRotateScaleBasic($texts, optionsParam) {
    if(!$texts) return

    /* This is creating a new instance of the SplitText plugin. */
    const $SplitTitle = new SplitText($texts);
    /* Creating a new array of the words in the text. */
    const $words = $SplitTitle.words

    /* This is setting the z-index of each word to the index of the word in the array. */
    $words.forEach(($word, i) => gsap.set($word, {zIndex: i}))

    /* This is reversing the order of the words in the text. */
    $words.reverse()


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
            return this.inDuration / $words.length
        },

        inStagger: function () {
            return this.inEachDuration() / 2
        },

        outEachDuration: function () {
            return this.outDuration / $words.length
        },

        outStagger: function () {
            return this.outEachDuration() / 2
        },

        stayTime: function () {
            return this.duration - this.inDuration + this.outDuration
        },

        delay: function () {
            return this.inEachDuration() + this.stayTime()
        },

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
        options[prop] = defaults[prop]
    }

    for (let prop in optionsParam) {
        options[prop] = optionsParam[prop]
    }

    const textShadow =  generateTextShadow(options.styles.textShadow)


    /* This is creating a timeline for each word. */
    const tl = gsap.timeline({
        /* This is setting the timeline to repeat the animation. */
        repeat: options.repeat,

        /* This is setting the delay between each repeat. */
        repeatDelay: options.repeatDelay,
    });

    /* This is creating a variable called `position` that is storing the value of the object returned
    by the `switchPositions` function. */
    /**@readme please have look at switchPositions function from the `components` folder. there you will get idea about animations direction */
    let inPosition = switchPositions(options.inDirection, 300)
    let outPosition = switchPositions(options.outDirection, 300)



    gsap.set($words, {
        y: inPosition.y,
        x: inPosition.x,
        scale: 0,
        textShadow: '8px -10px 10px #fff, -5px 12px 10px #fff, '+ textShadow,
        rotate: 180,
    })

    tl.to($words, {
        keyframes: [
            {
                y: 0,
                x: 0,
                duration: options.inEachDuration(),
                // ease: CustomEase.create("custom", "M0,0 C0.482,0.174 0.478,0.136 0.7,0.3 0.856,0.462 0.898,0.52 1,1 "),
            },
            {
                rotation: 0,
                duration: options.eachDuration() * 2,
                delay: - options.eachDuration() * 2.1,
            },
            {
                scale: 1,
                duration: options.eachDuration() * 2,
                delay: - options.eachDuration() * 1.8,
            },
            {
                textShadow: '0px 0px 0px #fff, 0px 0px 0px #fff, '+ textShadow,
                duration:  options.eachDuration() * 2.9,
                delay: - options.eachDuration() * 2.1,
            },
        ],
        stagger: options.inStagger()
    }).to($words, {
        keyframes: [
            {
                y: outPosition.y,
                x: outPosition.x,
                duration: options.outEachDuration(),
                // ease: CustomEase.create("custom", "M0,0 C0.482,0.174 0.478,0.136 0.7,0.3 0.856,0.462 0.898,0.52 1,1 "),
            },
            {
                rotation: 180,
                duration: options.eachDuration() * 2,
                delay: - options.eachDuration() * 2.1,
            },
            {
                scale: 0,
                duration: options.eachDuration() * 2,
                delay: - options.eachDuration() * 1.8,
            },
            {
                textShadow: '0px 0px 0px #fff, 0px 0px 0px #fff, '+ textShadow,
                duration:  options.eachDuration() * 2.9,
                delay: - options.eachDuration() * 2.1,
            },
        ],
        stagger: options.outStagger()
    }, options.delay())
}
