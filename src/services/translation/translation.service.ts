import { Injectable } from '@nestjs/common';

@Injectable()
export class TranslationService {
  private readonly translations: Record<string, Record<string, string>> = {
    en: {
      isString: 'must be a string',
      isArray: 'must be an array',
      isEnum: 'must be one of the allowed values',
      isDateString: 'must be a valid date (yyyy-mm-dd)',
      isBoolean: 'must be a boolean (true/false)',
      isNumber: 'must be a number',
      isInt: 'must be an integer',
      isEmail: 'must be a valid email',
      isMongoId: 'must be a valid MongoDB ID',
      isNotEmpty: 'should not be empty',
      unknown: 'has an unknown error',
    },
    ar: {
      isString: 'يجب أن يكون نصًا',
      isArray: 'يجب أن يكون مصفوفة',
      isEnum: 'يجب أن يكون أحد القيم المسموح بها',
      isDateString: 'يجب أن يكون بتنسيق تاريخ yyyy-mm-dd',
      isBoolean: 'يجب أن يكون قيمة منطقية (صواب/خطأ)',
      isNumber: 'يجب أن يكون عددًا',
      isInt: 'يجب أن يكون عددًا صحيحًا',
      isEmail: 'يجب أن يكون بريدًا إلكترونيًا',
      isMongoId: 'يجب أن يكون معرف MongoDB صالحًا',
      isNotEmpty: 'لا يجب أن يكون فارغًا',
      unknown: 'يحتوي على خطأ غير معروف',
    },
    // Add more languages here
  };

  translate(constraint: string, field: string, lang: string): string {
    const messages = this.translations[lang] || this.translations['en'];
    const message = messages[constraint] || messages['unknown'];
    return `${field} ${message}`;
  }
}
