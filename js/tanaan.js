var offset;

function dateKey(d){
  var result = d.getDate() + "." + (d.getMonth() + 1);
  return result;
}

function showItems(id, idData, data){
  var element = document.getElementById(id);
  element.style.display = data ? 'block' : 'none';
  if (!data) {
    return;
  }
  var text = "";
  for (var i=0; i<data.length; i++ ) {
    text += "<li>";
    if (data[i].year) {
      text += "<b>" + data[i].year + "</b> ";
    }
    text += data[i].data + "</li>";
  }
  document.getElementById(idData).innerHTML = text;
}

function showData() {
  var ts = dateKey(new Date(new Date().setDate(new Date().getDate() + offset)));
  document.getElementById("titledate").innerHTML = ts;
  showItems("idBorn", "idBornData", born[ts]);
  showItems("idDead", "idDeadData", dead[ts]);
  showItems("idActions", "idActionsData", actions[ts]);
  showItems("idWeather", "idWeatherData", weather[ts]);
  showItems("idNames", "idNamesData", names[ts]);
}

function nextDay(){
  offset++;
  showData()
}

function previousDay(){
  offset--;
  showData()
}

function thisDay(){
  offset = 0;
  showData()
}

window.onload = function () {
  offset = 0;
  showData();
  document.getElementById('idPrevious').onclick = previousDay;
  document.getElementById('idNext').onclick = nextDay;
  document.getElementById('idThis').onclick = thisDay;
}
