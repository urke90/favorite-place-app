import React, { useRef, useState, useEffect } from 'react';

import Button from './Button';
import './ImagePicker.css';

const ImagePicker = (props: any) => {
    const filePickerRef = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState<File>();
    const [image, setImage] = useState<string | ArrayBuffer | null>(null);

    const pickedHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
        if (evt.target.files?.length) {
            setFile(evt.target.files[0]);
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
                id={props.id}
                ref={filePickerRef}
                style={{ display: 'none' }}
                type="file"
                accept=".jpg,.png,.jpeg"
                onChange={pickedHandler}
            />
            <div className={`image-upload ${props.center && 'center'}`}>
                {typeof image === 'string' && (
                    <div className="image-upload__preview">
                        <img src={image} alt="Preview" />
                    </div>
                )}
                <Button type="button" onClick={pickImageHandler}>
                    PICK IMAGE
                </Button>
            </div>
        </div>
    );
};

export default ImagePicker;
