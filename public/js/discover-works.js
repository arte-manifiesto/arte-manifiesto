
new Works()

function makeWorkObject(el, model) {

	new Work(el, {
		id: model.id,
		liked: model.liked,
		buttonLikeClass: 'js-likeButton',
		likeCoverClass: 'work__like-cover',
		likeSimbolClass: 'like-simbol'
	})
}

var workEls = document.querySelectorAll('.work')
// console.log('workEls: ', workEls)

for (var i = 0; i < workEls.length; i++){
	// console.log('works[i]: ', works[i])
	var index = workEls[i].getAttribute('data-index')
	// console.log('index: ', index-1)
	makeWorkObject(workEls[i], works[index-1])
}
