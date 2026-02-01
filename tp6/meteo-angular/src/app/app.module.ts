import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'; // <- obligatoire
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MeteoComponent } from './meteo/meteo.component';
import { HttpClientModule } from '@angular/common/http';
const appRoutes: Routes = [
  { path: '', component: MeteoComponent },
  { path: 'meteo/:name', /* component: MeteoDetailComponent */ },
  { path: '**', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    MeteoComponent
  ],
  imports: [
    BrowserModule,                  // ← c’est CRUCIAL
    FormsModule,
    RouterModule.forRoot(appRoutes), // ← pour que le router fonctionne
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
