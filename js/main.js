$(document).ready(function() {
	//Variable para almacenar información de JSON
	var data;
	//Ocultamos inicialmente el slider y el mapa
	$('.slider').hide();
	$('.map-container').hide();

	//Leemos nuestro origen de datos mediante una petición AJAX
	$.ajax({
		url: 'https://experienciasxcaret.github.io/Developers/api/front.json',
		method: 'GET',
		cache: false
	}).done(function(response) {
		//Asignamos los datos contenidos en el JSON a sus respectivos contenedores
		data = response[0];
		$('#sectionTitle').empty().append(data.tituloH1);
		$('#description').empty().append(data.descripcion);
		$("#btnCot").attr('href', data.CTA);
		// Para el caso de los atractivos y las imagenes, por cada elemento que se encuentre
		// en el array, creamos la estructura HTML correspondiente y la añadimos a la página
		for(i = 0; i < data.atractivos.length; i++) {
			var obj = '<div class="row">'+
					'<a href="'+ data.atractivos[i].link +'" target="_self">'+
						'<img class="col s12 l5" src="'+ data.atractivos[i].img +'" alt="'+ data.atractivos[i].titulo +'">'+
					'</a>';
			obj +=  '<div class="col s12 l7">'+
						'<div class="row">'+
							'<div class="col s12">'+
								'<h5>'+ data.atractivos[i].titulo +'</h5>'+
							'</div>'+
							'<p class="col s12">'+ data.atractivos[i].desc +'</p>'+
						'</div>'+
					'</div></div>';
			$("#atracciones").append(obj);
		}
		for(i = 0; i < data.img.length; i++) {
			$('.slides').append('<li><img src="'+data.img[i].source+'" alt="'+data.img[i].alt+'"></li>');
		}
		//Inicializamos el slider
		$('.slider').slider();
		$('#map').attr('src', data.maps360);
	});

	// Al hacer clic en los botones para ver las imagenes o la vista 360
	// ocultamos los contenedores no necesarios y mostramos el adecuado
	$("#btnFotos").bind('click', function() {
		$('.video-container').hide();
		$('.map-container').hide();
		$('.slider').show();
	});

	$("#btn360").bind('click', function() {
		$('.video-container').hide();
		$('.slider').hide();
		$('.map-container').show();
	});

});