import {Component, OnInit, ViewChild} from '@angular/core';
import {MetricsHttpService} from '../metrics-http.service';
import {Bean} from '../models/bean';
import {BeanPackagesPipe} from '../bean-packages.pipe';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-metrics-dashboard',
  templateUrl: './metrics-dashboard.component.html',
  styleUrls: ['./metrics-dashboard.component.css']
})
export class MetricsDashboardComponent implements OnInit {

  beans: Bean[];
  columns: string[];
  vanillaColumns: string[];
  dataSource;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  categories = [
    {label: 'None', filter: '', selected: true},
    {label: 'SpringBoot Autoconfig', filter: 'org.springframework.boot.autoconfigure', selected: false},
    {label: 'SpringBoot Actuators', filter: 'org.springframework.boot.actuate', selected: false},
    {label: 'My beans', filter: 'com.psalles', selected: false}
  ];

  searchByFilter = true;
  filter = '';

  constructor(private metricsHttpService: MetricsHttpService) {
  }

  ngOnInit() {
    this.columns = Object.keys(new Bean());
    this.vanillaColumns = this.columns.slice(1); // remove name
    this.vanillaColumns.pop(); // remove resource
    this.metricsHttpService.getBeans().subscribe(beans => {
      this.beans = beans;
      this.dataSource = new MatTableDataSource<Bean>(this.beans);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  format(str: string) {
    return new BeanPackagesPipe().transform(str);
  }

  applyFilter() {
    this.dataSource.filter = this.filter.trim().toLowerCase();
  }

  setCategory(category) {
    this.resetFilterAndCategories();
    category.selected = true;
    this.filter = category.filter;
    this.applyFilter();
  }

  setCategoryMode() {
    if (this.searchByFilter) {
      this.searchByFilter = false;
      this.resetFilterAndCategories();
      this.categories.find(category => category.filter === '').selected = true;
      this.applyFilter();
    }
  }

  setFilterMode() {
    if (!this.searchByFilter) {
      this.searchByFilter = true;
      this.resetFilterAndCategories();
      this.applyFilter();
    }
  }

  resetFilterAndCategories() {
    this.filter = '';
    this.categories.forEach(category => category.selected = false);
  }

}
