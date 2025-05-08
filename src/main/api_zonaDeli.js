const token =
  "IGAAXWJIkLhfJBZAE55VjMtR2JPZA0NQeG1BdUpQQXYxRDB2Nk00MlV3RldyWGRobnRzRVJMc0RaNHU5ellrTGdNTmE1TDJBV1FJYTA2YXRtMmJtaV91UDNXbzRWX01QZAWI3cWN5QzExeDN1UXJkZAGh4QmpIX24wUUppenFtbXdyVQZDZD";

const reels = async () => {
  try {
    const response = await fetch(
      `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp&access_token=${token}`
    );
    const datosReels = await response.json();
     //le envíamos los datosReels de los reels como parametro a la función MostrarPost
    MostrarPost(datosReels.data);
    console.log("conexión exitosa", datosReels.data); //el data es un objeto con todos los datosReels de los reels, parecido a la monografía
  } catch (error) {
    console.log("error no se pudo conectar con la API",error);
  }
};

const MostrarPost = (reels) => {
  // Atrapa los datosReels de los reels y los muestra en el HTML
  const containerReel = document.querySelector(".instagram-feed");

  // Usa .slice(0, 10) para limitar los reels a los primeros 10 (0 es de donde inicia el array del json y 10 donde termina).
  reels.slice(0, 18).forEach((reel) => {
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