import { Component, inject } from '@angular/core';
import { SidebarComponent } from '../../organisms/sidebar/sidebar.component';
import { ProfileUseCase } from '../../../../application/profile/profile.use-case';
import { lastValueFrom } from 'rxjs';
import { ProfileModel } from '../../../../domain/profile/profile.entity';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-layout',
  imports: [SidebarComponent, CommonModule],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {
  // private profileUseCase = inject(ProfileUseCase);
  // profile: ProfileModel = {} as ProfileModel;
  // isLoading = false;
  // isDropdownOpen = false;

  // async getProfile() {
  //   try {
  //     this.isLoading = true;
  //     const result = await lastValueFrom(this.profileUseCase.getProfile());
  //     this.profile = result;
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     this.isLoading = false;
  //   }
  // }

  // toggleDropdown() {
  //   this.isDropdownOpen = !this.isDropdownOpen;
  // }

  // logout() {
  //   console.log('Logging out...');
  //   // Aquí puedes agregar la lógica para cerrar sesión
  // }

  // ngOnInit() {
  //   this.getProfile();
  // }
}
