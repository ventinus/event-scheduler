import { useEffect, useState } from "react";

import noPhoto from "../assets/no-img-available.jpg";
import { getStorageObject } from "../utils/fileUtils";
import { Event } from "../API";
import { Box, Typography } from "@mui/material";

function EventImg({ image, date }: Pick<Event, "image" | "date">) {
  const [imgSrc, imgSrcSet] = useState("");

  useEffect(() => {
    if (!image) return;
    getStorageObject({
      fileName: image,
      dateStr: date,
    }).then(imgSrcSet);
  });

  return (
    <Box
      sx={{
        // width: "30%",
        textAlign: "center",
        img: { maxWidth: "100%", maxHeight: "150px" },
      }}
    >
      {!image ? (
        <img alt="no photo available" src={noPhoto} />
      ) : !imgSrc ? (
        <Typography variant="body2">loading...</Typography>
      ) : (
        <img alt={image ?? ""} src={imgSrc} />
      )}
    </Box>
  );
}

export default EventImg;
