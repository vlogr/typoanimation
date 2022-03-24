import {
    gsap,
    SplitText
} from "../../../vendor/gsap-shockingly-green/src/all";

gsap.registerPlugin(SplitText);
/* This is importing the `switchPositions` function from the `components` folder. */
import switchPositions from '../../../components/switchPositions'

import generateTextShadow from '../../../components/generateTextShadow'



const $title = document.querySelector('.js-texts-animation-8-inOut')


/* This is creating a timeline for each word in the text. */
animation5($title, {
    inDirection: 'rightBottom',
    outDirection: 'leftTop',
    duration: 3,
    inDuration: 0.4,
    outDuration: 0.4,
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

function animation5($texts, optionsParam) {
    if (!$texts) return

    /* This is creating a new instance of the SplitText plugin. */
    const $SplitTitle = new SplitText($texts);
    /* Creating a new array of the words in the text. */
    const $words = $SplitTitle.words


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
            return this.inEachDuration() * 2.7
        },

        outEachDuration: function () {
            return this.outDuration / $words.length
        },

        outStagger: function () {
            return this.outEachDuration()  * 2.7
        },

        stayTime: function () {
            return this.inEachDuration() + (this.duration - this.inDuration + this.outDuration)
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
    let inPosition = switchPositions(options.inDirection, 120)
    let outPosition = switchPositions(options.outDirection, 120)


    const generateShadow = generateTextShadow(options.styles.textShadow)

    const shadows =
        `10px 10px 40px #fff, 10px 10px 40px #fff, 10px 10px 30px #fff,  5px 5px 30px #fff, 5px 5px 60px #fff,  0px 0px 20px #fff,   0px 0px 40px #fff,  0px 0px 40px #fff, 3px 3px 0px #fff, 5px 5px 0px #fff , 8px 8px 0px #fff , 12px 12px 0px #fff , 16px 16px 0px #fff , 20px 20px 0px #fff, `
    const shadows0 =
        `0px 0px 0px transparent, 0px 0px 0px transparent, 0px 0px 0px transparent,  0px 0px 0px transparent, 0px 0px 0px transparent,  0px 0px 0px transparent,   0px 0px 0px transparent,  0px 0px 0px transparent, 0px 0px 0px transparent, 0px 0px 0px transparent , 0px 0px 0px transparent , 0px 0px 0px transparent , 0px 0px 0px transparent , 0px 00px 0px transparent, `


    /* This is hiding the words so that the animation can be seen. */
    gsap.set($words, {
        visibility: 'hidden',
        textShadow: shadows0  + generateShadow,
    })

    /* This is hiding the words so that the animation can be seen. */
    tl.to($words, {
            visibility: 'visible',
            duration: 0,
            stagger: options.inStagger(),
        }, 0)
        .from($words, {
            x: inPosition.x,
            y: inPosition.y,
            stagger: options.inStagger(),
            duration: options.inEachDuration()

        }, 0)
        .from($words, {
            textShadow: shadows  + generateShadow,
            stagger: options.inStagger(),
            duration:  options.inEachDuration()* 5.3
        }, 0.01)

        // out
        .to($words, {
            x: outPosition.x,
            y: outPosition.y,
            stagger: options.outStagger(),
            duration: options.outEachDuration()

        }, options.stayTime())
        .from($words, {
            textShadow: shadows  + generateShadow,
            stagger: options.outStagger(),
            duration: options.outEachDuration() * 5.3
        }, options.stayTime() + 0.01)
        .to($words, {
            visibility: 'hidden',
            duration: 0,
            stagger: options.outStagger(),
        }, options.stayTime() + options.outEachDuration())
}
