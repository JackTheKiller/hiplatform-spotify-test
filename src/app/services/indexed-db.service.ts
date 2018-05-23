import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IndexedDBService {

  db;

  constructor() {
    const request = indexedDB.open('HiPlatformSpotifyTest', 1);

    request.addEventListener('error', (e) => this.handleError(e));
    request.addEventListener('success', (e) => this.handleSuccess(e));
    request.addEventListener('upgradeneeded', (e) => this.init(e));
  }

  init(event) {
    const db = event.target.result;

    for (const store of ['artist', 'album', 'track']) {
      db.createObjectStore(store, { keyPath: 'id' });
    }
  }

  handleSuccess(event) {
    this.db = event.target.result;
  }

  handleError(event) {
    console.error(event);
  }

  save(object, type) {
    const tx = this.db.transaction(type, 'readwrite');
    const store = tx.objectStore(type);
    return store.add(object);
  }

  delete(object, type) {
    const tx = this.db.transaction(type, 'readwrite');
    const store = tx.objectStore(type);
    return store.delete(object.id);
  }

  getById(id, type) {
    const tx = this.db.transaction(type, 'readwrite');
    const store = tx.objectStore(type);
    return store.get(id);
  }

  toggleRecord(object, type) {
    this.getById(object.id, type).addEventListener('success', (event) => {
      if (event.target.result) {
        this.delete(object, type);
      } else {
        this.save(object, type);
      }
    });
  }

  getAll(type) {
    const tx = this.db.transaction(type, 'readwrite');
    const store = tx.objectStore(type);
    return store.getAll();
  }
}
