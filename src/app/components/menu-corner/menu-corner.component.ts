import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-menu-corner',
  templateUrl: './menu-corner.component.html',
  styleUrls: ['./menu-corner.component.css']
})
export class MenuCornerComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  navigateMenu(tag){
    switch (tag){
      case 'login':
        this.router.navigate(['/login']);
        break;
        case 'cube':
          this.router.navigate(['/cube']);
          break;        
    }
    
  }


}
