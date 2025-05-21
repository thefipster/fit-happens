import { Routes } from '@angular/router';
import { TagsComponent } from './tags/tags.component';
import { SetsComponent } from './sets/sets.component';
import { ExercisesComponent } from './exercises/exercises.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'tags', component: TagsComponent},
    {path: 'sets', component: SetsComponent},
    {path: 'exercises', component: ExercisesComponent},
];
