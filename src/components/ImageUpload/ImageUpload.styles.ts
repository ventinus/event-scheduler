export const imageContainerStyles = {
  mt: 2,
  mb: 2,
  textAlign: "center",
  position: "relative",
};

export const dropZone = (isValidDrop: boolean) => ({
  border: `3px dashed ${isValidDrop ? "rgb(102,194,135)" : "rgba(0,0,0,0.5)"}`,
  backgroundSize: "contain",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  mt: 1.5,
  position: "relative",
  minHeight: 150,
});

export const uploadIconStyles = (hasSrc: boolean) => ({
  display: hasSrc ? "none" : "inline-block",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
});

export const hiddenImageStyles = {
  maxWidth: "100%",
  opacity: 0,
  maxHeight: "300px",
  display: "block",
  mx: "auto",
  mb: 2,
};
