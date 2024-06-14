/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { FeedbackResponse } from '../../models/feedback-response';

export interface TestFeedbackApi$Params {
}

export function testFeedbackApi(http: HttpClient, rootUrl: string, params?: TestFeedbackApi$Params, context?: HttpContext): Observable<StrictHttpResponse<FeedbackResponse>> {
  const rb = new RequestBuilder(rootUrl, testFeedbackApi.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<FeedbackResponse>;
    })
  );
}

testFeedbackApi.PATH = '/feedbacks';
