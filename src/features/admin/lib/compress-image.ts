const MAX_SIDE = 1600;
const QUALITY = 0.85;

// Reduce la foto del celular antes de subirla (cuida el espacio de Storage).
export function compressImage(file: File): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    const url = URL.createObjectURL(file);
    image.onload = () => {
      URL.revokeObjectURL(url);
      const scale = Math.min(1, MAX_SIDE / Math.max(image.width, image.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(image.width * scale);
      canvas.height = Math.round(image.height * scale);
      canvas
        .getContext("2d")
        ?.drawImage(image, 0, 0, canvas.width, canvas.height);
      canvas.toBlob(
        (blob) => (blob ? resolve(blob) : reject(new Error("toBlob"))),
        "image/jpeg",
        QUALITY,
      );
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("load"));
    };
    image.src = url;
  });
}
