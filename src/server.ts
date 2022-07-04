import app from './app';
import { logger } from './lib/logger';

const PORT = process.env.PORT || 3000;

process.on('unhandledRejection', (reason: Error) => {
  logger.error('Unhandled Promise Rejection: reason:', reason.message);
  logger.error(reason.stack);
});

export const server = app.listen(PORT, () => {
  logger.info(`listening on port ${PORT}`);
});
