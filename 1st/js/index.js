var waves = new SineWaves({
  el: document.getElementById('waves'),
  speed: 1,
  ease: 'SineInOut',
  wavesWidth: '100%',
  waves: [
    {
      timeModifier: 2,
      lineWidth: 50,
      amplitude: -25,
      wavelength: 150
    },
    {
      timeModifier: 2,
      lineWidth: 30,
      amplitude: -30,
      wavelength: 80
    },
    {
      timeModifier: 1,
      lineWidth: 25,
      amplitude: -30,
      wavelength: 30
    },
		{
      timeModifier: 3,
      lineWidth: 15,
      amplitude: 40,
      wavelength: 40
    },
    {
      timeModifier: 0.5,
      lineWidth: 5,
      amplitude: -60,
      wavelength: 60
    },
    {
      timeModifier: 1.3,
      lineWidth: 5,
      amplitude: -40,
      wavelength: 40
    }
  ],
  // Called on window resize
  resizeEvent: function() {
    var gradient = this.ctx.createLinearGradient(0, 0, this.width, 0);
    gradient.addColorStop(0,"rgba(25, 255, 255, 0)");
    gradient.addColorStop(0.5,"rgba(255, 25, 255, 0.75)");
    gradient.addColorStop(1,"rgba(255, 255, 25, 0");
    var index = -1;
    var length = this.waves.length;
	  while(++index < length){
      this.waves[index].strokeStyle = gradient;
    }
    // Clean Up
    index = void 0;
    length = void 0;
    gradient = void 0;
  }
});
