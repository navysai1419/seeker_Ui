import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private showModal = false;

  toggleModal() {
    this.showModal = !this.showModal;
  }

  isModalOpen() {
    return this.showModal;
  }
}
