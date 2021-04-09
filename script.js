$(document).ready(function(){
    new WOW().init();  
    var fullw = $(window).width(); 
    var hashed = window.location.hash;
    
    $('.main-content-wrapper').stickyStack();

    if(hashed){    
        $('html,body').animate({ scrollTop: ($(hashed).offset().top - 140) }, 500); 
    }

    $(".scroll a").click(function(){
        var url = $(this).attr("href");        
        hash = url.split('#')[1];
        var id = '#' + hash;
        $('html,body').animate({ scrollTop: ($(id).offset().top - 140) }, 500);      
    });
    
    $(".content_experience_item").hover(function(){
         ejecutar();
    });


    $("#cmodal_form").on("submit", function(e) {
        e.preventDefault();
        
        var nombres = $("#nombres").val();
        var correo = $("#correo").val();
        var mensaje = $("#mensaje").val();
                
        var send = true;
        $("#message").html('');        
        
        if(send && (nombres == '' || mensaje == '')){ 
            $("#message").html('Llene todos los campos requeridos(*) del formulario');
            send = false;
        }
        
        if(send && !validateEmail(correo)){ 
            $("#message").html('Ingrese un email válido');
            send = false;
        }
        
        if(send){   
            
            var data = {}; 
            data['nombres'] = nombres; 
            data['email'] = correo; 
            data['content'] = mensaje; 
        
            $.ajax({ 
                type: "POST",
                headers: {
                    'Authorization':'Bearer TGEgbXVjaGFjaGEgbWFsY3JpYWRh',
                    'Content-Type':'application/json'
                },
                url: "https://dev.osuu.pe/rest/", 
                dataType: "json", 
                data: JSON.stringify(data), 
                beforeSend: function() {
                    $("#sendForm span").addClass("carga");
                },
                success: function(msg){ 
                    $("#sendForm span").removeClass("carga");
                    if(msg.status == '200 OK'){
                        document.getElementById("cmodal_form").reset();
                    }else{
                        $("#message").html('Error al enviar');
                    }
                },
                error: function (rpta, ajaxOptions, thrownError) {
                    $("#sendForm span").removeClass("carga");
                    
                    $("#message").html('Error al enviar');
                }
            }); 
        }
    });

    if (fullw <= 1200){        

        $(".nav_primary_icon").click(function(){
            $(".nav__menu").toggle(200);        
            $(this).toggleClass('active');        
        });
        $(".menu-item-has-children .menu_title span").click(function(){
            jquia = $(this).parent().parent();        
            $(" > .sub-menu", jquia).toggleClass("active");
            $(this).toggleClass("active");
        }); 

    }

    
    owl_banner_home = jQuery('.owl_banner_home');
    owl_banner_home.owlCarousel({
        nav: true,
        dots: true,
        loop:true,
        autoplay: true,
        autoplayHoverPause: true,
        dotsContainer: '.owl_dots_banner_home',
        navText:['<i class="icon-left-v"></i>','<i class="icon-right-v"></i>'],
        items: 1,
        animateIn: 'fadeIn',
        animateOut: 'fadeOut'
    });
    
});

function validaNumericos(event) {
    if(event.charCode >= 48 && event.charCode <= 57){
    return true;
    }
    return false;        
}
function validaLetras(e){
    key = e.keyCode || e.which;
    tecla = String.fromCharCode(key).toLowerCase();
    letras = " áéíóúabcdefghijklmnñopqrstuvwxyz";
    especiales = "8-37-39-46";
    tecla_especial = false
    for(var i in especiales){
        if(key == especiales[i]){
            tecla_especial = true;
            break;
        }
    }
    if(letras.indexOf(tecla)==-1 && !tecla_especial){
        return false;
    }
} 

function validateEmail($email) {
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailReg.test( $email );
}


(function ($) {
	$.fn.countTo = function (options) {
		options = options || {};
		
		return $(this).each(function () {
			// set options for current element
			var settings = $.extend({}, $.fn.countTo.defaults, {
				from:            $(this).data('from'),
				to:              $(this).data('to'),
				speed:           $(this).data('speed'),
				refreshInterval: $(this).data('refresh-interval'),
				decimals:        $(this).data('decimals')
			}, options);
			
			// how many times to update the value, and how much to increment the value on each update
			var loops = Math.ceil(settings.speed / settings.refreshInterval),
				increment = (settings.to - settings.from) / loops;
			
			// references & variables that will change with each update
			var self = this,
				$self = $(this),
				loopCount = 0,
				value = settings.from,
				data = $self.data('countTo') || {};
			
			$self.data('countTo', data);
			
			// if an existing interval can be found, clear it first
			if (data.interval) {
				clearInterval(data.interval);
			}
			data.interval = setInterval(updateTimer, settings.refreshInterval);
			
			// initialize the element with the starting value
			render(value);
			
			function updateTimer() {
				value += increment;
				loopCount++;
				
				render(value);
				
				if (typeof(settings.onUpdate) == 'function') {
					settings.onUpdate.call(self, value);
				}
				
				if (loopCount >= loops) {
					// remove the interval
					$self.removeData('countTo');
					clearInterval(data.interval);
					value = settings.to;
					
					if (typeof(settings.onComplete) == 'function') {
						settings.onComplete.call(self, value);
					}
				}
			}
			
			function render(value) {
				var formattedValue = settings.formatter.call(self, value, settings);
				$self.html(formattedValue);
			}
		});
	};
	
	$.fn.countTo.defaults = {
		from: 0,               // the number the element should start at
		to: 0,                 // the number the element should end at
		speed: 200,           // how long it should take to count between the target numbers
		refreshInterval: 2,  // how often the element should be updated
		decimals: 0,           // the number of decimal places to show
		formatter: formatter,  // handler for formatting the value before rendering
		onUpdate: null,        // callback method for every time the element is updated
		onComplete: null       // callback method for when the element finishes updating
	};
	
	function formatter(value, settings) {
		return value.toFixed(settings.decimals);
	}
}(jQuery));

function ejecutar(){
	jQuery(function ($) {
	  // custom formatting example
	  $('.count-number').data('countToOptions', {
		formatter: function (value, options) {
		  return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})(?!\d))/g, ',');
		}
	  });
	  
	  // start all the timers
	  $('.timer').each(count);  
	  
	  function count(options) {
		var $this = $(this);
		options = $.extend({}, options || {}, $this.data('countToOptions') || {});
		$this.countTo(options);
	  }
	});
}