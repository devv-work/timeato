
const tagSound = new Audio('../assets/sounds/select.wav');


[...document.querySelectorAll('.pomodoro__list-item')].forEach(function(item) {

    item.addEventListener('click', function(elem) {
      tagSound.play()
      let getElemWithClass = document.querySelector('.active');
      if (getElemWithClass !== null) {
        getElemWithClass.classList.remove('active');
      }
      item.classList.add('active')
    })
 
  })


 