(function() {
    var curtains;
    var windowHeight;
    var titles;
  
    function init() {
      curtains = document.querySelectorAll('.cover');
      windowHeight = window.innerHeight;
      titles = document.querySelectorAll('.sectionHeader');
    }
  
    function checkPosition() {
      for (var i = 0; i < curtains.length; i++) {
        var curtain = curtains[i];
        var positionFromTop = curtain.getBoundingClientRect().top;
  
        if (positionFromTop - windowHeight <= 0) {
          curtain.classList.add('draw-back-curtain');
          curtain.classList.remove('cover');

          // Change font color too
          for (var k = 0; k < titles.length; k++) {
            var title = titles[k];
            positionFromTop = title.getBoundingClientRect().top;

            if (positionFromTop - windowHeight <= 0) {
              title.classList.add('fade-to-black');
            }
          }
        }
      }
    }
  
    window.addEventListener('scroll', checkPosition);
    window.addEventListener('resize', init);
  
    init();
    checkPosition();
  })();
  
  