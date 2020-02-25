$(function(){
	$("#wizard").steps({
        headerTag: "h4",
        bodyTag: "section",
        transitionEffect: "slide",
        //enableAllSteps: true,
        transitionEffectSpeed: 500,
        onStepChanging: function (event, currentIndex, newIndex) { 
            if ( newIndex === 1 ) {
                $('.steps ul').addClass('step-2');
            } else {
                $('.steps ul').removeClass('step-2');
            }
            if ( newIndex === 2 ) {
                $('.steps ul').addClass('step-3');
            } else {
                $('.steps ul').removeClass('step-3');
            }

            if ( newIndex === 3 ) {
                $('.steps ul').addClass('step-4');
                $('.actions ul').addClass('step-last');
            } else {
                $('.steps ul').removeClass('step-4');
                $('.actions ul').removeClass('step-last');
            }
            var form = document.getElementById("formulario");
            //form.validate().settings.ignore = ":disabled,:hidden";
            
            //permite voltar sem validar form
              if (currentIndex === 1 && newIndex===0) return true;
              if (currentIndex === 2 && newIndex===1) return true;

            if (currentIndex === 0) {
                var tam = document.forms["formulario"]["nome"].value.length;
                if (tam < 1 || tam > 15) {
                    document.getElementById("idMsgErroNome").className = "msgShowErro";
                    document.getElementById("idMsgAvisoNome").className = "msgHideAviso";
                    return false;
                }
                else {
                    document.getElementById("idMsgErroNome").className = "msgHideErro";
                    document.getElementById("idMsgAvisoNome").className = "msgShowAviso";
                    return true;
                }
            }
            if (currentIndex === 1) {
                if (!form.checkValidity()) {
                    document.getElementById("idMsgErroEmail").className = "msgShowErro";
                }
                else {
                    document.getElementById("idMsgErroEmail").className = "msgHideErro";
                }
    
                if (form.checkValidity()) {
                    var xhttp = new XMLHttpRequest();
                    xhttp.onreadystatechange = function () { console.log(this); }
                    
                    var nome = document.forms["formulario"]["nome"].value;
                    var g = document.getElementById("p2-artigo1").innerHTML;

                    xhttp.open("GET", "https://us-central1-aprenderdigital-email.cloudfunctions.net/enviarEmailPresente?e=" +
                        document.getElementById("email").value + "&n=" + nome + "&g=" + g);
                    xhttp.send();

                    document.getElementById("p2Email").innerHTML = document.getElementById("email").value;
                }
                return form.checkValidity(); 
            }
            if (currentIndex === 2) {
                return true;
            }

        },
        onFinished: function (event, currentIndex) {
            window.location.href = "/?concluido=";
        },
        labels: {
            finish: "Terminar",
            next: "",
            previous: "Anterior"
        }
    });
    // Custom Steps Jquery Steps
    $('.wizard > .steps li a').click(function(){
    	$(this).parent().addClass('checked');
		$(this).parent().prevAll().addClass('checked');
		$(this).parent().nextAll().removeClass('checked');
    });
    // Custom Button Jquery Steps
    $('.forward').click(function(){
    	$("#wizard").steps('next');
    })
    $('.backward').click(function(){
        $("#wizard").steps('previous');
        alert("previous");
    })
    // Checkbox
    $('.checkbox-circle label').click(function(){
        $('.checkbox-circle label').removeClass('active');
        $(this).addClass('active');
    })
})
function desligaErroNome() {
    document.getElementById("idMsgErroNome").className = "msgHideErro";
    document.getElementById("idMsgAvisoNome").className = "msgShowAviso";
}
function onKeyUpNome() {
    var nome = document.forms["formulario"]["nome"].value;
    if (nome.length > 0) {
      document.getElementById("nomeDele").innerHTML = nome;
      document.getElementById("nomeDela").innerHTML = nome;

      if (document.getElementById("dele"))  {
        document.getElementById("p1-artigo1").innerHTML = "O";
        document.getElementById("p2-artigo1").innerHTML = "o";
      }
      else {
        document.getElementById("p1-artigo1").innerHTML = "A";
        document.getElementById("p2-artigo1").innerHTML = "a";
      }
      document.getElementById("p1-nome1").innerHTML = nome;
      document.getElementById("p2-nome1").innerHTML = nome;
    }
    else {
        document.getElementById("nomeDele").innerHTML = "...";
        document.getElementById("nomeDela").innerHTML = "...";
    }
}
function onDele() {
    document.getElementById("p1-artigo1").innerHTML = "O";
    document.getElementById("p2-artigo1").innerHTML = "o";
}

function onDela() {
    document.getElementById("p1-artigo1").innerHTML = "A";
    document.getElementById("p2-artigo1").innerHTML = "a";
}

function desligaErroEmail() {
    document.getElementById("idMsgErroEmail").className = "msgHideErro";
}
