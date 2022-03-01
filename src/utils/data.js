export const getData = () => {
  const trackData = localStorage.getItem("trackData");
  if (trackData) {
    return JSON.parse(trackData);
  }
  return [];
};

export const addData = (item) => {
  let trackData = getData();
  trackData.push(item);
  localStorage.setItem("trackData", JSON.stringify(trackData));
};

export const clearData = () => {
  localStorage.setItem("trackData", "");
};
