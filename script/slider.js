$(function () {
  winWidth = $(window).width();
  $(window).resize(function() {
    winWidth = $(window).width();
  });

  // .mvの動き
  setInterval(function(){
    img1Display = $('#first_img').css('display'),
    img2Display = $('#second_img').css('display');
    if (img1Display == 'none') {
      $('#first_img').fadeIn(1000);
      $('#second_img').fadeOut(500);
    }else if (img2Display == 'none') {
      $('#first_img').fadeOut(500);
      $('#second_img').fadeIn(1000);
    }
  },8000);

  // .slickの動き
  setInterval(function(){
    var elementWidth = $('#slide_items li').width(),
    flowWidth = elementWidth * 5;
    $('#slide_items').animate({'marginLeft': - flowWidth},
    65000, 'linear',
    function(){$('#slide_items').css('marginLeft','0');});
  }, 600);

  // .productの動き
  var sliderBox = $('#slider'),
  boxwidth = sliderBox.width(),
  elementQuantity = $('#slider li').length,
  cancelFlag = 0, helpFlag = 0;
  interval = setTimeout(function(){NextSlider();}, 9000);
  productTextHeight = $('.product__top-text').height();
  $(window).resize(function() {
    productTextHeight = $('.product__top-text').height();
  });

  centerElementNumber = $('#product_center').attr('class').replace('slider','');
  $('.product__top-button li').eq(centerElementNumber).find('.chart-meter').css({'transform':'rotate(360deg)','transition':'9000ms','transition-timing-function':'linear'});
  firstCount = setTimeout(function(){
    $('.product__top-button li').eq(centerElementNumber).css({'background':'linear-gradient(90deg,#110603 0%,#110603 50%,#e6e7e9 50%,#e6e7e9 100%'});
    $('.product__top-button li').eq(centerElementNumber).find('.chart-submeter').css('background','linear-gradient(90deg,transparent 0%,transparent 50%,#110603 50%,#110603 100%');
  },4500);
  secondCount = setTimeout(function(){
    $('.product__top-button li').eq(centerElementNumber).css({'background':'linear-gradient(90deg,#e6e7e9 0%,#e6e7e9 50%,#110603 50%,#110603 100%'});
    $('.product__top-button li').eq(centerElementNumber).find('.chart-meter').css({'transform':'rotate(0deg)','transition':'0s'});
    $('.product__top-button li').eq(centerElementNumber).find('.chart-submeter').css('background','linear-gradient(90deg,transparent 0%,transparent 50%,transparent 50%,transparent 100%');
  },9000);

  $(window).bind("focus", function(){interval = setTimeout(function(){NextSlider();}, 9000);});
  $(window).bind("blur", function(){
    clearInterval(interval);
    resetCountdown();
    cancelFlag = 0;
  });
  $(window).scrollLeft(0);

  setInterval(function(){
    if (cancelFlag == 1) {
      helpFlag += 1;
      if (helpFlag >= 4) {
        cancelFlag = 0;
      }
    }else {
      helpFlag = 0;
    }
  },2000);

  $('#prev').click(function(){
    clearInterval(interval);
    resetCountdown();
    PrevSlider();
  });

  $('#next').click(function(){
    clearInterval(interval);
    resetCountdown();
    NextSlider();
  });

  clickNumButton($('#num1'));
  clickNumButton($('#num2'));
  clickNumButton($('#num3'));
  clickNumButton($('#num4'));
  clickNumButton($('#num5'));
  clickNumButton($('#num6'));
  clickNumButton($('#num7'));

  function NextSlider() {
    if (cancelFlag == 0) {
      cancelFlag =1;
      clearInterval(interval);

      element1 = $('#product_left'),
      element2 = $('#product_center'),
      element3 = $('#product_right'),
      // スライダーを追加する場合は以下の書き方を参考
      element4 = $('#product_add1'),
      element5 = $('#product_add2'),
      element6 = $('#product_add3'),
      element7 = $('#product_add4'),

      element1Width = parseInt(element1.css('width'), 10),
      element2Width = parseInt(element2.css('width'), 10),
      element3Width = parseInt(element3.css('width'), 10);
      if (winWidth <= 1300) {
        element3Width = element3Width*0.5;
      }
      element1Position = parseInt(element1.css('left'), 10),
      element2Position = parseInt(element2.css('left'), 10),
      element3Position = parseInt(element3.css('left'), 10),
      element1FlowWidth = element1Width + element1Position ,
      element2FlowWidth = element2Position + 0.592*element2Width;
      element3FlowWidth = element3Position - winWidth*0.5 + element3Width;

      element1.clone().removeAttr('id').attr('id', 'clone')
      .appendTo(sliderBox).css('left','100vw');
      cloneElement = $('#clone');
      cloneFlowWidth = winWidth*0.11;
      element1.animate({'left':- element1Width},element1FlowWidth*1500/winWidth,'linear',
      function(){
        element1.remove();
      });
      element2.animate({'left': -0.592*element2Width},element2FlowWidth*1500/winWidth,'linear',
      function(){
        element2.removeAttr('id').attr('id', 'product_left');
      });
      element3.animate({'left': winWidth*0.5 - element3Width},element3FlowWidth*1500/winWidth,'linear',
      function(){
        element3.removeAttr('id').attr('id', 'product_center');
        textChangeAct();
        interval = setTimeout(function(){NextSlider();}, 9000);
        countdownProduct();
        setTimeout(function(){cancelFlag = 0;},1020);
      });
      setTimeout(function(){
        if (elementQuantity <= 3) {
          // 商品数が３つのときに実行される
          cloneElement.animate({'left': winWidth*0.89},cloneFlowWidth*1900/winWidth,'linear',
          function(){
            cloneElement.removeAttr('id').attr('id', 'product_right');
          });
        }else if (elementQuantity > 3) {
          // 商品数が３つを越えるときに実行される
          element4.animate({'left': winWidth*0.89},cloneFlowWidth*1500/winWidth,'linear',
          function(){
            element4.removeAttr('id').attr('id', 'product_right');
            // element5以降のidを手前の要素のidに書き換える。cloneElementは最後の要素のidにする。
            element5.removeAttr('id').attr('id', 'product_add1');
            element6.removeAttr('id').attr('id', 'product_add2');
            element7.removeAttr('id').attr('id', 'product_add3');
            cloneElement.removeAttr('id').attr('id', 'product_add4');
          });
        }
      }, 600);
    }
  }

  function PrevSlider(){
    if (cancelFlag == 0) {
      cancelFlag =1;
      clearInterval(interval);

      element1 = $('#product_left'),
      element2 = $('#product_center'),
      element3 = $('#product_right'),
      // スライダーを追加する場合は element4,5,6,7のような記述をしておく
      element4 = $('#product_add1'),
      element5 = $('#product_add2'),
      element6 = $('#product_add3'),
      element7 = $('#product_add4'),

      element1Width = parseInt(element1.css('width'), 10),
      element2Width = parseInt(element2.css('width'), 10),
      element3Width = parseInt(element3.css('width'), 10);
      if (winWidth <= 1300) {
        element1Width = element1Width*0.5;
      }
      element1Position = parseInt(element1.css('left'), 10),
      element2Position = parseInt(element2.css('left'), 10),
      element3Position = parseInt(element3.css('left'), 10),
      element1FlowWidth = winWidth*0.5 - element1Width - element1Position,
      element2FlowWidth = winWidth*0.89 - element2Position,
      element3FlowWidth = winWidth*0.11;

      // スライダーに載せる商品の個数に合わせて以下 3つの element7 を書き換える。
      // (例:商品が10つの場合element10とする)
      cloneWidth = parseInt( element7.css('width'), 10);
      element7.clone().removeAttr('id').attr('id', 'clone')
      .prependTo(sliderBox).css('left', - cloneWidth);
      cloneElement = $('#clone'),
      cloneFlowWidth = cloneWidth *0.408;
      element7.remove();


      element1.animate({'left': winWidth*0.5 - element1Width},element1FlowWidth*1500/winWidth,'linear',
      function(){
        element1.removeAttr('id').attr('id', 'product_center');
      });
      element2.animate({'left':winWidth*0.89},element2FlowWidth*1500/winWidth,'linear',
      function(){
        element2.removeAttr('id').attr('id', 'product_right');
        interval = setTimeout(function(){NextSlider();}, 9000);
        countdownProduct();
        textChangeAct();
        setTimeout(function(){cancelFlag = 0;},1020);
      });
      element3.animate({'left': winWidth},element3FlowWidth*1500/winWidth,'linear',
      function(){
        if (elementQuantity <= 3) {
          // 商品数が３つのときに実行される
          element3.remove();
        }else if(elementQuantity > 3){
          // 商品数が３商品数が３つを越えるときに実行される
          element3.removeAttr('id').attr('id', 'product_add1');
          // 最後を除く3番目以降の要素に対して自身の一個後ろのidに書き換える(以下は商品数7のときの例)
          element4.removeAttr('id').attr('id', 'product_add2');
          element5.removeAttr('id').attr('id', 'product_add3');
          element6.removeAttr('id').attr('id', 'product_add4');
        }
      });
      setTimeout(function(){
        cloneElement.animate({'left': -0.592*cloneWidth}, cloneFlowWidth*1500/winWidth,'linear',
        function(){
          cloneElement.removeAttr('id').attr('id', 'product_left');
        });
      }, 600);
    }
  }

  function textChange(nextFolded) {
    nextHTML = nextFolded.html();
    $('.product__top-text').css('min-height', productTextHeight);
    $('.product__top-text :nth-child(n)').fadeOut(500);
    setTimeout(function(){
      $('.product__top-text').html('').html(nextHTML);
      $('.product__top-text :nth-child(n)').css('display','none');
      $('.product__top-text :nth-child(n)').fadeIn(500);
    },520);
  }

  function textChangeAct() {
   centerClass = $('#product_center').attr('class');
   if (centerClass == 'slider1') {
     textChange($('#folded1'));
   }else if (centerClass == 'slider2') {
     textChange($('#folded2'));
   }else if (centerClass == 'slider3') {
     textChange($('#folded3'));
   }
   // 商品数に合わせて以下の書き換え(以下は商品数 7のときの例)
   else if (centerClass == 'slider4') {
     textChange($('#folded4'));
   }else if (centerClass == 'slider5') {
     textChange($('#folded5'));
   }else if (centerClass == 'slider6') {
     textChange($('#folded6'));
   }else if (centerClass == 'slider7') {
     textChange($('#folded7'));
   }
 }

  function countdownProduct() {
   resetCountdown();
   centerElementNumber = $('#product_center').attr('class').replace('slider','');
   $('.product__top-button li').eq(centerElementNumber).find('.chart-meter').css({'transform':'rotate(360deg)','transition':'9000ms','transition-timing-function':'linear'});
   firstCount = setTimeout(function(){
     $('.product__top-button li').eq(centerElementNumber).css({'background':'linear-gradient(90deg,#110603 0%,#110603 50%,#e6e7e9 50%,#e6e7e9 100%'});
     $('.product__top-button li').eq(centerElementNumber).find('.chart-submeter').css('background','linear-gradient(90deg,transparent 0%,transparent 50%,#110603 50%,#110603 100%');
   },4500);
   secondCount = setTimeout(function(){
     $('.product__top-button li').eq(centerElementNumber).css({'background':'linear-gradient(90deg,#e6e7e9 0%,#e6e7e9 50%,#110603 50%,#110603 100%'});
     $('.product__top-button li').eq(centerElementNumber).find('.chart-meter').css({'transform':'rotate(0deg)','transition':'0s'});
     $('.product__top-button li').eq(centerElementNumber).find('.chart-submeter').css('background','linear-gradient(90deg,transparent 0%,transparent 50%,transparent 50%,transparent 100%');
   },9000);
 }

  function resetCountdown() {
    clearTimeout( firstCount );
    clearTimeout( secondCount );
    for (var i = 1; i < elementQuantity +1; i++) {
      $('.product__top-button li').eq(i).css({'background':'linear-gradient(90deg,#e6e7e9 0%,#e6e7e9 50%,#110603 50%,#110603 100%'});
      $('.product__top-button li').eq(i).find('.chart-meter').css({'transform':'rotate(0deg)','transition':'0s'});
      $('.product__top-button li').eq(i).find('.chart-submeter').css('background','linear-gradient(90deg,transparent 0%,transparent 50%,transparent 50%,transparent 100%');
    }
 }

  function flowToNext() {
    element1 = $('#product_left'),
    element2 = $('#product_center'),
    element3 = $('#product_right'),
    // スライダーを追加する場合は element4,5,6,7のような記述をしておく
    element4 = $('#product_add1'),
    element5 = $('#product_add2'),
    element6 = $('#product_add3'),
    element7 = $('#product_add4'),

    element1Width = parseInt(element1.css('width'), 10),
    element2Width = parseInt(element2.css('width'), 10),
    element3Width = parseInt(element3.css('width'), 10),
    element1Position = parseInt(element1.css('left'), 10),
    element2Position = parseInt(element2.css('left'), 10),
    element3Position = parseInt(element3.css('left'), 10),
    element1FlowWidth = element1Width + element1Position ,
    element2FlowWidth = element2Position + 0.592*element2Width;
    if (winWidth > 1300) {
      element3FlowWidth = element3Position - winWidth*0.5 + element3Width;
    }else{
      element3FlowWidth = element3Position - winWidth*0.5 + element3Width*0.5;
    }

    element1.clone().removeAttr('id').attr('id', 'clone').appendTo(sliderBox).css('left','100vw');
    cloneElement = $('#clone');
    cloneFlowWidth = winWidth*0.11;

    element1.animate({'left':- element1Width},element1FlowWidth*900/winWidth,'linear',
    function(){
      element1.remove();
    });
    element2.animate({'left': -0.592*element2Width},element2FlowWidth*900/winWidth,'linear',
    function(){
      element2.removeAttr('id').attr('id', 'product_left');
    });
    if (winWidth <= 1300) {
      element3Width = element3Width*0.5;
    }
    element3.animate({'left': winWidth*0.5 - element3Width},element3FlowWidth*900/winWidth,'linear',
    function(){
      element3.removeAttr('id').attr('id', 'product_center');
    });
    setTimeout(function(){
      if (elementQuantity <= 3) {
        // 商品数が３つのときに実行される
        cloneElement.animate({'left': winWidth*0.89},cloneFlowWidth*1900/winWidth,'linear',
        function(){
            cloneElement.removeAttr('id').attr('id', 'product_right');
          });
      }else if (elementQuantity > 3) {
        // 商品数が３つを越えるときに実行される
        element4.animate({'left': winWidth*0.89},cloneFlowWidth*900/winWidth,'linear',
        function(){
          element4.removeAttr('id').attr('id', 'product_right');
          // element5以降のidを手前の要素のidに書き換える。cloneElementは最後の要素のidにする。
          element5.removeAttr('id').attr('id', 'product_add1');
          element6.removeAttr('id').attr('id', 'product_add2');
          element7.removeAttr('id').attr('id', 'product_add3');
          cloneElement.removeAttr('id').attr('id', 'product_add4');
      });
    }
    }, 350);
  }

  function flowToPrev() {
    element1 = $('#product_left'),
    element2 = $('#product_center'),
    element3 = $('#product_right'),
    // スライダーを追加する場合は element4,5,6,7のような記述をしておく
    element4 = $('#product_add1'),
    element5 = $('#product_add2'),
    element6 = $('#product_add3'),
    element7 = $('#product_add4'),

    element1Width = parseInt(element1.css('width'), 10),
    element2Width = parseInt(element2.css('width'), 10),
    element3Width = parseInt(element3.css('width'), 10);
    if (winWidth <= 1300) {
      element1Width = element1Width*0.5;
    }
    element1Position = parseInt(element1.css('left'), 10),
    element2Position = parseInt(element2.css('left'), 10),
    element3Position = parseInt(element3.css('left'), 10),
    element1FlowWidth = winWidth*0.5 - element1Width - element1Position,
    element2FlowWidth = winWidth*0.89 - element2Position,
    element3FlowWidth = winWidth*0.11;

    // スライダーに載せる商品の個数に合わせて以下 3つの element7 を書き換える。
    // (例:商品が10つの場合element10とする)
    cloneWidth = parseInt( element7.css('width'), 10);
    element7.clone().removeAttr('id').attr('id', 'clone')
    .prependTo(sliderBox).css('left', - cloneWidth);
    cloneElement = $('#clone'),
    cloneFlowWidth = cloneWidth *0.408;
    element7.remove();

    element1.animate({'left': winWidth*0.5 - element1Width},element1FlowWidth*900/winWidth,'linear',
    function(){
      element1.removeAttr('id').attr('id', 'product_center');
    });
    element2.animate({'left':winWidth*0.89},element2FlowWidth*900/winWidth,'linear',
    function(){
      element2.removeAttr('id').attr('id', 'product_right');
    });
    element3.animate({'left': winWidth},element3FlowWidth*900/winWidth,'linear',
    function(){
      if (elementQuantity <=3) {
        // 商品数が３つのときに実行される
        element3.remove();
      }else if (elementQuantity > 3) {
        // 商品数が３つを越えるときに実行される
        element3.removeAttr('id').attr('id', 'product_add1');
        // 最後を除く3番目以降の要素に対して自身の一個後ろのidに書き換える(以下は商品数7のときの例)
        element4.removeAttr('id').attr('id', 'product_add2');
        element5.removeAttr('id').attr('id', 'product_add3');
        element6.removeAttr('id').attr('id', 'product_add4');
      }
    });
    setTimeout(function(){
      cloneElement.animate({'left': -0.592*cloneWidth}, cloneFlowWidth*900/winWidth,'linear',
      function(){
        cloneElement.removeAttr('id').attr('id', 'product_left');
      });
    }, 350);
  }

  function clickNumButton(clickNumber) {
    if (cancelFlag == 0) {
      clickNumber.click(function(){
        resetCountdown();
        clearInterval(interval);
        cancelFlag =1;
        clickedElement = $(this).attr('id').replace('num','');
        centerElementNumber = sliderBox.children('li').eq('1').attr('class').replace('slider','');
        numberDifference = clickedElement - centerElementNumber;
        elementQuantity = $('#slider li').length;

        if (5 < numberDifference) {
          for (var i = 0; i < elementQuantity - numberDifference; i++) {
            setTimeout(function(){
              flowToPrev();
            },900 * i);}
            setTimeout(function(){
              interval = setTimeout(function(){NextSlider();}, 9000);
              countdownProduct();
              textChangeAct();
              setTimeout(function(){cancelFlag = 0;},1020);
            }, 910 * elementQuantity - 910 * numberDifference);
        }else if (0 < numberDifference && numberDifference  <= 5) {
            for (var i = 0; i < numberDifference; i++) {
              setTimeout(function(){
                flowToNext();
              },900 * i);}
              setTimeout(function(){
                interval = setTimeout(function(){NextSlider();}, 9000);
                countdownProduct();
                textChangeAct();
                setTimeout(function(){cancelFlag = 0;},1020);
              }, 910 * numberDifference);
            }else if (numberDifference == 0) {
              cancelFlag = 0;
              interval = setTimeout(function(){NextSlider();}, 9000);
            }else if (-5 <= numberDifference && numberDifference < 0) {
              for (var i = 0; i < - numberDifference; i++) {
                setTimeout(function(){
                  flowToPrev();
                },900 * i);}
                setTimeout(function(){
                  interval = setTimeout(function(){NextSlider();}, 9000);
                  countdownProduct();
                  textChangeAct();
                  setTimeout(function(){cancelFlag = 0;},1020);
                }, 910 * - numberDifference);
              }else if (numberDifference < -5) {
                for (var i = 0; i < elementQuantity + numberDifference; i++) {
                  setTimeout(function(){
                    flowToNext();
                  },900 * i);}
                  setTimeout(function(){
                    interval = setTimeout(function(){NextSlider();}, 9000);
                    countdownProduct();
                    textChangeAct();
                    setTimeout(function(){cancelFlag = 0;},1020);
                  }, 910 * elementQuantity + 910 * numberDifference);
                }
              }
            )
          }
        }
});
