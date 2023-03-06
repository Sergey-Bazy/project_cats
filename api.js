class CatsApi {
  constructor(apiName) {
    this.url = `https://cats.petiteweb.dev/api/single/${apiName}`;
  }

  getAllCats() {
    return fetch(`${this.url}/show`);
  }

  getCurrentCats(id) {
    return fetch(`${this.url}/show/${id}`);
  }

  newCat() {
    return fetch(`${this.url}/show/add`);
  }
  //   https://cats.petiteweb.dev/api/single/Sergey-Bazy/delete/3
  deleteCat(id) {
    return fetch(`${this.url}/delete/${id}`, {
      method: "DELETE",
    });
  }

  addNewCat(data) {
    return fetch(`${this.url}/add`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }

  updateCat(id) {
    return fetch(`${this.url}/update/${id}`);
  }
}
const DB_NAME = "Sergey-Bazy";
const api = new CatsApi(DB_NAME);
