import React from "react";


export default function SinglePhoto(props) {
    return (
        <div>
            <img src={props.photoUrl} alt="Photo" width="600" className="mt-2 ms-5"/>
        </div>
    )
}