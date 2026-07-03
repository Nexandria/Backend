import { Injectable } from '@nestjs/common';

@Injectable()
export class SearchService {
  async searchByIsbn(isbn: string): Promise<unknown> {
    const url = `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`;

    const response = await fetch(url);
    return response.json();
  }
}
