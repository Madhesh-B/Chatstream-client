const formatTime = (time) => {
  return new Date(time).toLocaleTimeString("es-us", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

export default formatTime;