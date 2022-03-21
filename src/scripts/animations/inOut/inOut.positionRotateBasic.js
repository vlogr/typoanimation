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

import generateTextShadow from '../../components/generateTextShadow'


/* This is creating a variable called `$title` that is storing the value of the element with the
`class` of `js-texts-animation-1`. */
const $title = document.querySelector('.js-texts-animation-4-inOut')

/* This is creating a timeline for each word in the text. */
positionRotateBasic($title, {
    inDirection: 'top',
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

function positionRotateBasic($texts, optionsParam) {
    if (!$texts) return

    /* This is creating a new instance of the SplitText plugin. */
    const $SplitTitle = new SplitText($texts);
    /* Creating a new array of the words in the text. */
    const $words = $SplitTitle.words
    const $lines = $SplitTitle.lines



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
            return this.inDuration / $lines.length
        },

        inStagger: function () {
            return this.inEachDuration() / 5
        },

        outEachDuration: function () {
            return this.outDuration / $lines.length
        },

        outStagger: function () {
            return this.outEachDuration() / 5
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


    /* This is creating a timeline for each word. */
    const tl = gsap.timeline({
        /* This is setting the timeline to repeat the animation. */
        repeat: options.repeat,

        /* This is setting the delay between each repeat. */
        repeatDelay: options.repeatDelay,

    });

    const textShadow = generateTextShadow(options.styles.textShadow)


    /* This is creating a variable called `position` that is storing the value of the object returned
    by the `switchPositions` function. */
    /**@readme please have look at switchPositions function from the `components` folder. there you will get idea about animations direction */
    let inPosition = switchPositions(options.inDirection, 300)
    let outPosition = switchPositions(options.outDirection, 300)



    /* This is setting the z-index of each word to the index of the word in the array. */
    $words.forEach(($word, i) => gsap.set($word, {
        zIndex: i
    }))

    /* This is setting the visibility of the words to hidden, the y position of the words to the value
    of the object returned by the `switchPositions` function, the x position of the words to the
    value of the object returned by the `switchPositions` function, the rotation of the words to
    -130, the text shadow of the words to `-2px 6px 6px #fff, 2px -4px 6px #fff`, and the scaleY of
    the words to 1.3. */
    gsap.set($words, {
        visibility: 'hidden',
        y: inPosition.y,
        x: inPosition.x,
        rotation: -130,
        textShadow: '-2px 6px 6px #fff, 2px -4px 6px #fff, ' +
            textShadow,
        scaleY: 1.3,
    })

    tl.to($words, {
        /* This is creating a keyframe animation for each word. */
        keyframes: [
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
                duration: options.inEachDuration(),
                /* This is setting the delay between each word. */
                delay: 0
            },
            /* This is setting the text shadow of the words to `0px 0px 0px #fff, 0px -0px 0px #fff`,
            and
            the scaleY of the words to 1. */
            {
                textShadow: '0px 0px 0px #fff, 0px -0px 0px #fff, ' +
                    textShadow,
                scaleY: 1,
                /* This is setting the duration of the animation to the value of the `eachDuration`
                parameter
                multiplied by 2. */
                duration: options.inEachDuration() * 2,
                /* This is setting the delay between each word. */
                delay: -options.inEachDuration() - 0.1
            }
        ],

        /* This is setting the stagger to start at the end of the animation. */
        stagger: {
            from: 'end',
            /** @options 'start' 'center' 'end' */
            each: options.inStagger()
        },
    }).to($words, {
        /* This is creating a keyframe animation for each word. */
        keyframes: [
            /* This is setting the y position of the words to 0, the x position of the words to 0, the
            rotation of the words to 0, the duration of the animation to the value of the
            `eachDuration` parameter, and the delay between each word to 0. */
            {
                y: outPosition.y,
                x: outPosition.x,
                rotation: -130,

                /* This is setting the duration of the animation to the value of the `eachDuration`
                parameter. */
                duration: options.outEachDuration(),
                /* This is setting the delay between each word. */
            },
            /* This is setting the text shadow of the words to `0px 0px 0px #fff, 0px -0px 0px #fff`,
            and
            the scaleY of the words to 1. */
            {
                textShadow: '-2px 6px 6px #fff, 2px -4px 6px #fff, ' +
                    textShadow,
                scaleY: 1.3,
                /* This is setting the duration of the animation to the value of the `eachDuration`
                parameter
                multiplied by 2. */
                duration: options.outEachDuration() * 2,
                /* This is setting the delay between each word. */
                delay: -options.outEachDuration() - 0.1
            },
            /* This is setting the visibility of the words to visible, and the duration of the
            animation to 0. */
            {
                visibility: 'hidden',
                duration: 0,
                delay: -options.outEachDuration() 
            },
        ],

        /* This is setting the stagger to start at the end of the animation. */
        stagger: {
            from: 'end',
            /** @options 'start' 'center' 'end' */
            each: options.outStagger()
        },
    }, options.delay())
}

