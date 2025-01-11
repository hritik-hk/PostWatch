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

// @ts-ignore
const getAllProperties = (obj) => {
  const allProps = {};
  for (const key of Reflect.ownKeys(obj)) {
    //@ts-ignore
    allProps[key] = obj[key];
  }
  return allProps;
};

export { getDurationInHrsMinSec, getAllProperties };
