package org.renuka.sms.reading.repository;

import org.renuka.sms.reading.entity.Reading;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface ReadingRepository extends CrudRepository<Reading, Long> {
    @Query(value = "select r from Reading r where r.account_id = :id and r.timestamp >= :timestampFrom"
            + " and r.timestamp <= :timestampTo")
    Iterable<Reading> findByAccount(@Param("id") Long accountId, @Param("timestampFrom") long timestampFrom,
                                    @Param("timestampTo") long timestampTo);

    @Query(value = "select r from Reading r where r.account_id in :ids and r.timestamp >= :timestampFrom"
            + " and r.timestamp <= :timestampTo")
    Iterable<Reading> findByListOfAccounts(@Param("ids") List<Long> accountIdList, @Param("timestampFrom") long timestampFrom,
                                     @Param("timestampTo") long timestampTo);
}
