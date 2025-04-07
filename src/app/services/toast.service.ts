import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor() { }

  showToast(message: string, type: 'success' | 'danger' = 'success') {
    alert(message)
  }

}
