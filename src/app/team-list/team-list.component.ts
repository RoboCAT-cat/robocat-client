import { Component, OnInit, OnDestroy } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Subscription } from 'rxjs';
import gql from 'graphql-tag';

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
  selector: 'app-team-list',
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
      this.teamList = data.allTeams;
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
