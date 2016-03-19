document.getElementById('limit').onsubmit = function(){
  var now = new Date();
  var date = document.getElementById('limit').word.value;
  var year = now.getFullYear();
  var month = now.getMonth()+1;
  var realdate = now.getDate();
  moment.locale();
//    date.replace(/[０-９]/g,function(s){return String.fromCharCode(s.charCodeAt(0)-65248);});

//入力された数字が1桁または2桁だった場合は，日付と認識してその時点の日と比較した上でその時点の年と月を補完
    if (date === ^([1-9]|[12][0-9]|3[01])$) {
      if (date < realdate) {
        month = month +1;
      }
      date = year + month + date
      var date2 = moment(date).format("YYYY/MM/DD");
  document.getElementById('limit').textContent = date2;
  return false;
    }
// 入力された数字が3桁または4桁だった場合は，月日と認識して年を補完
    else if (date === ^([1-9][1[0-2])([1-9]|[12][0-9]|3[01])$) {
      if (month === 1||2||3||4||5||6||7||8||9) {
        month = "0" + month
      }
      date = year + date.substring(0,2) + date.substring(2,4)
      var date2 = moment(date).format("YYYY/MM/DD");
      document.getElementById('limit').textContent = date2;
      return false;
}
//入力された数字が4桁だった場合
/*
    else if (date === ^([01-09][1[0-2])/([1-9]|[12][0-9]|3[01])$) {
      date = year + date.substring(0,2) + date.substring(2,4)
      var date2 = moment(date).format("YYYY/MM/DD");
  document.getElementById('output').textContent = date2;
  return false;
}
*/
//入力された数字が5桁または6桁だった場合は，頭に20をつけてフル西暦にした上で，3桁と同じ処理。3000年以降はどうする？
     else if(date === ^(([1-9][0-9])([1-9][1[0-2])([1-9]|[12][0-9]|3[01])$) {
      date = '20' + date.substr(0,2) + date.substr(2,6)
      var date2 = moment(date).format("YYYY/MM/DD");
  document.getElementById('limit').textContent = date2;
  return false;
}
//入力された数字が7桁または8桁だった場合
    else if (date === ^([1-3][0-9][0-9][0-9][[1-9]|1[0-2][1-9]|[12][0-9]|3[01])$) {
      var date = moment(date).format("YYYY/MM/DD");
      document.getElementById('limit').textContent = date;
      return false;
    }
//9桁以上の場合
else {
  document.getElementById('8桁以内の数字を入力してください').textContent = date;
  return false;
}
};
