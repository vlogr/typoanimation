/* This is importing the `gsap` and `SplitText` plugins from the `gsap-shockingly-green`
library. */
import {
    gsap,
    SplitText,
    CustomEase
} from "../../vendor/gsap-shockingly-green/src/all";

import generateTextShadow from '../../components/generateTextShadow'


/* This is registering the plugin with the `gsap` library. */
gsap.registerPlugin(SplitText, CustomEase);



/* This is creating a variable called `$title` that is storing the value of the element with the
`class` of `js-texts-animation-1`. */
const $title = document.querySelector('.js-texts-animation-6-inOut')

/* This is creating a timeline for each word in the text. */
positionScaleBasic($title, {
    inDirection: 'left',
    outDirection: 'right',
    duration: 5,
    inDuration: 2,
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

function positionScaleBasic($texts, optionsParam) {
    if(!$texts) return

    /* This is creating a new instance of the SplitText plugin. */
    const $SplitTitle = new SplitText($texts);
    /* Creating a new array of the words in the text. */
    const $words = $SplitTitle.words

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
            return this.inEachDuration()  / 3
        },

        outEachDuration: function () {
            return this.outDuration / $words.length
        },

        outStagger: function () {
            return this.outEachDuration()  / 3
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

    const textShadow =  generateTextShadow(options.styles.textShadow)


    let inOrigin = 'center left'
    let outOrigin = 'center left'

    if(options.inDirection == 'top') {
        inOrigin = 'top center'
    }else if(options.inDirection == 'bottom') {
        inOrigin = 'bottom center'
    } else if(options.inDirection == 'left') {
        inOrigin = 'center left'
    } else if(options.inDirection == 'right') {
        inOrigin = 'center right'
    }

    if(options.outDirection == 'top') {
        outOrigin = 'top center'
    }else if(options.outDirection == 'bottom') {
        outOrigin = 'bottom center'
    } else if(options.outDirection == 'left') {
        outOrigin = 'center left'
    } else if(options.outDirection == 'right') {
        outOrigin = 'center right'
    }



    /* This is setting the visibility of the words to hidden, the transformOrigin to center left, the
    scale to 0, and the textShadow to -2px 2px 4px #fff, -2px -2px 3px #fff. */
    const initShadow = '-2px 2px 4px #fff, -2px -2px 3px #fff, ' + textShadow
    const customEase = CustomEase.create("custom", "M0,0 C0.482,0.174 0.478,0.136 0.7,0.3 0.856,0.462 0.898,0.52 1,1 ")

    gsap.set($words, {
        visibility: 'hidden',
        transformOrigin: inOrigin,
        scale: 0,
        textShadow: initShadow,
    })

    /* This is setting the visibility of the words to visible, the transformOrigin to center left, the
    scale to 1, and the textShadow to 0px 0px 0px #fff, 0px 0px 0px #fff. */
    tl.to($words, {
        visibility: 'visible',
        rotate: 0,
        scale: 1,
        textShadow: '0px 0px 0px #fff, 0px 0px 0px #fff, ' + textShadow,
        duration: options.inEachDuration(),
        stagger: options.inStagger(),
        ease: customEase,
    }).to($words, {
        transformOrigin: outOrigin,
        duration: 0
    }).to($words, {
        
        rotate: 0,
        scale: 0,
        textShadow: initShadow,
        duration: options.outEachDuration(),
        stagger: options.outStagger(),
        ease: customEase,
    }, options.delay())

}

