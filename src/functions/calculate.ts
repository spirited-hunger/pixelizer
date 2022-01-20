const relativeBrightness = (red: number, green: number, blue: number) : number => {
  /* 
  Human eyes do not percieve red green and blue the same.
  need different amount of brightness for red green blue respectively 

  This utility function will adjust each values of rgb to a visually accurate brightness value for human perception
  */
  return Math.floor(
    Math.sqrt(
      (red * red) * 0.299 +
      (green * green) * 0.587 +
      (blue * blue) * 0.114
    )
  );
}

export { relativeBrightness }
