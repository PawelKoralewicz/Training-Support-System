import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MenuItem, PrimeNGConfig } from 'primeng/api';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'TrainingSupportSystem';


  constructor(
    private primeConfig: PrimeNGConfig,
    private authService: AuthService
    ) { 
      this.getUserPermissions();
    }

  ngOnInit(): void {
    this.primeConfig.ripple = true;
  }


  getUserPermissions() {
    if(this.authService.getToken()) {
      this.authService.getPermissions().subscribe((res) => this.authService.permissions =  res.permissions);
    }
  }
}
