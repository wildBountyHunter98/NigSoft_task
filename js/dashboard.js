function popUpWindow(title, content) {
    let popup_content = `<div class="popup_content">
                            <div class="title"><span>${title}</span></div>
                            <div class="popup_close">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15.4811 3.48668C16.0668 2.90101 16.0668 1.9499 15.4811 1.36424C14.8955 0.778572 13.9443 0.778572 13.3587 1.36424L8.42505 6.30254L3.48674 1.36892C2.90108 0.783257 1.94996 0.783257 1.3643 1.36892C0.778633 1.95458 0.778633 2.9057 1.3643 3.49136L6.30261 8.42499L1.36898 13.3633C0.783319 13.949 0.783319 14.9001 1.36898 15.4857C1.95464 16.0714 2.90576 16.0714 3.49142 15.4857L8.42505 10.5474L13.3634 15.4811C13.949 16.0667 14.9001 16.0667 15.4858 15.4811C16.0715 14.8954 16.0715 13.9443 15.4858 13.3586L10.5475 8.42499L15.4811 3.48668Z" fill="currentColor"/>
                                </svg>
                            </div>
                            <div class="content">${content}</div>
                        </div>`;
    // main div
    let popup_Container = document.createElement('div');
    popup_Container.classList.add("popup_container");
    popup_Container.innerHTML = popup_content;

    // onclick remove the popup
    var onClickClose = ()=>{
        popup_Container.querySelector(".popup_close").removeEventListener("click", onClickClose);
        popup_Container.remove();
    }

    document.querySelector("body").classList.add("overflowHidden");
    popup_Container.querySelector(".popup_close").addEventListener("click", onClickClose);

    return popup_Container;
}

const main_container = document.querySelector(".main_container");

function OnViewClicked(userData) {
    let userArr = userData;
    let content = `<div>User Name: ${userArr["user_name"]}</div><div>Ph No: ${userArr["phNo"]}</div><div>Gender: ${userArr["gender"]}</div><div>Address: ${userArr["address"]}</div><div>Password: ${userArr["password"]}</div>`;
    main_container.append(popUpWindow("View Data", content));
}

function OnDeleteClicked(userName) {
    
}

function OnEditClicked(userData) {
    let userArr = userData;
    console.log(userArr)
    let content = `<div class="inputBox">
                        <label for="userName">userName</label>
                        <input type="text" id="userName" value="${userArr["user_name"]}">
                    </div>
                    <div class="inputBox">
                        <label for="phNo">Phone No</label>
                        <input type="text" id="phNo" value="${userArr["phNo"]}">
                    </div>
                    <div class="radioBox">
                        <label for="gender">Gender</label>
                        <div class="radioBtns">
                            <input type="radio" value="male" name="gender" ${(userArr["gender"] === "male" ? "checked" : "")}> Male
                            <input type="radio" value="female" name="gender" ${(userArr["gender"] === "female" ? "checked" : "")}> Female
                        </div>
                    </div>
                    <div class="inputBox">
                        <label for="address">Address</label>
                        <textarea id="address" rows="5">${userArr["address"]}</textarea>
                    </div>
                    <div class="inputBox">
                        <label for="password">Password</label>
                        <input type="text" id="password" value="${userArr["password"]}">
                    </div>
                    <div class="btns">
                        <button class="btn" id="update">Update</button>
                    </div>`;
    let popEL = popUpWindow("View Data", content)
    main_container.append(popEL);

    let updateBtn = main_container.querySelector("#update");

    let onClickUpdate = ()=>{
        let username = popEL.querySelector("#userName").value;
        let phno = popEL.querySelector("#phNo").value;
        let gender = popEL.querySelector('input[name="gender"]:checked').value;
        let address = popEL.querySelector("#address").value;
        let password = popEL.querySelector("#password").value;

        fetch("./updateUser.php", {
            method: "POST",
            headers: {
                "content-Type" : "application/json; charset=utf-8"
            },
            body: JSON.stringify({username: username, password: password, phno: phno, gender: gender, address: address})
        }).then(
            responsePromise => responsePromise.json()
        ).then(
            response => {
                if(response.isValid === "true") {
                    popEL.remove();
                }
            }
        )

        updateBtn.addEventListener("click", onClickUpdate);
    }
}