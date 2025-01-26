import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PublicationService } from '../../services/publication.service';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Router } from '@angular/router';
import {  IonicModule } from '@ionic/angular';
import { ToastController } from '@ionic/angular/standalone';
import { IonItem, IonLabel, IonButton, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonNote, IonTextarea, IonButtons, IonBackButton, IonIcon } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { cameraOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-add-publication',
  templateUrl: './add-publication.page.html',
  styleUrls: ['./add-publication.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    IonIcon,
    IonBackButton,
    IonInput,
    IonItem,
    IonLabel,
    IonButton,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    CommonModule,
    IonNote,
    IonTextarea,
    ReactiveFormsModule,
    IonButtons,
  ],
})
export class AddPublicationPage {
  publicationForm: FormGroup;
  photo: string | null = null;

  constructor(
    private fb: FormBuilder,
    private publicationService: PublicationService,
    private router: Router,
    private toastController: ToastController
  ) {
    addIcons({ cameraOutline });
    this.publicationForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(20)]],
    });
  }

  async addPublication() {
    if (this.publicationForm.valid) {
      try {
        const publication = {
          ...this.publicationForm.value,
          date: new Date().toISOString(),
          image: this.photo,
        };

        await this.publicationService.addPublication(publication);

        this.showToast('Publicación creada con éxito', 'success');

        this.publicationForm.reset();
        this.photo = null;

        this.router.navigate(['/publications']);
      } catch (error) {
        console.error('Error al guardar la publicación:', error);
        this.showToast('Hubo un problema al crear la publicación', 'danger');
      }
    }
  }

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
    });
    this.photo = image.dataUrl ?? null;
  }

  async showToast(message: string, color: 'success' | 'danger' | 'warning') {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom',
      color,
    });

    try {
      await toast.present();
    } catch (error) {
      console.error('Error al presentar el toast:', error);
    }
  }

}
