import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { ServersService } from '../servers.service';
import { CanComponentDeactivate } from './can-deactive-guard.service';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  server: { id: number, name: string, status: string };
  serverName = '';
  serverStatus = '';
  allowEdit: boolean;
  changesSalved: boolean;

  constructor(private serversService: ServersService,
    private route: ActivatedRoute,
    private router: Router) { }


  ngOnInit() {
    this.route.queryParams
      .subscribe(
        (params: Params) => {
          this.allowEdit = params['allowEdit'] === '1';
        }
      )
    this.route.params
      .subscribe(
        (params: Params) => {
          this.server = this.serversService.getServer(+params.id);
          this.serverName = this.server.name;
          this.serverStatus = this.server.status;
        }
      )
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, { name: this.serverName, status: this.serverStatus });
    this.changesSalved = true;
    this.router.navigate(['../'], { relativeTo: this.route, queryParamsHandling: 'preserve' });
  }

  canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
    if (!this.allowEdit) {
      return true;
    }

    const serverChanged = this.serverName !== this.server.name || this.serverStatus !== this.server.status;
    if (serverChanged && !this.changesSalved) {
      return confirm('Deseja descartar as alterações?')
    } else {
      return true;
    }
  }

}
