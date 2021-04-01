$(document).ready(function(){
    new WOW().init();  
    var fullw = $(window).width(); 
    var hashed = window.location.hash;

    if(hashed){    
        $('html,body').animate({ scrollTop: ($(hashed).offset().top - 140) }, 500); 
    }

    $(".scroll a").click(function(){
        var url = $(this).attr("href");        
        hash = url.split('#')[1];
        var id = '#' + hash;
        $('html,body').animate({ scrollTop: ($(id).offset().top - 140) }, 500);      
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
    $("body").on("click",'.galeria_cc_item', function() {      
        modal = $(this).data("modal");                               
        idPost = $(this).data("id");                                                                      
        $("." + modal).addClass("active");

        $.ajax({
            type : "post",
            dataType: 'json',
            url :  ajaxurl,
            data : {
                action: "getModalGallery",                
                id : idPost                
            },
            beforeSend: function() {
                $(".modal--galeria .contenedor").html('<div class="loading"><div class="loading_cc"><i class="fas fa-spinner"></i></div></div>');
            },
            success: function(data) {
                $(".modal--galeria .contenedor").html(data.html);
                
                owl_galleria = jQuery('.owl_galleria');
                owl_galleria.owlCarousel({
                    nav: false,
                    dots: true,
                    loop:true,
                    autoplay: false,
                    autoplayHoverPause: false,
                    onInitialized: counter,
                    URLhashListener: true, 
                    onTranslated: counter, 
                    dotsContainer: '.owl_dots_galleria',
                    items: 1
                });
            }
        });
        
    });
    
    //close modal
    $(".modal .close").click(function() {
        menu = $(this).parent().parent();
        menu.removeClass("active");        
        $(".modal--galeria").html("");
    });

    $("[data-toggle='tab'] > ul > li").click(function(){
        padre = $(this).parent().parent();
        sub = $(".tab-panel", padre);
        $(" > ul > li", padre).removeClass('active');
        $(this).addClass('active');

        if ($(this).hasClass('active')){
            actual = $(this).data('tab');
            sub.hide();
            $('#' + actual).show();                        
        }

    });

    $("[data-toggle='tab'] > ul > li.active").each(function(){   
        actual = $(this).data('tab');
        $('#' + actual).show();        
    });

    
    $("[data-togg='tab'] > ul > li").click(function(){
        padre = $(this).parent().parent();                
        sub = $(".tab-panel-cc", padre);
        $("> ul > li", padre).removeClass('active');
        $(this).addClass('active');

        if ($(this).hasClass('active')){
            actual = $(this).data('tab');
            sub.hide();
            $('#' + actual).show();                        
        }

    });

    $("[data-togg='tab'] > ul > li.active").each(function(){   
        actual = $(this).data('tab');
        $('#' + actual).show();        
    });

    
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

function counter(event) {
    var element = event.target;
    var items = event.item.count;
    var item = event.item.index + 1;

    if (item > items) {
        item = item - items;
    }
    $(element)
        .parent()
        .find(".counter")
        .html(item + " <span> / "+ items + "</span>");
}
