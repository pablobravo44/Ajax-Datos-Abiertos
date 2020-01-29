//IF PARA CONSERVAR LAS OPCIONES SELECCIONADAS EN LA CONSULTA (ALMACENADAS EN COOKIES)
if (document.cookie != "") {
    let a_cookies = document.cookie.split("; ");
    console.log(a_cookies);
    for (let c of a_cookies) {
        let datos_cookie = c.split("=");
        if (datos_cookie[0] == "nombreSeleccionado") {
            $('#provincia option').each(function () {
                if (this.innerText == datos_cookie[1]) {
                    $("#provincia").val(datos_cookie[1]);
                    //GENERAMOS EL SELECTOR DE ESTACIÓN
                    let html = `<label for="estacion">Estación</label> <div class="col-8"><select class="custom-select" id="estacion" name="estacion">`;
                    html += opcionesEstacion(datos_cookie[1]);
                    html += `</select></div>`;
                    $("#div_estacion").html(html);
                    //GENERAMOS EL SELECTOR DE ESTACIÓN
                }
            });
            document.cookie = datos_cookie[0] + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            continue;
        }
        if (datos_cookie[0] == "estacionSeleccionado") {
            $('#estacion option').each(function () {
                if (this.innerText == datos_cookie[1]) {
                    $("#estacion").val(datos_cookie[1]); //Le cambio la opción seleccionada al select
                    $("#mapa").html(htmlMapa(datos_cookie[1]));
                }
            });
            document.cookie = datos_cookie[0] + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            continue;
        }
        if (datos_cookie[0] == "fiSeleccionado") {
            $("#f_inicio").val(datos_cookie[1]); //Le cambio la opción seleccionada al select
            document.cookie = datos_cookie[0] + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            continue;
        }
        if (datos_cookie[0] == "ffSeleccionado") {
            $('#lbl_final').html(`<label for="f_final">Fecha final</label> <div class="col-8"><input required type="date" name="f_final" id="f_final" class="f_final" min="1997-01-01" max="2018-12-31" value="0" class="form-control"></div>`);
            $("#f_final").val(datos_cookie[1]);
            document.cookie = datos_cookie[0] + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        }
    }
}
//EVENTOS
$('#provincia').change(function () { //Evento cuando el select de provincia cambia de valor
    $("#mapa").html(""); //Borramos el html del mapa
    if ($(this).val() != 0) {
        let html = `<label for="estacion">Estación</label> <div class="col-8"><select class="custom-select" id="estacion" name="estacion">`;
        html += opcionesEstacion($(this).val());
        html += `</select></div>`;
        $("#div_estacion").html(html);
    } else {
        $("#div_estacion").html("");
    }
});
$('#f_inicio').change(function () {
    var date = $(this).val();
    if (date != "") {
        $('#lbl_final').html(`<label for="f_final">Fecha final</label> <div class="col-8"><input required type="date" name="f_final" id="f_final" class="f_final" min="1997-01-01" max="2018-12-31" value="0" class="form-control"></div>`);
    } else {
        $('#lbl_final').html("");
    }
});
$(document).on("change", '#estacion', function () { //Evento cuando cambia la selección del select de estaciones
    if ($(this).val() != 0) { //TENGO QUE HACERLO ASÍ PORQUE EL ELEMENTO QUE QUIERO AÑADIR EL EVENTO NO ESTÁ CARGADO CUANDO EL RESTO DE LA PÁGINA SÍ, ES UN ELEMENTO DINÁMICO
        $("#mapa").html(htmlMapa($(this).val()));
    } else {
        $("#mapa").html("");
    }
});
$('#mapa_cyl area').click(function () { //evento cuando se clicka en uno de los nombres del mapa
    let provincia_clickada = $(this).context.alt;
    $('#provincia option').each(function () {
        if (provincia_clickada == $(this).html()) {
            $('select[name="provincia"]').find(`option:contains("${$(this).html()}")`).attr("selected", true); //Cambiamos la opción seleccionada
            //MISMO CÓDIGO QUE EL EVENTO DEL SELECT CAMBIANDO DE OPCIÓN
            $("#mapa").html(""); //Borramos el html del mapa
            if ($('#provincia').val() != 0) {
                let html = `<label for="estacion">Estación</label> <div class="col-8"><select class="custom-select" id="estacion" name="estacion">`;
                html += opcionesEstacion($('#provincia').val());
                html += `</select></div>`;
                $("#div_estacion").html(html);
            } else {
                $("#div_estacion").html("");
            }
        }
    });
});
//FUNCIONES
function opcionesEstacion(provincia) {
    let html_opciones = "";
    if (provincia == "León") {
        html_opciones += "<option value=0>" + "Sin estación" + "</option>";
        html_opciones += "<option>" + "Leon 4" + "</option>";
        html_opciones += "<option>" + "La Robla" + "</option>";
        html_opciones += "<option>" + "C.T.Compostilla-Villaverde" + "</option>";
        html_opciones += "<option>" + "Toral de los Vados" + "</option>";
        html_opciones += "<option>" + "Tudela Veguin-Tudela Veguin" + "</option>";
        html_opciones += "<option>" + "C.T.L.R. - Ventosilla" + "</option>";
        html_opciones += "<option>" + "Leon1" + "</option>";
        html_opciones += "<option>" + "Otero" + "</option>";
        html_opciones += "<option>" + "C.T.Compostilla-Santa Marina" + "</option>";
        html_opciones += "<option>" + "C.T.Anllares - Lillo" + "</option>";
        html_opciones += "<option>" + "C.T.L.R. - Naredo" + "</option>";
        html_opciones += "<option>" + "C.T.Compostilla-Congosto" + "</option>";
        html_opciones += "<option>" + "Lario" + "</option>";
        html_opciones += "<option>" + "C.T.Compostilla-Compostilla" + "</option>";
        html_opciones += "<option>" + "C.T.Anllares - Hospital del Sil" + "</option>";
        html_opciones += "<option>" + "C.T.Compostilla-Cortiguera" + "</option>";
        html_opciones += "<option>" + "C.T.Anllares - Palacios del Sil" + "</option>";
        html_opciones += "<option>" + "Carracedelo" + "</option>";
        html_opciones += "<option>" + "C.T.Anllares - Anllares" + "</option>";
        html_opciones += "<option>" + "Ponferrada4" + "</option>";
        html_opciones += "<option>" + "C.T.Anllares - Susañe" + "</option>";
        html_opciones += "<option>" + "C.T.L.R. - Cuadros" + "</option>";
        html_opciones += "<option>" + "C.T.Compostilla-Cueto" + "</option>";
        html_opciones += "<option>" + "C.T.Compostilla-Sancedo" + "</option>";
        html_opciones += "<option>" + "C.T.Compostilla-San Miguel" + "</option>";
        html_opciones += "<option>" + "Leon3" + "</option>";
        html_opciones += "<option>" + "Ponferrada5" + "</option>";
    }
    if (provincia == "Avila") {
        html_opciones += "<option value=0>" + "Sin estación" + "</option>";
        html_opciones += "<option>" + "Avila II" + "</option>";
        html_opciones += "<option>" + "Avila" + "</option>";
    }
    if (provincia == "Burgos") {
        html_opciones += "<option value=0>" + "Sin estación" + "</option>";
        html_opciones += "<option>" + "Aranda de Duero 2" + "</option>";
        html_opciones += "<option>" + "Burgos1" + "</option>";
        html_opciones += "<option>" + "Burgos4" + "</option>";
        html_opciones += "<option>" + "Medina de Pomar" + "</option>";
        html_opciones += "<option>" + "Miranda de Ebro2" + "</option>";
        html_opciones += "<option>" + "Miranda de Ebro1" + "</option>";
        html_opciones += "<option>" + "Burgos5" + "</option>";
    }
    if (provincia == "Palencia") {
        html_opciones += "<option value=0>" + "Sin estación" + "</option>";
        html_opciones += "<option>" + "Renault4" + "</option>";
        html_opciones += "<option>" + "Hontoria 2 - Venta de Baños" + "</option>";
        html_opciones += "<option>" + "C.T.G. - Compuerto" + "</option>";
        html_opciones += "<option>" + "Guardo" + "</option>";
        html_opciones += "<option>" + "Palencia 3" + "</option>";
        html_opciones += "<option>" + "C.T.G. - Villalba" + "</option>";
        html_opciones += "<option>" + "Hontoria 1 - Poblado" + "</option>";
        html_opciones += "<option>" + "Velilla del Rio Carrion" + "</option>";
    }
    if (provincia == "Salamanca") {
        html_opciones += "<option value=0>" + "Sin estación" + "</option>";
        html_opciones += "<option>" + "El Maillo" + "</option>";
        html_opciones += "<option>" + "Salamanca5" + "</option>";
        html_opciones += "<option>" + "Salamanca6" + "</option>";
        html_opciones += "<option>" + "Salamanca4" + "</option>";
    }
    if (provincia == "Segovia") {
        html_opciones += "<option value=0>" + "Sin estación" + "</option>";
        html_opciones += "<option>" + "Segovia 2" + "</option>";
    }
    if (provincia == "Soria") {
        html_opciones += "<option value=0>" + "Sin estación" + "</option>";
        html_opciones += "<option>" + "Muriel de la Fuente" + "</option>";
        html_opciones += "<option>" + "Soria" + "</option>";
    }
    if (provincia == "Valladolid") {
        html_opciones += "<option value=0>" + "Sin estación" + "</option>";
        html_opciones += "<option>" + "Vega Sicilia" + "</option>";
        html_opciones += "<option>" + "VALLADOLID SUR" + "</option>";
        html_opciones += "<option>" + "Puente Regueral" + "</option>";
        html_opciones += "<option>" + "Michelin1" + "</option>";
        html_opciones += "<option>" + "Renault3" + "</option>";
        html_opciones += "<option>" + "Michelin2" + "</option>";
        html_opciones += "<option>" + "Arco de ladrillo II" + "</option>";
        html_opciones += "<option>" + "La rubia II" + "</option>";
        html_opciones += "<option>" + "Renault2" + "</option>";
        html_opciones += "<option>" + "Medina del Campo" + "</option>";
        html_opciones += "<option>" + "Renault1" + "</option>";
        html_opciones += "<option>" + "Cementerio" + "</option>";
        html_opciones += "<option>" + "Labradores II" + "</option>";
    }
    if (provincia == "Zamora") {
        html_opciones += "<option value=0>" + "Sin estación" + "</option>";
        html_opciones += "<option>" + "Zamora 2" + "</option>";
    }
    return html_opciones;
}

function htmlMapa(estacion) {
    let datos = `estacion;posicion
    Burgos1;42.3508333333, -3.67555555556
    Zamora 2;41.5097222222, -5.74638888889
    Renault3;41.6127777778, -4.74083333333
    Arco de ladrillo II;41.6455555556, -4.73027777778
    Burgos4;42.3361111111, -3.63611111111
    Guardo;42.7952777778, -4.84083333333
    Aranda de Duero 2;41.6655555556, -3.68888888889
    C.T.G. - Villalba;42.7036111111, -4.82722222222
    C.T.Anllares - Palacios del Sil;42.8777777778, -6.44
    C.T.Anllares - Susañe;42.8394444444, -6.50111111111
    Vega Sicilia;41.6205555556, -4.74666666667
    Miranda de Ebro2;42.6880555556, -2.94055555556
    Ponferrada4;42.5427777778, -6.58472222222
    Renault1;41.6, -4.7325
    Muriel de la Fuente;41.7236111111, -2.85694444444
    Salamanca5;40.9791666667, -5.66527777778
    Renault4;41.9613888889, -4.49444444444
    Lario;43.0411111111, -5.09055555556
    La rubia II;41.63, -4.74055555556
    C.T.Compostilla-Compostilla;42.5708333333, -6.58944444444
    San Martín de Valdeiglesias;40.3869444444, -4.39666666667
    Otero;42.5644444444, -6.78194444444
    VALLADOLID SUR;41.6113888889, -4.77222222222
    Hontoria 1 - Poblado;41.9327777778, -4.47
    Tudela Veguin-Tudela Veguin;42.8016666667, -5.64888888889
    C.T.Compostilla-Villaverde;42.6138888889, -6.48388888889
    C.T.L.R. - Ventosilla;42.9441666667, -5.66194444444
    La Robla;42.8027777778, -5.62361111111
    Michelin2;41.6833333333, -4.74111111111
    El Maillo;40.5705555556, -6.2225
    Puente Regueral;41.6561111111, -4.73388888889
    Segovia 2;40.9555555556, -4.11055555556
    C.T.G. - Compuerto;42.8491666667, -4.83583333333
    Soria;41.7666666667, -2.46666666667
    C.T.Compostilla-Congosto;42.6255555556, -6.52083333333
    Hontoria 2 - Venta de Baños;41.9480555556, -4.46583333333
    Salamanca6;40.9608333333, -5.63972222222
    Michelin1;41.6663888889, -4.715
    C.T.Compostilla-Cortiguera;42.6116666667, -6.64333333333
    Toral de los Vados;42.545, -6.72555555556
    Palencia 3;42.0194444444, -4.53833333333
    C.T.L.R. - Cuadros;42.7155555556, -5.63888888889
    C.T.Anllares - Lillo;42.7813888889, -6.60388888889
    Avila II;40.6647222222, -4.70055555556
    Leon1;42.6038888889, -5.58722222222
    Medina del Campo;41.3163888889, -4.90916666667
    Renault2;41.6041666667, -4.72888888889
    C.T.L.R. - Naredo;42.8166666667, -5.53333333333
    Carracedelo;42.5586111111, -6.72555555556
    C.T.Anllares - Anllares;42.8463888889, -6.54444444444
    Leon 4;42.5752777778, -5.56638888889
    C.T.Compostilla-Santa Marina;42.6727777778, -6.51527777778
    Miranda de Ebro1;42.6844444444, -2.9175
    Medina de Pomar;42.9525, -3.47527777778
    C.T.Anllares - Hospital del Sil;42.8219444444, -6.51277777778
    C.T.Compostilla-Cueto;42.6363888889, -6.66222222222
    C.T.Compostilla-San Miguel;42.5969444444, -6.52083333333
    C.T.Compostilla-Sancedo;42.6708333333, -6.65361111111
    Burgos5;42.3455555556, -3.72111111111
    Salamanca4;40.9497222222, -5.65833333333
    Leon3;42.6088888889, -5.56472222222
    Cementerio;41.6761111111, -4.69527777778
    Labradores II;41.6469444444, -4.71944444444
    Velilla del Rio Carrion;42.8280555556, -4.84305555556
    Ponferrada5;42.5577777778, -6.625`;
    let filas = datos.split(/\r?\n|\r/);
    let array = [];
    let html_mapa = "";
    for (let i = 0; i < filas.length; i++) {
        array.push(filas[i]);
    }
    for (let i = 0; i < array.length; i++) {
        let division = array[i].split(";");
        if (division[0].trim() == estacion.trim()) {
            let coordenadas = division[1].split(",");
            html_mapa = `<iframe class="iframe" src="https://maps.google.com/maps?q=${coordenadas[0]},${coordenadas[1]}&z=13&output=embed" height="351" width="450"frameborder="1" style="border:1" allowfullscreen></iframe>`;
            return html_mapa;
        }
    }
}