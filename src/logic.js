export var foregroundColor
export var foregroundAlpha
export var backgoundColor

export function convertRgbToHex(color) {
    const hex = color
        .map((col) => {
            const hexColor = col.toString(16);
            return `0${hexColor}`.slice(-2);
        })
        .join("");
    return `#${hex}`;
}

export function calculateLuminance(color) {
    const normalizedColor = color.map((channel) => channel / 255);
    const gammaCorrectedRGB = normalizedColor.map((channel) =>
        channel <= 0.03928 ?
        channel / 12.92 :
        Math.pow((channel + 0.055) / 1.055, 2.4)
    );
    const luminance =
        gammaCorrectedRGB[0] * 0.2126 +
        gammaCorrectedRGB[1] * 0.7152 +
        gammaCorrectedRGB[2] * 0.0722;
    return luminance;
}

export function getRGB({ r, g, b }) {
    const rgbColorArray = [r, g, b].map((channel) => Math.round(channel * 255));
    return rgbColorArray;
}

function overlay(foreground, alpha, backgound) {
    if (alpha >= 1) {
        return foreground;
    }
    const overlaid = foreground.map((channel, i) =>
        Math.round(channel * alpha + backgound[i] * (1 - alpha))
    );
    return overlaid;
}

export function getContrastScores(contrast) {
    let largeText;
    let normalText;
    switch (true) {
        case contrast > 7:
            largeText = "AAA";
            normalText = "AAA";
            break;
        case contrast > 4.5:
            largeText = "AAA";
            normalText = "AA";
            break;
        case contrast > 3:
            largeText = "AA";
            normalText = "FAIL";
            break;
        default:
            largeText = "FAIL";
            normalText = "FAIL";
            break;
    }
    return { largeText, normalText };
}

export function calculateContrast(foreground, alpha, backgound) {
    if (alpha < 1) {
        foreground = overlay(foreground, alpha, backgound);
    }
    const foregroundLuminance = calculateLuminance(foreground) + 0.05;
    const backgroundLuminance = calculateLuminance(backgound) + 0.05;
    let contrast = foregroundLuminance / backgroundLuminance;
    if (backgroundLuminance > foregroundLuminance) {
        contrast = 1 / contrast;
    }
    // round to two decimal places
    contrast = Math.floor(contrast * 100) / 100;
    return contrast;
}