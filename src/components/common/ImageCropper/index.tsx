import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { useState } from "react";

const ImageCropper = ({
    avatarUrl,
    cancelEdit
}: { avatarUrl: string, cancelEdit: () => void }) => {
    const [cropper, setCropper] = useState<any>();

    const getCropData = async () => {
        if (cropper) {
            const file = await fetch(cropper.getCroppedCanvas().toDataURL())
                .then((res) => res.blob())
                .then((blob) => {
                    return new File([blob], "newAvatar.png", { type: "image/png" });
                });
            if (file) {
                //   authService
                //     .uploadAvatar(userId, file)
                //     .then(() => {
                //       refetchUser(userId);
                //       cancelEdit();
                //     })
                //     .catch((e) => alert(e));
            }
        }
    };

    return (
        <>
            <Cropper
                src={avatarUrl}
                style={{ height: 300, width: 300 }}
                aspectRatio={1}
                minCropBoxHeight={100}
                minCropBoxWidth={100}
                guides={false}
                checkOrientation={false}
                onInitialized={(instance) => {
                    setCropper(instance);
                }}
            />
            {/* <button
                className="mt-2 border border-solid border-black py-2 px-4 rounded cursor-pointer"
                onClick={getCropData}
            >
                Crop Image
            </button> */}
        </>
    );
}

export default ImageCropper