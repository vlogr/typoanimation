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
const $title = document.querySelector('.js-texts-animation-2-flickering')

/* This is creating a timeline for each word in the text. */
fadePositionBasic($title, {
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
 * @param totalDuration - The total duration of the animation.
 * @param optionsParam - {eachDuration, stagger, repeat, yoyo, repeatDelay}
 */

function fadePositionBasic($texts, optionsParam) {
    if(!$texts) return

    /* This is creating a new instance of the SplitText plugin. */
    const $SplitTitle = new SplitText($texts);
    /* Creating a new array of the words in the text. */
    const $splitTexts = $SplitTitle.chars
    const $splitLines = $SplitTitle.lines


    let y = []

    $splitLines.forEach((line, i) => {
        if($splitLines.length/2 > i){
            y.push(-150, 150)
        }
        
    $SplitTitle.words.forEach(word => {
        word.childNodes.forEach(node => {
            if (node instanceof Element ||
                node instanceof HTMLDocument) {
                
                    gsap.set(node, {
                        y: y[i]
                    })

            }
        })
        })
    })
        




    /* Creating a new object called `options` that will be used to store the values of the parameters. */
    let options = {}

    /* This is creating a new object called `defaults` that will be used to store the values of the
    parameters. */
    const defaults = {
        direction: 'top',
        inDuration: 1,
        outDuration: 1,
        eachDuration: function(){
            return this.inDuration  / $splitTexts.length
        },
        stagger: function(){
            return 0
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

    for (let prop in defaults) {$splitLines
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
        delay: 1,

        /* This is setting the out time duration of the animation for each word. */
        onRepeat: ()=> {
            tl.duration( options.outDuration );
        },

        /* This is setting the in time duration of the animation for each word. */
        onStart: () => {
            tl.duration( options.inDuration );
        },

    });



    /* This is creating a variable called `position` that is storing the value of the object returned
    by the `switchPositions` function. */
    /**@readme please have look at switchPositions function from the `components` folder. there you get idea about animations direction */
    let position = switchPositions(options.direction, 100)

    const textShadow =  generateTextShadow(options.styles.textShadow)

    /* This is setting the opacity of the words to 0 and the position of the words to the value of the
    object returned by the `switchPositions` function. */
    gsap.set($splitTexts, {
        opacity: 0,
        // y: position.y,
        // x: position.x,
        // textShadow: textShadow,
    })

    /* This is setting the opacity of the words to 1 and the position of the words to 0. */
    tl.to($splitTexts, {
        opacity: 1,
  
        duration: options.eachDuration()-0.01,

        ease:"rough({points:60, strength: 100, clamp: true, template: strong.inOut, taper: in, randomize: flase})",

        stagger: {
            from: "random",
            grid: [0,0],
            each: options.stagger()
        }
    })
    .to($splitTexts, {
        y: 0,
        x: 0,
        duration: options.eachDuration(),

        ease:"rough({points:5, strength: 60, template: strong.inOut, taper: both, randomize: flase})",

        stagger: {
            from: "random",
            grid: [0,0],
            each: options.stagger()
        }
    },-0.01)
}
