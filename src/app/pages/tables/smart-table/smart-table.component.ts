import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { DatePipe } from '@angular/common';

import { SmartTableService } from '../../../@core/data/smart-table.service';
import { HeartbitApiService } from '../../../@core/data/heartbit-api.service'

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './smart-table.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class SmartTableComponent {

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      name: {
        title:'Name',
        type: 'string',
      },
      age: {
        title: 'Age',
        type: 'number'
      },
      doctor: {
        title: 'Doctor',
        type: 'string'
      },
      insurance: {
        title: 'Insurance Company',
        type: 'string'
      },
      createdAt: {
        title: 'Created at',
        type: 'string',
        valuePrepareFunction: (date) => {
          var raw = new Date(date);

          var formatted
          try {
            formatted = this.datePipe.transform(raw, 'dd MMM yyyy HH:mm:ss')
          }
          catch (InvalidPipeArgument) {
            formatted = '?' + date.toString()
          }
          return formatted
        }
      }
    }
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: HeartbitApiService, private datePipe: DatePipe) {
    const data = this.service.listPatientsMock()
    this.source.load(data)

    this.service.listPatients().subscribe(
      patients => this.source.load(patients),
      err => console.error('listPatients subcribe ERROR', err)
    )
    //this.service.listPatients().subscribe( function  (patients) {
    //  this.source.load(patients)
    //}.bind(this))
  }

  onDeleteConfirm(event) {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onSaveConfirm(event) {
    if (window.confirm('Are you sure you want to save?')) {
      event.newData['name'] += ' + added in code';
      event.confirm.resolve(event.newData);
    } else {
      event.confirm.reject();
    }
  }

  onCreateConfirm(event) {
    if (window.confirm('Are you sure you want to create?')) {
      event.newData['name'] += ' + added in code';
      event.confirm.resolve(event.newData);
    } else {
      event.confirm.reject();
    }
  }
}
