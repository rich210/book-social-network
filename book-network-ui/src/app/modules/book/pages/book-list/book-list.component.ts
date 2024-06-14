import { Component, OnInit } from '@angular/core';
import { BookService } from '../../../../services/services';
import { Router } from '@angular/router';
import { BookResponse, PageResponseBookResponse } from '../../../../services/models';
import { BookCardComponent } from '../../components/book-card/book-card.component';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [BookCardComponent],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss'
})
export class BookListComponent implements OnInit {


  page: number = 0;
  size: number | undefined;
  bookResponse: PageResponseBookResponse = {}
  message: string = '';
  level: string = 'success'

  constructor(private bookService: BookService, private router: Router) {

  }
  ngOnInit(): void {

    this.findAllBooks()
  }

  private findAllBooks() {
    this.bookService.findAllBooks({
      page: this.page,
      size: this.size
    }).subscribe({
      next: (books: PageResponseBookResponse) => {
        this.bookResponse = books
      }
    })
  }

  goToLastPage() {
    this.page = this.bookResponse.totalPages as number - 1;
    this.findAllBooks();
  }
  goToNextPage() {
    this.page++;
    this.findAllBooks();
  }
  goToPage(page: number) {
    this.page = page;
    this.findAllBooks();
  }
  goToPreviousPage() {
    this.page--;
    this.findAllBooks();
  }
  goToFirstPage() {
    this.page = 0;
    this.findAllBooks();
  }

  get isLastPage(): boolean{
    return this.page == this.bookResponse.totalPages as number - 1;
  }

  borrowBook(book: BookResponse) {
    this.message = ''
    this.bookService.borrowBook({
      'book-id': book.id as number
    }).subscribe({
      next: ()=>{
        this.level = 'success'
        this.message = 'Book successfully added to you list'
      },
      error :(err) => {
        console.error(err);
        this.level = 'error'
        this.message = err.error.error
        
        
      }
    })
    }

}
