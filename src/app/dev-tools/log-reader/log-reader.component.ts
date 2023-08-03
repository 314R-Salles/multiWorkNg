import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-log-reader',
  templateUrl: './log-reader.component.html',
  styleUrls: ['./log-reader.component.scss']
})
export class LogReaderComponent {
  @ViewChild('fileDropRef', {static: false}) fileDropEl: ElementRef;
  @ViewChild(MatSort) sort: MatSort;

  files: any[] = [];

  data;

  dateFormat = '(\\d{4})-(\\d{2})-(\\d{2}) (\\d{2}):(\\d{2}):(\\d{2})';

  displayedColumns: string[] = ['time', 'level', 'message'];

  /**
   * on file drop handler
   */
  onFileDropped($event) {
    this.prepareFilesList($event);
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler(files) {
    this.prepareFilesList(files);
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number) {
    if (this.files[index].progress < 100) {
      console.log('Upload in progress.');
      return;
    }
    this.files.splice(index, 1);
  }

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      item.progress = 0;
      this.files.push(item);
      console.log(item);
      item.text().then(t => {
        const tableau = t.split('\r\n').map(a => {
          return {message: a};
        });
        this.data = new MatTableDataSource(tableau);
        this.setDateTimeFormat();
        this.extractLevel();
        this.data.sort = this.sort;
      });
    }
    this.fileDropEl.nativeElement.value = '';
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes, decimals = 2) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  doFilter = (value: string) => {
    this.data.filter = value.trim().toLocaleLowerCase();
  };

  setDateTimeFormat() {
    this.data.data = this.data.data.map(log => {
      const matches = log.message.match(this.dateFormat);
      if (matches?.length) {
        return {message: log.message.replace(matches[0], ''), time: matches[0]};
      } else {
        return log;
      }
    });
  }

  extractLevel() {
    const levels = [
      '\\b(TRACE)\\b',
      '\\b(INFO)\\b',
      '\\b(WARN)\\b',
      '\\b(ERROR)\\b',
      '\\b(DEBUG)\\b'];
    // const levels = ['TRACE', 'INFO', 'WARN', 'ERROR', 'DEBUG'];
    this.data.data = this.data.data.map(log => {
      const match = levels.find(level => log.message.match(level));
      const matches = log.message.match(match);
      if (matches?.length) {
        return {...log, message: log.message.replace(matches[0], ''), level: matches[0]};
      } else {
        return log;
      }
    });
  }
}
