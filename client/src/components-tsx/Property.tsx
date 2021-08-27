import React from "react";

const Property = (props: {
    label: string;
    value: string;
}) => (
    <div className="property">
        <span className="key">{props.label}</span>
        <span className="value">{props.value}</span>
    </div>
);

export default Property;
