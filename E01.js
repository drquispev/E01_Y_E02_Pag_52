/*function Determine_Period() {
    let Xo = Number(document.getElementById('field01').value)
    let a = Number(document.getElementById('field02').value)
    let c = Number(document.getElementById('field03').value)
    let m = Number(document.getElementById('field04').value)
    //Agregar una variable para la cantidad de semillas
    let ns = 2 //Numero de semillas
    
    console.log(Xo,a,c,m);


    var Array_X = [];
    let Xn = Xo; // Semilla nueva se inicializa con la semilla base
    Xn = (a * Xo + c) % m;
    Xo = Xn;
    Array_X.push(Xn);
    let aux = Xn;
    console.log(Xn);
    do{
        Xn = (a * Xo + c) % m;
        Xo = Xn;
        Array_X.push(Xn);
        console.log(Xn);
    }while (Xn != aux );

    console.log(Array_X);
}*/

function Determine_Period_II(numero) {
    // CAPTURAR LOS DATOS DEL FORMULARIO
    let Xo = [];
    let a = [];
    let Maux = [];

    for ( let i = 0; i < numero; i++) {
        Xo.push(Number(document.getElementById(`field01${i}`).value));
        a.push(Number(document.getElementById(`field02${i}`).value)); 
        //MATRIZ AUXILIAR DE SEMILLAS
        Maux.push(Number(document.getElementById(`field01${i}`).value));
    }
    let c = Number(document.getElementById('field03').value)
    let m = Number(document.getElementById('field04').value)

    console.log(`a: ${a}`,`Xo ${Xo}`,`c: ${c}`, `m: ${m}`,`Maux: ${Maux}`);

    //let Xn = Xo; 
    let cont = 0;
    let aX = 0;

    // CALCULAR NUEVA SEMILLA
    for (let i=0; i<numero; i++) {
        //aX = Math.pow((a[i] * Xo[i]),2) + aX;        
        aX = (a[i] * Xo[i]) + aX;        
    }
    Xn = (aX + c) % m;
    //Xo.push(Xn);

    console.log(`a: ${a}`,`Xo ${Xo}`,`Maux: ${Maux}`,`Xn: ${Xn}`);
    console.log(Maux.length)

    // ACTUALIZAR LA MATRIZ DE SEMILLAS AUXILIAR
    let long_Maux = Maux.length;
    let long_Xo = Xo.length;
    Maux[long_Maux - 1] = Xn;
    console.log(`a: ${a}`,`Xo ${Xo}`,`Maux: ${Maux}`,`Xn: ${Xn}`);
    for (let i=0; i< numero -1 ; i++) {
        cont++;
        Maux[i] = Xo[long_Xo - cont];
        console.log(Maux[i],Xo[long_Xo - cont])
    }
    cont = 0;//MOD
    
    // AGREGAR LA NUEVA SEMILLA
    Xo.push(Xn);
    console.log(`a: ${a}`,`Xo ${Xo}`,`Maux: ${Maux}`,`Xn: ${Xn}`);

    // CAPTURAR EL VALOR INICIAL PARA DETECTAR EL CICLO
    let vi_dc = Xn;
    
    do{
        // CALCULAR LA NUEVA SEMILLA
        for (let i=0; i<numero; i++) {
            aX = (a[i] * Maux[i]) + aX;            
        }
        Xn = (aX + c) % m;
        // ACTUALIZAR LA MATRIZ DE SEMILLAS AUXILIAR
        let long_Maux = Maux.length;
        let long_Xo = Xo.length;
        Maux[long_Maux - 1] = Xn;
        console.log(`a: ${a}`,`Xo ${Xo}`,`Maux: ${Maux}`,`Xn: ${Xn}`);
        for (let i=0; i< numero -1 ; i++) {
            cont++;
            Maux[i] = Xo[long_Xo - cont];
            console.log(Maux[i],Xo[long_Xo - cont])
        }
        cont = 0;//MOD
        // AGREGAR LA NUEVA SEMILLA
        Xo.push(Xn);
    }while(Xn != vi_dc);
    console.log(`a: ${a}`,`Xo ${Xo}`,`Maux: ${Maux}`,`Xn: ${Xn}`);

    // PREPARAR MATRIZ PARA IMPRIMIR
    var Matrix_Print = [];
    var Array_X = [];
    var ri = [];
    Array_X = Xo;
    var long_Array_X = Array_X.length;
    for (let i = numero; i < long_Array_X; i++) {
        cont++;
        ri[i - numero] = Array_X[i] / (m -1) ; // CALCULAR EL ri
        Matrix_Print.push([cont,Array_X[i], ri[i - numero]]);
        console.log(cont,Array_X[i], ri[i - numero]);
    }
    
    console.log(Matrix_Print);
    
    console.log(Array_X.length);

    // IMPRIMIR LA TABLA EN LA PÁGINA
    var contenedor_PD  = document.getElementById("table_ri")
    contenedor_PD.innerHTML = "";
    var tabla = document.createElement("miTabla");
    //var encabezadoFila = document.createElement("tr");
    var encabezadoFila = document.createElement("tr");

// Crear las celdas de encabezado (th) y asignarles contenido
    var encabezado1 = document.createElement("th");
    encabezado1.textContent = "i";
    var encabezado2 = document.createElement("th");
    encabezado2.textContent = "Xi+1";
    var encabezado3 = document.createElement("th");
    encabezado3.textContent = "ri";

// Agregar las celdas de encabezado a la fila de encabezado
    encabezadoFila.appendChild(encabezado1);
    encabezadoFila.appendChild(encabezado2);
    encabezadoFila.appendChild(encabezado3);

// Agregar la fila de encabezado a la tabla
    tabla.appendChild(encabezadoFila);

    Matrix_Print.forEach(function(fila){
        var filaElemento = document.createElement("tr");

        fila.forEach(function(elemento){
            var celda = document.createElement("td");
            celda.textContent = elemento;
            filaElemento.appendChild(celda);
        });
        tabla.appendChild(filaElemento);
    });
    
    contenedor_PD.appendChild(tabla);
}

// ACTUALIZAR EL FORMULARIO
function Update_Form(numero) {
    //AGREGAR semillas
    const divContenedorx = document.createElement('div');
    divContenedorx.className = "inputbox";
    const labelx = document.createElement("label");
    labelx.textContent = `X ${numero}: `;
    const inputx = document.createElement("input");
    inputx.type = "number";
    inputx.id = `field01${numero}`;
    //console.log(inputx.id);
    inputx.name = `valor${numero}`;

    const divContenedora = document.createElement('div');
    divContenedora.className = "inputbox";
    const labela = document.createElement("label");
    labela.textContent = `a ${numero}: `;
    const inputa = document.createElement("input");
    inputa.type = "number";
    inputa.id = `field02${numero}`;
    inputa.name = `valor${numero}`;

    divContenedorx.appendChild(labelx);
    divContenedorx.appendChild(inputx);
    divContenedora.appendChild(labela);
    divContenedora.appendChild(inputa);

    
    contenedor.appendChild(divContenedorx);
    contenedor.appendChild(divContenedora);
    //AGREGAR CONSTANTES
}

//ACTUALIZAR EL FORMULARIO PARTE II
function Update_FormII() {
    //c
    const divContenedorc = document.createElement('div');
    divContenedorc.className = "inputbox";
    const labelc = document.createElement("label");
    labelc.textContent = "c: ";
    const inputc = document.createElement("input");
    inputc.type = "number";
    inputc.id = "field03";
    inputc.name = "valor";
    divContenedorc.appendChild(labelc);
    divContenedorc.appendChild(inputc);
    contenedor.appendChild(divContenedorc);
    //m
    const divContenedorm = document.createElement('div');
    divContenedorm.className = "inputbox";
    const labelm = document.createElement("label");
    labelm.textContent = "m: ";
    const inputm = document.createElement("input");
    inputm.type = "number";
    inputm.id = "field04";
    inputm.name = "valor";
    divContenedorm.appendChild(labelm);
    divContenedorm.appendChild(inputm);
    contenedor.appendChild(divContenedorm);

}


// EVENTOS
const contenedor = document.getElementById("data_set");
const input_range = document.querySelector("input"),
        number = document.querySelector(".number");

input_range.addEventListener("input", () => {
        number.textContent = input_range.value;
        console.log(input_range.value);
        const valorSeleccionado = input_range.value;
        //var aux = valorSeleccionado;
        contenedor.innerHTML = "";
        for (let i = 0 ; i< valorSeleccionado; i++){
            Update_Form(i);
        }
        Update_FormII();
    });

    //let aux = input_range.value;
const btn = document.getElementById('button_calculate');
    btn.addEventListener('click', () => {
        let valorSeleccionado = input_range.value;
        Determine_Period_II(valorSeleccionado);
        //Print_Table(valorSeleccionado);
    }); 

// ACTIVAR EL BOTON DE CALCULAR 
//const btn = document.getElementById('button_calculate')
//btn.addEventListener('click',Determine_Period) 
//btn.addEventListener('click',Determine_Period_II(aux)) 