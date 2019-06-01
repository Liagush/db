create table category (
    id integer not null,
    category varchar(255),
    primary key (id)
) engine=MyISAM

create table category_laws (
    category_id integer not null,
    laws_id integer not null
) engine=MyISAM

create table category_products (
    category_id integer not null,
    products_id bigint not null
) engine=MyISAM

create table hibernate_sequence (
    next_val bigint
) engine=MyISAM

insert into hibernate_sequence values ( 1 )
insert into hibernate_sequence values ( 1 )
insert into hibernate_sequence values ( 1 )

create table law (
    id integer not null,
    item_law varchar(255),
    law varchar(255),
    primary key (id)
) engine=MyISAM

create table law_categories (
    law_id integer not null,
    categories_id integer not null
) engine=MyISAM

create table product (
    id bigint not null,
    product_name varchar(255),
    vendor_code varchar(255),
    category_id integer, primary key (id)
) engine=MyISAM

alter table category_products
    add constraint UK_fdnk3mk70n1rc08vw1cj65kqw
    unique (products_id)

alter table category_laws
    add constraint FKldxw6fvfym8is61o59g7xbr1y
    foreign key (laws_id)
    references law (id)

alter table category_laws
    add constraint FK7glnvwctt7xdpyig08c6idi13
    foreign key (category_id)
    references category (id)

alter table category_products
    add constraint FKe9irm5a62pmolhvr468cip3v3
    foreign key (products_id)
    references product (id)

alter table category_products
    add constraint FKqwkr0l0xbluhhkm7s0c1tg8en
    foreign key (category_id)
    references category (id)

alter table law_categories
    add constraint FKf4ovj6xoxb7g9y6l0svp1p1p9
    foreign key (categories_id)
    references category (id)

alter table law_categories
    add constraint FK5l1v5yrdy016k5cco5p44v31a
    foreign key (law_id)
    references law (id)

alter table product
    add constraint FK1mtsbur82frn64de7balymq9s
    foreign key (category_id)
    references category (id)
