const token =
  "IGAAXWJIkLhfJBZAE15aDBGT2JmdXBlbExwV0tZAQkgtLWNQaHlWalZArc1VuWlhUTEtQMGhXbVZABcF9YRUhMVHFPdjZAVbWpoS09scGUtSVlzTjJUZAGstX0c2YzN0SWNNejc5RGZAqQTF2bktMTmRoVVNvSU1ZANVIxam95d3hkRHF4cwZDZD";

const reels = async () => {
  try {
    const response = await fetch(
      `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp&access_token=${token}`
    );
    const datos = await response.json();
     //le envíamos los datos de los reels como parametro a la función MostrarPost
    MostrarPost(datos);
    // console.log("conexión exitosa", datos.data); //el data es un objeto con todos los datos de los reels, parecido a la monografía
  } catch (error) {
    console.log("error no se pudo conectar con la API",error);
  }
};

const MostrarPost = (reels) => {
  // Atrapa los datos de los reels y los muestra en el HTML
  const containerReel = document.querySelector(".instagram-feed");

  // Usa .slice(0, 10) para limitar los reels a los primeros 10 (0 es de donde inicia el array del json y 10 donde termina).
  reels.data.slice(0, 18).forEach((reel) => {
    const reelElement = document.createElement("div");
    reelElement.classList.add("instagram-feed__reel-card");

    if (reel.media_type == "IMAGE") {
      reelElement.innerHTML += `
        <img src="${reel.media_url}" alt="Post de Instagram">
      `;
    } else if (reel.media_type == "VIDEO") {
      reelElement.innerHTML += `
        <video src="${reel.media_url}" controls></video>
      `;
    } else if (reel.media_type == "CAROUSEL_ALBUM") {
      reelElement.innerHTML += `
        <img src="${reel.media_url}" alt="Post de Instagram">
      `;
    }
    containerReel.appendChild(reelElement);
  });
};
reels();