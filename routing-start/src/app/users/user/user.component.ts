import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { User } from './user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  user: User;
  paramsSubscription:Subscription;
  constructor(private router: ActivatedRoute) { }

  ngOnInit() {
    this.user = {
      id : this.router.snapshot.params['id'],
      name: this.router.snapshot.params['name']
    }

    this.paramsSubscription = this.router.params
    .subscribe(
      (params:Params) => {
        this.user.id = params.id;
        this.user.name = params.name;
      }
    )
  }

  ngOnDestroy(){
    this.paramsSubscription.unsubscribe();
  }

}
