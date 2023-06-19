import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Clothing } from '../model/clothing';
@Injectable({
  providedIn: 'root'
})
export class ClothingsService {
  /**
   * URL base del microservicio de clothing de springboot.
   */
  private baseURL = 'http://localhost:8080/clothing'

  private headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  /**
   * Constructor que inicializa el servicio.
   */
  constructor(private httpClient: HttpClient) {

  }
  /**
   * 
   * Funsion que permite consumir el servicio para consultar clothings.
   */
  cunsultarClothings(): Observable<Clothing[]> {
    return this.httpClient.get<Clothing[]>(`${this.baseURL}/getALLClothing`);

  }
  /**
   * Método que permite consumir el servicio para guardar un clothing.
   * @param clothing a aguardr.
   * @returns 
   */
  saveClothing(clothing: Clothing): Observable<Clothing> {
    return this.httpClient.post<Clothing>(`${this.baseURL}/createClothing`, clothing, { headers: this.headers });
  }
  /**
 * Método que permite consumir el servicio para actualizar un clothing.
 * @param clothing a actualizar.
 * @returns 
 */
  updateClothing(clothing: Clothing): Observable<Clothing> {
    console.log('Actualización con éxito')
    return this.httpClient.put<Clothing>(`${this.baseURL}/updateClothing`, clothing, { headers: this.headers });
  }
  /**
   * 
   * @param id 
   * @returns 
   */
  deleteClothing(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseURL}/deleteClothing/${id}`).pipe(
      tap(
        () => {
          console.log('Recurso eliminado con éxito');
        },
        error => {
          console.error('Error al eliminar clothing', error);
        }
      )
    );
  }
}