create table category (
    id integer not null,
    category varchar(255),
    primary key (id)
) engine=innoDB;

create table category_laws (
    category_id integer not null,
    laws_id integer not null
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
insert into hibernate_sequence values ( 1 );

create table law (
    id integer not null,
    law varchar(255),
    law_article_id integer,
    law_chapter_id integer,
    primary key (id)
) engine=innoDB;

create table law_categories (
    law_id integer not null,
    categories_id integer not null
) engine=innoDB;

create table law_article (
    id integer not null,
    article varchar(255),
    law_id integer,
    primary key (id)
) engine=innoDB;

create table law_chapter (
    id integer not null,
    chapter varchar(255),
    law_id integer,
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

alter table category_laws
    add constraint FKldxw6fvfym8is61o59g7xbr1y
    foreign key (laws_id)
    references law (id);

alter table category_laws
    add constraint FK7glnvwctt7xdpyig08c6idi13
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

alter table law
    add constraint FK9f8fasuuy0quuf5wurgvtvyeb
    foreign key (law_article_id)
    references law_article (id);

alter table law
    add constraint FKhnogd27jepbp2ku5u7fkvxbqx
    foreign key (law_chapter_id)
    references law_chapter (id);

alter table law_categories
    add constraint FKf4ovj6xoxb7g9y6l0svp1p1p9
    foreign key (categories_id)
    references category (id);

alter table law_categories
    add constraint FK5l1v5yrdy016k5cco5p44v31a
    foreign key (law_id)
    references law (id);

alter table law_article
    add constraint FK6f16vqliqmndi1uh2qfgj7ks1
    foreign key (law_id)
    references law (id);

alter table law_chapter
    add constraint FKeevrlvwajp8qnhrruxs4v079v
    foreign key (law_id)
    references law (id);

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


 /* Старый код миграции*/
/*create table category (
    id integer not null,
    category varchar(255),
    primary key (id)
) engine=innoDB;

create table category_laws (
    category_id integer not null,
    laws_id integer not null
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

create table law (
    id integer not null,
    law_chapter varchar (255),
    law_number varchar(255),
    law varchar(255),
    primary key (id)
) engine=innoDB;

create table law_categories (
    law_id integer not null,
    categories_id integer not null
) engine=innoDB;

create table product (
    id bigint not null,
    product_name varchar(255),
    vendor_code varchar(255),
    category_id integer, primary key (id)
) engine=innoDB;

alter table category_products
    add constraint UK_fdnk3mk70n1rc08vw1cj65kqw
    unique (products_id);

alter table category_laws
    add constraint FKldxw6fvfym8is61o59g7xbr1y
    foreign key (laws_id)
    references law (id);

alter table category_laws
    add constraint FK7glnvwctt7xdpyig08c6idi13
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

alter table law_categories
    add constraint FKf4ovj6xoxb7g9y6l0svp1p1p9
    foreign key (categories_id)
    references category (id);

alter table law_categories
    add constraint FK5l1v5yrdy016k5cco5p44v31a
    foreign key (law_id)
    references law (id);

alter table product
    add constraint FK1mtsbur82frn64de7balymq9s
    foreign key (category_id)
    references category (id);
*/