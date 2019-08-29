export const ADDRESSES_STATEMENTS = {
  CREATE: `create table Addresses (
    id integer primary key,
    wallet_id integer references Wallets(id),
    address varchar(100),
    name nvarchar(200),
    created_date datetime,
    last_modified_date int,
    is_active tinyint not null,
    balance decimal(16,8),
    parent_id integer,
    foreign key (wallet_id) references Wallets(id) on delete cascade
  );`,
  INSERT: {},
  SELECT: {},
};