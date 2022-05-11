import {
    gsap,
    SplitText,
    RoughEase
} from "../../vendor/gsap-shockingly-green/src/all";

/* This is registering the plugin. */
gsap.registerPlugin(SplitText, RoughEase);

import generateTextShadow from '../../components/generateTextShadow'


/* This is creating a variable called `$title` that is storing the value of the element with the
`class` of `js-texts-animation-1`. */
const $title = document.querySelector('.js-texts-animation-2-scaleFlickering')

/* This is creating a timeline for each word in the text. */
scaleFlickering($title, {
    /* This is setting the in time duration of the animation for each word. */
    inDuration: 1.5,
    /* This is setting the out time duration of the animation for each word. */
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
 * @param optionsParam - {eachDuration, stagger, repeat, yoyo, repeatDelay}
 */

function scaleFlickering($texts,  optionsParam) {

    if(!$texts) return
    /* This is creating a new instance of the SplitText plugin. */
    const $SplitTitle = new SplitText($texts);
    /* Creating a new array of the words in the text. */
    const $SplitText = $SplitTitle.chars


    /* Creating a new object called `options` that will be used to store the values of the parameters. */
    let options = {}

    /* This is creating a new object called `defaults` that will be used to store the values of the
    parameters. */
    const defaults = {
        inDuration: 1,
        outDuration: 1,
        eachDuration: function(){
            return this.inDuration / $SplitText.length
        },
        stagger: function(){
            return this.eachDuration() / 10
        },
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

        /* This is setting where true causes the tween to go back and forth, alternating backward and forward on each repeat. */
        yoyo: options.yoyo,

        /* This is setting the delay between each repeat. */
        repeatDelay: options.repeatDelay,

        /* This is setting the out time duration of the animation for each word. */
        onRepeat: ()=> {
            tl.duration( options.outDuration );
        },


        onStart: ()=> {
            tl.duration( options.inDuration);
        },


    });

    /* Setting the initial state of the text. */
    gsap.set($SplitText, {
        visibility: 'hidden',
        transformOrigin: 'center top',
        scale: 0
        // textShadow: textShadow,
    })

    /* This is creating a timeline for each word. */
    tl.to($SplitText, {
        /* This is setting the opacity of the words to 1. */
        keyframes:  {
            visibility: ['visible', 'hidden', 'visible'] ,
        },

        scale: 1,
        /* This is setting the duration of the animation for each word. */
        duration: options.eachDuration(),

        /* This is setting the stagger to start from the end of the word and stagger by the value of
        `options.stagger`. */
        ease: "rough({ template: elastic.inOut,, strength: 5, points: 10, taper: out, randomize: false, clamp: false})",

        stagger: {
            from: "random",
            grid: [0, 0],
            each: options.stagger()
        }
    })
}
