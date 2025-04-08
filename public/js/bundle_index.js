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

const containerMain = document.querySelector(".main");
//atrapamos el valor del main del HTML para poder agregarle el section

const containerSection = document.createElement("section");
containerSection.classList.add("form-section"); //le agregamos la clase
//creamos un section para poder agregarle el formulario

containerMain.append(containerSection);
//agregamos el section al main

const containerSectionForm = document.querySelector(".form-section");
//guardamos el section del HTML en una constante para poder manipularlo

document.getElementById("contacto").addEventListener("click", (e) => {
    //contacto es el id de <a> que se encuentra en el HTML
    e.preventDefault();

    if (!document.querySelector(".form-section__article")) {
      //verifica si el article existe en el DOM
      const containerArticleForm = document.createElement("article"); //creamos un article
      containerArticleForm.classList.add("form-section__article"); //le agregamos la clase del CSS
      containerArticleForm.innerHTML += `

  <form class="form">
  <button class="form__close">✖️</button> <!--el boton se agrega al article para cerrar el formulario-->
  <h2>Contáctanos</h2>
  
    <label class="form__label" for="name">Nombre:</label>
    <input class="form__input" id="name"type="text" placeholder="Nombre" required>

    <label class="form__label" for="email">Email:</label>
    <input class="form__input" id="email" type="email" placeholder="Email" required>

    <label class="form__label" for="tel">Numero de teléfono:</label>
    <input class="form__input" id="celular" type="tel" placeholder="Numero de teléfono" required>

    <button class="form__enviar" type="submit">Enviar</button>
  </form>
  
  `;
      containerSectionForm.append(containerArticleForm); //agregamos el article al section que tiene la clase active
      document.body.style.overflow = "hidden"; // Quita el scroll
    } //cierra el if
    containerSectionForm.classList.add("form-section--active"); //le agregamos la clase active al section para que se active el formulario
  });

//cerrar el modal section active
const closeModal = () => {
  containerSectionForm.classList.remove("form-section--active");
  document.body.style.overflow = "auto"; // Restaura el scroll
};

//cerramos el modal al hacer click en el botón
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("form__close")) {
    //si le da click a la clase del boton, se cierra el modal
    closeModal();
  }
});

//cerrar el modal al hacer click fuera del formulario
containerSectionForm.addEventListener("click", (e) => {
  if (e.target === containerSectionForm) {
    closeModal();
  }
});

//ENVIAR LA INFORMACIÓN DEL FORMULARIO A LA BASE DE DATOS
/*NOTA IMPORTANTE: debido a que el formulario se crea despues de que se le da click al anchor <a> de contacto.
 debemos escuchar el evento de la etiqueta primero para poder usar el boton del formulario. para que no arroje class null 
 en el formulario debido a que el formulario se crea despues de que se le da click al anchor <a> de contacto.
 -- revisar form.js para mas detalles. --
 
 Evitamos enviar multiples submit al formulario con setTimeout*/

document.getElementById("contacto").addEventListener("click", () => {
  // Usamos `setTimeout` para esperar a que el formulario se agregue al DOM
  setTimeout(() => {
    const formulario = document.querySelector(".form");

    // Eliminamos cualquier event listener duplicado reemplazando el formulario por un clon
    formulario.replaceWith(formulario.cloneNode(true));

    // Reasignamos la variable al nuevo formulario clonado
    const nuevoFormulario = document.querySelector(".form");

    // Agregamos el evento `submit` al nuevo formulario
    nuevoFormulario.addEventListener("submit", async (e) => {
      e.preventDefault();

      // Capturamos los valores de los inputs del formulario
      const datos = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        celular: document.getElementById("celular").value,
      };

      try {
        const response = await fetch(
          "/php_Data/form_post.php",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(datos),
          }
        );

        console.log("Estado de la respuesta:", response.status);

        const data = await response.json();
        console.log("Respuesta del servidor:", data);

        if (data.mensaje) {
          //si el estado de la petición es true, se ejecuta el alert
          alert("¡Registro exitoso!");
          nuevoFormulario.reset(); // Limpiar los campos después del éxito
        } else {
          alert("Error: " + data.error);
        }
      } catch (error) {
        console.error("Error en la petición:", error);
        alert("Hubo un problema al enviar el formulario.");
      }
    });
  }, 100); // Esperamos un poco para asegurarnos de que el formulario existe en el DOM
});

const cargarDatos = async () => {
  try {
    const response = await fetch("/php_Data/table_get.php");

    const data = await response.json();
    console.log(data);

    const tbody = document.getElementById("tbody");

    data.forEach((datos) => {
      const fila = document.createElement("tr");
      fila.innerHTML += `
      <td>${datos.id}</td>
      <td>${datos.name}</td>
      <td>${datos.email}</td>
      <td>${datos.celular}</td>
     `;
      tbody.appendChild(fila);
    });
  } catch (error) {
    console.log(error);
  }
};
cargarDatos();
