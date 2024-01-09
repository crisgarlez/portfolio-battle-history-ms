/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "rankingms";

export interface Empty {
}

export interface Records {
  records: Record[];
}

export interface Record {
  id: string;
  monsterid: string;
  monstername: string;
  victories: number;
  defeats: number;
}

export interface Result {
  winnerid: string;
  winnername: string;
  defeatedid: string;
  defeatedname: string;
}

export const RANKINGMS_PACKAGE_NAME = "rankingms";

export interface RankingServiceClient {
  findAllRecords(request: Empty): Observable<Records>;

  sendResult(request: Result): Observable<Record>;
}

export interface RankingServiceController {
  findAllRecords(request: Empty): Promise<Records> | Observable<Records> | Records;

  sendResult(request: Result): Promise<Record> | Observable<Record> | Record;
}

export function RankingServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["findAllRecords", "sendResult"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("RankingService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("RankingService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const RANKING_SERVICE_NAME = "RankingService";
