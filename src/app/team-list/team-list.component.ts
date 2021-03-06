import {Apollo, gql} from 'apollo-angular';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';


interface Team {
  name: string;
  institutionName: string;
  category: {
    name: string;
  };
}

const teamListQuery = gql`
  query TeamList {
    allTeams {
      name
      institutionName
      category {
        name
      }
    }
  }
`;

type teamListQueryResult = {
  allTeams: Team[]
}

@Component({
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss']
})
export class TeamListComponent implements OnInit, OnDestroy {

  loading: boolean;
  teamList: Team[];

  private querySubscription: Subscription;

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    this.querySubscription = this.apollo.watchQuery<teamListQueryResult>({
      query: teamListQuery
    }).valueChanges.subscribe(({data, loading, errors}) => {
      this.loading = loading;
      if (data) {
        this.teamList = data.allTeams;
      }
      console.log(data);
      if (errors) {
        console.error(errors);
      }
    })
  }

  ngOnDestroy(): void {
    this.querySubscription.unsubscribe();
  }
}
