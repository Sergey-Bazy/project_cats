import { Popup } from "./popup.js"

export class PopupWithImage extends Popup {
    constructor(className) {
      super(className);
    }
    
    open(dataImage) {
      const imagePopup = this._popupElement.querySelector(".popup__image");
      imagePopup.src = dataImage;
  
      super.open();
    }
  }