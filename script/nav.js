$(function () {
  $('.nav-btn').on('click',function(){
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
});
});
