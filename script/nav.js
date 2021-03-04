$(function () {
  var winWidth = $(window).width(),
  navBox = $('#header_menu'),
  productText = $('#product_text'),
  storyPosition = $('#fadein_title_story').offset().top,
  scenePosition = $('#fadein_title_scene').offset().top,
  productPosition = $('#fadein_title_product').offset().top,
  assesmentPosition = $('#fadein_title_assessment').offset().top,
  faqPosition = $('#fadein_title_faq').offset().top;

  var resizeNav = null;
  $(window).on('resize',function(){
    clearTimeout( resizeNav );
    resizeNav = setTimeout(function() {
      winWidth = $(window).width(),
      storyPosition = $('#fadein_title_story').offset().top,
      scenePosition = $('#fadein_title_scene').offset().top,
      productPosition = $('#fadein_title_product').offset().top,
      assesmentPosition = $('#fadein_title_assessment').offset().top,
      faqPosition = $('#fadein_title_faq').offset().top;
    });
  });

  productText.on('change',function(){
    winWidth = $(window).width(),
    storyPosition = $('#fadein_title_story').offset().top,
    scenePosition = $('#fadein_title_scene').offset().top,
    productPosition = $('#fadein_title_product').offset().top,
    assesmentPosition = $('#fadein_title_assessment').offset().top,
    faqPosition = $('#fadein_title_faq').offset().top;
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
    navScroll(storyPosition);
  });
  navBox.children().eq(1).on('click', function(){
    navScroll(scenePosition);
  });
  navBox.children().eq(2).on('click', function(){
    navScroll(productPosition);
  });
  navBox.children().eq(4).on('click', function(){
    navScroll(assesmentPosition);
  });
  navBox.children().eq(5).on('click', function(){
    navScroll(faqPosition);
  });

  function navScroll(objectPosition) {
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
    $("html,body").animate({scrollTop: objectPosition-'154'},1000);
  }
});
