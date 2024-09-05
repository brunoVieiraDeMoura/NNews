import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import Button from "@mui/material/Button";
import Slider from "@mui/material/Slider";
import Stack from "@mui/material/Stack";
import { getCroppedImg } from "../../util/cropImageUtils";
import PropTypes from "prop-types";

const ImageCropper = ({ imageSrc, onCropComplete }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1.6);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropChange = (crop) => {
    setCrop(crop);
  };

  const onZoomChange = (zoom) => {
    setZoom(zoom);
  };

  const onCropCompleteHandler = useCallback(
    (croppedArea, croppedAreaPixels) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    [],
  );

  const onSave = useCallback(async () => {
    const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
    onCropComplete(croppedImage);
  }, [croppedAreaPixels, onCropComplete, imageSrc]);

  return (
    <Stack spacing={2} sx={{ p: 2 }} alignItems="center">
      <div
        style={{
          position: "relative",
          width: "100%",
          height: 400,
          background: "rgba(19,8,1,.8)",
        }}
      >
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          aspect={1} // Define proporção 1:1 para avatares
          onCropChange={onCropChange}
          onZoomChange={onZoomChange}
          onCropComplete={onCropCompleteHandler}
          style={{
            cropAreaStyle: {
              borderRadius: "50%",
            },
          }}
        />
      </div>
      <Slider
        color="textSecondary"
        value={zoom}
        min={1}
        max={3}
        step={0.1}
        aria-labelledby="Zoom"
        onChange={(e, zoom) => setZoom(zoom)}
      />
      <Button variant="contained" color="secondary" onClick={onSave}>
        Salvar
      </Button>
    </Stack>
  );
};

ImageCropper.propTypes = {
  imageSrc: PropTypes.string,
  onCropComplete: PropTypes.func.isRequired,
};

export default ImageCropper;
