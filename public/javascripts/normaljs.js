$(document).ready(begin);

function begin(){

  var $window = $(window);

  $('#formDiv').css("display","none");
  $('#backBtnDiv').css("display","none");

  //show Weekend
  var dayTrans = ["一","二","三","四","五","六","七"];

  $('#timeContent').html(moment().get('year')
    + "/" + (moment().get('month')+1)
    + "/" + moment().get('date')
    +  "<br>星期"  + dayTrans[moment().day()-1]
  );

  //showData - changeDiv - inputData - showData
  getValue();
  $("#sendBtn").click(function(){

    if( $('#input_companyId').val() == null || $('#input_name').val() == null || $('input[name="item"]:checked').val() == null ){
      $('#modal2').openModal();
    }else{
      passValue();
      openClose(0);
      $('#tbodyContent').html("");
      getValue();
    }

  });

  //Opening Hours
  if( moment().hours() < 16  && moment().hours() > 8 ){
    $("#sendBtn").removeClass("disable");
  }else if( moment().hours() == 8 && moment().minutes() >= 30 ){
    $("#sendBtn").removeClass("disable");
  }else{
    $("#sendBtn").addClass("disabled");
    $("#sendBtn").attr("disabled","disabled");
  }

  //changeDiv function
  $("#registBtn").click(function(){
    openClose(1);
  });
  $("#backBtn").click(function(){
    openClose(0);
  });

  //screen width items

  function checkWidth() {
      var windowsize = $window.width();
      //clip adjust
      if( windowsize < 500 ){
        $('.clipImg').remove();
      }else if (windowsize < 700 ) {
        $('.clipImg').css( "margin-top" , -20 + "px" );
      }else if( windowsize < 800 ){
        $('.clipImg').css( "margin-top" , -30 + "px" );
      }
      //date style adjust
      if( windowsize < 828 && windowsize > 600 ){
        $('.dateLabel').remove();
      }

      if( windowsize < 364 ){
        window.location.href = 'http://localhost:3000/fail';
      }
  }

  checkWidth();

  $(window).resize(checkWidth);

}

function openClose(i){
  var kind = [ "block" , "none" ] ;
  $('#btnDiv').css("display",kind[i]);
  $('#detailDiv').css("display",kind[i]);
  $('#formDiv').css("display",kind[ Math.abs(i-1) ] );
  $('#backBtnDiv').css("display",kind[ Math.abs(i-1) ] );
}

function passValue(){
  var inputValues = {
    date: moment().valueOf(),
    companyId: $('#input_companyId').val().trim(),
    name: $('#input_name').val().trim(),
    item: $('input[name="item"]:checked').val()
  }


  $.ajax({
    url: 'http://192.168.1.122:8888/apis/add',
    type: 'post',
    contentType: 'application/json',
    data: JSON.stringify(inputValues),
    success: function(){
      $('#modal1').openModal();
    },
    error: function(err) {
      console.log(err);
      alert("error");
    }
  });

}

function getValue(){
  $.ajax({
    url: 'http://192.168.1.122:8888/apis/listToday',
    type: 'get',
    contentType: 'application/json',
    success: function(data) {
      console.log(data);
      showData(data);
    },
    error: function(err) {
      console.log(err);
      alert("error");
    }
  });

}

function showData(Data){
  for(var arrIndex in Data){
    $('#tbodyContent').append("<tr>");
    for(key in Data[arrIndex]){
      if(key=="date"){
        $('#tbodyContent').append("<td>"+ (moment().get('month')+1) + "/" + moment().get('date') + "</td>");
      }else{
        $('#tbodyContent').append("<td>"+ Data[arrIndex][key]+ "</td>");
      }
    }
    $('#tbodyContent').append("</tr>");
  }
}
