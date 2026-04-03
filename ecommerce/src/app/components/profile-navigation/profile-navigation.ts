import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-profile-navigation',
  imports: [RouterLink,RouterLinkActive],
  standalone : true,
  templateUrl: './profile-navigation.html',
  styleUrl: './profile-navigation.css',
})
export class ProfileNavigation {

}
