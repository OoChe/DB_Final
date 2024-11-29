create table event(
	eventID varchar(7) not null,
    eventTitle tinytext not null,
    eventSubTitle text,
    eventRegion varchar(10) not null default '서울',
    eventDate Date,
    eventRate Double,
    eventLocate tinytext,
    eventDescription text,
    eventLink text
);
insert event values ('E000001', '테스트용 이벤트명', '테스트용 서브 타이틀명', '서울', '2024-11-30', 0.0, '서울특별시 종로구 필동로', '이벤트 자세한 설명', '');
select * from event;