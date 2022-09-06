[...document.querySelectorAll('.pomodoro__list-item')].forEach(function(item) {
    item.addEventListener('click', function(elem) {
      let getElemWithClass = document.querySelector('.active');
      if (getElemWithClass !== null) {
        getElemWithClass.classList.remove('active');
      }
      item.classList.add('active')
    })
  })