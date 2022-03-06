import React, { useRef, useState, useEffect } from 'react';

import Button from './Button';
import './ImagePicker.css';

interface IImagePicker {
    id: string;
    center?: boolean;
    onImageChange: (id: string, value: string | File, isValid: boolean) => void;
}

const ImagePicker: React.FC<IImagePicker> = ({ id, center, onImageChange }) => {
    const filePickerRef = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState<File | null>(null);
    const [image, setImage] = useState<string | ArrayBuffer | null>(null);

    console.log('image', image);
    console.log('image type', typeof image);
    console.log('file', file);
    console.log('file type', typeof file);

    const pickedHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
        if (evt.target.files?.length) {
            setFile(evt.target.files[0]);
            const pickedFile = evt.target.files[0];

            onImageChange(id, evt.target.files[0], true);
        }
    };

    const pickImageHandler = () => {
        filePickerRef.current!.click();
    };

    useEffect(() => {
        if (!file) return;

        const fileReader = new FileReader();
        fileReader.onloadend = () => {
            setImage(fileReader.result);
        };
        fileReader.readAsDataURL(file);
    }, [file]);

    return (
        <div className="form-control">
            <input
                id={id}
                ref={filePickerRef}
                style={{ display: 'none' }}
                type="file"
                accept=".jpg,.png,.jpeg"
                onChange={pickedHandler}
            />
            <div className={`image-upload ${center && 'center'}`}>
                <Button type="button" onClick={pickImageHandler}>
                    PICK IMAGE
                </Button>
                {typeof image === 'string' ? (
                    <div className="image-upload__preview">
                        <img src={image} alt="Preview" />
                    </div>
                ) : (
                    <p>Image preview will be shown once you select image!</p>
                )}
            </div>
        </div>
    );
};

export default ImagePicker;
