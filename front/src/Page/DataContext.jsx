export let json = {
  Dpto: "",
  Mpio: "",
  Zona: "",
  Sector: "",
  Comuna: "",
  Barrio: "",
  Manzana: "",
  Terreno: "",
  Condicion: "",
  Edificio: "",
  Piso: "",
  Unidad: "",
}; //Json Cuando se tengan mas de una Unidad

export let FinalJson = {
  Unidad: [],
};

//Objeto con los valores generales
export const variable = {
  caracteristicasunidadconstruccion: {
    identificador: "",
    tipo_construccion: "",
    tipo_unidad_construccion: "",
    tipo_planta: "",
    total_plantas: "",
    total_habitaciones: "",
    total_banios: "",
    total_locales: "",
    anio_construccion: "",
    uso: "",
    avaluo_unidad_construccion: "",
    area_construida: 0,
    area_privada_construida: 0,
    comienzo_vida_util_version: "",
    fin_vida_util_version: "",
    espacio_de_nombres: "Fusagasuga",
    local_id: "",
    observaciones: "",
    calificacionconvencional: [],
    calificacionnoconvencional: [],
  },
};
export function resetJson() {
  FinalJson = {
    Unidad: [],
  };
  identi.id = 0;
}
//Objeto para el grupo gpcal = Grupo Calificacion
const newgpcal = [];

//Llevar un control con las unidades que se agregan
export let identi = {
  id: 0,
};
export function incrementIdenti() {
  identi.id = identi.id + 1;
}
//Captura el valor del id de Destinacion
export let destino = {
  tipo_calificar: "",
  tipo_anexo: 0,
};

//Cambiar numero a letra
function numlet() {
  variable.caracteristicasunidadconstruccion.identificador =
    String.fromCharCode(64 + identi.id);
}

export const dataobjetoconstruccion = {
  tipo_construccion: "",
  puntos: 0,
};
function Resetcaracteristica() {
  variable.caracteristicasunidadconstruccion = {
    identificador: "",
    tipo_construccion: "",
    tipo_unidad_construccion: "",
    tipo_planta: "",
    total_plantas: "",
    total_habitaciones: "",
    total_banios: "",
    total_locales: "",
    anio_construccion: "",
    uso: "",
    avaluo_unidad_construccion: "",
    area_construida: 0,
    area_privada_construida: 0,
    comienzo_vida_util_version: "",
    fin_vida_util_version: "",
    espacio_de_nombres: "Fusagasuga",
    local_id: "",
    observaciones: "",
    calificacionconvencional: [],
    calificacionnoconvencional: [],
  };
}
//Metodo para crear Unidades
export function crearobjetos() {
  //Resetcaracteristica();
  let cloneVariable = variable;
  Resetcaracteristica();
  let sumatotal = 0;
  numlet();
  if (dataobjetoconstruccion != undefined) {
    //Manejo del Menu Generado de construccion Convencional (Pestañas)
    if (
      cloneVariable.caracteristicasunidadconstruccion.tipo_construccion == 66
    ) {
      //capturar los valores de las pestañas
      Object.entries(dataobjetoconstruccion.puntos).map((item, index) => {
        //item[0] Nombre de cada espacio
        //item[0][0] traeria el primer caracter del nombre
        const data = item[0][0];
        agregarNumero(data);
      });
      //Creacion de objetos
      aux.forEach((info) => {
        let suma = 0;
        //alloc  todos los objetos de construccion que se selecciono
        const allobj = [];
        Object.entries(dataobjetoconstruccion.puntos).map((item, index) => {
          if (item[0][0] == info) {
            const objetoconstruccion = {
              tipo_construccion:
                dataobjetoconstruccion.tipo_construccion[item[0]],
              puntos: item[1],
            };
            suma += parseInt(item[1]);
            allobj.push(objetoconstruccion);
          }
        });
        const auxgpcal = {
          clase_calificacion: info,
          subtotal: suma,
          objetoconstruccion: allobj,
        };
        sumatotal += auxgpcal.subtotal;
        newgpcal.push(auxgpcal);
      });
      const calificacionconvencional = {
        tipo_calificar: destino.id,
        total_calificacion: sumatotal,
        grupocalificacion: newgpcal,
      };

      cloneVariable.caracteristicasunidadconstruccion.calificacionconvencional.push(
        calificacionconvencional
      );
    } //Manejo del Menu Generado de construccion No Convencional
    if (
      cloneVariable.caracteristicasunidadconstruccion.tipo_construccion == 67
    ) {
      const calificacionnoconvencional = {
        tipo_anexo: destino.anexo,
      };
      cloneVariable.caracteristicasunidadconstruccion.calificacionnoconvencional.push(
        calificacionnoconvencional
      );
    }

    return cloneVariable;
  }
}

export function cargarobjetos(objeto) {
  const unidades = [...FinalJson.Unidad];
  // Agrega el nuevo registro al arreglo de unidades
  unidades.push(objeto);
  FinalJson = { Unidad: unidades };
}
//Funcion para capturar el id de las pestañas
let aux = new Set();
function agregarNumero(numero) {
  if (!aux.has(numero)) {
    aux.add(numero);
  }
}
/*    */
