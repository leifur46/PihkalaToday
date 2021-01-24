import {actions} from "./events/actions";
import {born} from "./events/born";
import {dead} from "./events/dead";
import {names} from "./events/names";
import {weather} from "./events/weather";

import $ from "jquery";
import {setYear, format, addDays, subDays} from "date-fns";
import {forEach, flattenDeep, isUndefined} from "lodash-es";

let date = setYear(new Date(), 2020);
let dateFormatted = format(date, "d.M.");

function makeList(eventList) {
  let listItems = "";

  forEach(flattenDeep(eventList), value => {
    listItems += value.year ? `<li><strong>${value.year}</strong> &ndash; ${value.data}</li>` : `<li>${value.data}</li>`;
  });

  return listItems;
}

function $info(eventList, eventName) {
  return !isUndefined([eventList[dateFormatted]][0]) ? $("[data-today]").append(`<h5>${eventName}</h5><ul>${makeList([eventList[dateFormatted]])}</ul>`) : false;
}

function $data() {
  $info(actions, "Tapahtumia");
  $info(born, "Syntyneitä");
  $info(dead, "Kuolleita");
  $info(names, "Nimipäivät");
  $info(weather, "Sää");
  
  $("[data-date]").clearQueue().fadeOut(125, function() {
    $(this).text(dateFormatted);
  }).delay(250).fadeIn();
}

$(function() {
  $("[data-today]").hide(0, function() {
    $data();
  }).delay(250).fadeIn();

  $("[data-goto]").click(function() {
    if ($(this).data("goto") === "prev") {
      date = subDays(date, 1);
    } else if ($(this).data("goto") === "next") {
      date = addDays(date, 1);
    } else {
      date = setYear(new Date(), 2020);
    }

    dateFormatted = format(date, "d.M.");

    $("[data-today]").clearQueue().fadeOut(250, function() {
      $(this).empty();
      $data();
    }).delay(250).fadeIn();
  });
});
