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
  const monthDays = new Date(year, month, 0).getDate();

  let print_line = " ".repeat(3 * firstDate.getDay());
  for (let i = 1; i <= monthDays; i++) {
    if (i < 10) {
      print_line += " ";
    }
    print_line += i.toString() + " ";
    if ((i + firstDate.getDay()) % 7 == 0 || i == monthDays) {
      console.log(print_line);
      print_line = "";
    }
  }
}

function alignCenter(text) {
  const WIDTH = 20;
  const padding = " ".repeat((WIDTH - text.length) / 2);
  return padding + text + padding;
}

const [year, month] = getYearAndMonth();
displayCalendar(year, month);
