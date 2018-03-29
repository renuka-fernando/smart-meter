package org.renuka.sms.payment.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Date;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

public class BillGeneratorService implements Runnable {
    private Logger logger = LoggerFactory.getLogger(BillGeneratorService.class);

    public BillGeneratorService(String... args) {
    }

    @Override
    public void run() {
        logger.info("BILL GENERATOR SERVICE: Started");

        ScheduledExecutorService executorService = Executors.newScheduledThreadPool(1);
        // TODO: Read from config
        executorService.scheduleAtFixedRate(new Generator(), 0, 1000, TimeUnit.MILLISECONDS);
    }

    private class Generator implements Runnable {

        @Override
        public void run() {
            logger.info("BILL GENERATOR SERVICE: Start generating Bills");
        }
    }
}
