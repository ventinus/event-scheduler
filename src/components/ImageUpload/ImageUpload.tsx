import React, { useEffect, useState, useRef } from "react";
import { Button, Box, Typography } from "@mui/material";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import { getStorageObject, putStorageObject } from "../../utils/fileUtils";
import {
  dropZone,
  hiddenImageStyles,
  imageContainerStyles,
  uploadIconStyles,
} from "./ImageUpload.styles";

interface ImageUploadProps {
  id: string;
  name: string;
  dateStr: string;
  fileName?: string | null;
}

export function ImageUpload({ id, name, dateStr, fileName }: ImageUploadProps) {
  const photoInputRef = useRef<HTMLInputElement>(null);
  const [isValidDrop, isValidDropSet] = useState(false);
  const [imageInfo, imageInfoSet] = useState<File | null>(null);
  const [imgSrc, imgSrcSet] = useState("");

  const imageName = fileName || imageInfo?.name || "";

  useEffect(() => {
    if (!fileName) return;
    getStorageObject({ fileName, dateStr }).then(imgSrcSet);
  }, [fileName, dateStr]);

  const onDragOver = (event: React.DragEvent<HTMLDivElement>) =>
    event.preventDefault();
  const onDragEnter = () => isValidDropSet(true);
  const onDragLeave = () => isValidDropSet(false);
  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    isValidDropSet(false);
    handleNewFiles(event.dataTransfer.files);
  };

  const onBrowseClick = () => photoInputRef.current?.click();
  const onImageChange = (event: any) => handleNewFiles(event.target.files);

  const handleNewFiles = async (files: FileList) => {
    try {
      const data = files[0];
      putStorageObject({ data, dateStr });
      imageInfoSet(data);
      imgSrcSet(URL.createObjectURL(data));
    } catch (err) {
      console.log("trouble with image", err);
    }
  };

  return (
    <Box id={id}>
      <input type="hidden" name={name} value={imageName} />
      <input
        style={{ display: "none" }}
        ref={photoInputRef}
        type="file"
        accept="image/png, image/jpeg"
        onChange={onImageChange}
      />

      <Box sx={imageContainerStyles}>
        <Typography>
          Drop image or{" "}
          <Button onClick={onBrowseClick} variant="outlined">
            Browse
          </Button>
        </Typography>

        <Box
          sx={[dropZone(isValidDrop), { backgroundImage: `url(${imgSrc})` }]}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
        >
          <img alt={imageName} src={imgSrc} style={hiddenImageStyles} />
          <CloudUploadOutlinedIcon
            fontSize="large"
            color={isValidDrop ? "success" : "primary"}
            sx={uploadIconStyles(Boolean(imgSrc.length))}
          />
        </Box>
      </Box>
    </Box>
  );
}
