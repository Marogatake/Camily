$(function(){
  var winHeight = $(window).height(),
  winWidth = $(window).width(),
  scroll,runPositon,
  storyTitle = $('.fadein_title_story'),
  sceneTitle = $('#fadein_title_scene'),
  productTitle = $('#fadein_title_product'),
  assesmentTitle = $('#fadein_title_assessment'),
  faqTitle = $('#fadein_title_faq'),
  storyText = $('#fadein_text_story'),
  sceneText = $('#fadein_text_scene'),
  storyTitlePosition = storyTitle.offset().top + storyTitle.height() *0.5,
  scenePosition = sceneTitle.offset().top + sceneTitle.height() *0.5,
  productPosition = productTitle.offset().top + productTitle.height() *0.5,
  assesmentPosition = assesmentTitle.offset().top + assesmentTitle.height() *0.5,
  faqPosition = faqTitle.offset().top + faqTitle.height() *0.5;

  var resizeChar = null;
  $(window).on('resize',function(){
    clearTimeout( resizeChar );
    resizeChar = setTimeout(function() {
      winWidth = $(window).width(),
      winHeight = $(window).height();
    });
  });

  // 初期設定
  storyText.add(sceneText).css({'opacity':'0','marginLeft':'-15px'});
  resetChar(storyTitle);
  resetChar(sceneTitle);
  resetChar(productTitle);
  resetChar(assesmentTitle);
  resetChar(faqTitle);

  var scrollChar = null;
  $(window).on('scroll',function() {
    clearTimeout( scrollChar );
    scrollChar = setTimeout(function() {
      scroll = $(window).scrollTop();
      runPositon =scroll + winHeight * 0.65;
      if ( runPositon >= storyTitlePosition) {
        if (900 < winWidth) {
          setTimeout(function(){
            charOneByOne(storyTitle);
            storyText.animate({'opacity':'1','marginLeft':'0'},800, 'linear', function(){
              // $('#before_img').animate({'width':'20.43vw'},1300);
              // $('#after_img').animate({'width':'29.4vw'},1300);
            });
          },100);
        }
        else if (winWidth <= 900) {
          setTimeout(function(){
            charOneByOne(storyTitle);
            storyText.animate({'opacity':'1','marginLeft':'0'},800);
          },100);
        }
      }
      if ( runPositon >= scenePosition) {
        setTimeout(function(){
          charOneByOne(sceneTitle);
          sceneText.animate({'opacity':'1','marginLeft':'0'},800);
        },100);
      }
      if ( runPositon >= productPosition) {
        charOneByOne(productTitle);
      }
      if ( runPositon >= assesmentPosition) {
        charOneByOne(assesmentTitle);
      }
      if ( runPositon >= faqPosition) {
        charOneByOne(faqTitle);
      }
    });
  });
  function resetChar(object) {
    var content = object.html();
    text = $.trim(content);
    newHtml = "";
    txt_array= text.split('');
    object.html('');
    $.each(txt_array, function(index, element) {
      object.append('<span>'+element+'</span>');
      object.children('span').eq(index).css('opacity','0');
    });
  }
  function charOneByOne(object) {
    for (var i = 0; i < object.text().length; i++) {
      object.children('span').eq(i).animate({'opacity':'1'}, 500 * ( i + 1) );
    }
  }

  // assessmentの動き
  var assesmentContent = $('#assessment_content'),
  assessmentButton = $('#assessment_button');
  for (var i = 5; i < 7; i++) {
    assesmentContent.children().eq(i).fadeOut(0);
  }
  assessmentButton.on('click', function(){
    if (assesmentContent.children().hasClass('show')) {
      for (var i = 5; i < 7; i++) {
        assesmentContent.children().eq(i).fadeOut(150*i).removeClass('show');
      }
      assessmentButton.children('i').css({'transform':'rotate(0deg)','transition':'1s'});
    }else {
      for (var i = 5; i < 7; i++) {
        assesmentContent.children().eq(i).fadeIn(150*i).addClass('show');
      }
      assessmentButton.children('i').css({'transform':'rotate(180deg)','transition':'500ms'});
    }
  });
});
