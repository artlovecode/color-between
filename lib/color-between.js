'use strict';

const Color = require('color');

const lerp = (start, end, weight) => {
    return start * (1 - weight) + end * weight;
};

module.exports = function (startColorString, endColorString, gradientDegree, outputFormat) {
    const startColor = new Color(startColorString);
    const endColor = new Color(endColorString);
    
    const degree = gradientDegree ? gradientDegree : 0.5
    const format = outputFormat ? outputFormat : 'hsl'
    
    const resultColor = new Color({
        h: lerp(startColor.hue(), endColor.hue(), degree),
        s: lerp(startColor.saturationl(), endColor.saturationl(), degree),
        l: lerp(startColor.lightness(), endColor.lightness(), degree),
        alpha: lerp(startColor.alpha(), endColor.alpha(), degree),
    });

    if (typeof resultColor[format] !== 'function') {
        throw new Error(`invalid output format ${outputFormat}`);
    }

    if (outputFormat === 'hex') {
        return resultColor[format]();
    }
    return resultColor[outputFormat]().string();
};
