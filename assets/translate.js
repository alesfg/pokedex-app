export const translateType = (type) => {
    const tipos = {
      fire : "fuego",
      flying : "volador",
      grass : "planta",
      poison : "veneno",
      water : "agua",
      bug : "bicho",
      fighting : "luchador",
      rock : "roca",
      ground: "tierra",
      psychic : "psíquico",
      electric : "eléctrico",
      fairy : "hada",
      ice : "hielo",
      dragon : "dragón",
      dark : "oscuridad",
      ghost : "fantasma",
      steel : "acero",
      normal : "normal"
    }
    return  tipos[type];
}
