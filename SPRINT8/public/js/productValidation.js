window.addEventListener("load", function () {

  let formProducts = document.querySelector('form.creations');

  let inputName = document.querySelector('#name');
  let inputDescription = document.querySelector('#description');
  let inputPrice = document.querySelector('#price');
  let inputDiscount = document.querySelector('#discount');
  let inputStock = document.querySelector('#stock');
  let inputOfferOK = document.querySelector('#offerOK');
  let inputOfferNO = document.querySelector('#offerNO');
  let labelCheck = document.querySelector('#labelCheck');
  let image = document.querySelector('#image');
  let imageID = document.querySelector('#imageID');


  let placeholderColor = document.querySelectorAll('input.inputData');


  formProducts.addEventListener('submit', function (event) {



    let errors = [];

console.log(placeholderColor);

for (let indice = 0; indice < placeholderColor.length; indice++) {
  placeholderColor[indice].classList.add("redPh");

}

    if (inputName.value  == '') { //puede ser menor a 5 caracteres
      errors.push("nameProduct");

    }

    if (inputDescription.value == '') {
      errors.push("descriptionProduct");

    } else if ((inputDescription.value.length < 20)) {
    //  alert('La descripción debe ser más detallada')
      errors.push("descriptionlength");
    }

    if ((inputPrice.value == '')||(inputPrice.value < 0)) {
      errors.push("priceProduct");
    }

    if ((inputDiscount.value == '')||(inputDiscount.value < 0)||(inputDiscount.value > 100)) {
      errors.push("inputDiscount");
    }

    if ((inputStock.value == '')||(inputStock.value < 0)) {
      errors.push("stockProduct");
    }

    if (image.value.length>0) {     //se ha elegido un archivo
      let extension = image.value.split('.').pop();
//    console.log(extension);
      if (!((extension == 'jpg')|| (extension== 'jpeg')||(extension== 'png')||(extension== 'gif'))){ //extension no valida
         errors.push("image");
      } else{      
         imageID.innerHTML = "Imagen:";
         imageID.style.color = "black";
      }
   } else{                             //valores por default si no se elige una imagen
      imageID.innerHTML = "Imagen: DEFAULT";
      imageID.style.color = "green";
   }



    if ((inputOfferOK.checked == '')  && (inputOfferNO.checked == '')) {
        errors.push("offerProduct");
      } else
      labelCheck.style.color = "black";

    console.log(errors);

    if (errors.length > 0) {

      event.preventDefault();


      errors.forEach(error => {
        console.log(error);
        switch (error) {
          case 'nameProduct':
            inputName.value = "";
            inputName.placeholder = "Escribe un nombre";
            break;

          case 'descriptionProduct':
            inputDescription.value = "";
            inputDescription.placeholder = "Debes ingresar una breve descripción del producto";
            break;

          case 'descriptionlength':
            inputDescription.value = "";
            inputDescription.placeholder = "La descripción debe ser más detallada (+ de 20 caracteres)";
            break;

          case 'priceProduct':
            inputPrice.value = "";
            inputPrice.placeholder = " Precio?";
            break;

          case 'inputDiscount':
            inputDiscount.value = "";
            inputDiscount.placeholder = "descuento?";
            break;
          case 'image':       imageID.innerHTML = "Formato no compatible";
            imageID.style.color = "red";
            break;

          case 'stockProduct':
            inputStock.value = "";
            inputStock.placeholder = "stock?";
            break;
          case 'offerProduct':
            labelCheck.style.color = "red";
            break;
        }
      })


    }
  })
})