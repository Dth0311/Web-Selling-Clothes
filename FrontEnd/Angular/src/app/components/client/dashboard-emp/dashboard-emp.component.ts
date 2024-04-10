import { TokenService } from '../../../services/token.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { faFaceLaughWink, faTag } from '@fortawesome/free-solid-svg-icons';
import {faSearch} from '@fortawesome/free-solid-svg-icons'
import {faBell} from '@fortawesome/free-solid-svg-icons'
import {faEnvelope} from '@fortawesome/free-solid-svg-icons'
import {faTachometerAlt} from '@fortawesome/free-solid-svg-icons'
import {faBookmark} from '@fortawesome/free-solid-svg-icons'
import {faReceipt} from '@fortawesome/free-solid-svg-icons'
import {faCartShopping} from '@fortawesome/free-solid-svg-icons'
import {faRocket} from '@fortawesome/free-solid-svg-icons'
import {faUser} from '@fortawesome/free-solid-svg-icons'
import {faBars} from '@fortawesome/free-solid-svg-icons'
import {faPaperPlane} from '@fortawesome/free-solid-svg-icons'
import {faGear} from '@fortawesome/free-solid-svg-icons'
import {faRightFromBracket} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-dashboard-emp',
  templateUrl: './dashboard-emp.component.html',
  styleUrl: './dashboard-emp.component.css'
})
export class DashboardEmpComponent implements OnInit{
  faceLaugh = faFaceLaughWink;
  search = faSearch
  bell = faBell;
  evelope =faEnvelope;
  tachometer = faTachometerAlt;
  bookmark = faBookmark;
  receipt = faReceipt;
  cart= faCartShopping;
  rocket = faRocket;
  userIcon = faUser;
  paperPlane = faPaperPlane;
  bars = faBars;
  gear = faGear;
  logoutIcon = faRightFromBracket;
  tag = faTag;
  constructor(
    private tokenService:TokenService,
    private router: Router){}

  ngOnInit(): void {
    
  }

  logout(){
        this.tokenService.removeToken();
        this.router.navigate(['/']);
    }
}
