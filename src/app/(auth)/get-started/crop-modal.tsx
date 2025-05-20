import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { Dialog } from "@headlessui/react";

function UploadProgressBar({ value }: { value: number }) {
  return (
    <div className="relative pt-1">
      <div className="mb-4 flex h-2 overflow-hidden rounded bg-gray-200 text-xs">
        <div
          style={{ width: `${value}%` }}
          className="bg-primaryColor flex flex-col justify-center text-center whitespace-nowrap text-white shadow-none transition-all duration-500 ease-in-out"
        />
      </div>
    </div>
  );
}

interface ImageCropModalProps {
  imageUrl: string;
  onClose: () => void;
  onSave: (croppedImage: string) => void;
  isUploading: boolean;
  progress: number;
}

export default function ImageCropModal({
  imageUrl,
  onClose,
  onSave,
  isUploading,
  progress,
}: ImageCropModalProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback(
    (croppedArea: any, croppedAreaPixels: any) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    [],
  );

  const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener("load", () => resolve(image));
      image.addEventListener("error", (error) => reject(error));
      image.setAttribute("crossOrigin", "anonymous");
      image.src = url;
    });

  const getCroppedImg = async (imageSrc: string, pixelCrop: any) => {
    const image = await createImage(imageSrc);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      return null;
    }

    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height,
    );

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          console.error("Canvas is empty");
          return;
        }
        resolve(URL.createObjectURL(blob));
      }, "image/jpeg");
    });
  };

  const handleSave = async () => {
    if (croppedAreaPixels) {
      const croppedImage = await getCroppedImg(imageUrl, croppedAreaPixels);
      onSave(croppedImage as string);
    }
  };

  return (
    <Dialog
      open={true}
      onClose={onClose}
      className="fixed inset-0 z-10 overflow-y-auto"
    >
      <div className="flex min-h-screen items-center justify-center">
        <div className="fixed inset-0 bg-black opacity-30" />

        <div className="relative mx-4 w-full max-w-3xl rounded-lg bg-white">
          <div className="p-6">
            <h3 className="mb-4 text-lg leading-6 font-medium text-gray-900">
              Crop Image
            </h3>
            <div className="relative mb-4 h-64 w-full">
              <Cropper
                image={imageUrl}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            </div>
            {isUploading && <UploadProgressBar value={progress} />}
            <div className="flex justify-end space-x-2">
              <button
                onClick={onClose}
                className="rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={isUploading}
                className="bg-primaryColor hover:bg-primaryColor/80 rounded-md px-4 py-2 text-sm font-medium text-white"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
