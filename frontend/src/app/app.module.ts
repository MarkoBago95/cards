import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { ClientFormComponent } from "./forms/client-form/client-form.component";
import { ClientSearchComponent } from "./forms/clients-search/client-search.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { ClientService } from "./services/client-service";

@NgModule({
  declarations: [AppComponent, ClientFormComponent, ClientSearchComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    DropdownModule,
    ButtonModule,
    CardModule,
    ToastModule
  ],
  bootstrap: [AppComponent],
  providers:[ClientService]
})
export class AppModule {}
