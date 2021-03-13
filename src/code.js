import { convertRgbToHex, getContrastScores, getRGB, calculateContrast, foregroundColor, foregroundAlpha, backgoundColor } from './logic.js';

figma.showUI(__html__);

function sendContrastInfo(contrast, foreground, backgound) {
    figma.ui.postMessage({
        type: 'selectionChange',
        foreground: convertRgbToHex(foreground),
        background: convertRgbToHex(backgound),
        contrast,
        scores: getContrastScores(contrast),
    })
}

figma.on('selectionchange', () => {
    if (figma.currentPage.selection.length > 1) {
        const selection = figma.currentPage.selection.filter(
            node => node.fills.length > 0 && node.fills[0].type === 'SOLID'
        )
        const fills = selection.map(node => node.fills[0])
        foregroundColor = getRGB(fills[0].color)
        foregroundAlpha = fills[0].opacity
        backgoundColor = getRGB(fills[1].color)
        const contrast = calculateContrast(
            foregroundColor,
            foregroundAlpha,
            backgoundColor,
        )
        sendContrastInfo(contrast, foregroundColor, backgoundColor)
    }
})