import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { BehaviorSubject } from 'rxjs';

export interface Publication {
  title: string;
  description: string;
  date: string;
  image?: string;
}

@Injectable({
  providedIn: 'root',
})
export class PublicationService {
  private key = 'publications';


  private publicationsSubject = new BehaviorSubject<Publication[]>([]);
  publications$ = this.publicationsSubject.asObservable();

  constructor() {
    this.loadInitialData();
  }

  private async loadInitialData() {
    const { value } = await Preferences.get({ key: this.key });
    const publications = value ? JSON.parse(value) : [];
    this.publicationsSubject.next(publications);
  }

  async getPublications(): Promise<Publication[]> {
    const { value } = await Preferences.get({ key: this.key });
    return value ? JSON.parse(value) : [];
  }

  async addPublication(publication: Publication): Promise<void> {
    const publications = await this.getPublications();
    publications.push(publication);


    await Preferences.set({ key: this.key, value: JSON.stringify(publications) });


    this.publicationsSubject.next(publications);
  }

  async deletePublication(index: number): Promise<void> {
    const publications = await this.getPublications();
    publications.splice(index, 1);


    await Preferences.set({ key: this.key, value: JSON.stringify(publications) });


    this.publicationsSubject.next(publications);
  }
}
