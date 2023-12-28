import { useState, useEffect } from "react";
import useInfo from "../hooks/useInfo";
import Alerta from "../components/Alerta";
import Inscripcion from "../Json/dataAvaluo.json";

const FormularioResolucion = () => {
  const [serialResolucion, setSerialResolucion] = useState("");
  const [dia, setDia] = useState("");
  const [mes, setMes] = useState("");
  const [anio, setAnio] = useState("");
  const [nombre, setNombre] = useState("");
  const [cedula, setCedula] = useState("");
  const [ciudadCedula, setCiudadCedula] = useState("");
  const [numeroRadicado, setNumeroRadicado] = useState("");
  const [idAasociado, setIdAasociado] = useState("");
  const [numeroPredial, setNumeroPredial] = useState("");
  const [matriculaMatriz, setMatriculaMatriz] = useState("");
  const [zona, setZona] = useState("");
  const [numeroEscritura, setNumeroEscritura] = useState("");
  const [fechaEscritutra, setFechaEscritutra] = useState("");
  const [notaria, setNotaria] = useState("");
  const [ciudadNotaria, setCiudadNotaria] = useState("");
  const [matriSegregadoInicial, setMatriSegregadoInicial] = useState("");
  const [matriSegregadoFinal, setMatriSegregadoFinal] = useState("");
  const [diaNotificacionLetra, setDiaNotificacionLetra] = useState("");
  const [diaNotificacion, setDiaNotificacion] = useState("");
  const [mesNotificacionLetra, setMesNotificacionLetra] = useState("");
  const [anioNotificacionLetra, setAnioNotificacionLetra] = useState("");
  const [anioNotificacion, setAnioNotificacion] = useState("");
  const [nombreDirector, setnombreDirector] = useState("");
  const [documentosAdjuntados, setDocumentosAdjuntados] = useState([]);
  const [tipoTramite, setTipoTramite] = useState("");
  let [response, setResponse] = useState(0);
  const [opcionesSeleccionadas, setOpcionesSeleccionadas] = useState([]);
  const { mostrarAlerta, alerta, submitInfoResolucion, infoInscribir } =
    useInfo();

  useEffect(() => {
    loadTipo_Tramite();
  }, []);
  async function loadTipo_Tramite() {
    try {
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };
      let url =
        import.meta.env.VITE_API_URL_FIRST +
        "document/list/tipo-tramite?limit=2000";
      let response = await fetch(url, requestOptions);
      if (response.ok) {
        const result = await response.json();
        console.log("reso", result.data.data);
        setResponse(result.data.data);
      }
    } catch (error) {}
  }
  const adjuntarDocumentos = (e) => {
    const valorOpcion = e.target.value;
    console.log("123", valorOpcion);
    // Verificar si la opción ya está seleccionada
    if (documentosAdjuntados.includes(valorOpcion)) {
      // Si está seleccionada, quitarla del array
      setDocumentosAdjuntados(
        documentosAdjuntados.filter((opcion) => opcion !== valorOpcion)
      );
    } else {
      // Si no está seleccionada, agregarla al array
      setOpcionesSeleccionadas([...opcionesSeleccionadas, valorOpcion]);
    }
  };

  let auxinfoInscribir = Inscripcion;

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("info escribir", auxinfoInscribir);
    /*    if (
      [
        tipoTramite,
        serialResolucion,
        dia,
        mes,
        anio,
        nombre,
        cedula,
        ciudadCedula,
        numeroRadicado,
        idAasociado,
        numeroEscritura,
        fechaEscritutra,
        notaria,
        ciudadNotaria,
        diaNotificacionLetra,
        diaNotificacion,
        mesNotificacionLetra,
        anioNotificacionLetra,
        anioNotificacion,
        nombreDirector,
      ].includes("")
    ) {
      mostrarAlerta({
        msg: "Todos los Campos son Obligatorios",
        error: true,
      });
      return;
    }*/

    let sum = "";
    opcionesSeleccionadas.map((item, index) => {
      sum += " " + item + ", ";
    });
    console.log("sum ", sum);
    await submitInfoResolucion({
      englobe_texto: "iii) Plano de englobe",
      no_propiedad_horizontal: "005656",
      fecha_propiedad_horizontal: "01/01/2023",
      notaria_propiedad_horizo: "001",
      cuidad_notaria_propiedad_horizontal: "Bogota",
      fecha_escritura_publica: "01/01/2023",
      ciudad_notaria: "Bogota",
      acta_demolicion:
        "Acta de demolición expedida por la (Secretaría de Planeación) (Curaduría Primera/Segunda de Fusagasugá) (Secretaría de Gobierno). ",
      dia_inspeccion_ocular: "10/10/2023",
      argumentos: "argumentos",
      propietario_tipo: "el/la señor/señora",
      nombre_propietario: "Juan",
      documento_propietario: "1212",
      cuidad_propietario: "Villavicencio",
      departamento_propietario: "Meta",
      calidad_propietario: "propietario/propietaria, apoderado",
      solicitud_propietario:
        "actualización de linderos con efectos registrales/rectificación de área por imprecisa determinación con efectos registrales/rectificación de linderos por acuerdo entre las partes con efectos registrales",
      texto_inspeccion_ocular:
        "el reconocedor predial asignado procedió a realizar la inspección ocular el día DD/MM/AAAA, en la cual CITAR UNICAMENTE EN CASO DE QUE HAYA INSPECCIÓN OCULAR, DE LO CONTRARIO ELIMINAR EL TEXTO QUE HACE REFERENCIA A LA VISITA PRACTICADA",
      tipo_tramite:
        "el DESENGLOBE; el ENGLOBE; la INCORPORACIÓN DE CONSTRUCCIÓN; la REVISIÓN DE AVALÚO; la INSCRIPCIÓN DE UN PREDIO NUEVO; la INSCRIPCIÓN DE UNA MEJORA; la RECTIFICACIÓN DE ÁREA SEGÚN TÍTULOS; la RECTIFICACIÓN DE ÁREA CONSTRUIDA; la RECTIFICACIÓN DE DESTINO ECONÓMICO; la RECTIFICACIÓN POR CANCELACIÓN DE DOBLE INSCRIPCIÓN",
      tipo_tramite_2:
        "mutación de primera; mutación de segunda; mutación de tercera; mutación de cuarta; mutación de quinta; rectificación",
      articulos_tramite:
        "14, 15 literal c), 16 y 23 de la Resolución 1149 de 2021 emitida por el Instituto Geográfico Agustín Codazzi (IGAC). CAMBIAR LOS ARTÍCULOS DE ACUERDO CON LA MUTACIÓN O RECTIFICACIÓN CONTEMPLADA EN LA RESOLUCION 1149 DE 2021",
      nombre_mutacion: "INDICAR EL NOMBRE DE LA MUTACIÓN",
      fecha_requirio: "DD/MM/AAAA",
      fecha_presentar: "DD/MM/AAAA",
      fecha_visita: "DD/MM/AAAA",
      fecha_presenta_peticion: "DD/MM/AAAA",
      texto_inconsistencia_predio:
        "(con vigencias anteriores a la fecha de habilitación del Gestor Catastral Multipropósito del Municipio de Fusagasugá, fue inscrito) (con vigencia 01/01/2023 fue inscrito mediante resolución catastral No. 03-0000-2023 de fecha DD/MM/AAAA )",
      fecha_comunicacion: "DD/MM/AAAA",
      documentos_relacionados: sum,
      vigencia_conservacion_catastral: "01/01/2023",
      fecha_resolucion: "DD/MM/AAAA",
      numero_predial_desde: "252900001000000010007000000000",
      numero_predial_hasta: "252900001000000010007000000099",
      entidad_aprobo: "Secretaría de Planeación/Curaduría",
      area_terreno: "20",
      texto_asignar_puntaje:
        "(y a asignar el puntaje que esté acorde con lo estipulado en la ficha de calificación de construcciones adoptado por el Gestor Catastral. SÓLO SI MODIFICA TAMBIEN CALIFICACIÓN) ",
      unidad_construccion: [
        {
          unidad_construccion: "PISCINA",
          area_construida: "1",
        },
      ],
      argumento_usuario:
        "RELACIONAR TEXTUALMENTE Y ENTRE COMILLAS EL ARGUMENTO DEL USUARIO.",
      lista_documentos:
        "i) XXXXXXXXXX; ii) XXXXXXXX; iii) XXXXXXXXXXXXX; iv) XXXXXXXXXX; v) XXXXXXXXXXX; vi) XXXXXXXXX; vi) XXXXXXXXXX.",
      analisis_informe_valuatorio: "analisis informe valuatorio",
      se_grabo_base_datos:
        "(se grabó en la base de datos alfanumérica con la zona homogénea geoeconómica “##” y zona homogénea física “##”, siendo lo correcto, zona homogénea geoeconómica “##” y zona homogénea física “##” requiriéndose ajustar sus valores de acuerdo a esta ZHF y ZHG.)(se grabó en la base de datos alfanumérica con la zona homogénea geoeconómica “##” y zona homogénea física “##”, siendo necesario ajustar sus valores de acuerdo a esta ZHF y ZHG.) SELECCIONAR LA PRIMER OPCIÓN CUANDO CAMBIE EL NÚMERO DE LA ZONA O LA SEGUNDA OPCIÓN CUANDO EL NÚMERO DE LA ZONA SEA CORRECTO PERO EL VALOR ESTÉ MAL LIQUIDADO",
      pretenciones_argumentos:
        "TRANSCRIBIR EN COMILLAS LAS PRETENSIONES Y/O ARGUMENTACIÓN",
      revisión_avaluo_tipo_localizacion:
        "URBANA del Municipio de Fusagasugá, vigencia fiscal 01/01/2022, valores incrementados por el decreto 2653 /2022 para la vigencia 01/01/2023. RURAL del Municipio de Fusagasugá, vigencia fiscal 01/01/2023 SELECCIONAR LA OPCIÓN QUE CORRESPONDA Y ELIMINAR LA OTRA  ",
      confirmar_avaluo_variacion_cambio:
        "DEJARLO LO SIGUIENTE, SI EN EL CASO CONCRETO SE VA A CONFIRMAR EL AVALÚO CATASTRAL Y LA VARIACIÓN DEL AVALÚO RESPONDE AL CAMBIO SOLO DEL COMPONENTE ECONÓMICO\n\n Que con base en los documentos aportados, la información de la base catastral verificada, la inspección ocular realizada y lo dispuesto por las normas anteriormente mencionadas, se determina que la variación del avalúo catastral del predio, obedece al componente ECONÓMICO del mismo, es decir el valor del terreno y de construcción por metro cuadrado asignado para la zona homogénea geoeconómica, estudio establecido conforme a la identificación de las características económicas de los predios objeto del proceso de actualización catastral de la Zona URBANA / RURAL del municipio, en donde se fijan los valores unitarios por tipo de construcción como método de valoración masiva a partir de la investigación y el análisis estadístico del mercado inmobiliario.\n\nEn ese sentido, las zonas homogéneas físicas, para la zona urbana, son espacios geográficos de una región de la vivienda, reglamentación municipal del uso del suelo, u otras variables que permitan diferenciar estas áreas de las adyacentes. De tal forma, a partir del diseño de las zonas homogéneas físicas se realiza la investigación del mercado inmobiliario local y se determina las zonas homogéneas geoeconómicas, entendidas éstas como los espacios geográficos de una región con características similares en cuanto a su precio.\n\nPara el efecto, se investiga por zona homogénea física, el valor comercial del terreno, conforme a lo dispuesto por el artículo 2 del Decreto 1420 de 1998, en donde se entiende éste como “el precio más probable por el cual se transaría en un mercado donde el comprador y el vendedor actúan libremente con el pleno conocimiento de las condiciones físicas y jurídicas que afectan el bien”\n\nAsí las cosas, una vez se determinaron los valores unitarios tanto de terreno como por tipo de construcción, teniendo en cuenta el estudio de zonas en mención; el municipio de Fusagasugá adoptó los avalúos catastrales conforme a lo establecido en el Decreto 148 de 2020, cuyo artículo 2.2.2.1.1 del capítulo 1 “el avalúo catastral es el valor de un predio, resultante de un ejercicio técnico que, en ningún caso, podrá ser inferior al 60% del valor comercial o superar el valor de este último. Para su determinación no será necesario calcular de manera separada el valor del suelo y el de la construcción” (subrayado fuera de texto) ",

      imagen_inspeccion_ocular: "imagen",
      inconsistencias_zonas_hzh_zhg:
        "Que conforme a la identificación de las características económicas de los predios objeto del proceso de actualización catastral de la zona URBANA/RURAL del municipio, se realizó el estudio de zonas homogéneas físicas y zonas homogéneas geoeconómicas, metodología por medio de la cual se determinan los valores unitarios por tipo de construcción como método de valoración masiva a partir de la investigación y el análisis estadístico del mercado inmobiliario. \n\n Que de acuerdo a la información del componente económico verificada en la base de datos alfanumérica, geográfica, al Estudio de ZHF y ZHG y sus anexos, al concepto de norma de uso del suelo contempladas en el Plan de Ordenamiento Territorial vigente, es decir, el Acuerdo Municipal 029 de 2001, se logra determinar que el predio identificado con Folio de matrícula Inmobiliaria 157-XXXXX y número predial nacional 30-DIGITOS-CON-GUIONES, ubicado en la zona urbana del municipio de Fusagasugá, se grabó en la base de datos alfanumérica con la zona homogénea geoeconómica “13” y zona homogénea física “91”, siendo necesario ajustar sus valores de acuerdo a esta ZHF y ZHG.  DEJAR ESTE Y EL PARRAFO ANTERIOR, UNICAMENTE EN CASO DE QUE EXISTA INCONSISTENCIA EN LAS ZONAS HZH Y ZHG",
      segundo_articulo:
        "ARTÍCULO SEGUNDO: Actualizar la cartografía del predio(s) objeto de la presente resolución en la base geográfica del Gestor Catastral de Fusagasugá. SÓLO EN CASO DE REQUERIR MODIFICACIONES CARTOGRÁFICAS, DE LO CONTRARIO ELIMINAR Y RENUMERAR LOS DEMÁS ARTÍCULOS",
      tramite_id: tipoTramite,
      no_resolucion: serialResolucion,
      dia: diaNotificacion,
      mes: mesNotificacionLetra,
      vigencia: anioNotificacion,
      nombre_gestor: nombre,
      cedula_numero_gestor: cedula,
      cedula_cuidad_gestor: ciudadCedula,
      calidad_gestor: "PROPIETARIO",
      no_radicado: numeroRadicado,
      asociado_id: idAasociado,
      numero_predial: "252900001000000010007000000000",
      matricula_inmobiliaria: "1212212112",
      zona_ubicacion: "Rural",
      escritura_publica: numeroEscritura,
      fecha_now: fechaEscritutra,
      no_notaria: notaria,
      ciudad: ciudadNotaria,
      extension_desde: "157-00000",
      extension_hasta: "157-99999",
      ingrese_imagen: "INGRESAR IMÁGEN LEGIBLE Y CENTRADA",
      dia_now_letra: diaNotificacionLetra,
      dia_now_numero: diaNotificacion,
      mes_now_letra: mesNotificacionLetra,
      annio_letra: anioNotificacionLetra,
      annio_numero: anioNotificacion,
      nombre_director_ordenamiento: nombreDirector,
      cargo_director_ordenamiento:
        "Directora de Ordenamiento Territorial y Gestión Catastral",
      nombre_proyecto_abogado: "Luis Carlos",
      nombre_reviso_contratista: "Diego",
      reviso_aprobo_nombre: "Oscar Rivera Aguilar",
      reviso_aprobo_cargo: "Aux. Administrativo",
      cancela_datos_predio_nmero_catastral: [
        {
          cancela_datos_predio_nmero_catastral:
            "252900100000002150187000000000",
          cancela_datos_predio_matricula_inmobiliaria: "157-75298",
          cancela_datos_predio_direccion: "Lo No 6",
          cancela_datos_predio_destino_economico: "R",
          cancela_datos_predio_area_terreno: 748,
          cancela_datos_predio_area_construida: 0,
          cancela_datos_predio_avaluo: "$ 336,600,000",
          cancela_datos_predio_vigencia: "01012023",
        },
      ],
      cancela_propietarios_nmero_catastral: [
        {
          cancela_propietarios_nmero_catastral:
            "252900100000002150187000000000",
          cancela_propietarios_numero_propietario: "1",
          cancela_propietarios_nombre_propietario:
            "LA SOCIEDAD BERESNAJE COLOMBIA S",
          cancela_propietarios_tipo_documento: "N",
          cancela_propietarios_numero_documento: "9005943878",
        },
      ],
      inscribe_datos_predio_nmero_catastral:
        auxinfoInscribir.inscribe_datos_predio_nmero_catastral,
      inscribe_propietarios_nmero_catastral:
        auxinfoInscribir.inscribe_propietarios_nmero_catastral,
      inscribe_liquidacion_nmero_catastral:
        auxinfoInscribir.inscribe_liquidacion_nmero_catastral,
    });
    setSerialResolucion("");
    setDia("");
    setMes("");
    setAnio("");
    setNombre("");
    setCedula("");
    setCiudadCedula("");
    setNumeroRadicado("");
    setIdAasociado("");
    setZona("");
    setNumeroEscritura("");
    setFechaEscritutra("");
    setNotaria("");
    setCiudadNotaria("");
    setDiaNotificacionLetra("");
    setDiaNotificacion("");
    setMesNotificacionLetra("");
    setAnioNotificacionLetra("");
    setAnioNotificacion("");
    setnombreDirector("");
  };

  const { msg } = alerta;
  console.log("12345", documentosAdjuntados);
  console.log("123456", opcionesSeleccionadas);
  return (
    <form
      className="flex flex-col  py-10 px-5 md:w-1/2 rounded-lg shadow"
      onSubmit={handleSubmit}
    >
      {msg && <Alerta alerta={alerta} />}
      <div className=" flex flex-col  mb-3">
        <label className="font-semibold m-2" htmlFor="serialResolucion">
          Tipo Resolucion
        </label>
        <select
          name="tipo_tramite"
          className="border-2 rounded-lg text-center m-1"
          value={tipoTramite}
          onChange={(e) => setTipoTramite(e.target.value)}
        >
          <option></option>
          {response != 0
            ? response.map((item, index) => {
                return <option value={item.t_id}>{item.nombre}</option>;
              })
            : null}
        </select>
      </div>
      <div className="  mb-3">
        <label className="font-semibold m-2" htmlFor="serialResolucion">
          Serial Resolución
        </label>
        <input
          type="text"
          id="serialResolucion"
          className="w-full border-2 rounded-lg text-center "
          placeholder="03-0038-2023"
          value={serialResolucion}
          onChange={(e) => setSerialResolucion(e.target.value)}
        />
      </div>
      {/*  <div className="  mb-3">
        <label className="font-semibold m-2 " htmlFor="dia">
          Día
        </label>
        <input
          type="text"
          id="dia"
          className="w-full border-2 rounded-lg text-center "
          placeholder="12"
          value={dia}
          onChange={(e) => setDia(e.target.value)}
        />
      </div> */}
      {/* <div className=" mb-3">
        <label className="font-semibold m-2 " htmlFor="mes">
          Mes
        </label>
        <input
          type="text"
          id="mes"
          className="w-full border-2 rounded-lg text-center "
          placeholder="Noviembre"
          value={mes}
          onChange={(e) => setMes(e.target.value)}
        />
      </div> */}
      {/* <div className=" mb-3">
        <label className="font-semibold m-2 " htmlFor="anio">
          Año
        </label>
        <input
          type="text"
          id="anio"
          className="w-full border-2 rounded-lg text-center "
          placeholder="2023"
          value={anio}
          onChange={(e) => setAnio(e.target.value)}
        />
      </div> */}
      <div className="  mb-3">
        <label className="font-semibold m-2 " htmlFor="nombre">
          Nombre Completo Propietario
        </label>
        <input
          type="text"
          id="nombre"
          className=" w-full border-2 rounded-lg text-center "
          placeholder="Miguel Angel Duran Díaz"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>
      <div className="  mb-3">
        <label className="font-semibold m-2 " htmlFor="cedula">
          Cedula Propietario
        </label>
        <input
          type="text"
          id="cedula"
          className=" w-full border-2 rounded-lg text-center "
          placeholder="12345678"
          value={cedula}
          onChange={(e) => setCedula(e.target.value)}
        />
      </div>
      <div className="  mb-3">
        <label className="font-semibold m-2 " htmlFor="ciudadCedula">
          Ciudad Expedicion Cedula Propietario
        </label>
        <input
          type="text"
          id="ciudadCedula"
          className=" w-full border-2 rounded-lg text-center "
          placeholder="Fusagasuga"
          value={ciudadCedula}
          onChange={(e) => setCiudadCedula(e.target.value)}
        />
      </div>
      <div className="  mb-3">
        <label className="font-semibold m-2 " htmlFor="numeroRadicado">
          Numero de Radicado
        </label>
        <input
          type="text"
          id="numeroRadicado"
          className=" w-full border-2 rounded-lg text-center "
          placeholder="R-2022-27434"
          value={numeroRadicado}
          onChange={(e) => setNumeroRadicado(e.target.value)}
        />
      </div>
      <div className="  mb-3">
        <label className="font-semibold m-2 " htmlFor="idAasociado">
          ID Asociado
        </label>
        <input
          type="text"
          id="idAasociado"
          className=" w-full border-2 rounded-lg text-center "
          placeholder="ID-163237"
          value={idAasociado}
          onChange={(e) => setIdAasociado(e.target.value)}
        />
      </div>
      <div className="  mb-3">
        <label className="font-semibold m-2 " htmlFor="numeroEscritura">
          Numero Escritura
        </label>
        <input
          type="text"
          id="numeroEscritura"
          className=" w-full border-2 rounded-lg text-center "
          placeholder="7434"
          value={numeroEscritura}
          onChange={(e) => setNumeroEscritura(e.target.value)}
        />
      </div>
      <div className="  mb-3">
        <label className="font-semibold m-2 " htmlFor="fechaEscritutra">
          Fecha Escritura
        </label>
        <input
          type="date"
          id="fechaEscritutra"
          className=" w-full border-2 rounded-lg text-center "
          value={fechaEscritutra}
          onChange={(e) => setFechaEscritutra(e.target.value)}
        />
      </div>
      <div className="  mb-3">
        <label className="font-semibold m-2 " htmlFor="notaria">
          Notaria en Texto
        </label>
        <input
          type="text"
          id="notaria"
          className=" w-full border-2 rounded-lg text-center "
          placeholder="Primera"
          value={notaria}
          onChange={(e) => setNotaria(e.target.value)}
        />
      </div>
      <div className="  mb-3">
        <label className="font-semibold m-2 " htmlFor="ciudadNotaria">
          Ciudad Notaria
        </label>
        <input
          type="text"
          id="ciudadNotaria"
          className=" w-full border-2 rounded-lg text-center "
          placeholder="Fusagasuga"
          value={ciudadNotaria}
          onChange={(e) => setCiudadNotaria(e.target.value)}
        />
      </div>
      <label className="font-semibold m-2 " htmlFor="ciudadNotaria">
        Documentos Adjuntos
      </label>
      <div className=" flex justify-center">
        <label>
          Selecciona los documentos Adjuntos:
          <div>
            <input
              type="checkbox"
              value="EscrituraPublica"
              checked={documentosAdjuntados.includes("opcion1")}
              onChange={adjuntarDocumentos}
            />
            Escritura Publica
          </div>
          <div>
            <input
              type="checkbox"
              value="CertificadoTradicionLibertad"
              checked={documentosAdjuntados.includes("opcion2")}
              onChange={adjuntarDocumentos}
            />
            Certificado Tradicion y libertad
          </div>
          <div>
            <input
              type="checkbox"
              value="ReglamentoPH"
              checked={documentosAdjuntados.includes("opcion3")}
              onChange={adjuntarDocumentos}
            />
            Reglamento PH
          </div>
          <div>
            <input
              type="checkbox"
              value="Otros"
              checked={documentosAdjuntados.includes("opcion3")}
              onChange={adjuntarDocumentos}
            />
            Otros
          </div>
        </label>
      </div>

      <div className="  mb-3">
        <label className="font-semibold m-2 " htmlFor="diaNotificacionLetra">
          Dia Resolución en Letra
        </label>
        <input
          type="text"
          id="diaNotificacionLetra"
          className=" w-full border-2 rounded-lg text-center "
          placeholder="Doce"
          value={diaNotificacionLetra}
          onChange={(e) => setDiaNotificacionLetra(e.target.value)}
        />
      </div>
      <div className="  mb-3">
        <label className="font-semibold m-2 " htmlFor="diaNotificacion">
          Dia Resolución
        </label>
        <input
          type="text"
          id="diaNotificacion"
          className=" w-full border-2 rounded-lg text-center "
          placeholder="12"
          value={diaNotificacion}
          onChange={(e) => setDiaNotificacion(e.target.value)}
        />
      </div>
      <div className="  mb-3">
        <label className="font-semibold m-2 " htmlFor="mesNotificacionLetra">
          Mes Resolución Letra
        </label>
        <input
          type="text"
          id="mesNotificacionLetra"
          className=" w-full border-2 rounded-lg text-center "
          placeholder="Noviembre"
          value={mesNotificacionLetra}
          onChange={(e) => setMesNotificacionLetra(e.target.value)}
        />
      </div>
      <div className="  mb-3">
        <label className="font-semibold m-2 " htmlFor="anioNotificacionLetra">
          Año Resolución Letra
        </label>
        <input
          type="text"
          id="anioNotificacionLetra"
          className=" w-full border-2 rounded-lg text-center "
          placeholder="dos mil veintitrés"
          value={anioNotificacionLetra}
          onChange={(e) => setAnioNotificacionLetra(e.target.value)}
        />
      </div>
      <div className="  mb-3">
        <label className="font-semibold m-2 " htmlFor="anioNotificacion">
          Año Resolución
        </label>
        <input
          type="text"
          id="anioNotificacion"
          className=" w-full border-2 rounded-lg text-center "
          placeholder="2023"
          value={anioNotificacion}
          onChange={(e) => setAnioNotificacion(e.target.value)}
        />
      </div>
      <div className="  mb-3">
        <label className="font-semibold m-2 " htmlFor="nombreDirector">
          Nombre Directora
        </label>
        <input
          type="text"
          id="nombreDirectora"
          className=" w-full border-2 rounded-lg text-center "
          placeholder="LUISA MONTOYA"
          value={nombreDirector}
          onChange={(e) => setnombreDirector(e.target.value)}
        />
      </div>
      {msg && <Alerta alerta={alerta} />}
      <input
        type="submit"
        value="Crear Resolucion"
        className="
      p-2 text-center rounded text-white bg-teal-500 text-lg mr-2 cursor-pointer
      hover:bg-teal-700 transition-colors uppercase "
      />
    </form>
  );
};

export default FormularioResolucion;
