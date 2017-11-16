import { Injectable } from '@angular/core';
import {Project} from "../models/project";
import {Subject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class ProjectService {
  private baseUrl: string = "http://localhost:3000/projects/";
  subject: Subject<Project[]> = new Subject<Project[]>();

  constructor(private http: HttpClient) { }

  public getProjects(): Observable<Project[]> {
    this.requestProjects();
    return this.subject.asObservable();
  }
  private requestProjects(): void{
    this.http.get<Project[]>(this.baseUrl).toPromise()
      .then(projects => {
        this.subject.next(projects as Project[]);
      });
  }
  getProject(id:string): Promise<Project> {
    return this.http.get(this.baseUrl + id)
      .toPromise()
      .then(response => response as Project)
      .catch( error => console.log(error) );
  }
  createProject(project: Project): Promise<Project> {
    return this.http.post(this.baseUrl, project)
      .toPromise()
      .then(response => response as Project)
      .catch(error => console.log(error));
  }
  updateProject(project: Project): Promise<Project> {
    return this.http.put(this.baseUrl + project.project_id, project)
      .toPromise()
      .then(response => {
        this.requestProjects();
        return response as Project
      })
      .catch(error => {
        console.log(error);
        throw error;
      });
  }
  deleteProject(project: Project): Promise<any> {
    return this.http.delete(this.baseUrl + project.project_id)
      .toPromise()
      .then( response => true)
      .catch(error => console.log(error));
  }
}
