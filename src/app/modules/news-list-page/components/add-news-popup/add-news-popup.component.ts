import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ICreateLocalNewsItemDto, ILocalNewsItem } from 'src/app/interfaces/local-news';
import { EventBusService } from 'src/app/services/event-bus.service';

@Component({
  selector: 'app-add-news-popup',
  templateUrl: './add-news-popup.component.html',
  styleUrls: ['./add-news-popup.component.scss']
})
export class AddNewsPopupComponent implements OnInit, OnDestroy {
  @ViewChild('fileInput')
  public fileInputRef!: ElementRef<HTMLInputElement>;
  public selectedImages: FileList | null = null;
  public SelectedImagesSrc: string[] = [];

  public addedItem: ILocalNewsItem | null = null;

  public formGroup: FormGroup = new FormGroup({});
  private subscriptions: Subscription = new Subscription();
  constructor(
    private eventBus: EventBusService
  ) { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      title: new FormControl('', Validators.required),
      text: new FormControl('', Validators.required)
    });

    let itemAdded$ = this.eventBus.on('local-news/news-item-added', (item: ILocalNewsItem) => this.addedItem = item);
    this.subscriptions.add(itemAdded$);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public hidePopup() {
    this.SelectedImagesSrc = [];
    this.selectedImages = null;
    this.formGroup.reset();
    this.eventBus.emit({
      type: 'add-news-popup/hide-popup',
      value: null
    });
  }

  public uploadImage(event: Event) {
    event.preventDefault();
    if (!this.fileInputRef) {
      return;
    }
    this.fileInputRef.nativeElement.click();
  }

  public filesSelected(event: Event) {
    if (event == null || event.target == null) {
      return;
    }

    const files: FileList = (event.target as any)['files'] as FileList;
    if (files == null || files[0] == null) {
      return;
    }

    this.selectedImages = files;

    this.SelectedImagesSrc = [];
    Object.keys(files).forEach((key: string) => this.imageReader(files[Number(key)]));

    console.log(files);
  }

  public imageReader(image: File) {
    const reader = new FileReader();
    reader.onload = (event) => {
      this.SelectedImagesSrc.push(String(reader.result));
    };
    reader.readAsDataURL(image);
  }

  public removeImage(src: string) {
    this.selectedImages = null;
    this.SelectedImagesSrc = [];
  }

  public submitForm() {
    if (this.formGroup.valid) {
      let formData = this.formGroup.value;
      const DTO: ICreateLocalNewsItemDto = {
        title: formData.title,
        text: formData.text,
        titleImageUrl: this.SelectedImagesSrc.length > 0 ? this.SelectedImagesSrc[0] : ''
      }
      this.eventBus.emit({
        type: 'add-news-popup/create-local-news', 
        value: DTO
      })
    }
      
  }
}
