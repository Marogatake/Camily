$(function () {
  var winWidth = $(window).width(),
  navBox = $('#header_menu'),
  story = $('.story_pc_title');
  if (winWidth<=900) {
    story = $('.story_phone_title');
  }
  scene = $('#fadein_title_scene'),
  product = $('#fadein_title_product'),
  assessment = $('#fadein_title_assessment'),
  faq = $('#fadein_title_faq');
  var resizeNav = null;
  $(window).on('resize',function(){
    clearTimeout( resizeNav );
    resizeNav = setTimeout(function(){
      winWidth = $(window).width();

      story = $('.story_pc_title');
      if (winWidth<=900) {
        story = $('.story_phone_title');
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
    navScroll(story);
  });
  navBox.children().eq(1).on('click', function(){
    navScroll(scene);
  });
  navBox.children().eq(2).on('click', function(){
    navScroll(product);
  });
  navBox.children().eq(4).on('click', function(){
    navScroll(assessment);
  });
  navBox.children().eq(5).on('click', function(){
    navScroll(faq);
  });
  function navScroll(object) {
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
    $("html,body").animate({scrollTop: objectPosition-'200'},1000);
  }
});
