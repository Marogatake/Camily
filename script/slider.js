$(function () {
  winWidth = $(window).width();
  var resizedSlider = null;
  $(window).on('resize', function() {
    clearTimeout( resizedSlider );
    resizedSlider = setTimeout(function() {
      winWidth = $(window).width();
    });
  });

  // .mvの動き
  var mvImg1 = $('#first_img'),
  mvImg2 = $('#second_img');
  mvImg3 = $('#third_img');
  setInterval(function(){
    if (mvImg1.css('display') == 'none' && mvImg2.css('display') == 'none') {
      mvImg1.fadeIn(1000);
      mvImg3.fadeOut(500);
    }if(mvImg2.css('display') == 'none' && mvImg3.css('display') == 'none'){
      mvImg1.fadeOut(500);
      mvImg2.fadeIn(1000);
    }if(mvImg3.css('display') == 'none' && mvImg1.css('display') == 'none'){
      mvImg2.fadeOut(500);
      mvImg3.fadeIn(1000);
    }
  },8000);

  // .slickの動き
  var slideItems = $('#slide_items');
  setInterval(function(){
    elementWidth = slideItems.children().width();
    flowWidth = elementWidth * 5;
    slideItems.animate({'marginLeft': - flowWidth},
    65000, 'linear',
    function(){slideItems.css('marginLeft','0');});
  }, 600);

  // .productの動き
  var sliderBox = $('#slider'),
  boxwidth = sliderBox.width(),
  elementQuantity = $('#slider li').length,
  productText = $('#product_text'),
  productNumButton = $('.product__top-button').children(),
  cancelFlag = 0, firstCount, secondCount,
  productTextHeight = productText.height();

  var resizedProduct = null;
  $(window).on('resize', function() {
    clearTimeout( resizedProduct );
    resizedProduct = setTimeout(function() {
      productTextHeight = productText.height();
    });
  });

  var observeFrag = 0;
  errorObserver = setInterval(function(){
    if (cancelFlag == 0) {
      if ($('#slider li').length != elementQuantity) {
        window.location.reload();
      }
      observeFrag = 0;
    }else if(cancelFlag == 1){
      if (observeFrag >= 4) {
        window.location.reload();
      }
      observeFrag +=1;
    }
  },1000);

  interval = setTimeout(function(){NextSlider();}, 9000);
  countdownProduct();

  $(window).bind("focus", function(){
    interval = setTimeout(function(){NextSlider();}, 9000);
    countdownProduct();
    errorObserver = setInterval(function(){
      if (cancelFlag == 0) {
        if ($('#slider li').length != elementQuantity) {
          window.location.reload();
        }
        observeFrag = 0;
      }else if(cancelFlag == 1){
        if (observeFrag >= 4) {
          window.location.reload();
        }
        observeFrag +=1;
      }
    },1000);
  });
  $(window).bind("blur", function(){
    clearInterval(interval);
    clearInterval(errorObserver);
    resetCountdown();
    cancelFlag = 0;
  });
  $(window).scrollLeft(0);

  // setInterval(function(){
  //   console.log(cancelFlag);
  // },1000);

  $('#prev').on('click', function(){
    PrevSlider();
  });
  $('#next').on('click', function(){
    NextSlider();
  });

  $('#num1').on('click', function(){
    clickNumButton($('#num1'));
  });
  $('#num2').on('click', function(){
    clickNumButton($('#num2'));
  });
  $('#num3').on('click', function(){
    clickNumButton($('#num3'));
  });
  $('#num4').on('click', function(){
    clickNumButton($('#num4'));
  });
  $('#num5').on('click', function(){
    clickNumButton($('#num5'));
  });
  $('#num6').on('click', function(){
    clickNumButton($('#num6'));
  });
  $('#num7').on('click', function(){
    clickNumButton($('#num7'));
  });

  function NextSlider(){
    if (cancelFlag == 0) {
      cancelFlag =1;
      clearInterval(interval);
      resetCountdown();

      var flowTimeGuide = 700,  textChangeTime = 600,
      element = [0, $('#product_left'), $('#product_center'), $('#product_right'),
                    // $('#product_add1'), $('#product_add2'), $('#product_add3'), $('#product_add4')
                  ],
      elementWidth = [parseInt(element[1].css('width'), 10), parseInt(element[2].css('width'), 10), parseInt(element[3].css('width'), 10)],
      elementPosition = [parseInt(element[1].css('left'), 10), parseInt(element[2].css('left'), 10), parseInt(element[3].css('left'), 10)];
      if (winWidth <= 1320) {
        elementWidth[2] = elementWidth[2]*0.5;
      }
      elementFlowWidth = [winWidth*0.05, elementPosition[1] - winWidth*0.05 + elementWidth[1], elementPosition[2] - winWidth*0.5 + elementWidth[2]];

      element[1].clone().removeAttr('id').attr('id', 'clone')
      .appendTo(sliderBox).css('left','100vw');
      cloneElement = $('#clone');

      setTimeout(function(){
        nextProductNum = element[3].data('number');
        textChangeAct(nextProductNum,textChangeTime);
      },elementFlowWidth[2]*flowTimeGuide/winWidth-textChangeTime*0.8);

      element[1].animate({'left':- elementWidth[0]},elementFlowWidth[0]*flowTimeGuide/winWidth,'linear',
      function(){
        $(this).remove();
      });
      element[2].animate({'left': winWidth*0.05-elementWidth[1]},0.12*elementFlowWidth[1]*flowTimeGuide/winWidth + 0.88*elementFlowWidth[2]*flowTimeGuide/winWidth,'linear',
      function(){
        $(this).removeAttr('id').attr('id', 'product_left');
      });
      element[3].animate({'left': winWidth*0.5 - elementWidth[2]},elementFlowWidth[2]*flowTimeGuide/winWidth,'linear',
      function(){
        $(this).removeAttr('id').attr('id', 'product_center');
        interval = setTimeout(function(){NextSlider();}, 9000);
        countdownProduct();
        setTimeout(function(){cancelFlag = 0;observeFrag = 0;},1200);
      });
      setTimeout(function(){
        if (elementQuantity <= 3) {
          // 商品数が３つのときに実行される
          cloneElement.animate({'left': winWidth*0.95},0.35*elementFlowWidth[2]*flowTimeGuide/winWidth,'linear',
          function(){
            $(this).removeAttr('id').attr('id', 'product_right');
          });
        }else if (elementQuantity > 3) {
          // 商品数が３つを越えるときに実行される
          element[4].animate({'left': winWidth*0.95},0.35*elementFlowWidth[2]*flowTimeGuide/winWidth,'linear',
          function(){
            $(this).removeAttr('id').attr('id', 'product_right');
            // element[5](5つ目の商品)以降のidを手前の要素のidに書き換える。cloneElementは最後の要素のidにする。
              // element[5].removeAttr('id').attr('id', 'product_add1');
              // element[6].removeAttr('id').attr('id', 'product_add2');
              // element[7].removeAttr('id').attr('id', 'product_add3');
              // cloneElement.removeAttr('id').attr('id', 'product_add4');
          });
        }
      }, 0.65*elementFlowWidth[2]*flowTimeGuide/winWidth);
    }
  }

  function PrevSlider(){
    if (cancelFlag == 0) {
      cancelFlag =1;
      clearInterval(interval);
      resetCountdown();

      var flowTimeGuide = 700,  textChangeTime = 600,
      element = [0, $('#product_left'), $('#product_center'), $('#product_right'),
                    // $('#product_add1'), $('#product_add2'), $('#product_add3'), $('#product_add4')
                  ],
      elementWidth = [parseInt(element[1].css('width'), 10), parseInt(element[2].css('width'), 10), parseInt(element[3].css('width'), 10)],
      elementPosition = [parseInt(element[1].css('left'), 10), parseInt(element[2].css('left'), 10), parseInt(element[3].css('left'), 10)];
      if (winWidth <= 1320) {
        elementWidth[0] = elementWidth[0]*0.5;
      }
      elementFlowWidth = [winWidth*0.5 - elementWidth[0] - elementPosition[0], winWidth*0.95 - elementPosition[1], winWidth*0.05];

      cloneWidth = parseInt(element[elementQuantity].css('width'), 10);
      element[elementQuantity].clone().removeAttr('id').attr('id', 'clone')
      .prependTo(sliderBox).css('left', - cloneWidth);
      cloneElement = $('#clone'),
      element[elementQuantity].remove();

      setTimeout(function(){
        prevProductNum = element[1].data('number');
        textChangeAct(prevProductNum,textChangeTime);
      },0.12*elementFlowWidth[0]*flowTimeGuide/winWidth + 0.88*elementFlowWidth[1]*flowTimeGuide/winWidth - textChangeTime*0.75);

      element[1].animate({'left': winWidth*0.5 - elementWidth[0]},0.12*elementFlowWidth[0]*flowTimeGuide/winWidth+0.88*elementFlowWidth[1]*flowTimeGuide/winWidth,'linear',
      function(){
        $(this).removeAttr('id').attr('id', 'product_center');
      });
      element[2].animate({'left':winWidth*0.95},elementFlowWidth[1]*flowTimeGuide/winWidth,'linear',
      function(){
        $(this).removeAttr('id').attr('id', 'product_right');
        interval = setTimeout(function(){NextSlider();}, 9000);
        countdownProduct();
        setTimeout(function(){cancelFlag = 0;observeFrag = 0;},1200);
      });
      element[3].animate({'left':winWidth},elementFlowWidth[2]*flowTimeGuide/winWidth,'linear',
      function(){
        if (elementQuantity <= 3) {
          // 商品数が３つのときに実行される
          $(this).remove();
        }else if(elementQuantity > 3){
          // 商品数が３商品数が３つを越えるときに実行される
          $(this).removeAttr('id').attr('id', 'product_add1');

          // 最後を除く3番目以降の要素に対して自身の一個後ろのidに書き換える(以下は商品数7のときの例)
            // element[4].removeAttr('id').attr('id', 'product_add2');
            // element[5].removeAttr('id').attr('id', 'product_add3');
            // element[6].removeAttr('id').attr('id', 'product_add4');
        }
      });
      setTimeout(function(){
        cloneElement.animate({'left': winWidth*0.05-cloneWidth},0.35*elementFlowWidth[1]*flowTimeGuide/winWidth,'linear',
        function(){
          $(this).removeAttr('id').attr('id', 'product_left');
        });
      }, 0.65*elementFlowWidth[1]*flowTimeGuide/winWidth);
    }
  }

  function textChange(nextText,textChangeTime) {
    nextHTML = nextText.html();
    productText.css('min-height', productTextHeight);
    productText.children().fadeOut(textChangeTime*0.5).queue(function(){
      productText.html('').html(nextHTML);
      productText.children().css('display','none').fadeIn(textChangeTime*0.5);
      productText.css('min-height', 'auto');
    });
  }

  function textChangeAct(num,textChangeTime) {
    switch (num) {
      case 1:
      textChange($('#folded1'),textChangeTime);
      break;
      case 2:
      textChange($('#folded2'),textChangeTime);
      break;
      case 3:
      textChange($('#folded3'),textChangeTime);
      break;
      case 4:
      textChange($('#folded4'),textChangeTime);
      break;
      case 5:
      textChange($('#folded5'),textChangeTime);
      break;
      case 6:
      textChange($('#folded6'),textChangeTime);
      break;
      case 7:
      textChange($('#folded7'),textChangeTime);
      break;
    }
 }

  function countdownProduct() {
    resetCountdown();
    centerElementNumber = $('#product_center').data('number');
    productNumButton.eq(centerElementNumber).find('.chart-meter')
    .css({'transform':'rotate(360deg)','transition':'9000ms','transition-timing-function':'linear'});
    firstCount = setTimeout(function(){
      productNumButton.eq(centerElementNumber).css({'background':'linear-gradient(90deg,#3f434a 0%,#3f434a 50%,#e6e7e9 50%,#e6e7e9 100%'});
      productNumButton.eq(centerElementNumber).find('.chart-submeter')
      .css('background','linear-gradient(90deg,transparent 0%,transparent 50%,#3f434a 50%,#3f434a 100%');
    },4500);
    secondCount = setTimeout(function(){
      productNumButton.eq(centerElementNumber).css({'background':'linear-gradient(90deg,#e6e7e9 0%,#e6e7e9 50%,#3f434a 50%,#3f434a 100%'});
      productNumButton.eq(centerElementNumber).find('.chart-meter')
      .css({'transform':'rotate(0deg)','transition':'0s'});
      productNumButton.eq(centerElementNumber).find('.chart-submeter')
      .css('background','linear-gradient(90deg,transparent 0%,transparent 50%,transparent 50%,transparent 100%');
    },9000);
 }

  function resetCountdown() {
    clearTimeout( firstCount );
    clearTimeout( secondCount );
    productNumButton.eq(elementQuantity+1).css('background','#e6e7e9');
    for (var i = 1; i < elementQuantity +1; i++) {
      productNumButton.eq(i).css({'background':'linear-gradient(90deg,#e6e7e9 0%,#e6e7e9 50%,#3f434a 50%,#3f434a 100%'});
      productNumButton.eq(i).find('.chart-meter').css({'transform':'rotate(0deg)','transition':'0s'});
      productNumButton.eq(i).find('.chart-submeter').css('background','linear-gradient(90deg,transparent 0%,transparent 50%,transparent 50%,transparent 100%');
    }
 }

  function flowToNext(flowTimeGuide) {
    return function(){
      var defer = $.Deferred(),
      element = [0, $('#product_left'), $('#product_center'), $('#product_right'),
                    // $('#product_add1'), $('#product_add2'), $('#product_add3'), $('#product_add4')
                  ],
      elementWidth = [parseInt(element[1].css('width'), 10), parseInt(element[2].css('width'), 10), parseInt(element[3].css('width'), 10)],
      elementPosition = [parseInt(element[1].css('left'), 10), parseInt(element[2].css('left'), 10), parseInt(element[3].css('left'), 10)];
      if (winWidth <= 1320) {
        elementWidth[2] = elementWidth[2]*0.5;
      }
      elementFlowWidth = [winWidth*0.05, elementPosition[1] - winWidth*0.05 + elementWidth[1], elementPosition[2] - winWidth*0.5 + elementWidth[2]];

      element[1].clone().removeAttr('id').attr('id', 'clone').appendTo(sliderBox).css('left','100vw');
      cloneElement = $('#clone');

      element[1].animate({'left':- elementWidth[0]},elementFlowWidth[0]*flowTimeGuide/elementFlowWidth[2],'linear',
      function(){
        $(this).remove();
      });
      element[2].animate({'left': winWidth*0.05-elementWidth[1]},0.15*elementFlowWidth[1]*flowTimeGuide/elementFlowWidth[2] + 0.85*elementFlowWidth[2]*flowTimeGuide/elementFlowWidth[2],'linear',
      function(){
        $(this).removeAttr('id').attr('id', 'product_left');
      });
      element[3].animate({'left': winWidth*0.5 - elementWidth[2]},flowTimeGuide,'linear',
      function(){
        $(this).removeAttr('id').attr('id', 'product_center');
        defer.resolve();
      });
      setTimeout(function(){
        if (elementQuantity <= 3) {
          // 商品数が３つのときに実行される
          cloneElement.animate({'left': winWidth*0.95},0.3*flowTimeGuide,'linear',
          function(){
            $(this).removeAttr('id').attr('id', 'product_right');
          });
        }else if (elementQuantity > 3) {
          // 商品数が３つを越えるときに実行される
          element[4].animate({'left': winWidth*0.95},0.3*flowTimeGuide,'linear',
          function(){
              $(this).removeAttr('id').attr('id', 'product_right');
              // element5以降のidを手前の要素のidに書き換える。cloneElementは最後の要素のidにする。
                // element[5].removeAttr('id').attr('id', 'product_add1');
                // element[6].removeAttr('id').attr('id', 'product_add2');
                // element[7].removeAttr('id').attr('id', 'product_add3');
                // cloneElement.removeAttr('id').attr('id', 'product_add4');
          });
        }
      }, 0.6*flowTimeGuide);
      return defer.promise();
    }
 }

  function flowToPrev(flowTimeGuide) {
    return function(){
      var defer = $.Deferred(),
      element = [0, $('#product_left'), $('#product_center'), $('#product_right'),
                    // $('#product_add1'), $('#product_add2'), $('#product_add3'), $('#product_add4')
                  ],
      elementWidth = [parseInt(element[1].css('width'), 10), parseInt(element[2].css('width'), 10), parseInt(element[3].css('width'), 10)],
      elementPosition = [parseInt(element[1].css('left'), 10), parseInt(element[2].css('left'), 10), parseInt(element[3].css('left'), 10)];
      if (winWidth <= 1320) {
        elementWidth[0] = elementWidth[0]*0.5;
      }
      elementFlowWidth = [winWidth*0.5 - elementWidth[0] - elementPosition[0], winWidth*0.95 - elementPosition[1], winWidth*0.05];

      cloneWidth = parseInt(element[elementQuantity].css('width'), 10);
      element[elementQuantity].clone().removeAttr('id').attr('id', 'clone')
      .prependTo(sliderBox).css('left', - cloneWidth);
      cloneElement = $('#clone'),
      element[elementQuantity].remove();

      element[1].animate({'left': winWidth*0.5 - elementWidth[0]},0.15*elementFlowWidth[0]*flowTimeGuide/elementFlowWidth[1]+0.85*elementFlowWidth[1]*flowTimeGuide/elementFlowWidth[1],'linear',
      function(){
        $(this).removeAttr('id').attr('id', 'product_center');
      });
      element[2].animate({'left':winWidth*0.95},flowTimeGuide,'linear',
      function(){
        $(this).removeAttr('id').attr('id', 'product_right');
        defer.resolve();
      });
      element[3].animate({'left':winWidth},elementFlowWidth[2]*flowTimeGuide/elementFlowWidth[1],'linear',
      function(){
        if (elementQuantity <=3) {
          // 商品数が３つのときに実行される
          $(this).remove();
        }else if (elementQuantity > 3) {
          // 商品数が３つを越えるときに実行される
          $(this).removeAttr('id').attr('id', 'product_add1');

          // 最後を除く3番目以降の要素に対して自身の一個後ろのidに書き換える(以下は商品数7のときの例)
            // element[4].removeAttr('id').attr('id', 'product_add2');
            // element[5].removeAttr('id').attr('id', 'product_add3');
            // element[6].removeAttr('id').attr('id', 'product_add4');
        }
      });
      setTimeout(function(){
        cloneElement.animate({'left': winWidth*0.05-cloneWidth},0.3*flowTimeGuide,'linear',
        function(){
          $(this).removeAttr('id').attr('id', 'product_left');
        });
      }, 0.6*flowTimeGuide);
      return defer.promise();
    }
 }

  function clickNumButton(clickNum) {
   if (cancelFlag == 0) {
     cancelFlag = 1;
     resetCountdown();
     clearInterval(interval);
     clickedElement = clickNum.data('number');
     centerElementNumber = sliderBox.children('li').eq('1').data('number');
     numberDifference = clickedElement - centerElementNumber;
     flowTimeGuide = 380,textChangeTime = 600;

     if (5 < numberDifference) {
       var deferred = $.Deferred().resolve(),
       flowTimes = elementQuantity - numberDifference;

       setTimeout(function(){
         textChangeAct(clickedElement,textChangeTime);
       },flowTimeGuide*flowTimes-textChangeTime*0.7);

       for(var i = 0; i < flowTimes; i++){
         deferred = deferred.then(flowToPrev(flowTimeGuide));
       }
       deferred.then(function(){
         interval = setTimeout(function(){NextSlider();}, 9000);
         countdownProduct();
         setTimeout(function(){cancelFlag = 0;observeFrag = 0;},1300);
       });
     }
     else if (0 < numberDifference && numberDifference  <= 5) {
       var deferred = $.Deferred().resolve(),
       flowTimes = numberDifference;

       setTimeout(function(){
         textChangeAct(clickedElement,textChangeTime);
       },flowTimeGuide*flowTimes-textChangeTime*0.7);

       for(var i = 0; i < flowTimes; i++){
         deferred = deferred.then(flowToNext(flowTimeGuide));
       }
       deferred.then(function(){
         interval = setTimeout(function(){NextSlider();}, 9000);
         countdownProduct();
         setTimeout(function(){cancelFlag = 0;observeFrag = 0;},1300);
       });
     }
     else if (numberDifference == 0) {
       setTimeout(function(){
         cancelFlag = 0;
         interval = setTimeout(function(){NextSlider();}, 9000);
         countdownProduct();
       },200)
     }
     else if (-5 <= numberDifference && numberDifference < 0) {
       var deferred = $.Deferred().resolve(),
       flowTimes = - numberDifference;

       setTimeout(function(){
         textChangeAct(clickedElement,textChangeTime);
       },flowTimeGuide*flowTimes-textChangeTime*0.7);

       for(var i = 0; i < flowTimes; i++){
         deferred = deferred.then(flowToPrev(flowTimeGuide));
       }
       deferred.then(function(){
         interval = setTimeout(function(){NextSlider();}, 9000);
         countdownProduct();
         setTimeout(function(){cancelFlag = 0;observeFrag = 0;},1300);
       });
     }
     else if (numberDifference < -5) {
       var deferred = $.Deferred().resolve(),
       flowTimes = elementQuantity+numberDifference;

       setTimeout(function(){
         textChangeAct(clickedElement,textChangeTime);
       },flowTimeGuide*flowTimes-textChangeTime*0.7);

       for(var i = 0; i < flowTimes; i++){
         deferred = deferred.then(flowToNext(flowTimeGuide));
       }
       deferred.then(function(){
         interval = setTimeout(function(){NextSlider();}, 9000);
         countdownProduct();
         setTimeout(function(){cancelFlag = 0;observeFrag = 0;},1300);
       });
     }
   }
 }

});
