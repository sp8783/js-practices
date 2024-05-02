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

  const firstDayOfWeek = new Date(year, month - 1, 1).getDay();
  const lastDateOfMonth = new Date(year, month, 0).getDate();

  process.stdout.write("   ".repeat(firstDayOfWeek));
  for (let day = 1; day <= lastDateOfMonth; day++) {
    const dayForDisplay = day.toString().padStart(2, " ");
    const separator =
      (day + firstDayOfWeek) % 7 === 0 || day === lastDateOfMonth ? "\n" : " ";
    process.stdout.write(`${dayForDisplay}${separator}`);
  }
}

function alignCenter(text) {
  const width = 20;
  const padding = " ".repeat((width - text.length) / 2);
  return `${padding}${text}${padding}`;
}

const [year, month] = getYearAndMonth();
displayCalendar(year, month);
