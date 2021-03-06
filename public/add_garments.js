const message = document.querySelector('.message');
const addGarmetBtn = document.querySelector('.addGarmentBtn');
const hideAddGarmetBtn = document.querySelector('.hideAddGarmetBtn');
const addGarmetButtonSectionaddGarmetSection = document.querySelector('.add.garment');
const addGarmetButtonSection = document.querySelector('.add.button');
const usernameEntered = document.querySelector('.login');
const login = document.querySelector('.btn');
function showMessage(value){
    message.innerHTML = value;
    message.classList.toggle('hidden');
    setTimeout(() =>  {
        message.innerHTML = '';
        message.classList.toggle('hidden');
    }, 3000);
}
function toggleAddGarmetScreen() {
    addGarmetSection.classList.toggle('hidden');
    addGarmetButtonSection.classList.toggle('show');
}
function loginScreen() {
    usernameEntered.classList.toggle('hidden');
    addGarmetButtonSectionaddGarmetSection.classList.toggle('show'); 
    addGarmetBtn.classList.toggle('show'); 

}

function unhideScreen() {
    hideAddGarmetBtn.classList.toggle('show'); 
}
// login.addEventListener('click', function(evt){
//     evt.preventDefault();
//     loginScreen();
// })
hideAddGarmetBtn.addEventListener('click', function(evt) {
    toggleAddGarmetScreen()
    unhideScreen()
});
const fieldManager = FieldManager({
    'description': '',
    'img': '',
    'season': '',
    'gender': '',
    'price': 0.00
});
addGarmetBtn.addEventListener('click', function(evt) {
    // fields on the screen
    const fields = fieldManager.getValues();
    axios
        .post('/api/garments', fields)
        .then(result =>{
            if (result.data.status == 'error') {
                showMessage(result.data.message);
            } else {
                toggleAddGarmetScreen();
                // show success message from API
                showMessage(result.data.message);
                fieldManager.clear();
                // show all the data
                filterData();
            }
        })
        .catch(err => {
            showMessage(err.stack)
        });
});
addGarmetButtonSection.addEventListener('click', function(evt) {
    evt.preventDefault();
    toggleAddGarmetScreen()
});








