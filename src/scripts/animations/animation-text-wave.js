/** In this animation we used WEBGL for text wave */

/* This is creating a variable called  and setting it equal to the element with the class of
js-texts-animation-9. */
const $title = document.querySelector('.js-texts-animation-9')

/* This is creating a new Blotter.Text object. */
const text = new Blotter.Text($title.innerText, {
    /* This is setting the size of the text. */
    size : 38,
    /* This is setting the color of the text. */
    fill : "#fff",
  });

  $title.innerText = ''

/* This is creating a new material. */
  const material = new Blotter.RollingDistortMaterial();

  /* These are the default values for the material. */
  material.uniforms.uSineDistortSpread.value=0
  material.uniforms.uSineDistortCycleCount.value=0
  material.uniforms.uSineDistortAmplitude.value=0
  material.uniforms.uNoiseDistortVolatility.value=35
  material.uniforms.uNoiseDistortAmplitude.value=0.12
  material.uniforms.uRotation.value=-90
  material.uniforms.uSpeed.value=0.18

/* This is creating a new Blotter object. */
  const blotter = new Blotter(material, { texts : text });
/* This is creating a new Blotter.TextScope object. */
  const scope = blotter.forText(text);

/* This is adding the text to the DOM. */
  scope.appendTo($title);

/* This is telling the Blotter to update the material. */
  blotter.needsUpdate = true

