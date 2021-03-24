import { waitForAsync, TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { ToastComponent } from '../shared/toast/toast.component';
import { ChemService } from '../services/chem.service';
import { ChemsComponent } from './chems.component';
import { of, Observable } from 'rxjs';

class ChemServiceMock {
  mockChems = [
    { name: 'Chem 1', type: 'deadly', weight: 2 },
    { name: 'Chem 2', type: 'harmless', weight: 4.2 },
  ];
  getChems(): Observable<object[]> {
    return of(this.mockChems);
  }
}

describe('Component: Chems', () => {
  let component: ChemsComponent;
  let fixture: ComponentFixture<ChemsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule ],
      declarations: [ ChemsComponent ],
      providers: [
        ToastComponent, FormBuilder,
        { provide: ChemService, useClass: ChemServiceMock }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the page header text', () => {
    const el = fixture.debugElement.query(By.css('h4')).nativeElement;
    expect(el.textContent).toContain('Current chems (2)');
  });

  it('should display the text for no chems', () => {
    component.chems = [];
    fixture.detectChanges();
    const headerEl = fixture.debugElement.query(By.css('h4')).nativeElement;
    expect(headerEl.textContent).toContain('Current chems (0)');
    const tdEl = fixture.debugElement.query(By.css('td')).nativeElement;
    expect(tdEl.textContent).toContain('There are no chems in the DB. Add a new chem below.');
  });

  it('should display current chems', () => {
    const tds = fixture.debugElement.queryAll(By.css('td'));
    expect(tds.length).toBe(8);
    expect(tds[0].nativeElement.textContent).toContain('Chem 1');
    expect(tds[1].nativeElement.textContent).toContain('deadly');
    expect(tds[2].nativeElement.textContent).toContain('2');
    expect(tds[4].nativeElement.textContent).toContain('Chem 2');
    expect(tds[5].nativeElement.textContent).toContain('harmless');
    expect(tds[6].nativeElement.textContent).toContain('4.2');
  });

  it('should display the edit and delete buttons', () => {
    const [btnEdit1, btnDelete1, btnEdit2, btnDelete2] = fixture.debugElement.queryAll(By.css('button'));
    expect(btnEdit1.nativeElement).toBeTruthy();
    expect(btnEdit1.nativeElement.textContent).toContain('Edit');
    expect(btnDelete1.nativeElement).toBeTruthy();
    expect(btnDelete1.nativeElement.textContent).toContain('Delete');
    expect(btnEdit2.nativeElement).toBeTruthy();
    expect(btnEdit2.nativeElement.textContent).toContain('Edit');
    expect(btnDelete2.nativeElement).toBeTruthy();
    expect(btnDelete2.nativeElement.textContent).toContain('Delete');
  });

  it('should display the edit form', async () => {
    component.isEditing = true;
    component.chem = { name: 'Chem 1', type: 'deadly', weight: 2 };
    fixture.detectChanges();
    await fixture.whenStable();
    const tds = fixture.debugElement.queryAll(By.css('td'));
    expect(tds.length).toBe(1);
    const formEl = fixture.debugElement.query(By.css('form')).nativeElement;
    expect(formEl).toBeTruthy();
    const [inputName, inputType, inputWeight] = fixture.debugElement.queryAll(By.css('input'));
    expect(inputName.nativeElement.value).toContain('Chem 1');
    expect(inputType.nativeElement.value).toContain('1');
    expect(inputWeight.nativeElement.value).toContain('2');
    const [btnSave, btnCancel] = fixture.debugElement.queryAll(By.css('button'));
    expect(btnSave.nativeElement).toBeTruthy();
    expect(btnSave.nativeElement.textContent).toContain('Save');
    expect(btnCancel.nativeElement).toBeTruthy();
    expect(btnCancel.nativeElement.textContent).toContain('Cancel');
  });

});
