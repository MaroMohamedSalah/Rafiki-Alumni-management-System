import React, { useState } from 'react'
import UploadMaterialsPopUp from './UploadMaterialsPopUp';

export default function Test() {

    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const handleShowPopup = () => {
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };

    return <>
        <div>
            <button onClick={handleShowPopup}>Show Popup</button>
            {isPopupOpen && <UploadMaterialsPopUp isOpen={isPopupOpen} onClose={handleClosePopup} />}
        </div>
    </>
}


