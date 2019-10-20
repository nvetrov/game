const numDivs = 36;
const maxHits = 10;

let hits = 0;
let firstHitTime = 0;
let totalError = 0;

function round() {
  $('.game-field').removeClass("target");
  $('.game-field').removeClass("miss");

  let divSelector = randomDivId();
  $(divSelector).addClass("target");
  $(divSelector).text(hits + 1);

  if (hits === 0) {
    firstHitTime = getTimestamp();
  }

  if (hits === maxHits) {
    endGame();
  }
}

function endGame() {
  $(".game-field").addClass("d-none");

  let totalPlayedMillis;

  totalPlayedMillis = getTimestamp() - firstHitTime;

  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);
  $("#maxHits").text(maxHits);
  $("#maxHitsHeader").text(maxHits);
  $("#total-error").text(totalError);

  $("#win-message").removeClass("d-none");
  $("#button-start").addClass("d-none");

}

function handleClick(event) {
  if ($(event.target).hasClass("target")) {
    $(event.target).text("");
    hits++;
    round();
  } else {
    if (firstHitTime > 0) {
      $(event.target).addClass("miss");
      totalError++;
   }
  }
}

function init() {

  $(".game-field").click(handleClick);
  $("#button-reload").click(function() {
    location.reload();
  });
  $("#button-start").click(function() {
    round();
  });
}

// $(document).ready(init);
// const numDivs = 36;
// const maxHits = 10;
//
// let hits = 0;
// let firstHitTime = 0;
//
// function round() {
//     // TODO: помечать target текущим номером
//     $('.target').removeClass('target');
//     $('.miss').removeClass('miss');
//
//     // FIXME: надо бы убрать "target" прежде чем искать новый
//     let divSelector = randomDivId();
//     $(divSelector).addClass("target");
//     $(divSelector).text(hits + 1);
//     // FIXME: тут надо определять при первом клике firstHitTime
//     if (hits === 1) {
//         firstHitTime = getTimestamp();
//     }
//     if (hits === maxHits) {
//         endGame();
//     }
// }
//
// function endGame() {
//     $('.game-field').hide();  // FIXME: спрятать игровое поле сначала
//     let totalPlayedMillis = getTimestamp() - firstHitTime;
//     let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
//     $("#total-time-played").text(totalPlayedSeconds);
//     $("#win-message").removeClass("d-none");
// }
//
// function handleClick(event) {
//   // FIXME: убирать текст со старых таргетов. Кажется есть .text?
//     let target = $(event.target);
//     if (target.hasClass('target')) {
//         hits = hits + 1;
//         target.text('');
//
//         round();
//     } else {
//         $(event.target).addClass('miss');  // TODO: как-то отмечать если мы промахнулись? См CSS класс .miss
//     }
// }
//
// function init() {
//     // TODO: заказчик просил отдельную кнопку, запускающую игру а не просто по загрузке
//     round();
//     $(".game-field").click(handleClick);
//     $("#button-reload").click(function () {
//         location.reload();
//     });
// }
//
// $(document).ready(init);
