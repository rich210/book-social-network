package com.rich.book.book;

import org.springframework.data.jpa.domain.Specification;

public class BookSpecification {

    public static Specification<Book> withOwnerId(Integer ownerID){
        return (root,query, criteriaBuilder)-> criteriaBuilder.equal(root.get("owner").get("id"),ownerID);
    }
}
