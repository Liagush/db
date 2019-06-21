-- create table category (
--     id integer not null,
--     category varchar(255),
--     type varchar(255),
--     primary key (id)
-- ) engine=innoDB;
--
-- create table category_law_articles (
--     category_id integer not null,
--     law_articles_id integer not null
-- ) engine=innoDB;
--
-- create table category_products (
--     category_id integer not null,
--     products_id bigint not null
-- ) engine=innoDB;
--
-- create table hibernate_sequence (
--     next_val bigint
-- ) engine=innoDB;
--
-- insert into hibernate_sequence values ( 1 );
-- insert into hibernate_sequence values ( 1 );
-- insert into hibernate_sequence values ( 1 );
-- insert into hibernate_sequence values ( 1 );
--
-- create table law_article (
--     id integer not null,
--     article varchar(255),
--     law_text varchar(255),
--     type varchar(255),
--     law_chapter_id integer,
--     primary key (id)
-- ) engine=innoDB;
--
-- create table law_article_categories (
--     law_article_id integer not null,
--     categories_id integer not null
-- ) engine=innoDB;
--
-- create table law_chapter (
--     id integer not null,
--     chapter varchar(255),
--     type varchar(255),
--     primary key (id)
-- ) engine=innoDB;
--
-- create table product (
--     id bigint not null,
--     product_name varchar(255),
--     type varchar(255),
--     vendor_code varchar(255),
--     category_id integer,
--     primary key (id)
-- ) engine=innoDB;
--
-- alter table category_products
--     add constraint UK_fdnk3mk70n1rc08vw1cj65kqw
--     unique (products_id);
--
-- alter table category_law_articles
--     add constraint FK6ya31645y34006kd6slajq2tg
--     foreign key (law_articles_id)
--     references law_article (id);
--
-- alter table category_law_articles
--     add constraint FK17cotkabhecuw9u6lwevullyi
--     foreign key (category_id)
--     references category (id);
--
-- alter table category_products
--     add constraint FKe9irm5a62pmolhvr468cip3v3
--     foreign key (products_id)
--     references product (id);
--
-- alter table category_products
--     add constraint FKqwkr0l0xbluhhkm7s0c1tg8en
--     foreign key (category_id)
--     references category (id);
--
-- alter table law_article
--     add constraint FKgce7mo0vh3fml3hq3v3xqy80v
--     foreign key (law_chapter_id)
--     references law_chapter (id);
--
-- alter table law_article_categories
--     add constraint FK3w30scrbbhndd092pvgkkqokb
--     foreign key (categories_id)
--     references category (id);
--
-- alter table law_article_categories
--     add constraint FKtjry6whtmvg5tg0spi54fkxwy
--     foreign key (law_article_id)
--     references law_article (id);
--
-- alter table product
--     add constraint FK1mtsbur82frn64de7balymq9s
--     foreign key (category_id)
--     references category (id);




-- select count(*) as y0_ from category this_;
-- select this_.id as y0_ from category this_;
-- select count(*) as y0_ from law_chapter this_;
-- select this_.id as y0_ from law_chapter this_;
-- select count(*) as y0_ from product this_;
-- select this_.id as y0_ from product this_;
-- select count(*) as y0_ from law_article this_;
-- select this_.id as y0_ from law_article this_;








create table category (
    id integer not null,
    category varchar(255),
    primary key (id)
) engine=innoDB;

create table category_law_articles (
    category_id integer not null,
    law_articles_id integer not null
) engine=innoDB;

create table category_products (
    category_id integer not null,
    products_id bigint not null
) engine=innoDB;

create table hibernate_sequence (
    next_val bigint
) engine=innoDB;

insert into hibernate_sequence values ( 1 );
insert into hibernate_sequence values ( 1 );
insert into hibernate_sequence values ( 1 );
insert into hibernate_sequence values ( 1 );

create table law_article (
    id integer not null,
    article varchar(255),
    law_text varchar(255),
    law_chapter_id integer,
    primary key (id)
) engine=innoDB;

create table law_article_categories (
    law_article_id integer not null,
    categories_id integer not null
) engine=innoDB;

create table law_chapter (
    id integer not null,
    chapter varchar(255),
    primary key (id)
) engine=innoDB;

create table law_chapter_law_article_list (
    law_chapter_id integer not null,
    law_article_list_id integer not null
) engine=innoDB;

create table product (
    id bigint not null,
    product_name varchar(255),
    vendor_code varchar(255),
    category_id integer,
    primary key (id)
) engine=innoDB;

alter table category_products
    add constraint UK_fdnk3mk70n1rc08vw1cj65kqw
    unique (products_id);

alter table law_chapter_law_article_list
    add constraint UK_kkhjhmjmwy7146ukjygko0ha8
    unique (law_article_list_id);

alter table category_law_articles
    add constraint FK6ya31645y34006kd6slajq2tg
    foreign key (law_articles_id)
    references law_article (id);

alter table category_law_articles
    add constraint FK17cotkabhecuw9u6lwevullyi
    foreign key (category_id)
    references category (id);

alter table category_products
    add constraint FKe9irm5a62pmolhvr468cip3v3
    foreign key (products_id)
    references product (id);

alter table category_products
    add constraint FKqwkr0l0xbluhhkm7s0c1tg8en
    foreign key (category_id)
    references category (id);

alter table law_article
    add constraint FKgce7mo0vh3fml3hq3v3xqy80v
    foreign key (law_chapter_id)
    references law_chapter (id);

alter table law_article_categories
    add constraint FK3w30scrbbhndd092pvgkkqokb
    foreign key (categories_id)
    references category (id);

alter table law_article_categories
    add constraint FKtjry6whtmvg5tg0spi54fkxwy
    foreign key (law_article_id)
    references law_article (id);

alter table law_chapter_law_article_list
    add constraint FKhgjmpttxa9o0ut7jwgod2lkrx
    foreign key (law_article_list_id)
    references law_article (id);

alter table law_chapter_law_article_list
    add constraint FK3m728dqsh8hy741fh80gn4uce
    foreign key (law_chapter_id)
    references law_chapter (id);

alter table product
  add constraint FK1mtsbur82frn64de7balymq9s
  foreign key (category_id)
 references category (id);
