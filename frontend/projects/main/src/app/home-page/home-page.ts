import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { KanbanBoardComponent, KANBAN_BOARD_STATE_SERVICE, ProfilePanelComponent, SESSION_SERVICE, SignInFormComponent } from 'domain';

@Component({
  selector: 'app-home-page',
  imports: [CommonModule, KanbanBoardComponent, ProfilePanelComponent, SignInFormComponent],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss'
})
export class HomePageComponent implements OnInit {
  readonly isAuthenticated = inject(SESSION_SERVICE).isAuthenticated;

  private readonly sessionService = inject(SESSION_SERVICE);
  private readonly boardStateService = inject(KANBAN_BOARD_STATE_SERVICE);

  ngOnInit(): void {
    if (this.sessionService.isAuthenticated()) {
      this.loadBoard();
    }
  }

  onAuthenticated(): void {
    this.loadBoard();
  }

  private loadBoard(): void {
    this.boardStateService.loadBoard().subscribe();
  }
}
