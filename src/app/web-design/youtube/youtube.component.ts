import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-youtube',
  templateUrl: './youtube.component.html',
  styleUrls: ['./youtube.component.css']
})
export class YoutubeComponent implements OnInit {

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    // this.http.get('https://www.googleapis.com/youtube/v3/channels?' +
    //   'part=snippet&id=UC8aqrd64EoFHLjbQtEXFf_w&key=AIzaSyCLK9gXBHWudJOq2cRY96NAn29LHzvX95w').subscribe(
    //   r => console.log(r)
    // );
    this.http.get(environment.JAVA_API + '/youtube/pog').subscribe(
      r => console.log(r)
    );
  }

}
