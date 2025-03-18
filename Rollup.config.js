export default [
  {
    input: "src/index.js", // Archivos de entrada y de salida para las funciones de la pagina principal
    output: {
      file: "public/js/bundle_index.js",
      format: "es",
    },
  },
  {
    input: "src/recipes.js", // archivos de entrada y salida para las funciones del HMTL recipes
    output: {
      file: "public/js/bundle_recipes.js",
      format: "es",
    },
  },
];
