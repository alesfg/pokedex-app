const translateType = (type) => {
    //  const t= type == "fire" ? 'fuego' : type,
          switch (type) {
            case "fire":
              return "fuego"
              break;
            case "flying":
              return "volador"
              break
            case "grass":
              return "planta"
              break
            case "poison":
              return "veneno"
              break
            case "water":
              return "agua"
              break
            case "bug":
              return "bicho"
              break
            case "fighting":
              return "luchador"
              break
            case "rock":
              return "roca"
              break
            case "psychic":
              return "psíquico"
              break
            case "electric":
              return "eléctrico"
              break
            case "fairy":
              return "hada"
              break
            case "ice":
              return "hielo"
              break
            case "dragon":
              return "dragón"
              break
            case "dark":
              return "oscuridad"
              break
            case "ground":
              return "tierra"
              break
            case "ghost":
              return "fantasma"
              break
            case "steel":
              return "acero"
              break
            default:
              return type
              break;
          }
    }

    export { translateType }