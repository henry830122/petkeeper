    $(document).ready(function () {
      $('.burger').on('click', function (e) {
        e.preventDefault();
        $('.menu-ul').toggleClass('menu-show');
        $('.burger').toggleClass('rotate')
      })

    });