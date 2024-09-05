export const handleImageChange = (
  event,
  setSelectedImage,
  options = { type: "avatar" },
) => {
  let maxSize;
  const { type } = options;

  if (type === "avatar") {
    maxSize = 100 * 1024; // 100KB para avatares
  } else if (type === "materia") {
    maxSize = 500 * 1024; // 500KB para imagens de matéria
  }

  const file = event.target.files[0];

  if (file && file.size > maxSize) {
    alert(
      `A imagem é muito grande. Por favor, selecione uma imagem menor que ${maxSize / 1024}KB.`,
    );
    return;
  }

  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      const img = new Image();
      img.src = reader.result;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        let targetWidth, targetHeight;

        if (type === "avatar") {
          targetWidth = targetHeight = 128; // Tamanho para avatares
        } else if (type === "materia") {
          targetWidth = 1200;
          targetHeight = 675; // Tamanho para imagens de matéria (16:9)
        }

        const widthRatio = targetWidth / width;
        const heightRatio = targetHeight / height;
        const scale = Math.max(widthRatio, heightRatio);

        const scaledWidth = width * scale;
        const scaledHeight = height * scale;

        const offsetX = (scaledWidth - targetWidth) / 2;
        const offsetY = (scaledHeight - targetHeight) / 2;

        canvas.width = targetWidth;
        canvas.height = targetHeight;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, -offsetX, -offsetY, scaledWidth, scaledHeight);

        const resizedImage = canvas.toDataURL("image/jpeg", 0.8); // qualidade de 0.8
        setSelectedImage(resizedImage);
      };
    };
    reader.readAsDataURL(file);
  }
};
