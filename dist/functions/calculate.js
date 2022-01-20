const relativeBrightness = (red, green, blue) => {
    return Math.floor(Math.sqrt((red * red) * 0.299 +
        (green * green) * 0.587 +
        (blue * blue) * 0.114));
};
export { relativeBrightness };
//# sourceMappingURL=calculate.js.map