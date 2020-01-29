$('body').append('<div style="" id="loadingDiv"><div class="loader">Loading...</div></div>');
$('html,body').css('background-color', 'black'); //Hacemos el fondo oscuro

function fila(fecha, campo1, campo2, campo3, campo4, campo5, campo6, campo7, provincia, estacion, posicion) {
    this.fecha = fecha;
    this.campo1 = campo1;
    this.campo2 = campo2;
    this.campo3 = campo3;
    this.campo4 = campo4;
    this.campo5 = campo5;
    this.campo6 = campo6;
    this.campo7 = campo7;
    this.provincia = provincia;
    this.estacion = estacion;
    this.posicion = posicion;
}
let filas = [];
let primero = -20;
let ultimo = 0;
let startTime = new Date();
let endTime;
let ya_ordenado =[false,false,false,false,false,false,false];//Array que se usará para saber si un campo ha sido ordenado dándole a su cabecera en la tabla o no
$(document).ready(function () {
    let urls = ["https://analisis.datosabiertos.jcyl.es/api/v2/catalog/datasets/calidad-del-aire-datos-historicos-diarios-1997-1999/exports/csv?&", "https://analisis.datosabiertos.jcyl.es/api/v2/catalog/datasets/calidad-del-aire-datos-historicos-diarios-2000-2009/exports/csv?&", "https://analisis.datosabiertos.jcyl.es/api/v2/catalog/datasets/calidad-del-aire-datos-historicos-diarios-2010-2019/exports/csv?&"];
    let datos = "";
    console.log(getParameterByName('f_inicio'));
    console.log(getParameterByName('f_final'));
    for (let i = 0; i < urls.length; i++) {
        if (getParameterByName('provincia') != 0) {
            urls[i] += `where=provincia%20like%20%22${getParameterByName('provincia')}%22`;
        }
        if (getParameterByName('estacion') != 0) {
            urls[i] += `&where=estacion%20like%20%22${getParameterByName('estacion')}%22`;
        }
        if (getParameterByName('f_inicio') != 0 && getParameterByName('f_final') != 0) {
            urls[i] += `&where=fecha%3E%3D%22${getParameterByName('f_inicio')}%22%20AND%20fecha%3C%3D%22${getParameterByName('f_final')}%22`;
        }
        urls[i] += "&rows=-1&sort=fecha&select=*&timezone=UTC&delimiter=%3B";
    }
    console.log(urls);
    $.ajax({
        url: urls[0],
        dataType: "text",
        success: function (data1) {
            datos += data1;
            $.ajax({
                url: urls[1],
                dataType: "text",
                success: function (data2) {
                    datos += data2;
                    $.ajax({
                        url: urls[2],
                        dataType: "text",
                        success: function (data3) {
                            datos += data3;
                            escribir_array(datos);
                        }
                    });
                }
            });
        }
    });
});

function escribir_array(datos) {
    let lineas = datos.split(/\r?\n|\r/);
    for (let i = 0; i < lineas.length - 1; i++) {
        //Eliminamos las posibles cabeceras
        if (lineas[i] == "fecha;co_mg_m3;no_ug_m3;no2_ug_m3;o3_ug_m3;pm10_ug_m3;pm25_ug_m3;so2_ug_m3;provincia;estacion;posicion;limites_municipales_de_castilla_y_leon;limites_provinciales_de_castilla_y_leon") {
            continue;
        }
        let campos = lineas[i].split(";");
        filas.push(new fila(campos[0], Number(campos[1]).toFixed(2), Number(campos[2]).toFixed(2), Number(campos[3]).toFixed(2), Number(campos[4]).toFixed(2), Number(campos[5]).toFixed(2), Number(campos[6]).toFixed(2), Number(campos[7]).toFixed(2), campos[8], campos[9], campos[10], campos[11]));
    }
    endTime = new Date();
    generarTabla(20, 0);
    removeLoader(); //Ocultamos la animación de carga
    $('html,body').css('background-color', 'initial'); //ponemos el color de fondo normal
    //Añadimos indo a la card de info
    $('#info').html(`<h5 class="card-title" style="color:blue;text-align:center">Datos</h5><p class="card-text" style="text-align:center">La consulta ha tenido como resultado ${filas.length} registros</p><p class="card-text" style="text-align:center">La consulta se ha realizado en ${diferenciaTiempo(endTime-startTime)}</p>`);
}

function generarTabla(contador, principio) {
    console.log("(Principio) primero vale " + primero);
    console.log("(Principio) ultimo vale " + ultimo);
    let html_tabla = '<table class="table table-striped"><thead class="thead-dark"><tr><th>fecha</th><th>co_mg_m3</th><th>no_ug_m3</th><th>no2_ug_m3</th><th>o3_ug_m3</th><th>pm10_ug_m3</th><th>pm25_ug_m3</th><th>so2_ug_m3</th><th>provincia</th><th>estacion</th><th>posición</th></tr></thead>';
    let c = 0;
    for (let i = principio; i > -1; i++) {
        if (filas[i] == undefined) {
            primero = primero + c;
            ultimo = ultimo + c;
            break;
        }
        if (c == contador) { //Filas necesarias escritas
            primero = primero + c;
            ultimo = ultimo + c;
            break;
        }
        html_tabla += `<tr><td>${filas[i].fecha}</td>`;
        html_tabla += `<td>${filas[i].campo1}</td>`;
        html_tabla += `<td>${filas[i].campo2}</td>`;
        html_tabla += `<td>${filas[i].campo3}</td>`;
        html_tabla += `<td>${filas[i].campo4}</td>`;
        html_tabla += `<td>${filas[i].campo5}</td>`;
        html_tabla += `<td>${filas[i].campo6}</td>`;
        html_tabla += `<td>${filas[i].campo7}</td>`;
        html_tabla += `<td>${filas[i].provincia}</td>`;
        html_tabla += `<td>${filas[i].estacion}</td>`;
        html_tabla += `<td id="posicion" style="cursor:pointer">${filas[i].posicion}</td></tr>`;
        c++;
    }
    html_tabla += "</table>";
    $("#tabla_datos").html(html_tabla);
    console.log("(Final) primero vale " + primero);
    console.log("(Final) ultimo vale " + ultimo);
}

function generarTablaAtras(contador, principio) {
    console.log("(Principio) primero vale " + primero);
    console.log("(Principio) ultimo vale " + ultimo);
    let html_tabla = '<table class="table table-striped"><thead class="thead-dark"><tr><th>fecha</th><th>co_mg_m3</th><th>no_ug_m3</th><th>no2_ug_m3</th><th>o3_ug_m3</th><th>pm10_ug_m3</th><th>pm25_ug_m3</th><th>so2_ug_m3</th><th>provincia</th><th>estacion</th><th>posición</th></tr></thead>';
    let c = 0;
    let html_filas_colocadas = "";
    for (let i = (principio - 1); i > -100; i--) {
        if (primero <= 0) { //Si la i está en la primera fila del array o antes, no cambiar la tabla
            return;
        }
        if (filas[i] == undefined) {
            primero = primero - c;
            ultimo = ultimo - c;
            break;
        }
        let html_fila_actual = "";
        html_fila_actual += `<tr><td>${filas[i].fecha}</td>`;
        html_fila_actual += `<td>${filas[i].campo1}</td>`;
        html_fila_actual += `<td>${filas[i].campo2}</td>`;
        html_fila_actual += `<td>${filas[i].campo3}</td>`;
        html_fila_actual += `<td>${filas[i].campo4}</td>`;
        html_fila_actual += `<td>${filas[i].campo5}</td>`;
        html_fila_actual += `<td>${filas[i].campo6}</td>`;
        html_fila_actual += `<td>${filas[i].campo7}</td>`;
        html_fila_actual += `<td>${filas[i].provincia}</td>`;
        html_fila_actual += `<td>${filas[i].estacion}</td>`;
        html_fila_actual += `<td id="posicion">${filas[i].posicion}</td></tr>`;
        html_filas_colocadas = html_fila_actual + html_filas_colocadas;
        c++;
        if (c == contador) {
            primero = primero - c;
            ultimo = ultimo - c;
            break;
        }
    }
    html_tabla = html_tabla + html_filas_colocadas + "</table>";
    $("#tabla_datos").html(html_tabla);
    console.log("(Final) primero vale " + primero);
    console.log("(Final) ultimo vale " + ultimo);
}
//FUNCIONES
function alturaTabla() {
    let selector = document.getElementById("selector_tam");
    let seleccionado = selector.options[selector.selectedIndex];
    return seleccionado.textContent;
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    let regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function abrirMapa(posicion, nombre) {
    let lat_lon = posicion.split(",");
    $("#mapa").html(`<h1 id="cerrar" style="margin-right:20px;color:white;cursor:pointer;text-align:center">X</h1><iframe class="iframe" src="https://maps.google.com/maps?q=${lat_lon[0]},${lat_lon[1]}+(${"asdasd"})&z=15&output=embed" height="800" width="1000"frameborder="1" style="border:1" allowfullscreen></iframe>`);

    $('#mapa, #fondo').fadeIn(1500, "linear");
    $('#mapa').css('display', 'flex');
    $('#mapa').css('flex-direction', 'column'); //necesario para que el iframe y la x se pongan en columna
    $('body,#info').css('background-color', 'black'); //Hacemos el fondo oscuro
}
function cerrarMapa() {
    $('#mapa').css('display', 'none'); //necesario para que el iframe dentro del div mapa se centro
    $('body,#info').css('background-color', 'initial');
}
function abrirGraf(n, nombre) {

    let y = 0;
    let data = [];
    let dataSeries = {
        type: "line"
    };
    let dataPoints = [];
    for (let i = 0; i < filas.length; i++) {
        //Valor (Eje y)
        y += (Number(filas[i][n]));
        //Fecha (Eje x)
        campos_separados = filas[i].fecha.split("-");
        dateTime = new Date(campos_separados[0], campos_separados[1] - 1, campos_separados[2]);
        dateTime.setDate(dateTime.getDate());

        dataPoints.push({
            x: dateTime,
            y: y
        });
    }
    console.log(y.length);
    dataSeries.dataPoints = dataPoints;
    data.push(dataSeries);


    let chart = new CanvasJS.Chart("grafico", {
        zoomEnabled: true,
        title: {
            text: `${nombre} de la consulta actual`
        },
        axisX: {
            labelAngle: -30
        },
        axisY: {
            includeZero: false
        },
        data: data // random generator below

    });

    chart.render();
}
function removeLoader() {
    $("#loadingDiv").fadeOut(500, function () {
        // fadeOut complete. Remove the loading div
        $("#loadingDiv").remove(); //makes page more lightweight 
    });
}
function diferenciaTiempo(timeDiff) {
    // obtenemos los segundos
    timeDiff = timeDiff / 1000;

    let result = "";
    if (timeDiff < 60) {
        // unicamente mostraremos los segundos
        result = timeDiff + " segundos";
    } else {
        // cogemos la parte entera de los segundos
        let seconds = Math.round(timeDiff % 60);

        // restamos los segundos que hemos cogido
        timeDiff = Math.floor(timeDiff / 60);

        // cogemos los minutos
        let minutes = Math.round(timeDiff % 60);

        // restamos los minutos que hemos cogido
        timeDiff = Math.floor(timeDiff / 60);

        // cogemos las horas
        let hours = Math.round(timeDiff % 24);

        // restamos las horas que hemos cogido
        timeDiff = Math.floor(timeDiff / 24);

        // el resto, son dias
        let days = timeDiff;

        if (days > 0) {
            result = days + " días, " + hours + " horas, " + minutes + " minutos y " + seconds + " segundos";
        } else if (hours > 0) {
            result = hours + " horas, " + minutes + " minutos y " + seconds + " segundos";
        } else {
            result = minutes + " minutos y " + seconds + " segundos";
        }
    }
    return result;
}
function downloadCSV(csv, filename) {

}
//EVENTOS
$("#siguientes").on("click", function () {
    console.log("Clickado en sig");
    generarTabla(20, ultimo);
});
$("#anteriores").on("click", function () {
    console.log("Clickado en ant");
    generarTablaAtras(20, primero);
});
document.addEventListener('click', function (ev) {
    if (ev.target.id == "posicion") { //Clickar en una celda de posición
        abrirMapa(ev.target.textContent, ev.target.previousSibling.textContent);
    }
    if (ev.target.id == "cerrar") {
        cerrarMapa();
    }
    if(ev.target.textContent=="fecha"){//Se ha pulsado en el campo fecha de la cabecera
        let reversed=filas.reverse();
        filas=reversed;
        primero = -20;
        ultimo = 0;
        generarTabla(20, 0);
    }
    if(ev.target.textContent=="co_mg_m3"){
        if(ya_ordenado[0]==true){
            filas.sort((a, b) => parseFloat(a.campo1) - parseFloat(b.campo1));
            ya_ordenado[0]=false;
        }else{
            filas.sort((a, b) => parseFloat(b.campo1) - parseFloat(a.campo1));
            ya_ordenado[0]=true;
        }
        primero = -20;
        ultimo = 0;
        generarTabla(20, 0);
    }
    if(ev.target.textContent=="no_ug_m3"){
        if(ya_ordenado[1]==true){
            filas.sort((a, b) => parseFloat(a.campo2) - parseFloat(b.campo2));
            ya_ordenado[1]=false;
        }else{
            filas.sort((a, b) => parseFloat(b.campo2) - parseFloat(a.campo2));
            ya_ordenado[1]=true;
        }
        primero = -20;
        ultimo = 0;
        generarTabla(20, 0);
    }
    if(ev.target.textContent=="no2_ug_m3"){
        if(ya_ordenado[2]==true){
            filas.sort((a, b) => parseFloat(a.campo3) - parseFloat(b.campo3));
            ya_ordenado[2]=false;
        }else{
            filas.sort((a, b) => parseFloat(b.campo3) - parseFloat(a.campo3));
            ya_ordenado[2]=true;
        }
        primero = -20;
        ultimo = 0;
        generarTabla(20, 0);
    }
    if(ev.target.textContent=="o3_ug_m3"){
        if(ya_ordenado[3]==true){
            filas.sort((a, b) => parseFloat(a.campo4) - parseFloat(b.campo4));
            ya_ordenado[3]=false;
        }else{
            filas.sort((a, b) => parseFloat(b.campo4) - parseFloat(a.campo4));
            ya_ordenado[3]=true;
        }
        primero = -20;
        ultimo = 0;
        generarTabla(20, 0);
    }
    if(ev.target.textContent=="pm10_ug_m3"){
        if(ya_ordenado[4]==true){
            filas.sort((a, b) => parseFloat(a.campo5) - parseFloat(b.campo5));
            ya_ordenado[4]=false;
        }else{
            filas.sort((a, b) => parseFloat(b.campo5) - parseFloat(a.campo5));
            ya_ordenado[4]=true;
        }
        primero = -20;
        ultimo = 0;
        generarTabla(20, 0);
    }
    if(ev.target.textContent=="pm25_ug_m3"){
        if(ya_ordenado[5]==true){
            filas.sort((a, b) => parseFloat(a.campo6) - parseFloat(b.campo6));
            ya_ordenado[5]=false;
        }else{
            filas.sort((a, b) => parseFloat(b.campo6) - parseFloat(a.campo6));
            ya_ordenado[5]=true;
        }
        primero = -20;
        ultimo = 0;
        generarTabla(20, 0);
    }
    if(ev.target.textContent=="so2_ug_m3"){
        if(ya_ordenado[6]==true){
            filas.sort((a, b) => parseFloat(a.campo7) - parseFloat(b.campo7));
            ya_ordenado[6]=false;
        }else{
            filas.sort((a, b) => parseFloat(b.campo7) - parseFloat(a.campo7));
            ya_ordenado[6]=true;
        }
        primero = -20;
        ultimo = 0;
        generarTabla(20, 0);
    }
});
$("#botones_campos button").on("click", function () {
    abrirGraf(this.id, this.textContent);
});
$("#atras").on("click", function () {
    document.cookie = `nombreSeleccionado=${getParameterByName('provincia')};`;
    document.cookie = `estacionSeleccionado=${getParameterByName('estacion')};`;
    document.cookie = `fiSeleccionado=${getParameterByName('f_inicio')};`;
    document.cookie = `ffSeleccionado=${getParameterByName('f_final')};`;
});
$("#csv").on("click", function () {
    let csv = [];
    for (let f of filas) {
        let row = [];
        row.push(f.fecha);
        row.push(f.campo1);
        row.push(f.campo2);
        row.push(f.campo3);
        row.push(f.campo4);
        row.push(f.campo5);
        row.push(f.campo6);
        row.push(f.campo7);
        row.push(f.provincia);
        row.push(f.estacion);
        row.push(f.posicion);
        csv.push(row.join(";"));
    }
    let csvFile;
    let downloadLink;

    // CSV file
    csvFile = new Blob([csv.join("\n")], {type: "text/csv"});
    // Download link
    downloadLink = document.createElement("a");
    // File name
    downloadLink.download = "consulta.csv";
    // Create a link to the file
    downloadLink.href = window.URL.createObjectURL(csvFile);
    // Hide download link
    downloadLink.style.display = "none";
    // Add the link to DOM
    document.body.appendChild(downloadLink);
    // Click download link
    downloadLink.click();
});
$("#json").on("click", function () {
        //Convert JSON Array to string.
        var json = JSON.stringify(filas);
 
        //Convert JSON string to BLOB.
        json = [json];
        var blob1 = new Blob(json, { type: "text/plain;charset=utf-8" });
 
        //Check the Browser.
        var isIE = false || !!document.documentMode;
        if (isIE) {
            window.navigator.msSaveBlob(blob1, "consulta.json");
        } else {
            var url = window.URL || window.webkitURL;
            link = url.createObjectURL(blob1);
            var a = document.createElement("a");
            a.download = "consulta.json";
            a.href = link;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
});