window.addEventListener("load", function(){
   
    let formquestion = document.querySelector('form.question');
    let inputEmail = document.querySelector('#email');
    let inputquestion = document.querySelector('#question');
   
   
    formquestion.addEventListener('submit', function(e) {
        let errors = [];


        
        if (inputEmail.value.length > 4){         //minimo 5 caracteres el email, incluido el punto y la arroba
            if ((inputEmail.value).indexOf('@') < 0){ 
                alert('introdusca un  mail válido');
                errors.push("email");
            }
         } else {
            alert('introdusca un  mail válido');
            errors.push("email");
         }; 


         if (inputquestion.value == '') {
            alert('realice al pregunta')
            errors.push("questionEmpty");
      
          } else if ((inputquestion.value.length < 8)) {
            alert('La pregunta debe ser más detallada')
            errors.push("questionLength");
          };



         if (errors.length > 0) {
            e.preventDefault();
        }else{ 
          //  e.preventDefault();
            alert('Su consulta fue enviada con éxito le contestaremos a la brevedad');
          //  window.location = 'http://localhost:3030';

        };

        
    })
})