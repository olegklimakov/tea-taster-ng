import { Component, OnInit } from '@angular/core';
import { TastingNotesService } from '@app/core';
import { TastingNote } from '@app/models';
import { IonRouterOutlet, ModalController, ModalOptions } from '@ionic/angular';
import { BehaviorSubject, EMPTY, mergeMap, Observable, tap } from 'rxjs';
import { TastingNoteEditorComponent } from './tasting-note-editor/tasting-note-editor.component';

@Component({
  selector: 'app-tasting-notes',
  templateUrl: './tasting-notes.page.html',
  styleUrls: ['./tasting-notes.page.scss'],
})
export class TastingNotesPage implements OnInit {
  private refresh = new BehaviorSubject<void>(undefined);
  notes$: Observable<Array<TastingNote>> = EMPTY;

  constructor(
    private modalController: ModalController,
    private routerOutlet: IonRouterOutlet,
    private tastingNotes: TastingNotesService
  ) {}

  ngOnInit() {
    this.notes$ = this.refresh.pipe(mergeMap(() => this.tastingNotes.getAll()));
  }

  deleteNote(note: TastingNote): void {
    this.tastingNotes
      .delete(note.id as number)
      .pipe(tap(() => this.refresh.next()))
      .subscribe();
  }

  newNote(): Promise<void> {
    return this.displayEditor();
  }

  updateNote(note: TastingNote): Promise<void> {
    return this.displayEditor(note);
  }

  private async displayEditor(note?: TastingNote): Promise<void> {
    const opt: ModalOptions = {
      component: TastingNoteEditorComponent,
      backdropDismiss: false,
      presentingElement: this.routerOutlet.nativeEl,
    };
    if (note) {
      opt.componentProps = { note };
    }
    const modal = await this.modalController.create(opt);
    modal.present();
    await modal.onDidDismiss();
    this.refresh.next();
  }
}
