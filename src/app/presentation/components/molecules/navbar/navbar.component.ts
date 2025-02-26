import {
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
   OnInit
} from '@angular/core';
import { Router } from '@angular/router';
import { InputComponent } from '../../atoms/input/input.component';
import {
  ReactiveFormsModule
} from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ProfileModel } from '../../../../domain/profile/profile.entity';
import { ProfileUseCase } from '../../../../application/profile/profile.use-case';
import { TokenUseCase } from '../../../../application/token/token.use-case';
import { PUBLIC_ROUTES } from '../../../constants/routes-storage.constant';

@Component({
  selector: 'app-navbar',
  imports: [InputComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  @Input() isSearchVisible = true;
  @Input() keyword = '';
  @Output() keywordChange = new EventEmitter<string>();
  private profileUseCase = inject(ProfileUseCase);
  private tokenUseCase = inject(TokenUseCase);
  private router = inject(Router);
  profile: ProfileModel = {} as ProfileModel;
  isLoading = false;
  isDropdownOpen = false;

  async getProfile() {
    try {
      this.isLoading = true;
      const result = await lastValueFrom(this.profileUseCase.getProfile());
      this.profile = result;
    } catch (error) {
      console.error(error);
    } finally {
      this.isLoading = false;
    }
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  logout() {
    this.tokenUseCase.removeToken();
    this.router.navigate([PUBLIC_ROUTES.SIGN_IN]);
  }

  ngOnInit() {
    this.getProfile();
  }

  goBack() {
    window.history.back();
  }

  goForward() {
    window.history.forward();
  }
  
  updateName(newValue: string) {
    this.keyword = newValue;
    this.keywordChange.emit(newValue);
  }
}
