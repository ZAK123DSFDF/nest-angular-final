import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {
  HttpClientModule,
  HttpClient,
  HttpEventType,
} from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  selectedFile: File;
  selectedFileUrl: string;
  uploadProgress: number = 0;
  constructor(private http: HttpClient) {}
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      // Read the selected file as a data URL
      const reader = new FileReader();
      reader.onload = (e) => {
        this.selectedFileUrl = e.target.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }
  onUpload() {
    const fd = new FormData();

    fd.append('file', this.selectedFile, this.selectedFile.name);
    this.http
      .post('http://localhost:3000/upload', fd, {
        reportProgress: true,
        observe: 'events',
      })
      .subscribe((event) => {
        // console.log(event);
        if (event.type === HttpEventType.UploadProgress) {
          if (event.total !== null && event.total !== undefined) {
            this.uploadProgress = Math.round(
              (event.loaded / event.total) * 100
            );
          }
        } else if (event.type === HttpEventType.Response) {
          console.log(event);
        }
      });
  }
}
