"use strict";
const getUsername = document.querySelector('#user');
const formSubmit = document.querySelector("#form");
const main_container = document.querySelector(".main_container");
async function myCustomerFetcher(url, options) {
    const res = await fetch(url, options);
    if (!res.ok) {
        throw new Error(res.statusText);
    }
    const data = await res.json();
    console.log(data);
    return data;
}
const showResultUI = (singleUser) => {
    const { avatar_url, login, url } = singleUser;
    main_container.insertAdjacentHTML("beforeend", `<div class='card'> 
    <img src=${avatar_url} alt=${login} />
    <hr />
    <div class="card-footer">
      <img src="${avatar_url}" alt="${login}" /> 
      <a href="${url}"> Github </a>
    </div>
    </div>
    `);
};
function fetchUserData(url) {
    myCustomerFetcher(url, {}).then((userInfo) => {
        ;
        for (const singleUser of userInfo) {
            showResultUI(singleUser);
            console.log('login ' + singleUser.login);
        }
    });
}
fetchUserData('https://api.github.com/users');
formSubmit.addEventListener("submit", async (e) => {
    e.preventDefault();
    const searchTerm = getUsername.value.toLowerCase();
    try {
        const url = "https://api.github.com/users";
        const allUserData = await myCustomerFetcher(url, {});
        const matchingUsers = allUserData.filter((user) => {
            return user.login.toLowerCase().includes(searchTerm);
        });
        main_container.innerHTML = "";
        if (matchingUsers.length === 0) {
            main_container?.insertAdjacentHTML("beforeend", `<p class="empty-msg">No matching users found.</p>`);
        }
        else {
            for (const singleUser of matchingUsers) {
                showResultUI(singleUser);
            }
        }
    }
    catch (error) {
        console.log(error);
    }
});
