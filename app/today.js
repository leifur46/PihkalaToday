import {actions} from "./events/actions";
import {born} from "./events/born";
import {dead} from "./events/dead";
import {names} from "./events/names";
import {weather} from "./events/weather";
import $ from "jquery";
import {format, addDays, subDays} from "date-fns";
import {forEach, flattenDeep, isUndefined} from "lodash-es";

var date = new Date();
var dateFormatted = format(date, "D.M");

function makeList(eventList){
  var listItems = "";
  forEach(flattenDeep(eventList), function(value){
    listItems += value.year ? `<li><strong>${value.year}</strong> &ndash; ${value.data}</li>` : `<li>${value.data}</li>`;
  });
  return listItems;
}

function $info(eventList, eventName){
  return !isUndefined([eventList[dateFormatted]][0]) ? $("[data-today]").append(`<h5>${eventName}</h5><ul>${makeList([eventList[dateFormatted]])}</ul>`) : false;
}

function $data(){
  $info(actions, "Tapahtumia");
  $info(born, "Syntyneitä");
  $info(dead, "Kuolleita");
  $info(names, "Nimipäivät");
  $info(weather, "Sää");
  $("[data-date]").clearQueue().fadeOut(300, function(){
    $(this).text(`${dateFormatted}.`);
  }).delay(1000).fadeIn();
}

$(function(){
  $("[data-today]").hide(0, function(){
    $data();
  }).delay(1000).fadeIn();

  $("[data-goto]").click(function(){
    if ($(this).data("goto") == "prev"){
      date = subDays(date, 1);
    } else if ($(this).data("goto") == "next"){
      date = addDays(date, 1);
    } else{
      date = new Date();
    }
    dateFormatted = format(date, "D.M");
    $("[data-today]").clearQueue().fadeOut(300, function(){
      $(this).empty();
      $data();
    }).delay(1000).fadeIn();
  });
});
