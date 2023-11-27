const TablaResoluciones = () => {
  const data = [
    {
      radicado: "R-2022-1234",
      idAsociado: "ID-12345",
      resolucion: " 03-001-000",
      url: "http://localhost/storage/documents/2023-11-20-d6ba40b9-9464-4f47-b979-f1572e430abe-document.pdf",
    },
  ];

  const openPdfInNewTab = (url) => {
    window.open(url, "_blank");
  };
  return (
    <table className="min-w-full bg-white border border-gray-300">
      <thead>
        <tr>
          <th className="py-2 px-4 border-b">Radicado</th>
          <th className="py-2 px-4 border-b">ID Asociado</th>
          <th className="py-2 px-4 border-b">Resolución</th>
          <th className="py-2 px-4 border-b">Ver PDF</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td className="py-2 px-4 border-b">{item.radicado}</td>
            <td className="py-2 px-4 border-b">{item.idAsociado}</td>
            <td className="py-2 px-4 border-b">{item.resolucion}</td>
            <td className="py-2 px-4 border-b">
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded"
                onClick={() => openPdfInNewTab(item.url)}
              >
                Ver PDF
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TablaResoluciones;
