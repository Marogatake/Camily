$(function () {
  var winWidth = $(window).width(),
  navBox = $('#header_menu'),
  story = $('#story-title-pc'),
  scene = $('#scene-title-pc');
  if (winWidth<=900) {
    story = $('#story-title-phone');
    scene = $('#scene-title-phone');
  }
  product = $('#product-title'),
  assessment = $('#assessment-title'),
  faq = $('#faq-title');
  var resizeNav = null;
  $(window).on('resize',function(){
    clearTimeout( resizeNav );
    resizeNav = setTimeout(function(){
      winWidth = $(window).width();

      story = $('#story-title-pc'),
      scene = $('#scene-title-pc');
      if (winWidth<=900) {
        story = $('#story-title-phone');
        scene = $('#scene-title-phone');
      }
    });
  });
  $('.nav-btn').on('click',function(){
    if (winWidth<=800) {
      if( $(this).hasClass('active') ){
        $(this).removeClass('active');
        $('.header__right').addClass('close').removeClass('open');
        $("body").css('overflow','auto');
        $('header').css('opacity','0.8');
      }
      else {
        $(this).addClass('active');
        $('.header__right').addClass('open').removeClass('close');
        $("body").css('overflow','hidden');
        $('header').css('opacity','0.9');
      }
    }
  });
  navBox.children().eq(0).on('click', function(){
    if (winWidth >= 1250) {
      navScroll(story, 210);
    }else if (winWidth < 1250 && winWidth >= 900) {
      navScroll(story, 150);
    }else {
      navScroll(story, 110);
    }
  });
  navBox.children().eq(1).on('click', function(){
    if (winWidth >= 900) {
      navScroll(scene, 220);
    }else {
      navScroll(scene, 100);
    }
  });
  navBox.children().eq(2).on('click', function(){
    navScroll(product, 154);
  });
  navBox.children().eq(4).on('click', function(){
    navScroll(assessment, 130);
  });
  navBox.children().eq(5).on('click', function(){
    navScroll(faq, 120);
  });
  function navScroll(object, space) {
    winWidth = $(window).width();
    objectPosition = object.offset().top;
    if (winWidth<=800) {
      if( $('.nav-btn').hasClass('active') ){
        $('.nav-btn').removeClass('active');
        $('.header__right').addClass('close').removeClass('open');
        $("body").css('overflow','auto');
        $('header').css('opacity','0.8');
      }
      else {
        $('.nav-btn').addClass('active');
        $('.header__right').addClass('open').removeClass('close');
        $("body").css('overflow','hidden');
        $('header').css('opacity','0.9');
      }
    }
    $("html,body").animate({scrollTop: objectPosition-space},1000);
  }
});
