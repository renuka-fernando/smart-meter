package org.renuka.sms.createreading.repository;

import org.renuka.sms.createreading.entity.Reading;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface ReadingRepository extends CrudRepository<Reading, Long> {
    @Query("select r from Reading r where r.id = (" +
            "select max(r_of_a.id) from Reading r_of_a where r_of_a.account_id = :id)")
    Reading findLastReadingByAccount_id(@Param("id") Long accountId);
}
