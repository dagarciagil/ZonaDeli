const cargarDatos = async () => {
  try {
    const response = await fetch("/php_Data/table_get.php");

    const dataTable = await response.json();
    // console.log(dataTable);

    const tbody = document.getElementById("tbody");

    dataTable.forEach((datos) => {
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
