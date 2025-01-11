const getDurationInHrsMinSec = (duration: number) => {
  let formatted = "";

  if (Math.floor(duration / (60 * 60)) !== 0) {
    const temp = Math.floor(duration / (60 * 60));
    duration = duration % (60 * 60);
    formatted += `${temp} hrs `;
  } else if (Math.floor(duration / 60) !== 0) {
    const temp = Math.floor(duration / 60);
    duration = duration % 60;
    formatted += `${temp} mins `;
  } else {
    formatted = `${duration} seconds`;
  }

  return formatted;
};

export { getDurationInHrsMinSec };
