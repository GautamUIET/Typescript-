const getUsername = document.querySelector('#user') as HTMLInputElement;
const formSubmit = document.querySelector("#form") as HTMLFormElement;
const main_container = document.querySelector(".main_container") as HTMLElement;

interface UserData {
    id: number;
    login : string;
    avatar_url : string;
    location :string;
    url: string;
}

async function myCustomerFetcher<T>(url:string,options?:RequestInit):Promise<T>{
    const res = await fetch(url , options);
    if(!res.ok){
        throw new Error(res.statusText);
    }
    const data = await res.json();
    console.log(data)
    return data;
}

const showResultUI = (singleUser: UserData) => {
  const { avatar_url, login, url } = singleUser;
  main_container.insertAdjacentHTML(
    "beforeend",
    `<div class='card'> 
    <img src=${avatar_url} alt=${login} />
    <hr />
    <div class="card-footer">
      <img src="${avatar_url}" alt="${login}" /> 
      <a href="${url}"> Github </a>
    </div>
    </div>
    `
  );
};

function fetchUserData(url: string){
    myCustomerFetcher<UserData[]>(url,{}).then((userInfo) => {;

    for(const singleUser of userInfo){
        showResultUI(singleUser);
        console.log('login ' + singleUser.login)
    }
})
}

fetchUserData('https://api.github.com/users');

formSubmit.addEventListener("submit", async (e) => {
  e.preventDefault();

  const searchTerm = getUsername.value.toLowerCase();

  try {
    const url = "https://api.github.com/users";

    const allUserData = await myCustomerFetcher<UserData[]>(url, {});

    const matchingUsers = allUserData.filter((user) => {
      return user.login.toLowerCase().includes(searchTerm);
    });

    main_container.innerHTML = "";

    if (matchingUsers.length === 0) {
      main_container?.insertAdjacentHTML(
        "beforeend",
        `<p class="empty-msg">No matching users found.</p>`
      );
    } else {
      for (const singleUser of matchingUsers) {
        showResultUI(singleUser);
      }
    }
  } catch (error) {
    console.log(error);
  }
});
