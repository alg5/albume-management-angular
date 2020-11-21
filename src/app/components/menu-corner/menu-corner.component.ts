import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AlbumActions, LOCAL_STORAGE_KEY } from 'src/app/classes/enums';

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
      case 'logout':
        //TODO
        // localStorage.removeItem (LOCAL_STORAGE_KEY);
        // this.router.navigate(['/login']);
        break;
        case 'add':
          this.router.navigate(['/actions'], { queryParams: { action: AlbumActions.Add } });
          break;        
    }
    
  }


}
