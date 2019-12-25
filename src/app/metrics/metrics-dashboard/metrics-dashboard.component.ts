import {Component, OnInit, ViewChild} from '@angular/core';
import {MetricsHttpService} from '../metrics-http.service';
import {Bean} from '../models/bean';
import {BeanPackagesPipe} from '../bean-packages.pipe';
import {MatPaginator, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-metrics-dashboard',
  templateUrl: './metrics-dashboard.component.html',
  styleUrls: ['./metrics-dashboard.component.css']
})
export class MetricsDashboardComponent implements OnInit {

  beans: Bean[];
  columns: string[];
  lessColumns: string[];
  dataSource;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private metricsHttpService: MetricsHttpService) {
  }

  ngOnInit() {
    this.columns = Object.keys(new Bean());
    this.lessColumns = this.columns.slice(1);
    this.metricsHttpService.getBeans().subscribe(beans => {
      this.beans = beans;
      this.dataSource = new MatTableDataSource<Bean>(this.beans);
      this.dataSource.paginator = this.paginator;
    });
  }

  format(str: string) {
    return new BeanPackagesPipe().transform(str);
  }

}
