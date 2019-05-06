function main() {
  console.log("En main()....")

  //-- Acceso al objeto con la imagen
  var img = document.getElementById('imagesrc')

  //-- Acceso al objeto con el canvas
  var canvas = document.getElementById('display');

  //-- Se establece como tamaño del canvas el mismo
  //-- que el de la imagen original
  canvas.width = img.width;
  canvas.height = img.height;

  console.log(img.width, img.height);
  mitad_w = img.width/2;
  mitad_h = img.height/2;

  console.log(mitad_w, mitad_h);

  //-- Obtener el contexto del canvas para
  //-- trabajar con el
  var ctx = canvas.getContext("2d");

  //-- Situar la imagen original en el canvas
  //-- No se han hecho manipulaciones todavia
  ctx.drawImage(img, 0,0);

  function filtroRGB(ctx, canvas, img){
    countR = deslR.value
    countG = deslG.value
    countB = deslB.value

    ctx.drawImage(img, 0,0);
    //imagen entera
    var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    //si quisieramos dividir los filtros a la mitad tendriamos que dividir
    //las filas a la mitad
    //var imgData = ctx.getImageData(0, 0, canvas.width, mitad_h);

    var data = imgData.data
    //ejemplos manejo de data por pixeles.
    //-- data[0] es el canal rojo del pixel de la posición 0,0
    //-- data[1] es el canal verde del pixel 0,0
    //-- data[2] es el canal azul del pixel 0,0
    //-- data[3] es el canal de transparencia del pixel 0,0
    //-- data[4] es el canal ROJO del pixel 1,0
    //-- ....
    //-- En general, para el pixel i
    //-- data[4*i] es el canal rojo
    //-- data[4*i + 1]: Canal verde
    //-- data[4*i + 2]: Canal azul
    //-- data[4*i + 3]: Canal de transparencia

    var umbralR = deslR.value
    var umbralG = deslG.value
    var umbralB = deslB.value

    console.log(data.length);

    //los sumo de cuatro en cuatro porque cada pixel ocupa 4 bytes.
    for (var i = 0; i < data.length; i+=4) {
      if (data[i] > umbralR){
        data[i] = umbralR;
      }
      if (data[i+1] > umbralG){
        data[i+1] = umbralG;
      }
      if (data[i+2] > umbralB){
        data[i+2] = umbralB;
      }
    }

    ctx.putImageData(imgData, 0, 0);
}
  //esto son mis id para llamarlos en el html en los imputs
  deslR = document.getElementById('deslizadorR');
  deslG = document.getElementById('deslizadorG');
  deslB = document.getElementById('deslizadorB');

  deslR.oninput = () => {
      filtroRGB(ctx, canvas, img);
  }
  deslG.oninput = () => {
      filtroRGB(ctx, canvas, img);
  }
  deslB.oninput = () => {
      filtroRGB(ctx, canvas, img);
  }


  //function de original para voler a la imagen original pinchando el boton
  original.onclick=()=>{
    ctx.drawImage(img, 0,0);
  }

//-- Funcion de retrollamada de escala de grises
  grey.onclick=()=>{
    console.log('grisssssssssssss');
    var imgGreyData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    //este cambio seria si quieras aplicar el filtro negro solo a la mitad de la
    //foto
    //var imgGreyData = ctx.getImageData(0, 0, canvas.width, mitad_h);
    var data = imgGreyData.data
        //-- Filtrar la imagen según el nuevo umbral
        for (var i = 0; i < data.length; i+=4) {
          var R = data[i];
          var G = data[i+1];
          var B = data[i+2];
          var brillo = 0.2126*R + 0.7152*G + 0.0722*B;
          data[i] = data[i+1] = data[i+2] = brillo;
          }

    ctx.putImageData(imgGreyData, 0, 0);
    }
}
