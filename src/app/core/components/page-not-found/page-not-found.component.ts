import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.scss',
})
export class PageNotFoundComponent implements OnInit {
  public secondaryText = "we couldn't find that page";
  public adviceText?: string;

  constructor(private route: ActivatedRoute) {}

  public ngOnInit(): void {
    const {secondaryText, adviceText} = this.route.snapshot.data;
    this.secondaryText = secondaryText || this.secondaryText;
    this.adviceText = adviceText;
  }
}
