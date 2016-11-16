import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Observable } from 'rxjs/Observable';

import { createObservableResponse, HttpMethodInterceptorArgs, createErrorResponse, STATUS } from 'angular-in-memory-web-api';
import { ResponseOptions, URLSearchParams } from '@angular/http';

export class InMemoryDataService implements InMemoryDbService {

    createDb() {
        let users = [
            { fullName: 'Roman', username: 'romych', password: '123', id: 1 },
            { fullName: 'Dima', username: 'dima', password: '123', id: 2 }
        ];
        let currentUser = users[0];

        let news = [
            { author: users[0], content: 'Новость!', id: 1 },
            { author: users[1], content: 'Тест!', id: 2 },
        ];
        let menu = [
            {
                id: 'home', items: [
                    { html: "Новости", url: 'news', style: '', styleClass: '', disabled: false, icon: 'home' },
                    { html: "Сообщения", url: 'messages', style: '', styleClass: '', disabled: false },
                    { html: "Третья", url: 'ha', style: '', styleClass: '', disabled: true },
                    { html: "Четвертая", url: 'http://ya.ru', style: '', styleClass: '', disabled: false }
                ]
            },
            {
                id: 'admin', items: [
                    { html: "Admin-Новости", url: 'news', style: '', styleClass: '', disabled: false },
                    { html: "Admin-Сообщения", url: 'messages', style: '', styleClass: '', disabled: false },
                    { html: "Admin-Третья", url: 'ha', style: '', styleClass: '', disabled: true },
                    { html: "Admin-Четвертая", url: 'http://ya.ru', style: '', styleClass: '', disabled: false }
                ]
            }
        ];


        return {
            users, news, menu, currentUser
        };
    }


    protected post(interceptorArgs: HttpMethodInterceptorArgs) {
        console.log('HTTP POST override');
        let resp: ResponseOptions;
        let {collectionName, headers, req} = interceptorArgs.requestInfo;
        var item = JSON.parse(req.text());

        if (collectionName === 'auth') {
            let collection: any[] = interceptorArgs.db['users'];
            let filteredUsers = collection.filter(user => {
                return user.username === item.username && user.password === item.password;
            });

            if (filteredUsers.length) {
                let user = filteredUsers[0];
                resp = new ResponseOptions({
                    headers: headers,
                    body: { data: this.clone(user), token: 'fake-jwt-token' },
                    status: STATUS.ACCEPTED
                });
            } else {
                resp = createErrorResponse(STATUS.UNAUTHORIZED, 'Username or password is incorrect');
            }
        } else {
            let {id, collection, resourceUrl} = interceptorArgs.requestInfo;
            if (!item.id) {
                item.id = id || this.genId(collection);
            }
            id = item.id;
            var existingIx = this.indexOf(collection, id);

            if (existingIx > -1) {
                collection[existingIx] = item;
                resp = new ResponseOptions({
                    headers: headers,
                    status: STATUS.NO_CONTENT
                });
            }
            else {
                collection.push(item);
                headers.set('Location', resourceUrl + '/' + id);
                resp = new ResponseOptions({
                    headers: headers,
                    body: { data: this.clone(item) },
                    status: STATUS.CREATED
                });
            }
        }
        return createObservableResponse(resp);
    }



    /*  protected get(interceptorArgs: HttpMethodInterceptorArgs) {
  
          console.log('HTTP GET override');
          let resp: ResponseOptions;
  
          const {id, query, collection, collectionName, headers} = interceptorArgs.requestInfo;
          let data = collection;
  
          if (id) {
              data = this.findById(collection, id);
          } else if (query) {
              data = this.applyQuery(collection, query);
          }
  
          if (data) {
              resp = new ResponseOptions({
                  body: { data: this.clone(data) },
                  headers: headers,
                  status: STATUS.OK
              });
          } else {
              resp = createErrorResponse(STATUS.NOT_FOUND,
                  `'${collectionName}' with id='${id}' not found`);
          }
  
          return createObservableResponse(resp);
      }*/



    /////////// private ///////////////

    private genId(collection: any[]): number {
        var maxId = 0;
        collection.reduce(function (prev, item) {
            maxId = Math.max(maxId, typeof item.id === 'number' ? item.id : maxId);
        }, null);
        return maxId + 1;
    }

    private applyQuery(collection: any[], query: URLSearchParams) {
        // extract filtering conditions - {propertyName, RegExps) - from query/search parameters
        const conditions: { name: string, rx: RegExp }[] = [];
        const caseSensitive = 'i';
        query.paramsMap.forEach((value: string[], name: string) => {
            value.forEach(v => conditions.push({ name, rx: new RegExp(decodeURI(v), caseSensitive) }));
        });

        const len = conditions.length;
        if (!len) { return collection; }

        // AND the RegExp conditions
        return collection.filter(row => {
            let ok = true;
            let i = len;
            while (ok && i) {
                i -= 1;
                const cond = conditions[i];
                ok = cond.rx.test(row[cond.name]);
            }
            return ok;
        });
    }

    private clone(data: any) {
        return JSON.parse(JSON.stringify(data));
    }

    private findById(collection: any[], id: number | string) {
        return collection.find((item: any) => item.id === id);
    }

    private indexOf(collection: any[], id: number | string) {
        return collection.findIndex((item: any) => item.id === id);
    }

}
