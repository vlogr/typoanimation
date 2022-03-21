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
const $title = document.querySelector('.js-texts-animation-6')

/* This is creating a timeline for each word in the text. */
positionScaleBasic($title, {
    /* This is setting the in time duration of the animation for each word. */
    inDuration: 2,
    /* This is setting the out time duration of the animation for each word. */
    outDuration: 2,

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
        direction: 'bottom',
        inDuration: 1,
        outDuration: 1,
        eachDuration: function(){
            return this.inDuration / $words.length
        },
        stagger: function(){
            return this.eachDuration() / 3
        },
        repeat: -1,
        yoyo: true,
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

        /* This is setting where true causes the tween to go back and forth, alternating backward and forward on each repeat. */
        yoyo: options.yoyo,

        /* This is setting the delay between each repeat. */
        repeatDelay: options.repeatDelay,

        /* This is setting the out time duration of the animation for each word. */
        onRepeat: ()=> {
            tl.duration( options.outDuration );
        },

        /* This is setting the in time duration of the animation for each word. */
        onStart: () => {
            tl.duration( options.inDuration );
        },
    });

    const textShadow =  generateTextShadow(options.styles.textShadow)


    /* This is setting the visibility of the words to hidden, the transformOrigin to center left, the
    scale to 0, and the textShadow to -2px 2px 4px #fff, -2px -2px 3px #fff. */
    gsap.set($words, {
        visibility: 'hidden',
        transformOrigin: 'center left',
        scale: 0,
        textShadow: '-2px 2px 4px #fff, -2px -2px 3px #fff, ' + textShadow,
    })

    /* This is setting the visibility of the words to visible, the transformOrigin to center left, the
    scale to 1, and the textShadow to 0px 0px 0px #fff, 0px 0px 0px #fff. */
    tl.to($words, {
        visibility: 'visible',
        rotate: 0,
        scale: 1,
        textShadow: '0px 0px 0px #fff, 0px 0px 0px #fff, ' + textShadow,
        duration: options.eachDuration(),
        stagger: options.stagger(),
        ease: CustomEase.create("custom", "M0,0 C0.482,0.174 0.478,0.136 0.7,0.3 0.856,0.462 0.898,0.52 1,1 "),
    })

}

