import {
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  OnInit,
  HostListener
} from '@angular/core';
import { Router } from '@angular/router';
import { InputComponent } from '../../atoms/input/input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ProfileModel } from '../../../../domain/profile/profile.entity';
import { ProfileUseCase } from '../../../../application/profile/profile.use-case';
import { TokenUseCase } from '../../../../application/token/token.use-case';
import { PUBLIC_ROUTES } from '../../../constants/routes-storage.constant';
import { DominantColorState } from '../../../states/dominantColor/dominant-color.service';

@Component({
  selector: 'app-navbar',
  imports: [
    InputComponent,
    ReactiveFormsModule,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
  @Input() isSearchVisible = true;
  @Input() keyword = '';
  @Output() keywordChange = new EventEmitter<string>();
  @Input() spotifyEffect = false;
  @Input() dominantColor = 'rgb(30,30,30)';

  dominantColorService = inject(DominantColorState);
  private profileUseCase = inject(ProfileUseCase);
  private tokenUseCase = inject(TokenUseCase);
  private router = inject(Router);
  profile: ProfileModel = {} as ProfileModel;
  isLoading = false;
  isDropdownOpen = false;
  scrolled = false;

  @HostListener('window:scroll')
  onScroll() {
    if (!this.spotifyEffect) return;
    this.scrolled = window.scrollY > 200;
  }

  async getProfile() {
    try {
      this.isLoading = true;
      const result = await lastValueFrom(this.profileUseCase.getProfile());
      this.profile = result;
    } catch {
      throw new Error('Error getting the profile info');
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
