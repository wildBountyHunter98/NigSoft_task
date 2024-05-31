const main_container = document.querySelector(".main_container");
const form = document.querySelector(".form");
const singUpBtn = document.getElementById("signin");

function popUpMessage(message) {
    let element = document.createElement("div");
    element.classList.add("popup_message");
    element.innerHTML = message;

    main_container.append(element);
    let timeout = setTimeout(()=>{
        element.remove();
        clearTimeout(timeout);
    }, 5000)
}

function SignUpElements() {
    let signUpEls = `
                    <div class="inputBox">
                        <label for="userName">userName</label>
                        <input type="text" id="userName">
                    </div>
                    <div class="inputBox">
                        <label for="phNo">Phone No</label>
                        <input type="text" id="phNo">
                    </div>
                    <div class="radioBox">
                        <label for="gender">Gender</label>
                        <div class="radioBtns">
                            <input type="radio" value="male" name="gender"> Male
                            <input type="radio" value="female" name="gender"> Female
                        </div>
                    </div>
                    <div class="inputBox">
                        <label for="address">Address</label>
                        <textarea id="address" rows="5"></textarea>
                    </div>
                    <div class="inputBox">
                        <label for="password">Password</label>
                        <input type="password" id="password" >
                    </div>
                    <div class="btns">
                        <a href="#" id="gotoSignin">Alread have account?</a>
                        <button class="btn" id="signup">Sign Up</button>
                    </div>`;
    form.innerHTML = signUpEls;

    let goToSignIn = form.querySelector("#gotoSignin");

    let switchFields = () => {
        SignInElements();
        goToSignIn.removeEventListener("click", switchFields);
    }

    goToSignIn.addEventListener("click", switchFields);
    
    let signUpBtn = form.querySelector("#signup");

    let onClickSignUp = ()=>{
        let username = form.querySelector("#userName").value;
        let phno = form.querySelector("#phNo").value;
        let gender = form.querySelector('input[name="gender"]:checked').value;
        let address = form.querySelector("#address").value;
        let password = form.querySelector("#password").value;

        fetch("./login.php", {
            method: "POST",
            headers: {
                "content-Type" : "application/json; charset=utf-8"
            },
            body: JSON.stringify({mode: "signup", username: username, password: password, phno: phno, gender: gender, address: address})
        }).then(
            responsePromise => responsePromise.json()
        ).then(
            response => {
                if(response.isValid === "true") {
                    SignInElements();
                    popUpMessage("Account successfully created!!");
                } else {
                    popUpMessage("User name is already exist");
                }
            }
        )
    }

    signUpBtn.addEventListener("click", onClickSignUp);
}

function SignInElements() {
    let signInEls = `
                    <div class="inputBox">
                        <label for="">userName</label>
                        <input type="text" id="userName">
                    </div>
                    <div class="inputBox">
                        <label for="">Password</label>
                        <input type="password" id="password" >
                    </div>
                    <div class="btns">
                        <a href="#" id="gotoSignup">Create new account</a>
                        <button class="btn" id="signin">Sign In</button>
                    </div>`;
    form.innerHTML = signInEls;

    let goToSignUp = form.querySelector("#gotoSignup");

    let switchFields = () => {
        SignUpElements();
        goToSignUp.removeEventListener("click", switchFields);
    }

    goToSignUp.addEventListener("click", switchFields);

    let signInBtn = form.querySelector("#signin");

    let onClickSignIn = ()=>{
        let username = form.querySelector("#userName").value;
        let password = form.querySelector("#password").value;

        fetch("./login.php", {
            method: "POST",
            headers: {
                "content-Type" : "application/json; charset=utf-8"
            },
            body: JSON.stringify({mode: "signin", username: username, password: password})
        }).then(
            responsePromise => responsePromise.json()
        ).then(
            response => {
                if(response.isValid === "true") {
                    window.location = "./dashboard.php";
                } else {
                    popUpMessage("Invalid user name or password");
                }
            }
        )
    }

    signInBtn.addEventListener("click", onClickSignIn);
}

SignInElements();