'use strict';

const Color = require('color');

const lerp = (start, end, weight) => {
    return start * (1 - weight) + end * weight;
};

module.exports = function (startColorString, endColorString, gradientDegree, outputFormat) {
    const startColor = new Color(startColorString);
    const endColor = new Color(endColorString);
    
    const degree = gradientDegree ? gradientDegree : 0.5
    const outputFormat = outputFormat ? outputFormat : 'hsl'
    
    const resultColor = new Color({
        h: lerp(startColor.hue(), endColor.hue(), gradientDegree),
        s: lerp(startColor.saturationl(), endColor.saturationl(), gradientDegree),
        l: lerp(startColor.lightness(), endColor.lightness(), gradientDegree),
        alpha: lerp(startColor.alpha(), endColor.alpha(), gradientDegree),
    });

    if (typeof resultColor[outputFormat] !== 'function') {
        throw new Error(`invalid output format ${outputFormat}`);
    }

    if (outputFormat === 'hex') {
        return resultColor[outputFormat]();
    }
    return resultColor[outputFormat]().string();
};
