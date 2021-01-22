$(document).ready(function() {

    console.log('Init');

    // Menu mobile
    $('.nav-ico, .close-ico').click(function() {
        $('nav, .nav-ico').toggleClass('on');
    });

    // Slider
    if( $('.pub ul li').length > 1 ) {
        var pub = $('.pub ul').bxSlider({
            auto: true,
            captions: false,
            controls: false,
            infiniteLoop: true,
            mode: 'fade',
            pager: false,
            pause: 7200,
            speed: 1200
        });

        $('span.prev').click(function() {
            pub.goToPrevSlide();
        });

        $('span.next').click(function() {
            pub.goToNextSlide();
        });
    }

    if( $('.funcionalidades ul li').length > 1 ) {
        var funcionalidades = $('.funcionalidades ul').bxSlider({
            auto: true,
            controls: false,
            pager: false,
            pause: 8000,
            speed: 1200,
            minSlides: 1,
            maxSlides: 5,
            moveSlides: 1,
            slideWidth: '370px',
            slideMargin: 0,
            infiniteLoop: true
        });

        $('.funcionalidades span.prev').click(function() {
            funcionalidades.goToPrevSlide();
        });

        $('.funcionalidades span.next').click(function() {
            funcionalidades.goToNextSlide();
        });
    }

    if( $('.clientes ul li').length > 1 ) {
        var clientes = $('.clientes ul').bxSlider({
            auto: true,
            controls: false,
            pager: false,
            pause: 4500,
            speed: 1600,
            minSlides: 2,
            maxSlides: 5,
            moveSlides: 1,
            slideWidth: '296px',
            slideMargin: 0,
            infiniteLoop: true
        });
    }

    // Fixed menu
    if($(window).width() > 900){
        $(document).scroll(function() {
            if ($(document).scrollTop() >= ($('.pub').height()-100)) {
                $('header').addClass('fixed');
            } else {
                $('header').removeClass('fixed');
            }
        });
    }

    // Scroll to top
    $(document).scroll(function() {

        var altP = $(document).height();
        var paltP = altP * 0.25;

        if ($(document).scrollTop() >= paltP) {
            $('.btn-scroll-to-top').fadeIn(300);
        } else {
            $('.btn-scroll-to-top').fadeOut(300);
        }
    });

    $('.btn-scroll-to-top').click(function() {
        var target = $(this).attr('data-target');
        $("html, body").stop().animate({scrollLeft: $(target).offset().left, scrollTop: $(target).offset().top+1 }, 800, function() {});
        return false;
    });

    // Scroll to targets
    $('a[data-target]').bind('click', function (event) {
        //event.preventDefault();

        console.log('123123');

        var target = '#'+$(this).attr('data-target');
        if($(target)) {
            $("html, body").stop().animate({scrollLeft: $(target).offset().left, scrollTop: $(target).offset().top-100 }, 800, function() {});
            $('nav, .nav-ico').toggleClass('on');
            return false;
        } else {
            console.log('321');
        }
    });

    if(window.location.href.indexOf("sobre-nos") > -1) {
       $("html, body").stop().animate({scrollLeft: $('#sobre-nos').offset().left, scrollTop: $('#sobre-nos').offset().top-100 }, 800, function() {});
    }

    if(window.location.href.indexOf("o-que-e") > -1) {
       $("html, body").stop().animate({scrollLeft: $('#o-que-e').offset().left, scrollTop: $('#o-que-e').offset().top-100 }, 800, function() {});
    }

    if(window.location.href.indexOf("empresa") > -1) {
       $("html, body").stop().animate({scrollLeft: $('#empresa').offset().left, scrollTop: $('#empresa').offset().top-100 }, 800, function() {});
    }

    if(window.location.href.indexOf("funcionalidades") > -1) {
       $("html, body").stop().animate({scrollLeft: $('#funcionalidades').offset().left, scrollTop: $('#funcionalidades').offset().top-100 }, 800, function() {});
    }

    if(window.location.href.indexOf("planos-e-precos") > -1) {
       $("html, body").stop().animate({scrollLeft: $('#planos-e-precos').offset().left, scrollTop: $('#planos-e-precos').offset().top-100 }, 800, function() {});
    }

    // Perfis
	if($('.btn-active').length > 0) {
		$('.btn-active').on('click', function() { 
			$(this).parent().toggleClass('on');
		});
	}

    $('form[name="form-contato"]').on('submit', function() {

        var xnome = $('form[name="form-contato"] input[name="nome"]').val();
        var xemail = $('form[name="form-contato"] input[name="email"]').val();
        var xempresa = $('form[name="form-contato"] input[name="empresa"]').val();
        var xtelefone = $('form[name="form-contato"] input[name="telefone"]').val();
        var xassunto = $('form[name="form-contato"] input[name="assunto"]').val();
        var xmensagem = $('form[name="form-contato"] textarea[name="mensagem"]').val();

        $('.contato .wrap input[type="submit"]')
            .attr('value', 'Enviando...')
            .prop('disabled', true);

        $.ajax({
            url: '/includes/ajax/requests.php?action=contato&nome='+xnome+'&email='+xemail+'&empresa='+xempresa+'&telefone='+xtelefone+'&assunto='+xassunto+'&mensagem='+xmensagem,
            dataType: 'json',
            success: function(result) {
                if(result) {
                    console.log(result);
                    if(result == 1) {
                        console.log('Sucesso!');
                        $('.contato .wrap .c-form .message').remove();
                        $('.contato .wrap .c-form').html('<div class="message c-success">Sua mensagem foi enviada com sucesso!</div>');
                    } else if(result == 2) {
                        console.log('Alerta');
                        $('.contato .wrap .c-form .message').remove();
                        $('.contato .wrap .c-form').prepend('<div class="message c-alert">Preenche corretamente os seus dados no formulário!</div>');
                    } else {
                        console.log('Erro');
                        $('.contato .wrap .c-form .message').remove();
                        $('.contato .wrap .c-form').prepend('<div class="message c-error">Não foi possível enviar a sua mensagem! Por favor, tente novamente ou entre em contato via telefone.</div>');
                    }

                    $('.contato .wrap input[type="submit"]')
                        .attr('value', 'Enviar')
                        .prop('disabled', false);
                }
            }
        });

        return false;

    });

    /* Modal: Interesse */
    $('.thumb[data-interesse]').click(function() {
        var xvar = $(this).attr('data-interesse');
        console.log(xvar);
        $('.modal input[name="servico"]').val(xvar);
    });

    $('form[name="form-executor"]').on('submit', function() {

        var xnome = $('form[name="form-executor"] input[name="nome"]').val();
        var xemail = $('form[name="form-executor"] input[name="email"]').val();
        var xtelefone = $('form[name="form-executor"] input[name="telefone"]').val();
        var xtipo = $('form[name="form-executor"] input[name="tipo"]').val();

        $('.modal input[type="submit"]')
            .attr('value', 'Enviando...')
            .prop('disabled', true);

        $.ajax({
            url: '/includes/ajax/requests.php?action=contato&nome='+xnome+'&email='+xemail+'&telefone='+xtelefone+'&tipo='+xtipo+'&assunto=Interesse',
            dataType: 'json',
            success: function(result) {
                if(result) {
                    console.log(result);
                    if(result == 1) {
                        console.log('Sucesso2');
                        $('.modal .c-form .message').remove();
                        $('.modal .c-form').html('<div class="message c-success">Sua mensagem foi enviada com sucesso!</div>');
                        setTimeout(function(){ window.location.href = "/captacao"; }, 3000);
                    } else if(result == 2) {
                        console.log('Alerta2');
                        $('.modal .c-form .message').remove();
                        $('.modal .c-form').prepend('<div class="message c-alert">Preenche corretamente os seus dados no formulário!</div>');
                    } else {
                        console.log('Erro3');
                        $('.modal .c-form .message').remove();
                        $('.modal .c-form').prepend('<div class="message c-error">Não foi possível enviar a sua mensagem! Por favor, tente novamente ou entre em contato via telefone.</div>');
                    }

                    $('.modal input[type="submit"]')
                        .attr('value', 'Enviar')
                        .prop('disabled', false);
                }
            }
        });

        return false;

    });

    if( $('.categorias a').length > 1 ) {
        $('.categorias a').on('click', function() {
            var xid = $(this).attr('data-id-categoria');

            // Set classes
            $('.categorias a').removeClass('on');
            $(this).addClass('on');
            $('.section[data-id-categoria] img').removeClass('wow');

            if(xid == 'todos') {
                $('.section[data-id-categoria]').fadeIn(0);
            } else {
                // Hide projects
                $('.section[data-id-categoria*="'+xid+'"]').fadeIn(0);
                $('.section[data-id-categoria]').not('.section[data-id-categoria*="'+xid+'"]').fadeOut(0);
            }
        });
    }

    //Fancybox
    if( $('.thumb').length > 0 ) {
        $(".thumb").fancybox({
            'type'          : 'image',
            'titlePosition' : 'over',
            helpers: {
                overlay: {
                    locked: false
                }
            }
        });

        $('.thumb-p').click(function(e){
            e.preventDefault();
            parent.$.fancybox({
                'type'          : 'image',
                'titlePosition' : 'over'
            });
        });
    }

    //
    if( $('.modal-box').length > 0 ) {
        $(".modal-box").fancybox({
            helpers: {
                overlay: {
                    locked: false
                }
            }
        });
    }

    // Modal boxes
    if( $('.modal-btn').length > 0 ) {
        $(".modal-btn").fancybox({
            'type' : 'iframe',
            'padding' : 0,
            'width' : 900,
            'height' : 'auto',
            'scrolling' : 'no',
            'fitToView' : false,
            modal: true,
            helpers: {
                overlay: {
                    locked: false
                }
            }
        });
    }

    // Vídeos
    if( $('.btn-video').length > 0 ) {
        $('.btn-video').fancybox({
            maxWidth    : 800,
            maxHeight   : 600,
            fitToView   : false,
            width       : '70%',
            height      : '70%',
            autoSize    : false,
            closeClick  : false,
            openEffect  : 'none',
            closeEffect : 'none'
        });
    }

    if( $('select[name=assunto]').length > 0) {
        $('select[name=assunto]').change(function() {
            var assunto = $(this).val();
            if(assunto == 'Trabalhe Conosco') {
                $('.cv-field').fadeIn(0);
            } else {
                $('.cv-field').fadeOut(0);
            }
        });
    }

    // Máscaras
    var SPMaskBehavior = function (val) {
        return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
    },
    spOptions = {
        onKeyPress: function(val, e, field, options) {
            field.mask(SPMaskBehavior.apply({}, arguments), options);
        }
    };

    $('.mask-data').mask('00/00/0000', {clearIfNotMatch: true});
    $('.mask-hora').mask('00:00:00', {clearIfNotMatch: true});
    $('.mask-cep').mask('00000-000', {clearIfNotMatch: true});
    $('.mask-cpf').mask('000.000.000-00', {clearIfNotMatch: true});
    $('.mask-cnpj').mask('00.000.000/0000-00', {clearIfNotMatch: true});
    $('.mask-tel').mask(SPMaskBehavior, spOptions, {clearIfNotMatch: true});
    $('.mask-preco').mask('000.000.000.000.000,00', {reverse: true});
    $('.mask-porcento').mask('##0,00', {reverse: true});
    $('.mask-medida').mask('##0,00', {reverse: true});
    $('.mask-peso').mask('##0.000', {reverse: true});
    $('.mask-nro').mask('00000000000000');
});