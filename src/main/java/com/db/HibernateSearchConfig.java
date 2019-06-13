package com.db;

import org.hibernate.search.jpa.FullTextEntityManager;
import org.hibernate.search.jpa.Search;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;


public class HibernateSearchConfig {

    @PersistenceContext
    private EntityManager entityManager;


    FullTextEntityManager fullTextEntityManager = Search.getFullTextEntityManager(entityManager);
    // fullTextEntityManager.createIndexer().startAndWait();
}