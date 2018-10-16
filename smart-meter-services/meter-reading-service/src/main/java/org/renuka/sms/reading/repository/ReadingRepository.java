package org.renuka.sms.reading.repository;

import org.renuka.sms.reading.dto.MonthlyReadingDTO;
import org.renuka.sms.reading.entity.Reading;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface ReadingRepository extends CrudRepository<Reading, Long> {
    @Query(value = "select r from #{#entityName} r where r.account_id = :id and r.timestamp >= :timestampFrom"
            + " and r.timestamp <= :timestampTo")
    Iterable<Reading> findByAccount(@Param("id") Long accountId, @Param("timestampFrom") Date timestampFrom,
                                    @Param("timestampTo") Date timestampTo);

    @Query(value = "select r from Reading r where r.account_id in :ids and r.timestamp >= :timestampFrom"
            + " and r.timestamp <= :timestampTo")
    Iterable<Reading> findByListOfAccounts(@Param("ids") List<Long> accountIdList, @Param("timestampFrom") Date timestampFrom,
                                           @Param("timestampTo") Date timestampTo);

//    @Query(value = "select new org.renuka.sms.reading.dto.MonthlyReadingDTO(max(r.timestamp), avg(r.reading)) from Reading r" +
//            " where r.timestamp >= :timestampFrom and r.timestamp <= :timestampTo and r.account_id = :id")
    @Query(value = "select month(timestamp), min(reading), max(reading) from consumption where timestamp >= :timestampFrom and timestamp <= :timestampTo and account_id = :id group by month(timestamp)", nativeQuery = true)
    Iterable<Object[]> findMonthlySummeryByAccount_id(@Param("id") Long id, @Param("timestampFrom") Date timestampFrom,
                                                               @Param("timestampTo") Date timestampTo);
}
