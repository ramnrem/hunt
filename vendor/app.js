$(document).ready(function () {
	

	$('.pagination__link').on('click', function(e){
		var scroll_el = $(this).attr('href'); 
        if ($(scroll_el).length != 0) { 
            $('html, body').animate({ scrollTop: $(scroll_el).offset().top }, 500); 
        }
		$('.pagination__item').removeClass('cur');

		$(this).parent().addClass('cur');

        return false;
	})


    


    function getBodyScrollTop() {
        return self.pageYOffset || (document.documentElement && document.documentElement.scrollTop) || (document.body && document.body.scrollTop);
    }


    let sections_x = [];
    $.each($('.section'), function (i, val) {

        let offset = $(val).offset().top;
        sections_x.push(
            { 
                offset: offset,
                i: i
            }
        );
    })


    let x = getBodyScrollTop();
    const array = sections_x;
    let closest = array.sort( (a, b) => Math.abs(x - a.offset) - Math.abs(x - b.offset) )[0];


    $('.pagination__item').removeClass('cur');
    $(`.pagination__link[href="#s${closest.i+1}"`).parent().addClass('cur');

    $('html, body').animate({ scrollTop: $(`#s${closest.i+1}`).offset().top }, 500); 


    $(window).bind('mousewheel', function(e) {

        let top = $(this).scrollTop();

        let _closest = array.sort( (a, b) => Math.abs(top - a.offset) - Math.abs(top - b.offset) )[0];

        $('.pagination__item').removeClass('cur');
        $(`.pagination__link[href="#s${_closest.i+1}"`).parent().addClass('cur');
    })



    ymaps.ready(init);
    var myMap;

    function init(){     
        myMap = new ymaps.Map ("map", {
            center: [59.852994, 30.374782],
            zoom: 13,
            controls: ['zoomControl']
        });


        myPlacemark = new ymaps.Placemark(myMap.getCenter(),{
            hintContent: '',
            balloonContent: ''
        }, {
            iconLayout: 'default#image',
            iconImageHref: '../hunt/dist/img/map-baloon.svg',
            iconImageSize: [78, 95],
            iconImageOffset: [-40,-95]
        })


        myMap.geoObjects.add(myPlacemark);
    	myMap.behaviors.disable('scrollZoom');

        if(window.innerWidth < 650) {
            myMap.setCenter([59.862994, 30.374782], 11, {});
        }

        $(window).resize(function() {
            if(window.innerWidth < 650) {
                myMap.setCenter([59.862994, 30.374782], 11, {});
            }
        })
    }



    
})