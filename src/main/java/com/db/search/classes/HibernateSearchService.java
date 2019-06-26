package com.db.search.classes;

import com.db.model.LawArticle;
import com.db.model.Product;
import com.db.search.interfaces.RenderableEntity;
import org.apache.lucene.search.Explanation;
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
import java.util.Collections;
import java.util.Comparator;
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
                        .onFields( "vendorCode", "productName", "category.category")
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

        jpaQueryProduct.setProjection(
                FullTextQuery.SCORE,
                FullTextQuery.THIS
                //,FullTextQuery.EXPLANATION
        );

        jpaQueryLawArticle.setProjection(
                FullTextQuery.SCORE,
                FullTextQuery.THIS
                //,FullTextQuery.EXPLANATION
        );

        List<Object[]> listObject = new ArrayList<>();

        listObject.addAll(jpaQueryLawArticle.getResultList());

        listObject.addAll(jpaQueryProduct.getResultList());

        final Comparator<Object[]> COMPARE_BY_SCORE = new Comparator<Object[]>() {

            @Override
            public int compare(Object[] lhs, Object[] rhs) {
                if ((Float)lhs[0]>(Float)rhs[0])
                {
                    return 1;
                }
                else if ((Float)lhs[0]<(Float)rhs[0])
                {
                    return -1;
                }
                else {
                    return 0;
                }
            }
        };

        Collections.sort(listObject, COMPARE_BY_SCORE);

        // Вывод отчета о результатах поиска в консоль
//        for (Object[] result : listObject) {
//            Explanation e = (Explanation) result[2];
//            System.out.println(e.toString());
//        }

        @SuppressWarnings("unchecked")
        List<RenderableEntity> results = new ArrayList<>();

        for (int i = listObject.size() - 1; i >= 0; i--) {
            Object[] obj = listObject.get(i);
            results.add((RenderableEntity) obj[1]);
        }

        return results;
    }
}