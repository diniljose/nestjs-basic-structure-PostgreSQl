import { Injectable } from '@nestjs/common';

@Injectable()
export class ResponseService {
  sendSuccessResponse(responseObject: any) {
    return {
      code: 1,
      message: 'Success',
      arabicMessage: 'نجاح',
      result: responseObject,
    };
  }

  sendMultiLangErrorResponse(
    messages: Record<string, string>,
    responseObject: any,
  ) {
    return {
      code: 2,
      ...messages,
      result: responseObject,
    };
  }
}
