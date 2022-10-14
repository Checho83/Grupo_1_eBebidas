
window.addEventListener("load", function(){

      let formRegister = document.querySelector('form.register');
      let inputFirstName = document.querySelector('#firstName');   
      let inputLastName = document.querySelector('#lastName');
      let inputEmail = document.querySelector('#email');
      let inputAddress = document.querySelector('#address');
      let inputPass = document.querySelector('#pass');
      let inputPassVerif = document.querySelector('#passVerif');
      let listPass1 = document.querySelector('#pass1');
      let listPass2 = document.querySelector('#pass2');
      let listPass3 = document.querySelector('#pass3');
      let avatar = document.querySelector('#avatar');
      let avatarID = document.querySelector('#avatarID')

      listPass1.style.color = "red"; 
      listPass2.style.color = "red"; 
      listPass3.style.color = "red"; 
       avatarID.innerHTML = "AVATAR:";
      avatarID.style.color = "black";

      const togglePassword = document.querySelector('#togglePassword');

      const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;




  togglePassword.addEventListener('click', function (e) {
    // toggle the type attribute
    const type = inputPass.getAttribute('type') === 'password' ? 'text' : 'password';
    inputPass.setAttribute('type', type);
    inputPassVerif.setAttribute('type', type);
    // toggle the eye slash icon
    this.classList.toggle('fa-eye-slash');   
   });

   inputPass.addEventListener('keyup', function(event){

      if(inputPass.value.length >7) {    //al menos 8 caracteres
         listPass1.style.color = "green"
      } else{
         listPass1.style.color = "red"; 
      }

      if (specialChars.test(inputPass.value)){
         listPass2.style.color = "green"
      }  else{
         listPass2.style.color = "red"; 
      }

      if ((!(inputPass.value.toLowerCase() == inputPass.value))&&(!(inputPass.value.toUpperCase() == inputPass.value))) {  //si son iguales, entonces no hay ninguna mayuscula
         listPass3.style.color = "green";
      } else{
         listPass3.style.color = "red"; 
      }

   });


   formRegister.addEventListener('submit', function(event) {
        

      let errors = [];

     if(inputFirstName.value == ''){
        errors.push("firstName");
     } else if ((inputFirstName.value.length < 2)){
        errors.push("firstNamelength");
     }

     if(inputLastName.value == ''){
        errors.push("lastName");
     } else if ((inputLastName.value.length < 2)){
        errors.push("lastNamelength");
     }


      if (inputEmail.value.length > 4){         //minimo 5 caracteres el email, incluido el punto y la arroba
         if ((inputEmail.value).indexOf('@') < 0){ 
            errors.push("email");
         }
      } else {
         errors.push("email");
      } 

      if(inputAddress.value == ''){
         errors.push("address");
      } 


      if((listPass1.style.color == "red")||(listPass2.style.color == "red")||(listPass3.style.color == "red"))
         errors.push("pass");

      if((inputPass.value != inputPassVerif.value)){
         errors.push("passVerif");
      }  

      if (avatar.value.length>0) {     //se ha elegido un archivo
         let extension = avatar.value.split('.').pop();
         if (!((extension == 'jpg')|| (extension== 'jpeg')||(extension== 'png')||(extension== 'gif'))){ //extension no valida
            errors.push("avatar");
         } else{      
            avatarID.innerHTML = "Logo";
            avatarID.style.color = "black";
         }
      } else{                             //valores por default si no se elige una imagen
         avatarID.innerHTML = "AVATAR: DEFAULT";
         avatarID.style.color = "green";
      }

    if (errors.length > 0) {
        event.preventDefault();

        errors.forEach(error =>{
            console.log(error);
            switch(error){
                case 'firstName':   inputFirstName.placeholder = "nombre?";
                                    break;
                case 'firstNamelength': inputFirstName.value = "";
                                        inputFirstName.placeholder = "min 2 caracteres";
                                        break;
                case 'lastName':    inputLastName.placeholder = "apellido?";
                                    break;
                case 'lastNamelength': inputLastName.value = "";
                                    inputLastName.placeholder = "min 2 caracteres";
                                    break;
                case 'email':       inputEmail.value = "";
                                    inputEmail.placeholder = "mail?";
                                    break;  
               case 'address':      inputAddress.placeholder = "Dirección?";
                                    break;  
               case 'passVerif':    inputPassVerif.value = "";
                                    inputPassVerif.placeholder = "Verificacion incorrecta";
                                    break;  
               case 'avatar':       avatarID.innerHTML = "Formato no compatible";
                                    avatarID.style.color = "red";
                                    break;
                    
            }
        })
    }

    
    })
})