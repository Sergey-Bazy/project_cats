const $wraper = document.querySelector("[data-wr]"); // $wraper - принято называть все DOM-элементы в начале через$
const $addBtn = document.querySelector("[data-add_button]");
const $modalAdd = document.querySelector("[data-modal]");
const $spinner = document.querySelector("[data-spinner]");
const $formErrorMsg = document.querySelector("[data-modal]");

const HIDDEN_CLASS = "hidden";

const generateCatCard = (cat) => {
  return `<div data-card_id=${cat.id} class="card mx-2" style="width: 18rem">
      <img
        src="${cat.image}"
        class="card-img-top"
        alt="..."
      />
      <div class="card-body">
        <h5 class="card-title">${cat.name}</h5>
        <p class="card-text">${cat.description}
        </p>
        <button type="button"  data-action ="open" class="btn btn-primary">Open</button>
        <button type="button"  data-action ="edit"class="btn btn-warning">Edit</button>
        <button type="button"  data-action ="delete"class="btn btn-danger">Delete</button>
        <button type="button"  data-action ="info"class="btn btn-${
          cat.favorite ? "success" : "dark"
        }">Info</button>
      </div>
    </div>`;
};

// api
//   .getAllCats()
//   .then((res) => {
//     console.log({ res });
//     // if (res.ok) - проверка
//     // res.status === 204 / 500 - проверка
//     return res.json();
//   })
//   .then((data) => {
//     console.log(data);

//     data.forEach((cat) => {
//       $wraper.insertAdjacentHTML("afterbegin", generateCatCard(cat));
//     });
//   });
// Вариант с помошью промисов

$wraper.addEventListener("click", async (event) => {
  //   console.log(event.target.dataset.action);
  const action = event.target.dataset.action;

  if (event.target === $wraper) return;
  const $currentCard = event.target.closest("[data-card_id]");
  const catId = $currentCard.dataset.card_id;

  switch (action) {
    case "delete":
      try {
        const res = await api.putCat(catId);
        const response = await res.json();
        if (!res.ok) throw Error(response.message);
        $currentCard.remove();
      } catch (error) {
        console.log(error);
      }
      break;

    case "open":
      // открывается модалка, где расположена  подробная информация о коте
      // долден происходить какой-то запрос на бек о всей информации оконкретном коте по id
      // вывести в модальное окно
      break;

    case "edit":
      // открывает модалка с формой
      // должен происходить какой то запрос на бек овсей информации оконкретном коте по id
      // форма уже предзаполнена информацией о коте
      break;

    case "info":
      // если favorite,то класс должен быть success, если нет, то dark
      const res = await api.deleteCat(id);
      if (res.ok) {
        if (event.target.className === "btn btn-dark") {
          event.target.className = "btn btn-success";
        } else {
          event.target.className = "btn btn-dark";
        }
      }
      break;

    default:
      break;
  }
});

$addBtn.addEventListener("click", (event) => {
  $modalAdd.classList.remove(HIDDEN_CLASS); // открываем модалку
});

document.forms.add_cat_form.addEventListener("submit", async (event) => {
  event.preventDefault();
  $formErrorMsg.innerText = "";
  const data = Object.fromEntries(new FormData(event.target).entries());

  data.id = Number(data.id);
  data.age = Number(data.age);
  data.rate = Number(data.rate);
  data.favorite = !!data.favorite;

  const res = await api.addNewCat(data);

  if (res.ok) {
    $wraper.replaceChildren();
    $modalAdd.classList.add(HIDDEN_CLASS);
    GetCatsFunc();
    return event.target.reset();
  } else {
    const responce = await res.json();
    $formErrorMsg.innerText = responce.message;
    return;
  }
});

const GetCatsFunc = async () => {
  const res = await api.getAllCats();

  if (res.status !== 200) {
    const $errorMessage = document.createElement("p");
    $errorMessage.classList.add("erroo-msg");
    $errorMessage.innerText =
      "Произошла ошибка,попробуйте выполнить запрос  позже";

    return $wraper.appendChild($errorMessage);
  }

  const data = await res.json();

  if (data.length === 0) {
    const $notificationMessage = document.createElement("p");
    $notificationMessage.innerText =
      "Список котов пуст, добавте первого котика";

    return $wraper.appendChild($notificationMessage);
  }

  console.log(data);

  setTimeout(() => {
    $spinner.classList.add(HIDDEN_CLASS);
    data.forEach((cat) => {
      $wraper.insertAdjacentHTML("afterbegin", generateCatCard(cat));
    });
  }, 1000);
};

GetCatsFunc();

// закрытие модалки по области,escape, кнопи крестика в углу
// сохранять форуму дополнения в LC
// обработать все ошибки со всех запросов
// возможгось обговления кота
// подробная информация о коте (модалка/отдельная страница)
// окультурить spinner
// cделать красивую страницу
// мобильную веостку

const wait1s = (delay) => {
  return new Promise((resolve) => setTimeout(() => resolve, delay));
};

const customFetch = async (url, option = { method: "GET" }, counter = 3) => {
  do {
    counter--;
    try {
      const res = await fetch(url, { ...option });

      if (!res.ok) throw new Error();

      if (res.status === 400) throw new Error();

      const resData = await res.json();

      return resData;
    } catch (error) {}

    await wait(3000);
  } while (counter > 0);

  return data;
};

customFetch(
  "https://cats.petiteweb.dev/api/single/Sergey-Bazy/show",
  { method: "GET" },
  3
).then((res) => console.log(res));
