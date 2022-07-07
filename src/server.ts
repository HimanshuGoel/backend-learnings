import { App } from './app';
import { logger } from './utilities/logger.utility';

const PORT = process.env.PORT || 3000;

const app: App = new App();

process.on('unhandledRejection', (reason: Error) => {
  logger.error('Unhandled Promise Rejection: reason:', reason.message);
  logger.error(reason.stack);
});

export const server = app.express.listen(PORT, () => {
  logger.info(`listening on port ${PORT}`);
});
