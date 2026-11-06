var username = document.forms["form"]['username'];
var nom = document.forms['form']['nom']
var telephone = document.forms["form"]['telephone'];
var email = document.forms['form']['email']
var password = document.forms["form"]['password'];


username.addEventListener("textInput",username_Verify);
nom.addEventListener("textInput", nom_Verify);
telephone.addEventListener("textInput", telephone_Verify);
email.addEventListener("textInput", email_Verify);
password.addEventListener("textInput", pass_Verify);



function validated(){

    if (username.value.length < 2){
        username.style.border = "2px solid red";
        username.focus();
        return false;
    }

    if (nom.value.length < 2){
        nom.style.border = "2px solid red";
        nom.focus();
        return false;
    }

    if (telephone.value.length <= 9 ){
        telephone.style.border = "2px solid red";
        telephone.focus();
        return false;
    }

    if (email.value.length < 7){
        email.style.border = "2px solid red";
        email.focus();
        return false;
    }

    if (password.value.length < 7){
        password.style.border = "2px solid red";
        password.focus();
        return false;
    }
}




function username_Verify(){
    if (username.value.length >= 2){
        username.style.border = "2px solid #041664";
        return true;

    }

}

function nom_Verify(){
    if (nom.value.length >=2){
        nom.style.border = "2px solid #041664";
        return true;

    }

}
function telephone_Verify(){
    if (telephone.value.length == 9){
        telephone.style.border = "2px solid #041664";
        return true;

    }

}
function email_Verify(){
    if (email.value.length >= 8){
        email.style.border = "2px solid #041664";
        return true;

    }

}
function pass_Verify(){
    if (password.value.length >= 8){
        password.style.border = "2px solid #041664";
        return true;

    }

}