export default function preLoadImages() {
   const images = [
      "https://cdn.simpleicons.org/simpleicons/red",
      "https://cdn.simpleicons.org/simpleicons/green",
      "https://cdn.simpleicons.org/simpleicons/blue",
      "https://cdn.simpleicons.org/simpleicons/red",
      "https://cdn.simpleicons.org/simpleicons/green",
      "https://cdn.simpleicons.org/simpleicons/blue",
      "https://cdn.simpleicons.org/simpleicons/red",
      "https://cdn.simpleicons.org/simpleicons/green",
      "https://cdn.simpleicons.org/simpleicons/blue",
      "https://cdn.simpleicons.org/simpleicons/red",
      "https://cdn.simpleicons.org/simpleicons/green",
      "https://cdn.simpleicons.org/simpleicons/blue",
      "https://cdn.simpleicons.org/simpleicons/red",
      "https://cdn.simpleicons.org/simpleicons/green",
      "https://cdn.simpleicons.org/simpleicons/blue",
   ];

   const imagePromises = [];

   for (let i = 0; i < images.length; i++) {
      const img = new Image(30, 30);
      const imagePromise = new Promise((res, rej) => {
         img.onload = function () {
            res(img);
         };
         img.onerror = function () {
            rej(new Error("failed to load image."));
         };
         img.src = images[i];
      });

      imagePromises.push(imagePromise);
   }

   Promise.all(imagePromises).then((images) => {
      const event = new CustomEvent("imagesPreloaded", { detail: images });
      document.dispatchEvent(event);
   });
}
