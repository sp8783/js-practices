#!/usr/bin/env node

import minimist from "minimist";

function getYearAndMonth() {
  const argv = minimist(process.argv.slice(2));
  const now = new Date();
  const year = argv.y ?? now.getFullYear();
  const month = argv.m ?? now.getMonth() + 1;
  return [year, month];
}

function displayCalendar(year, month) {
  console.log(alignCenter(`${month}月 ${year}`));
  console.log("日 月 火 水 木 金 土");

  const firstDate = new Date(year, month - 1, 1);
  const lastDate = new Date(year, month, 0);

  process.stdout.write("   ".repeat(firstDate.getDay()));
  for (
    let date = firstDate;
    date <= lastDate;
    date.setDate(date.getDate() + 1)
  ) {
    const dateForDisplay = date.getDate().toString().padStart(2, " ");
    const separator =
      date.getDay() === 6 || date.valueOf() === lastDate.valueOf() ? "\n" : " ";
    process.stdout.write(`${dateForDisplay}${separator}`);
  }
}

function alignCenter(text) {
  const width = 20;
  const padding = " ".repeat((width - text.length) / 2);
  return `${padding}${text}${padding}`;
}

const [year, month] = getYearAndMonth();
displayCalendar(year, month);
