export function getMonthDetails(month, year) {
  // month = 0 (January) ... 11 (December)

  const totalDays = new Date(year, month + 1, 0).getDate();

  let tuesdays = 0;

  for (let day = 1; day <= totalDays; day++) {
    const date = new Date(year, month, day);

    if (date.getDay() === 2) {
      tuesdays++;
    }
  }

  return {
    totalDays,
    tuesdays,
    maximumWorkingDays: totalDays - tuesdays,
  };
}