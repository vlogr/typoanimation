/* This is importing the `gsap` and `SplitText` plugins from the `gsap-shockingly-green`
library. */
import {
    gsap,
    SplitText,
    RoughEase,
    CustomEase,
    GSDevTools
} from "../../vendor/gsap-shockingly-green/src/all";

/* This is registering the SplitText plugin. */
gsap.registerPlugin(SplitText, RoughEase, CustomEase, GSDevTools);


/* This is creating a variable called `$title` that is storing the value of the element with the
`class` of `js-texts-animation-1`. */
const $title = document.querySelector('.js-texts-animation-1-scaleWiggly')

/* This is creating a timeline for each word in the text. */
scaleWiggly($title, {
    inDirection: 'bottom',
    outDirection: 'bottom',
    duration: 22,
    inDuration: 10,
    outDuration: 10,
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

function scaleWiggly($texts, optionsParam) {
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
            return this.inEachDuration() / 25
        },

        outEachDuration: function () {
            return this.outDuration / $splitText.length
        },

        outStagger: function () {
            return this.outEachDuration() / 25
        },

        stayTime: function () {
            return (this.duration - (this.inDuration + this.outDuration)) + this.inEachDuration()
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


    const tl = gsap.timeline({
        /* This is setting the timeline to repeat the animation. */
        repeat: -1,
        repeatDelay: 2,

    });



    /* This is setting the opacity of the words to 0 and the position of the words to the value of the
    object returned by the `switchPositions` function. */
    gsap.set($splitText, {
        scaleY: 0,
        scaleX: 0,
        transformOrigin: 'center top',
        // textShadow: textShadow,
    })

    tl.to($splitText, {
        keyframes: [
            {
                scaleX: 1,
                duration: options.inEachDuration(),
            },
            {
                scaleY: 1,
                ease: "elastic.out(3, 0.4)",
                duration: options.inEachDuration(),
                delay: -options.inEachDuration() / 2,
            },
        ],

        stagger: {
            from: 'random',
            grid: [0, 0],
            each:  options.inStagger()
        },
    }).to($splitText, {
        keyframes: [
            {
                scaleX: 0,
                duration: options.inEachDuration(),
            },
            {
                scaleY: 0,
                ease: "elastic.in(3, 0.4)",
                duration: options.inEachDuration(),
                delay: -options.inEachDuration() * 1.5,
            },
        ],

        stagger: {
            from: 'random',
            grid: [0, 0],
            each:  options.inStagger()
        },
    }, options.stayTime())

    GSDevTools.create()

}

