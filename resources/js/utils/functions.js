window.minMax = (value, min, max) => {
    if (!value) return value;
    return Math.min(Math.max(value, min), max);
}
