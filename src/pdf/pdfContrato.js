import { jsPDF } from "jspdf";

// Default export is a4 paper, portrait, using millimeters for units

const nuevoContratoPdf = (cliente, contrato) =>{
  console.log(contrato)

  const doc = new jsPDF();


  doc.setTextColor(250);
  doc.setFontSize(100);
  doc.text('NETWORKING SAS', 190, 275, 55, 'center');

  doc.setTextColor('#000000');

  //titulo
  doc.setFontSize(12);
  doc.setFont('Book', 'Antiqua');
  doc.text('CONTRATO DE PRESTACION DE SERVICIOS DE INTERNET',50,20);



  var text = 'En Villa Mercedes, San Luis, el dia '+ contrato.fechaAlta +', entre Networking S.A.S., CUIT: 30-71651184-3 con domicilio comercial en calle La Rioja Nº 572, cuidad VILLA MERCEDES; y '+ cliente.apellido + " " + cliente.nombre +' D.N.I/CUIT: '+ cliente.dni +'/' + cliente.cuit +' Telefono: '+ cliente.telefono +' domicilio: '+ cliente.domicilio +' mail: '+ cliente.email +' , acuerdan celebran el presente contrato de prestación de servicios de Internet. Las  presentes condiciones regulan expresamente las relaciones surgidas entre Networking S.A.S. y el usuario de los servicios de acceso a la Red Interna de la Compañía, en adelante "CLIENTE", anulando cualquier acuerdo previo que pudiera existir entre las partes. Networking S.A.S. podrá modificar en cualquier momento las presentes condiciones. El rechazo del CLIENTE a las condiciones modificadas generara la automática rescisión del presente contrato.';
  var splitText = doc.splitTextToSize(text, 180);
  var pageHeight = doc.internal.pageSize.height;
  doc.setFontSize(12);
  var y = 35;
  for (var i=0; i<splitText.length; i++){
      if (y > 275){
          y = 20;
          doc.addPage();
      }
      doc.text(20, y, splitText[i]);
      y = y + 5;
  }

  var text1 = '1)  A los efectos del presente contrato, el CLIENTE es aquella persona física o jurídica, que contrató con   NetworkingS.A.S. la utilización del servicio de acceso a Internet.';
  splitText = doc.splitTextToSize(text1, 180);
  pageHeight = doc.internal.pageSize.height;
  for (var i=0; i<splitText.length; i++){
      if (y > 275){
          y = 20;
          doc.addPage();
      }
      doc.text(20, y, splitText[i]);
      y = y + 5;
  }

  var text2 = '2)  La condición de CLIENTE es personal e intransferible, no pudiendo cederse a terceros sin el expreso consentimiento de Networking S.A.S.';
  splitText = doc.splitTextToSize(text2, 180);
  pageHeight = doc.internal.pageSize.height;
  for (var i=0; i<splitText.length; i++){
      if (y > 275){
          y = 20;
          doc.addPage();
      }
      doc.text(20, y, splitText[i]);
      y = y + 5;
  }
  var text3 = '3)  El CLIENTE se compromete al pago del  abono  según los precios vigentes que declara conocer y aceptar, usen o no los servicios de la red. El abono deberá pagarse en la fecha pautada en dicho contrato de cada mes siendo el sistema de abonos a mes vencido y en domicilio que se especifica en la factura mensual y/o contrato.';
  splitText = doc.splitTextToSize(text3, 180);
  pageHeight = doc.internal.pageSize.height;
  for (var i=0; i<splitText.length; i++){
      if (y > 275){
          y = 20;
          doc.addPage();
      }
      doc.text(20, y, splitText[i]);
      y = y + 5;
  }
  var text4 = '4)  Los precios podrán ser modificados por Networking S.A.S., comunicándolo al CLIENTE con al menos 30 (treinta) días de antelación de su entrada en vigor. Si continuare haciendo uso del servicio se considerará que el cliente  ha aceptado la vigencia del nuevo cuadro tarifario.';
  splitText = doc.splitTextToSize(text4, 180);
  pageHeight = doc.internal.pageSize.height;
  for (var i=0; i<splitText.length; i++){
      if (y > 275){
          y = 20;
          doc.addPage();
      }
      doc.text(20, y, splitText[i]);
      y = y + 5;
  }
  var text5 = '5)  La falta de pago en término, facultará a Networking S.A.S a suspender el servicio inmediatamente el día pautado en dicho contrato de cada mes hasta su efectivo pago.';
  splitText = doc.splitTextToSize(text5, 180);
  pageHeight = doc.internal.pageSize.height;
  for (var i=0; i<splitText.length; i++){
      if (y > 275){
          y = 20;
          doc.addPage();
      }
      doc.text(20, y, splitText[i]);
      y = y + 5;
  }
  var text6 = '6)  El CLIENTE responde por el buen uso de la conexión, comprometiéndose expresamente a evitar cualquier tipo de acción que pueda dañar los sistemas, equipos o servicios accesibles directos o indirectamente a través de Networking S.A.S.';
  splitText = doc.splitTextToSize(text6, 180);
  pageHeight = doc.internal.pageSize.height;
  for (var i=0; i<splitText.length; i++){
      if (y > 275){
          y = 20;
          doc.addPage();
      }
      doc.text(20, y, splitText[i]);
      y = y + 5;
  }
  var text7 = '7)  Networking S.A.S se compromete a solucionar los inconvenientes del servicio dentro de las 48Hs de recibido el reclamo al celular 02657-15469093. En caso de ser necesario el recambio del equipo en comodato, este plazo podrá ser de hasta 96Hs hábiles.';
  splitText = doc.splitTextToSize(text7, 180);
  pageHeight = doc.internal.pageSize.height;
  for (var i=0; i<splitText.length; i++){
      if (y > 275){
          y = 20;
          doc.addPage();
      }
      doc.text(20, y, splitText[i]);
      y = y + 5;
  }
  var text8 = '8)  El CLIENTE podrá solicitar la baja del servicio, siempre que se encuentre al día con el pago del mismo, no teniendo suma alguna adeudada por ningún concepto, y deberá realizarlo por la oficina en LA RIOJA 572 antes del día 30 de cada mes, caso contrario será computada la baja para el mes siguiente debiendo abonar este último en tiempo y forma.';
  splitText = doc.splitTextToSize(text8, 180);
  pageHeight = doc.internal.pageSize.height;
  for (var i=0; i<splitText.length; i++){
      if (y > 275){
          y = 20;
          doc.addPage();
      }
      doc.text(20, y, splitText[i]);
      y = y + 5;
  }
  var text9 = '9) Networking S.A.S no será responsable por ningún daño ocurrido en las dependencias y/o equipos del CLIENTE  que pudiere sufrir como consecuencia directa o indirecta de la prestación del servicio atribuible a caso fortuito o fuerza mayor.';
  splitText = doc.splitTextToSize(text9, 180);
  pageHeight = doc.internal.pageSize.height;
  for (var i=0; i<splitText.length; i++){
      if (y > 275){
          y = 20;
          doc.addPage();
      }
      doc.text(20, y, splitText[i]);
      y = y + 5;
  }
  var text10 = '10) Networking S.A.S entrega todos sus equipos en COMODATO, siendo estos de propiedad de la empresa, el recambio de los mismos se hará sin cargo en caso de rotura o mal funcionamiento. Quedan excluido de esta condición robos y roturas por negligencia, en cuyo caso el cliente deberá abonar el valor del equipo. Los equipos tendrán un valor nominal de U$S 200 (Dólares Doscientos)';
  splitText = doc.splitTextToSize(text10, 180);
  pageHeight = doc.internal.pageSize.height;
  for (var i=0; i<splitText.length; i++){
      if (y > 275){
          y = 20;
          doc.addPage();
      }
      doc.text(20, y, splitText[i]);
      y = y + 5;
  }
  var text11 = '11) Networking S.A.S se reserva el derecho a retirar el/los equipos si los pagos se retrasan más allá de un mes corrido desde la fecha de vencimiento del abono mensual. El/los equipos debe quedar a disposición para ser retirados desde el momento que Networking S.A.S lo requiera, caso contrario, el cliente incurrirá en retención indebida y será pasible de las pertinentes acciones judiciales por los daños y perjuicios que ocasionare a la empresa.';
  splitText = doc.splitTextToSize(text11, 180);
  pageHeight = doc.internal.pageSize.height;
  for (var i=0; i<splitText.length; i++){
      if (y > 275){
          y = 20;
          doc.addPage();
      }
      doc.text(20, y, splitText[i]);
      y = y + 5;
  }
  var text12 = '12) Todo cobro devengado del presente contrato tendrá un carácter de ejecutivo y las partes convienen en someterse exclusivamente a la jurisdicción de los juzgados de Villa Mercedes, provincia de San Luis.';
  splitText = doc.splitTextToSize(text12, 180);
  pageHeight = doc.internal.pageSize.height;
  for (var i=0; i<splitText.length; i++){
      if (y > 275){
          y = 20;
          doc.addPage();
      }
      doc.text(20, y, splitText[i]);
      y = y + 5;
  }

  doc.line(75,y+15,130,y+15);
  doc.text('Firma del cliente', 90, y+20);


  doc.save(cliente.apellido+"_"+cliente.nombre+".pdf");
}




export default nuevoContratoPdf;
