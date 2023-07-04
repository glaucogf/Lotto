//function preguntar(boton)
//	{
      
//}

// **************************************************************************************
// 									THE PROGRAM STARTS HERE
// **************************************************************************************		


// uso de const para declarar variable constante y poder usarla mas abajo
const fondo="#232323";

//    declaro variable que guarda el objeto   
//        newButton
//     LUEGO cambiaré la propiedad  innerTEXT para cambiar el TITULO
var nb = document.getElementById("newButton");

// Variable GLOBAL para Color elegido
// todas estas variable son GLOBALES en realidad
var pickedColor="";

//  Cantidad de cuadros con los que empezaremos
var nCuadros= 6 
//var alreadyPlayed = 0;


//// El boton HARD es el modo por DEFAULT asi que lo ponemos como SELECCIONADO
//// y lo ponemos como DISABLED 
//var OtrHard= document.getElementById('btHard');
//$(OtrHard).toggleClass("SelectedBtn");	
////$(OtrHard).toggleClass("SelectedBtnHard");	
//$(OtrHard).attr('disabled',true);


// Creo objeto con todos los cuadros
// fijarse claro el uso de la funcion  
//querySelectorAll
squares = document.querySelectorAll(".square");
numbers = document.querySelectorAll(".number");

//Llamo rutina para llenar los cuadros al principio del programa y lo puedo
//invocar tambien con un boton
Inicio(nCuadros);
 

 /////////////////////////////////////////////////////////////////////////////////////////////////
 // Codigo JQUERY que se ejecuta luego que el programa esta cargado.
/////////////////////////////////////////////////////////////////////////////////////////////////
$(document).ready(function () {

			/// Ejecuto este por defecto 
			// Parametros (Total Numeros --siempre es 5, 
			// Numero mas alto a traer
			//  Numero mas alto de PowerBall
			//  Codigo del Color del PowerBall o Lotto Mas
				//PlayUSA(6,38,1,1);
				//PlayLottoDom();
				PlayTripleta();
				
				// Esta funcion se encarga de asignar ciertos colores
				// dependiendo del tipo de juego seleccionado
				juegoSeleccionado(0); 
				// El juego seleccionado en realidad no es LOTTO RD
				// pero lo escojo asi para usar los mismos colores
 


	// Agrego EVENTO CLICK a todos los objetos con la clase
	// .botones
	$(".botones").click( function() {

		
		// uso de jQuery para atributo ID
		var SwBotones = $(this).attr('id') ;
		
		// si el boton es diferente a NEW GAME o PLAY AGAIN 
		if (SwBotones != 'newButton' )
		{

			//Elijo los botones que pueden cambiar de SELECCION
			var toglebotones = document.querySelectorAll(".toglebotones");
			$(toglebotones).toggleClass("SelectedBtn");	

			var OtrHard = document.getElementById('btHard')
			var OtrEasy = document.getElementById('btEasy');

		}

		// uso del SWITCH para elegir diferentes botones clickeados	 
		switch (SwBotones )
		{
			case "newButton": //Ejecuto RUTINA que llena los 6 CUADROS
				Inicio(nCuadros);

				break;

			case "btEasy":  //Ejecuto RUTINA que llena los 6 CUADROS de NUEVO y cambio orden de BOTONES ELEGIBLES
				Inicio(nCuadros);
				$(OtrEasy).attr('disabled',true);
				$(OtrHard).attr('disabled',false);	
  				
				// Oculto los ultimos 3 CUADROS 
				squares[3].setAttribute('hidden',false);
				squares[4].setAttribute('hidden',false);
				squares[5].setAttribute('hidden',false);
		 
				break;
			
			case "btHard":  //CAMBIO el orden de BOTONES ELEGIBLES y muestro todos los cuadros
				$(OtrHard).attr('disabled',true);
				$(OtrEasy).attr('disabled',false);
				$(squares).attr('hidden',false);
		
				break;


			case "btPlay":  //GENERO NUMEROS DE LOTTO GANADORES de RD

				PlayLottoDom()
				juegoSeleccionado(3);
				break;


			case "btPower":  //GENERO NUMEROS DE POWER BALL
 
				PlayUSA(5,69,26,1)
				juegoSeleccionado(1);
				break;

			case "btMega":  //GENERO NUMEROS DE MEGA MILLIONS

				PlayUSA(5,70,25,2)
				juegoSeleccionado(2);
				break;				

		}



	}  ) ; 

	// Pregunto si ha acertado al clickear un cuadro
	$("div.square").click(function () {
		//var clicked = document.createElement("div");
		var ColorBack = this.style.background;
		var end=ColorBack.indexOf(")");
		ClickedColor=(ColorBack.substring(0,end+1  ) ) ;

 
 		// pickedColor ahora tiene un valor seleccionado como RESPUESTA CORRECTA
		if (ClickedColor==pickedColor)
		{
			//SELECCIONO CON jQuery todos los DIVS con la CLASE square y 
			// le pongo como ATRIBUTO con el metodo CSS el background como el que
			// acabamos de clickear
			$("div.square").css("background",ClickedColor);
 			nb.innerText="Play Again";
		}
		else
		{
			this.style.background=fondo;
		}
 
	});
});


////////////////////////////////////////////////////////////////////////////////////////
	function Inicio(nNumber)
	{
		//Pongo titulo por defecto al boton
		nb.innerHTML="[ New Colors ]";		

		// le doy colores RANDOM a los cuadros
		llenaCuadros(nNumber)
		juegoSeleccionado(0);
    
	}

////////////////////////////////////////////////////////////////////////////////////////

	function llenaCuadros(nNumber)
	{

	const nCuadros=nNumber; // HAGO constante IGUAL a PARAMETRO 

	let coloresDyn= new Array(nCuadros) ; // creo un ARRAY del tamano del PARAMETRO

	coloresDyn=genColors(nCuadros); // llamo function para generar colores RANDOM y devuelve un ARRRAY
	  
	for (var i=0; i < nNumber; i++ )  // asigno los valores del ARRAY a cada cuadro como BACKGROUND
		{
		 	squares[i].style.background = coloresDyn[i];
			 
		}

		// uso funcion para tomar un color RANDOM del arreglo que ya tengo 
		// y lo hago el COLOR GANADOR
		 pickedColor=coloresDyn[chooseWinColor(nNumber)]; 

		 var elHeader= document.getElementById("rgbHeader"); 
		 elHeader.innerHTML = pickedColor;
	}

	////////////////////////////////////////////////////////////////////////////////////////


	function genColors(nColors)
	{
	    var RetArray= new Array();
	  
	 	for (var counter=0; counter<nColors; counter++)
	 	{
	 		
	 		RetArray.push(pickColor() );
	  	}

	 	return RetArray;
	   
	}

	////////////////////////////////////////////////////////////////////////////////////////

	function pickColor()
	{

		 let r= Math.floor(Math.random()*255);
		 let g= Math.floor(Math.random()*255);
		 let b= Math.floor(Math.random()*255);
		 
		 let rgbColor='rgb('+r+', ' +g+', ' +b+')';

		 
		 return rgbColor;
	 }

	////////////////////////////////////////////////////////////////////////////////////////
	function chooseWinColor(nNumber)
	{

		var retorno=(Math.floor(Math.random()*nNumber));
		return retorno;  
	}


	//////////////////////////////////////////////////////////////////////////////////////

/*
	function Lottod(pick =6 ,limit=38 )
	{
		const newarr =[];

		// Creo arreglo de numeros para escoger
		// en este caso seria limit = 38 SI NO SE 
		// envia parametro
		const n = [];
		for (i=1; i <= limit ; i++)
		{
			n[i]=i;
		}

		// Recorro arreglo de opciones la cantidad de veces
		// que se ha pedido en pick, o sea 3 DE 100 por ejemplo
		// en el caso por defecto seria PICK = 6
		for (x=1; x <= pick ; x++)
		{
			// Escojo numero al azar del arreglo.
			let arr=n[Math.floor(Math.random()*n.length)];

 			   index = n.indexOf(arr) ;

			// saco el elemento del arreglo segun el indice
			// y agrego al arreglo de respuesta.
			n.splice(index,1);

			newarr.push(arr);
		}
	  
		return newarr;
	}


*/

	function Lottod(pick =6 ,limit=38 )
	{
		const newarr =[];
 
		// Recorro arreglo de opciones la cantidad de veces
		// que se ha pedido en pick, o sea 3 DE 100 por ejemplo
		// en el caso por defecto seria PICK = 6
		for (x=1; x <= pick ; x++)
		{
			// Escojo numero al azar del arreglo.
			let numero=(Math.floor(Math.random()*limit))+1;
 
			newarr.push(numero);
		}
	  
		return newarr;
	}






	function ValidacionDual(pick,limit)  
	{
		/*
			Verifica que no se repitan los numeros de cada bolo
			usando senales 
			dup = duplicado 
			und = indefinido
			
*/
		let arr=[];
		let ans=false;

		let dup=true;
		let und=true;

		// Ejecuto bucle outer mientras dup es verdadero O und is verdadero
		outer: while (dup == true || und == true)
		{
	// Lleno matriz arr con la funcion Lottod 
			
			arr=Lottod(pick,limit);
				 
				 
				 
				 
				 
				 
				 
/*				 
	 // verifico que no existan "undefined"
			for (a=0; a<pick; a++)
			{
				if (arr[a] == undefined)
				{ // Si encuentro algun valor indefinido
				  // regreso al bucle outer
				  // lo que haria se volviera a llenarse
				  // un nuevo arreglo o matriz con la funcion Lottod
				
					continue outer;
				}
			}
			
	*/		// si llego hasta este punto fue que ningun valor
			// de la matriz era indefinido
			und = false;





			// creo un segundo arreglo para recibir el primero arreglo 
			// ordernado numericamente
	 		let b=[];
	 		b=arr.sort();

	 // verifico que no existan duplicados
			for (a=0; a<pick; a++)
			{
				//Verifico si el valor actual es igual al 
				// valor siguiente
				// en cuyo caso habria al menos un duplicado
				if (b[a] == b[a+1])
				{
					// Si encuentro algun valor DUPLICADO
				  // regreso al bucle outer
				  // lo que haria se volviera a llenarse
				  // un nuevo arreglo o matriz con la funcion Lottod
				
					continue outer;
				}
			}

	//		console.log(dup)
			dup = false;

		}

		return arr.sort(function(a,b) {return a-b});

	}




	function ValUndef(pick,limit)  
	{
		
//			Verifica que el elemento del arreglo no sea undefined	

		let arr=[];
		let ans=false;

		let und=true;

		// Ejecuto bucle outer mientras dup es verdadero O und is verdadero
		outer: while (und == true)
		{
	// Lleno matriz arr con la funcion Lottod 
			
			arr=Lottod(pick,limit);
				 
	 // verifico que no existan "undefined"
			for (a=0; a<pick; a++)
			{
				if (arr[a] == undefined)
				{ // Si encuentro algun valor indefinido
				  // regreso al bucle outer
				  // lo que haria se volviera a llenarse
				  // un nuevo arreglo o matriz con la funcion Lottod
				
					continue outer;
				}
			}
			
			// si llego hasta este punto fue que ningun valor
			// de la matriz era indefinido
			und = false;
 
		}

		return arr.sort(function(a,b) {return a-b});

	}




	function PlayTripleta()
	{

			//var f = ValidacionDual(3,100);
			// Antes enviaba estos numeros a validacion pero 
			// no tengo que validar que sean duplicados
			// solo valido que no sean INDEFINIDOS
			var f = ValUndef(3,100);
		 

		for (var i=0; i < 3; i++ )  
			// asigno los valores del ARRAY a cada cuadro como BACKGROUND
		{
			// aqui es que pongo los numeros que veo en pantalla
			// dandole valor al DIV
		 	squares[i].innerHTML = f[i];

		}
		
		juegoSeleccionado(0);
		//squares[5].style.background = "white";
		//squares[5].style.color = "#000000";
	}



	function PlayLottoDom()
	{

			var f = ValidacionDual(6,38);
		//console.log(f);

		for (var i=0; i < 6; i++ )  // asigno los valores del ARRAY a cada cuadro como BACKGROUND
		{
		 	squares[i].innerHTML = f[i];

		 	//squares[i].innerHTML = f[i];
		 	//squares[i].style.background = coloresDyn[i];
		}

		squares[5].style.background = "white";
		squares[5].style.color = "#000000";
	}


	function PlayUSA(pick,limit,limitBolaMagica,color)
	{

				var f = ValidacionDual(pick,limit);
				
				for (var i=0; i < 5; i++ )  
				// asigno los valores del ARRAY a cada cuadro 
			    // este sera el numero que veremos
				{
 				 	squares[i].innerHTML = f[i];
 				}


				var f = ValidacionDual(1,limitBolaMagica);
				 
 				squares[5].innerHTML = f[0];

 				// Le cambio el COLOR a la ultima BOLA

 				if (color==1)
 				{

 				squares[5].style.background = "red";
 				squares[5].style.color = "#ffffff";
 				}
 				else if (color==2)
 				{
 				squares[5].style.background = "gold";
 				squares[5].style.color = "#000000";

 				} 				
 				else
 				{
 				squares[5].style.background = "white";
 				squares[5].style.color = "#000000";

 				}

	}

	function juegoSeleccionado(juego)
	{

		var elJuegoSeleccionado= document.getElementById("lottotype"); 
 
		if (juego==1)
		{
			elJuegoSeleccionado.innerHTML=" :  POWERBALL"
		}
		else if (juego==2)
		{
			elJuegoSeleccionado.innerHTML=" :  MEGAMILLIONS"
		} 				
		else if (juego==3)
		{
			elJuegoSeleccionado.innerHTML=" :  LOTTO"
		} 						
		else if (juego==0)
		{
			elJuegoSeleccionado.innerHTML=" :  TRIPLETA"
		} 								
		else
		{
			elJuegoSeleccionado.innerHTML=" :  TRIPLETA"
		}

	}


	function checkIsMobile()
	{


		var patt = '/iPhone|iPad|iPod|Android/g';
		var isMobile = /iPhone|iPad|iPod|Android/g.test(navigator.userAgent);
		//var isMobile = patt.test(navigator.userAgent);
		//var isMobile = "xx".test(navigator.userAgent);
		//var element = document.getElementById('text');
		//if (isMobile) {
  		//	element.innerHTML = "You are using Mobile";
		//} else {
			//element.innerHTML = "You are using Desktop";
		//}

 

		if (isMobile)
		{
			return true;
		}
		else
		{
			return false;
		}

	}




// Ejemplo de uso sin parametros.
//var f = ValidacionDual(6,40);

//console.log(f);




// Ejemplo de uso con parametros
//f = Lottod(12,100);

//console.log(f);

////////////////////////////////////////////////////////////////////////////////////////
                //////////             END            ////////////////
////////////////////////////////////////////////////////////////////////////////////////                