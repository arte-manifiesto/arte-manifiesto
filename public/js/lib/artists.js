
function Artists (data) {
	
	var prefix = data.prefix,
			makeObject = data.makeObject;

	var artistsContainer = document.querySelector('.artists'),
			artistTemplate = _.template( $( "#artist-template" ).html() );

	var page = 1;

	var idUser = user.id || 0 // Se puede presindir de ell, asi como en el /follow

	var categorys = document.querySelectorAll('.js-category'),
			orders = document.querySelectorAll('.js-order'),
			times = document.querySelectorAll('.js-time'),
			moreButton = document.querySelector('.js-moreButton');

	function setup () {

		for (var i = 0; i < categorys.length; i++)
			categorys[i].addEventListener('click', function () {
				changeCategory(this.getAttribute("data-value"))
			})

		for (var i = 0; i < orders.length; i++)
			orders[i].addEventListener('click', function () {
				changeOrder(this.getAttribute("data-value"))
			})

		for (var i = 0; i < times.length; i++)
			times[i].addEventListener('click', function () {
				changeTime(this.getAttribute("data-value"))
			})

		moreButton.addEventListener('click', function () {
			more()
		})
	}

	function more () {
		url = url.replace('page-' + pagination.page, 'page-' + ++pagination.page)
		getData(true)
	}

	function changeCategory (categoryValue) {
		// console.log('changeCategory: ', categoryValue, url)
		// console.log('url: ', url)
		// category = value
		var currentCategory = url.split('/')[5]
		// console.log('currentCategory: ', currentCategory)
		url =	url.replace('specialty/'+currentCategory, 'specialty/'+categoryValue)
		// console.log('url replace: ', url)
		// url =	url.replace(currentCategory, value)
		url = url.replace('page-' + pagination.page, 'page-1')
		// console.log('url chage page: ', url)
		getData(false)
	}

	function changeOrder(orderValue) {
		// orderValue = value
    var order = getUrlParameter('order')
		url = url.replace(order, orderValue)
		url = url.replace('page-' + pagination.page, 'page-1')
		getData(false)
	}

	function changeTime (timeValue) {
		// timeValue = value
		var time = getUrlParameter('time');
		if (time != undefined)
			url = url.replace(time, timeValue);
		else
			url += '&time='+timeValue;
		url = url.replace('page-' + pagination.page, 'page-1')
		getData(false)
	}

	function removeEntities (entityClass) {
		// var currentArtists = artistsContainer.querySelectorAll('.artist')
		var entities = artistsContainer.querySelectorAll('.' + entityClass)

		for (var i = 0; i < entities.length; i++)
			entities[i].remove()
	}

	function render (artists) {
		removeEntities('artist-wrapper')
		add(artists)
	}

	function add (artists) {
		for (var i = 0; i < artists.length; i++) {
			var artist = makeEl(artistTemplate, artists[i])
			// salvattore['append_elements'](artistsContainer, [artist])

			artistsContainer.appendChild(artist)

			makeObject(artist, artists[i])
		}
	}

	function getData(isAdd){
		// url = url.replace('users' , 'search/users')
		url = url.replace(prefix , 'search/' + prefix)
		console.log('url: ', url)

		$.post( url, {idUser: idUser}, function( data ) {
			console.log('data: ', data)

			url = data.url
			if(isAdd) add(data.users)
			else {
				window.history.pushState({}, "", url)
				render(data.users)
			}
		})
	}

	setup()
}

function getUrlParameter(sParam) {
	var sPageURL = window.location.search.substring(1)
	var sURLVariables = sPageURL.split('&')
	for (var i = 0; i < sURLVariables.length; i++) {
		var sParameterName = sURLVariables[i].split('=')
		if (sParameterName[0] == sParam)
			return sParameterName[1]
	}
}