$(document).ready(function(){

    /*
    |----------------------------------------------------------------
    | Smooth Scroll Behaviour
    |----------------------------------------------------------------
    */
    document.getElementById("gn").addEventListener('click', function (e) {
        e.preventDefault();

        const target = e.target;
        if (target.classList.contains('gn-link')) {
            const id = target.getAttribute('href').slice(1);
            document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
        }
    });

    /*
    |----------------------------------------------------------------
    | Hide/Show Header
    |----------------------------------------------------------------
    */
    var didScroll;
    var lastScrollTop = 0;
    var delta = 5;
    var navbarHeight = $('header').outerHeight();

    $(window).scroll(function(event){
        didScroll = true;
    });

    function hasScrolled() {
        var st = $(this).scrollTop();

        if(Math.abs(lastScrollTop - st) <= delta) {
          return;
        }

        if (st > lastScrollTop && st > navbarHeight){
            $('header').removeClass('header-down').addClass('header-up');
        } else {
            if(st + $(window).height() < $(document).height()) {
                $('header').removeClass('header-up').addClass('header-down');
            }
        }
        lastScrollTop = st;
    }

    setInterval(function() {
        if(didScroll) {
            hasScrolled();
            didScroll = false;
        }
    }, 250);

    /*
    |----------------------------------------------------------------
    | Navigation
    |----------------------------------------------------------------
    */

    const $gnTrigger = $(".gn-trigger"), 
        $gn = $(".gn");
    const targetElement = document.querySelector('.gn');
    bodyScrollLock.disableBodyScroll(targetElement);
    bodyScrollLock.enableBodyScroll(targetElement);

    $($gnTrigger).on('click', function(e) {
        e.preventDefault();

        if($(this).hasClass('is-active')){
            $(this).removeClass('is-active');
            $($gn).slideUp();
            bodyScrollLock.enableBodyScroll(targetElement);
        } else {
            $(this).addClass('is-active');
            $($gn).slideDown();
            bodyScrollLock.disableBodyScroll(targetElement);
        }
    });

    $(".gn li").on('click', function(e) {
        e.preventDefault();

        if ($($gnTrigger).hasClass("is-active")) {
            $(this).removeClass('is-active');
            $($gn).slideUp();
            bodyScrollLock.enableBodyScroll(targetElement);
        }
    })

    $(window).resize(function() {

        let windowWidth = $('body').width();
        if (windowWidth > 768 && $(".gn-trigger").hasClass("is-active")) {
            setTimeout(function() {
                $(".gn-trigger").removeClass('is-active');
                $(".gn").slideUp(0);
            }, 200);
            bodyScrollLock.enableBodyScroll(targetElement);
        }
    })

    /*
    |----------------------------------------------------------------
    | Flickity
    |----------------------------------------------------------------
    */
    $('.main-carousel').flickity({
        // options
        prevNextButtons: false,
        resize: true,
        wrapAround: true, 
        autoPlay: 3000,
        watchCSS: true
    });

   /*
    |----------------------------------------------------------------
    | Masonry Grid 
    |----------------------------------------------------------------
    */
    
    let $grid = $('.grid').masonry({
        itemSelector: '.grid-item',
        columnWidth: '.grid-sizer',
        percentPosition: true, 
        // gutter: 10,
        // horizontalOrder: true, 
        // fitWidth: true
    }); 

    $grid.imagesLoaded().progress(function() {
        $grid.masonry('layout');
    })
    /*
    |----------------------------------------------------------------
    | Lightbox Delay 
    |----------------------------------------------------------------
    */
    setTimeout(function() {
        $('.lightbox-trigger').click();
    }, 5000);
});