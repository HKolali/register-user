const form = document.querySelector('form')
const formTitle = document.querySelector('h1')
const firstnameInput = document.querySelector('#firstname')
const lastnameInput = document.querySelector('#lastname')
const usernameInput = document.querySelector('#username')
const passwordInput = document.querySelector('#password')
const dialogBoxError = document.querySelector('.dialog-box-error')
const dialogBoxErrorTitle = document.querySelector('.dialog-box-error-title')
const dialogBoxErrorBtn = document.querySelector('.dialog-box-error-btn')
const firstname = document.querySelector('#firstname-input')
const lastname = document.querySelector('#lastname-input')
const register = document.querySelector('#register')
const login = document.querySelector('#login')

let selectedForm = 'register'
let baseURL = 'http://localhost:2020'

form.addEventListener('submit', event => {
    event.preventDefault()

    if (selectedForm.match('register')) {
        if (checkValueInput()) {
            let userInfo = {
                firstname: firstnameInput.value,
                lastname: lastnameInput.value,
                username: usernameInput.value,
                password: passwordInput.value
            }
            registerUser(userInfo)
        }
    } else {
        if (checkValueInput()) {
            let userInfo = {
                username: usernameInput.value,
                password: passwordInput.value
            }
            loginUser(userInfo)
        }
    }
})

register.addEventListener('click', () => {
    formTitle.textContent = 'Register Form'
    firstname.style.display = 'flex'
    lastname.style.display = 'flex'
    selectedForm = 'register'
})

login.addEventListener('click', () => {
    formTitle.textContent = 'Login Form'
    firstname.style.display = 'none'
    lastname.style.display = 'none'
    selectedForm = 'login'
})

const registerUser = async (userInfo) => {
    const response = await fetch(`${baseURL}/api/users/new-user`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userInfo)
    })
    const result = await response.json()
    if (response.status === 200) {
        dialogBoxErrorTitle.textContent = 'Add User Successfuly';
        dialogBoxError.classList.add('active')
        emptyForm()
    }
    console.log(statusCode);
}

const loginUser = async (userInfo) => {
    const response = await fetch(`${baseURL}/api/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userInfo)
    })
    const result = await response.json()
    if (response.status === 200 && result.length === 1) {
        dialogBoxErrorTitle.textContent = 'Login Successfuly';
        dialogBoxError.classList.add('active')
        emptyForm()
    } else {
        dialogBoxErrorTitle.textContent = 'User Not Register';
        dialogBoxError.classList.add('active')
    }
    console.log(response.status, result);
}

const emptyForm = () => {
    firstnameInput.value = ''
    lastnameInput.value = ''
    usernameInput.value = ''
    passwordInput.value = ''
}

const checkValueInput = () => {
    if(selectedForm.match('register')){
        if (firstnameInput.value.length < 4) {
            dialogBoxErrorTitle.textContent = 'Minimum length for firstname is 4 charecter';
            dialogBoxError.classList.add('active')
            return false
        } 
        if (lastnameInput.value.length < 4) {
            dialogBoxErrorTitle.textContent = 'Minimum length for lastname is 4 charecter';
            dialogBoxError.classList.add('active')
            return false
        } 
    }
    if (usernameInput.value.length < 4) {
        dialogBoxErrorTitle.textContent = 'Minimum length for username is 4 charecter';
        dialogBoxError.classList.add('active')
        return false
    } 
    if (passwordInput.value.length < 6) {
        dialogBoxErrorTitle.textContent = 'Minimum length for password is 4 charecter';
        dialogBoxError.classList.add('active')
        return false
    }
    return true
}

dialogBoxErrorBtn.addEventListener('click', () => {
    dialogBoxError.classList.remove('active')
})