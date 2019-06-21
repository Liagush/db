package com.db.search.classes;

import com.db.model.LawArticle;
import com.db.model.Product;
import com.db.search.interfaces.RenderableEntity;
import org.apache.lucene.search.Query;
import org.hibernate.search.jpa.FullTextEntityManager;
import org.hibernate.search.jpa.FullTextQuery;
import org.hibernate.search.jpa.Search;
import org.hibernate.search.query.dsl.QueryBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import java.util.ArrayList;
import java.util.List;

@Service
public class HibernateSearchService {

    private final EntityManager entityManager;


    @Autowired
    public HibernateSearchService(final EntityManagerFactory entityManagerFactory) {
        this.entityManager = entityManagerFactory.createEntityManager();
    }


    @PostConstruct
    public void initializeHibernateSearch() {

        try {
            FullTextEntityManager fullTextEntityManager = Search.getFullTextEntityManager(entityManager);
            fullTextEntityManager.createIndexer().startAndWait();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }


    public List<RenderableEntity> search(String text) {

        FullTextEntityManager fullTextEntityManager = Search.getFullTextEntityManager(entityManager);

        QueryBuilder productQB = fullTextEntityManager.getSearchFactory()
                .buildQueryBuilder().forEntity(Product.class).get();

        QueryBuilder lawArticleQB = fullTextEntityManager.getSearchFactory()
                .buildQueryBuilder().forEntity(LawArticle.class).get();

        Query luceneQueryProduct =
                productQB
                        .keyword()
                        .onFields( "vendorCode", "productName", "category")
                        .matching(text)
                        .createQuery();

        Query luceneQueryLawArticle =
                lawArticleQB
                        .keyword()
                        .onFields( "lawChapter.chapter", "article", "lawText")
                        .matching(text)
                        .createQuery();

        FullTextQuery jpaQueryProduct =
                fullTextEntityManager.createFullTextQuery(luceneQueryProduct, Product.class);

        FullTextQuery jpaQueryLawArticle =
                fullTextEntityManager.createFullTextQuery(luceneQueryLawArticle, LawArticle.class);

        @SuppressWarnings("unchecked")
        List<RenderableEntity> results = new ArrayList<>();

        results.addAll(jpaQueryLawArticle.getResultList());

        results.addAll(jpaQueryProduct.getResultList());

        return results;
    }
}