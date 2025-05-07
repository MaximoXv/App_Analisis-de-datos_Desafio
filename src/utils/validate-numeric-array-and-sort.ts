export const validateArrayAndSort = (values: number[]) => {
    if (!Array.isArray(values)) {
      throw new Error("El valor debe ser un array");
    }
  
    if(values.length === 0){
      throw new Error("El array no puede estar vacío");
    }
  
    if (!values.every((v) => typeof v === "number" && !isNaN(v))) {
      throw new Error("Todos los elementos deben ser números.");
    }
  
    return [...values].sort((a, b) => a - b);
  };