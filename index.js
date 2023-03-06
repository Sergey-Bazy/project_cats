const $wraper = document.querySelector("[data-wr]"); // $wraper - принято называть все DOM-элементы в начале через$
const $addBtn = document.querySelector("[data-add_button]");
const $modalAdd = document.querySelector("[data-modal]");
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

  switch (action) {
    case "delete":
      const $currentCard = event.target.closest("[data-card_id]");
      const catId = $currentCard.dataset.card_id;
      try {
        const res = await api.deleteCat(catId);
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

    default:
      break;
  }
});

$addBtn.addEventListener("click", (event) => {
  $modalAdd.classList.remove(HIDDEN_CLASS); // открываем модалку
});

//addEventListener по закрытию модалки

document.forms.add_cat_form.addEventListener("submit", async (event) => {
  event.preventDefault();
  $formErrorMsg.innerText = '';
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

  data.forEach((cat) => {
    $wraper.insertAdjacentHTML("afterbegin", generateCatCard(cat));
  });
};

GetCatsFunc();
