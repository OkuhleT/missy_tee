let seasonFilter = 'All';
let genderFilter = 'All';

const seasonOptions = document.querySelector('.seasons');
const genderOptions = document.querySelector('.genders');
const searchResultsElem = document.querySelector('.searchResults');
const priceRangeElem = document.querySelector('.priceRange');
const showPriceRangeElem = document.querySelector('.showPriceRange');
const enterUsername = document.querySelector('.text-input');
const loginButton = document.querySelector('.btn');
const displayApp = document.querySelector('.display')

const garmentsTemplateText = document.querySelector('.garmentListTemplate');
const garmentsTemplate = Handlebars.compile(garmentsTemplateText.innerHTML);

loginButton.addEventListener('click', function () {
	if (enterUsername.value) {
		axios.post('/api/token', { username: enterUsername.value })
			.then(function(result){
				const token = result.data.token
				console.log(token)
				localStorage.setItem('token', token)
			})
	}

})
displayApp.addEventListener('click', function(){
	const token = localStorage.getItem('token')
	axios
		.get(`/api/name?token=${token}`)
		 .then(function(result){
			 messageFor.innerHTML = result.name;
		 })
		
		 .catch(function(err){
		message.innerHTML = err.message;
		 })
		 loginScreen()
		 unhideScreen()
})

seasonOptions.addEventListener('click', function (evt) {
	seasonFilter = evt.target.value;
	filterData();
});

genderOptions.addEventListener('click', function (evt) {
	genderFilter = evt.target.value;
	filterData();
});
function useApi() {
	axios.get('http://localhost:4017/api/garments')
		.then(function (result) {
			searchResultsElem.innerHTML = garmentsTemplate({
				garments: result.data.garments
			})

		})
}
function filterData() {
	axios
		.get(`/api/garments?gender=${genderFilter}&season=${seasonFilter}`)
		.then(function (result) {
			searchResultsElem.innerHTML = garmentsTemplate({
				garments: result.data.garments
			})
		});
}

priceRangeElem.addEventListener('change', function (evt) {
	const maxPrice = evt.target.value;
	showPriceRangeElem.innerHTML = maxPrice;
	axios
		.get(`/api/garments/price/${maxPrice}`)
		.then(function (result) {
			searchResultsElem.innerHTML = garmentsTemplate({
				garments: result.data.garments
			})
		});
});

filterData();

document.querySelector('.display').addEventListener('click', ()=> {
	document.querySelector('.showMe').className = 'container showMe'
})