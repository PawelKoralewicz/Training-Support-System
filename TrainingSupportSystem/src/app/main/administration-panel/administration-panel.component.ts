import { Component, OnInit } from '@angular/core';
import { AdministrationPanelService } from './administration-panel.service';
import { IUser } from 'src/app/shared/interfaces/user.interface';
import { Icon } from 'src/app/shared/enums/icons.enum';
import { Role } from 'src/app/shared/enums/permissions.enum';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-administration-panel',
  templateUrl: './administration-panel.component.html',
  styleUrls: ['./administration-panel.component.scss'],
  providers: [ConfirmationService]
})
export class AdministrationPanelComponent implements OnInit {

  usersList: IUser[] = [];
  roles: { 
    id: number, 
    name: Role, 
    description: string,
  }[] = [];
  icon = Icon;

  constructor(
    private administrationPanelService: AdministrationPanelService,
    private confirmationService: ConfirmationService
    ) { }
  
  ngOnInit(): void {
    this.getRoles();
    this.getUsers();
  }

  getRoles() {
    this.administrationPanelService.getRoles().subscribe((res: any) => this.roles = res.roles);  
  }

  getUsers() {
    this.administrationPanelService.getUsers().subscribe(res => this.usersList = res);
  }

  saveChanges(user: IUser) {
    this.administrationPanelService.updateUser(user).subscribe(res => console.log(res));
  }

  deleteUser(user: IUser) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the user? The operation is irreversable!',
      acceptButtonStyleClass: 'p-button-danger',
      rejectButtonStyleClass: 'p-button-danger p-button-outlined',
      icon: 'pi pi-exclamation-triangle',
      header: 'User delete confirmation',
      accept: () => this.deleteUserConfirm(user)
    })
  }

  deleteUserConfirm(user: IUser) {
    this.administrationPanelService.deleteUser(user).subscribe();
    this.getUsers();
  }

}
