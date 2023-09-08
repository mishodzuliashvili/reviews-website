import React from "react";

type layoutProps = {
    children: React.ReactNode;
};

export default function layout({ children }: layoutProps) {
    return <div className="px-5">{children}</div>;
}
