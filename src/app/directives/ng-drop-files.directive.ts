import {
  Directive,
  EventEmitter,
  ElementRef,
  HostListener,
  Input,
  Output
} from '@angular/core';
import { FileItem } from '../models/file-item';

@Directive({
  selector: '[appNgDropFiles]'
})
export class NgDropFilesDirective {
  constructor() {}

  @Input() files: FileItem[] = [];

  @Output() overMouse: EventEmitter<boolean> = new EventEmitter();

  @HostListener('dragover', ['$event'])
  /**
   * onDragEnter
   */
  public onDragEnter(event: any) {
    this.overMouse.emit(true);
    this._preventStop(event);
  }

  @HostListener('dragleave', ['$event'])
  /**
   * onDragLeave
   */
  public onDragLeave(event: any) {
    this.overMouse.emit(false);
  }

  @HostListener('drop', ['$event'])
  /**
   * onDrop
   */
  public onDrop(event: any) {
    const transfer = this._getTransfer(event);

    if (!transfer) {
      return;
    }
    this._extractFiles(transfer.files);
    this._preventStop(event);
    this.overMouse.emit(false);
  }

  private _getTransfer(event: any) {
    return event.dataTransfer
      ? event.dataTransfer
      : event.originalEvent.dataTransfer;
  }

  private _extractFiles(fileList: FileList) {
    // tslint:disable-next-line: forin
    for (const propertie in Object.getOwnPropertyNames(fileList)) {
      const fileTemp = fileList[propertie];
      if (this._fileCanBeUploaded(fileTemp)) {
        const newFile = new FileItem(fileTemp);
        this.files.push(newFile);
      }
    }
    console.log(this.files);
  }

  private _fileCanBeUploaded(file: File): boolean {
    if (!this._fileWasDropped(file.name) && this._isImage(file.type)) {
      return true;
    } else {
      return false;
    }
  }

  private _preventStop(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  private _fileWasDropped(fileName: string): boolean {
    for (const file of this.files) {
      if (file.fileName === fileName) {
        console.log('The file ' + fileName + 'is added');
        return true;
      }
    }
    return false;
  }

  private _isImage(fileType: string): boolean {
    return fileType === '' || fileType === undefined
      ? false
      : fileType.startsWith('image');
  }
}
