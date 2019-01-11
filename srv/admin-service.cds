using my.bookshop as my from '../db/data-model';

service AdminService @(_requires:'admin') {
  entity Books as projection on my.Books;
  entity Authors as projection on my.Authors;
  entity Orders as projection on my.Orders;
  entity OrderItems as projection on my.OrderItems;
}
