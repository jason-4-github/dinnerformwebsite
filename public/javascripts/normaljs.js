$(document).ready(begin);

function begin(){

  var hei = $('.formStyle').css("height");
  $('.tabContent').css("height",hei);

  //show Weekend
  $('#timeContent').html(moment().get('year')
    + "/" + (moment().get('month')+1)
    + "/" + moment().get('date')
    + " " + moment().format('dddd')
  );

  //showData - changeDiv - inputData - showData
  getValue();
  $("#sendBtn").click(function(){
    if( $('#input_companyId').val() == "" || $('#input_name').val() == "" ){
      $('#modal2').openModal();
    }else{
      passValue();
      $('#input_companyId').val("");
      $('#input_name').val("");
      $('#tbodyContent').html("");
      getValue();
    }
  });

  //Opening Hours
  if( moment().hours() < 15  && moment().hours() > 8 ){
    $("#sendBtn").removeClass("disable");
  }else if( moment().hours() == 8 && moment().minutes() >= 30 ){
    $("#sendBtn").removeClass("disable");
  }else if( moment().hours() == 15 && moment().minutes() <= 30 ){
    $("#sendBtn").removeClass("disable");
  }else{
    $("#sendBtn").addClass("disabled");
    $("#sendBtn").attr("disabled","disabled");
  }

}

function passValue(){

  var itemValue
  if( $('input[name="item"]:checked').val() == null ){
    itemValue = "不訂" ;
  }else{
    itemValue = "要訂" ;
  }

  var inputValues = {
    date: moment().valueOf(),
    companyId: $('#input_companyId').val().trim(),
    name: $('#input_name').val().trim(),
    item: itemValue
  }


  $.ajax({
    url: 'http://61.222.245.150:8001/apis/add',
    type: 'post',
    contentType: 'application/json',
    data: JSON.stringify(inputValues),
    success: function(){
      $('#modal1').openModal();
    },
    error: function(err) {
      console.log(err);
      //alert("error");
    }
  });

}

function getValue(){

  $.ajax({
    url: 'http://61.222.245.150:8001/apis/listToday',
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

  var tempStr = "" ;

  $.each(Data , function(index ,value){

    tempStr += "<tr>" ;
    $.each(value , function(key,data){

      if(key == "date"){
        var timeTest = moment.unix(data.substr(0,10)).format("HH點mm分ss秒") ;
        tempStr += "<td>"+ timeTest + "</td>";
      }else{
        tempStr += "<td>"+ data + "</td>";
      }
    });
    tempStr += "</tr>" ;

  });
  $('#tbodyContent').append(tempStr);
}
