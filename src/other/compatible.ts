type StyleObject = { [key: string]: string };
const applyStyles = (element: HTMLElement): void => {
    const prefixedStyles: StyleObject = {};
    // Iterate through the style properties of the element
    for (const property in element.style) {
        if (Object.hasOwnProperty.call(element.style, property)) {
            const prefixedProperty = addVendorPrefix(property);
            prefixedStyles[prefixedProperty] = element.style[property];
        }
    }


    // Apply the styles back to the element
    Object.assign(element.style, prefixedStyles);
};

const addVendorPrefix = (property: string): string => {
    const prefixes = ['', 'webkit', 'moz', 'ms', 'o'];
    const style = document.createElement('div').style;

    // Check if the property is supported without prefixes
    if (property in style) {
        return property;
    }

    // Add prefixes and check if any is supported
    for (const prefix of prefixes) {
        const prefixedProperty = prefix + (prefix ? property.charAt(0).toUpperCase() + property.slice(1) : property);
        if (prefixedProperty in style) {
            return prefixedProperty;
        }
    }

    // If no prefix is supported, return the original property
    return property;
};

export default applyStyles;
// Example usage

