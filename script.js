// hide blocks
let logOut = document.querySelector('.profile .sign-up'),
showReg = document.querySelector('.change-form.reg'),
showLog = document.querySelector('.change-form.log');

let regSection = document.querySelector('.register-form'),
logSection = document.querySelector('.log-form'),
profSec = document.querySelector('.profile');

let sign = document.forms.sign,
logIn = document.forms.log;

let regPass = /^\w{4,16}$/,
incl = [];

// show-hide forms
function showHide(par1, par2){
	par1.classList.remove('none');
	par2.classList.add('none');
}
logOut.addEventListener('click', ()=> showHide(logSection, profSec));
showReg.addEventListener('click', ()=> showHide(regSection, logSection));
showLog.addEventListener('click', ()=>showHide(logSection, regSection));

// sign-up
sign.addEventListener('submit', (e)=>{
	e.preventDefault();
	if(regPass.test(sign.pass.value)){
		if(localStorage.length>0){
			let us = JSON.parse(localStorage.getItem('users'));
			let len = Object.keys(us).length;
			for(let i=0; i<len; i++){
				sign.mail.value === us[`${i}`].mail ? incl[i] = true : incl[i] = false;
			}
			if(!incl.includes(true)){
				us[`${len}`] = {
					name: sign.name.value,
					surname: sign.surname.value,
					mail: sign.mail.value,
					pass: sign.pass.value
				}
				localStorage.setItem(`users`, JSON.stringify(us))
				document.querySelector(`.${sign.classList[0]} .message`).classList.remove('no-available');
				sign.reset();
			}else document.querySelector(`.${sign.classList[0]} .message`).classList.add('no-available');
		}
		else{
			localStorage.setItem(`users`, JSON.stringify({'0': {
				name: sign.name.value,
				surname: sign.surname.value,
				mail: sign.mail.value,
				pass: sign.pass.value
				}
			}));
		}
	}
})

// log-in
logIn.addEventListener('submit', (e)=>{
	e.preventDefault();
	users = JSON.parse(localStorage.getItem('users'));
	for(let i=0; i<Object.keys(users).length; i++){
		if(logIn.mail.value == users[`${i}`].mail  && logIn.pass.value === users[`${i}`].pass){
			logIn.classList.remove('no-available');
			document.querySelector('.profile .user-name').textContent = users[`${i}`].name + ' ' + users[`${i}`].surname;
			document.querySelector('.profile .email').textContent = users[`${i}`].mail;
			showHide(profSec, logSection);
			logIn.reset();
			return false;
		}
		else logIn.classList.add('no-available');
	}
})

// localStorage.clear();