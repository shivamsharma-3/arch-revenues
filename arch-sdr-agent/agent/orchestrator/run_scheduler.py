"""
Entrypoint for the background worker process (Railway "worker" service,
or `python -m agent.orchestrator.run_scheduler` locally / in Docker).
Starts the scheduler and blocks forever.
"""
import logging
import time

from agent.orchestrator.scheduler import start_scheduler

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(name)s: %(message)s")

if __name__ == "__main__":
    scheduler = start_scheduler()
    logging.info("Scheduler started. Jobs: %s", [j.id for j in scheduler.get_jobs()])
    try:
        while True:
            time.sleep(60)
    except (KeyboardInterrupt, SystemExit):
        scheduler.shutdown()
