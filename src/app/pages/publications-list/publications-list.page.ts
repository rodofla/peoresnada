import { Component, OnInit } from '@angular/core';
import { PublicationService, Publication } from '../../services/publication.service';
import {  IonItem, IonLabel,  IonButton, IonHeader, IonToolbar, IonTitle, IonButtons, IonContent, IonList, IonThumbnail, IonIcon, IonFab, IonFabButton, IonModal } from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';
import { FormatDatePipe } from "../../pipes/date.pipe";
import { CommonModule } from '@angular/common';
import { trash, trashOutline, add } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-publications-list',
  templateUrl: './publications-list.page.html',
  styleUrls: ['./publications-list.page.scss'],
  standalone: true,
  imports: [IonModal, IonFab, IonIcon, IonLabel, IonButton, IonHeader, IonToolbar, IonTitle, IonButtons, IonContent, IonList, RouterModule, IonItem, IonThumbnail, FormatDatePipe, CommonModule, IonFabButton],
})
export class PublicationsListPage implements OnInit {
  publications: Publication[] = [];
  showModal: boolean = false;
  selectedIndex: number | null = null;

  constructor(private publicationService: PublicationService) {
    addIcons({ trash, trashOutline, add });
  }

  ngOnInit() {

    this.publicationService.publications$.subscribe((data) => {
      this.publications = data;
    });
  }


  openModal(index: number) {
    this.selectedIndex = index;
    this.showModal = true;
  }


  closeModal() {
    this.showModal = false;
    this.selectedIndex = null;
  }


  async confirmDelete() {
    if (this.selectedIndex !== null) {
      await this.publicationService.deletePublication(this.selectedIndex);
    }
    this.closeModal();
  }
}
