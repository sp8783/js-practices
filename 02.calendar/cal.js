#!/usr/bin/env node

import minimist from "minimist";

function getYearAndMonth() {
  const argv = minimist(process.argv.slice(2));
  const currentDate = new Date();
  const year = argv.y ?? currentDate.getFullYear();
  const month = argv.m ?? currentDate.getMonth() + 1;
  return [year, month];
}

function displayCalendar(year, month) {
  console.log(alignCenter(`${month}月 ${year}`));
  console.log("日 月 火 水 木 金 土");

  const firstDate = new Date(year, month - 1, 1);
  const monthDayCount = new Date(year, month, 0).getDate();
  const printLines = formatCalendarDate(firstDate, monthDayCount);
  for (const printLine of printLines) {
    console.log(printLine);
  }
}

function alignCenter(text) {
  const width = 20;
  const padding = " ".repeat((width - text.length) / 2);
  return `${padding}${text}${padding}`;
}

function formatCalendarDate(firstDate, monthDayCount) {
  const printLines = [];
  let printLine = " ".repeat(3 * firstDate.getDay());
  for (let day = 1; day <= monthDayCount; day++) {
    printLine += day.toString().padStart(2, " ");
    if ((day + firstDate.getDay()) % 7 === 0 || day === monthDayCount) {
      printLines.push(printLine);
      printLine = "";
    } else {
      printLine += " ";
    }
  }
  return printLines;
}

const [year, month] = getYearAndMonth();
displayCalendar(year, month);
