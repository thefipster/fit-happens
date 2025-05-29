import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TagsComponent } from './pages/tags/tags.component';
import { BatchesComponent } from './pages/batches/batches.component';
import { ExercisesComponent } from './pages/exercises/exercises.component';
import { TagGroupComponent } from './pages/tag-group/tag-group.component';

export const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'tags', component: TagsComponent},
    {path: 'groups', component: TagGroupComponent},
    {path: 'batches', component: BatchesComponent},
    {path: 'exercises', component: ExercisesComponent},
];
