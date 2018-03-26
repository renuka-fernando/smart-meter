package org.renuka.sms.reading.repository;

import org.renuka.sms.reading.entity.Reading;
import org.springframework.data.repository.CrudRepository;

public interface ReadingRepository extends CrudRepository<Reading, Long> {
}
