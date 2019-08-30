create sequence hibernate_sequence start 1 increment 1;

create table category (
    id int4 not null,
    category varchar(255),
    primary key (id)
);

create table category_law_articles (
    category_id int4 not null,
    law_articles_id int4 not null
);

create table claim_templates (
    id int4 not null,
    filename varchar(255),
     filepath text, primary key (id)
);

create table law_article (
    id int4 not null,
    article varchar(255),
    law_text text,
    law_chapter_id int4,
    primary key (id)
);

create table law_article_categories (
    law_article_id int4 not null,
    categories_id int4 not null
);

create table law_chapter (
    id int4 not null,
    chapter varchar(255),
    primary key (id)
);

create table product (id int8 not null,
    product_name varchar(255),
    vendor_code varchar(255),
    category_id int4,
    primary key (id)
);

create table role (
    id  bigserial not null,
    name varchar(255),
    primary key (id)
);

create table status (
    id  bigserial not null,
    status_name varchar(255),
    primary key (id)
);

create table status_users (
    status_id int8 not null,
    users_id int8 not null
);


create table usr (
    id  bigserial not null,
    activation_code varchar(255),
    date_of_registration int8,
    email varchar(255),
    login_allowed boolean not null,
    online boolean not null,
    password varchar(255),
    username varchar(255),
    status_id int8,
    primary key (id)
);

create table usr_roles (
    users_id int8 not null,
    roles_id int8 not null,
    primary key (users_id, roles_id)
);


alter table status_users
    add constraint UK_ldi9jdp68ig4sstdp82imya3j
        unique (users_id);

alter table category_law_articles
    add constraint FK6ya31645y34006kd6slajq2tg
        foreign key (law_articles_id)
            references law_article;

alter table category_law_articles
    add constraint FK17cotkabhecuw9u6lwevullyi
        foreign key (category_id)
            references category;

alter table law_article
    add constraint FKgce7mo0vh3fml3hq3v3xqy80v
        foreign key (law_chapter_id)
            references law_chapter;

alter table law_article_categories
    add constraint FK3w30scrbbhndd092pvgkkqokb
        foreign key (categories_id)
            references category;

alter table law_article_categories
    add constraint FKtjry6whtmvg5tg0spi54fkxwy
        foreign key (law_article_id)
            references law_article;

alter table product
    add constraint FK1mtsbur82frn64de7balymq9s
        foreign key (category_id)
            references category;

alter table status_users
    add constraint FK1bdvr0pq7kpt0t79oqvk2pq3t
        foreign key (users_id)
            references usr;

alter table status_users
    add constraint FKj9obyp05mm9s49xa7btb02pk9
        foreign key (status_id)
            references status;

alter table usr
    add constraint FKctuqrhooprt7289v2w1lyde9y
        foreign key (status_id)
            references status;

alter table usr_roles
    add constraint FKatlsh4dmfdkl5m7rdvhrls5if
        foreign key (roles_id)
            references role;

alter table usr_roles
    add constraint FKchnh142fcr245xa6c2t8t0fen
        foreign key (users_id)
            references usr;


insert into role (id, name)
    values
        (1, 'USER'),
        (2, 'MODER'),
        (3, 'ADMIN');

insert into status (id, status_name)
    values
        (1, 'АКТИВНЫЙ'),
        (2, 'BLACK LIST'),
        (3, 'УВОЛЕН');

