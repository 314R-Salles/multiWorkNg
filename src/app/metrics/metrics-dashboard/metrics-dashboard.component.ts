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

  filter = '';
  defaultFilterPredicate;
  contexts = [];

  FilterMode = 'FilterMode';
  CategoryMode = 'CategoryMode';
  ContextMode = 'ContextMode';

  selectedMode = this.FilterMode;

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
      this.defaultFilterPredicate = this.dataSource.filterPredicate;
      const contextsSet = new Set(this.beans.map(bean => bean.context));
      contextsSet.forEach(context =>
        this.contexts.push({label: context, filter: context, selected: false}));
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
    if (this.selectedMode !== this.CategoryMode) {
      this.selectedMode = this.CategoryMode;
      this.resetFilterAndCategories();
      this.dataSource.filterPredicate = this.defaultFilterPredicate;
      this.categories.find(category => category.filter === '').selected = true;
      this.applyFilter();
    }
  }

  setContext(context) {
    this.resetFilterAndCategories();
    context.selected = true;
    this.filter = context.filter;
    this.applyFilter();
  }

  setContextMode() {
    if (this.selectedMode !== this.ContextMode) {
      this.selectedMode = this.ContextMode;
      this.resetFilterAndCategories();

      this.dataSource.filterPredicate = (data, filter: string) =>
        data.context.toLowerCase().includes(filter);

      this.contexts.find(context => context.filter === '').selected = true;
      this.applyFilter();
    }
  }

  setFilterMode() {
    if (this.selectedMode !== this.FilterMode) {
      this.selectedMode = this.FilterMode;
      this.resetFilterAndCategories();
      this.dataSource.filterPredicate = this.defaultFilterPredicate;
      this.applyFilter();
    }
  }

  resetFilterAndCategories() {
    this.filter = '';
    this.categories.forEach(category => category.selected = false);
    this.contexts.forEach(context => context.selected = false);
  }

}
