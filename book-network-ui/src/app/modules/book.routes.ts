import { Routes } from "@angular/router";
import { authGuardGuard } from "../services/guard/auth-guard.guard";

export const bookRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import("./book/pages/main/main.component").then(c => c.MainComponent),
    children: [
      {
        path: '',
        loadComponent: () => import("./book/pages/book-list/book-list.component").then(c => c.BookListComponent)
      },
      {
        path: 'my-books',
        loadComponent: () => import("./book/pages/my-books/my-books.component").then(c => c.MyBooksComponent),
        canActivate: [authGuardGuard]
      },
      {
        path: 'my-borrowed-books',
        loadComponent: () => import("./book/pages/borrowed-book-list/borrowed-book-list.component").then(c => c.BorrowedBookListComponent),
        canActivate: [authGuardGuard]
      },
      {
        path: 'my-returned-books',
        loadComponent: () => import("./book/pages/returned-books/returned-books.component").then(c => c.ReturnedBooksComponent),
        canActivate: [authGuardGuard]
      },
      {
        path: 'details/:bookId',
        loadComponent: () => import("./book/pages/book-details/book-details.component").then(c => c.BookDetailsComponent),
        canActivate: [authGuardGuard]
      },
      {
        path: 'manage',
        loadComponent: () => import("./book/pages/manage-book/manage-book.component").then(c => c.ManageBookComponent),
        canActivate: [authGuardGuard]
      },
      {
        path: 'manage/:bookId',
        loadComponent: () => import("./book/pages/manage-book/manage-book.component").then(c => c.ManageBookComponent),
        canActivate: [authGuardGuard]
      }
    ]
  }


];
