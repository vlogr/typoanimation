
const $title = document.querySelector('.js-texts-animation-9')

const text = new Blotter.Text($title.innerText, {
    size : 38,
    fill : "#fff",
  });

  $title.innerText = ''

  const material = new Blotter.RollingDistortMaterial();

  material.uniforms.uSineDistortSpread.value=0
  material.uniforms.uSineDistortCycleCount.value=0
  material.uniforms.uSineDistortAmplitude.value=0
  material.uniforms.uNoiseDistortVolatility.value=35
  material.uniforms.uNoiseDistortAmplitude.value=0.12
  material.uniforms.uRotation.value=-90
  material.uniforms.uSpeed.value=0.18

  const blotter = new Blotter(material, { texts : text });
  const scope = blotter.forText(text);

  scope.appendTo($title);

  blotter.needsUpdate = true

