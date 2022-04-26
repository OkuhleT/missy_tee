let seasonFilter = 'All';
let genderFilter = 'All';

const seasonOptions = document.querySelector('.seasons');
const genderOptions = document.querySelector('.genders');
const searchResultsElem = document.querySelector('.searchResults');
const priceRangeElem = document.querySelector('.priceRange');
const showPriceRangeElem = document.querySelector('.showPriceRange');
const enterUsername = document.querySelector('.text-input');
const loginButton = document.querySelector('.btn');


const garmentsTemplateText = document.querySelector('.garmentListTemplate');
const garmentsTemplate = Handlebars.compile(garmentsTemplateText.innerHTML);


loginButton.addEventListener('click', function () {
	// get username from input
	
	loginScreen()
	unhideScreen()
	axios.post('http://localhost:4018/api/login', {
	username: "hlomla"
	
})
.then((res) => {
  console.log(res.data)
  // show garments
})
.catch((error) => {
  console.error(error)
})
});


seasonOptions.addEventListener('click', function(evt){
	seasonFilter = evt.target.value;
	filterData();
});

genderOptions.addEventListener('click', function(evt){
	genderFilter = evt.target.value;
	filterData();
});
function useApi(){
	axios.get('http://localhost:4017/api/garments')
	.then(function(result) {
		searchResultsElem.innerHTML = garmentsTemplate({
			garments : result.data.garments
		})
	
})
}
function filterData() {
	axios
		.get(`/api/garments?gender=${genderFilter}&season=${seasonFilter}`)
		.then(function(result) {
			searchResultsElem.innerHTML = garmentsTemplate({
				garments : result.data.garments
			})
		});
}

priceRangeElem.addEventListener('change', function(evt){
	const maxPrice = evt.target.value;
	showPriceRangeElem.innerHTML = maxPrice;
	axios
		.get(`/api/garments/price/${maxPrice}`)
		.then(function(result) {
			searchResultsElem.innerHTML = garmentsTemplate({
				garments : result.data.garments
			})
		});
});

filterData();