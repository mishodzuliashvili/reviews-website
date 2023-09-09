"use client";

import React, { useEffect, useRef } from "react";
import ReactToPrint from "react-to-print";
const ComponentToPrint = React.forwardRef((props: any, ref: any) => {
    return <div ref={ref}>My cool content here!</div>;
});
ComponentToPrint.displayName = "ComponentToPrint";

export default function Test() {
    const componentRef = useRef();

    return (
        <div>
            <ReactToPrint
                trigger={() => <button>Print this out!</button>}
                content={() => <div>Helo</div> || null}
            />
        </div>
    );
}
