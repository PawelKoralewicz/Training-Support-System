import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private messageService: MessageService) { }

  toastSuccess(message: string) {
    this.messageService.add({
      summary: 'Success',
      severity: 'success',
      detail: message
    })
  }
  
  toastError(message: string) {
    this.messageService.add({
      summary: 'Error',
      severity: 'error',
      detail: message
    })
  }
}
