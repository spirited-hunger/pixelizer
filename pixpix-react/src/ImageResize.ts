type ResizedImgState = {
  imageURL: string;
  imageElement: HTMLImageElement;
  imagePXWidth: number;
  imagePXHeight: number;
  imageCSSWidth: number;
  imageCSSHeight: number;
  imageDirection: "landscape" | "portrait";
};

type ResizedImgSize = {
  imageElement: HTMLImageElement;
  imagePXWidth: number;
  imagePXHeight: number;
  imageCSSWidth: number;
  imageCSSHeight: number;
  imageDirection: "landscape" | "portrait";
};

type imgURL = {
  fileURL: string;
};

const getImgURL = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result as string);
    };
    fileReader.onerror = reject;
  });
};

const getImgWH = (
  imageUrl: string,
  maxPXLength: number,
  maxCSSLength: number
): Promise<ResizedImgSize> => {
  return new Promise((resolve, reject) => {
    const originalImage = new Image();
    originalImage.src = imageUrl;
    originalImage.onload = () => {
      const originalWidth = originalImage.width;
      const originalHeight = originalImage.height;

      const whRatio = originalWidth / originalHeight;

      let imageDirection: "landscape" | "portrait";
      let imagePXWidth: number;
      let imagePXHeight: number;
      if (whRatio >= 1) {
        /* width is bigger */
        imageDirection = "landscape";

        imagePXWidth = maxPXLength;
        imagePXHeight = maxPXLength / whRatio;
      } else {
        /* height is bigger */
        imageDirection = "portrait";

        imagePXWidth = maxPXLength * whRatio;
        imagePXHeight = maxPXLength;
      }

      const imageCSSWidth = (imagePXWidth * maxCSSLength) / maxPXLength;
      const imageCSSHeight = (imagePXHeight * maxCSSLength) / maxPXLength;

      resolve({
        imageElement: originalImage,
        imagePXWidth,
        imagePXHeight,
        imageCSSWidth,
        imageCSSHeight,
        imageDirection,
      });
    };
    originalImage.onerror = reject;
  });
};

export const resizeImage = async (
  file: File,
  maxPXLength: number,
  maxCSSLength: number
): Promise<ResizedImgState> => {
  const imageURL = await getImgURL(file);

  const { 
    imageElement, 
    imagePXWidth, 
    imagePXHeight, 
    imageCSSWidth,
    imageCSSHeight,
    imageDirection,
  } = await getImgWH(
    imageURL,
    maxPXLength,
    maxCSSLength
  );

  return {
    imageURL,
    imageElement,
    imageDirection,
    imagePXWidth,
    imagePXHeight,
    imageCSSWidth,
    imageCSSHeight,
  };
};
