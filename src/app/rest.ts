import cors from 'cors';
import { LoggerInterface } from '../core/logger/logger.interface.js';
import { ConfigInterface } from '../core/config/config.interface.js';
import { RestSchema } from '../core/config/rest.schema.js';
import { AppComponent } from '../types/app-component.enum.js';
import { DatabaseClientInterface } from '../core/database-client/database-client.interface.js';
import { inject, injectable } from 'inversify';
import { getMongoURI } from '../core/helpers/db.js';
import { getFullServerPath } from '../core/helpers/common.js';
import express, { Express } from 'express';
import { ControllerInterface } from '../core/controller/controller.interface.js';
import { AuthenticateMiddleware } from '../core/middlewares/authenticate.middleware.js';
import { ExceptionFilterInterface } from '../core/exception-filters/exception-filter.interface.js';

@injectable()
export default class RestApplication {
  private expressApplication: Express;

  constructor(
    @inject(AppComponent.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(AppComponent.ConfigInterface) private readonly config: ConfigInterface<RestSchema>,
    @inject(AppComponent.DatabaseClientInterface) private readonly databaseClient: DatabaseClientInterface,
    @inject(AppComponent.MovieController) private readonly movieController: ControllerInterface,
    @inject(AppComponent.UserController) private readonly userController: ControllerInterface,
    @inject(AppComponent.CommentController) private commentController: ControllerInterface,
    @inject(AppComponent.HttpErrorExceptionFilter) private readonly httpErrorExceptionFilter: ExceptionFilterInterface,
    @inject(AppComponent.BaseExceptionFilter) private readonly baseExceptionFilter: ExceptionFilterInterface,
    @inject(AppComponent.ValidationExceptionFilter) private readonly validationExceptionFilter: ExceptionFilterInterface,
  ) {
    this.expressApplication = express();
  }

  private async _initDb() {
    this.logger.info('Init database…');

    const mongoUri = getMongoURI(
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME'),
    );

    await this.databaseClient.connect(mongoUri);
    this.logger.info('Init database completed');
  }

  private async _initServer() {

    this.logger.info('Try to init server…');

    const port = this.config.get('PORT');
    this.expressApplication.listen(port);

    this.logger.info(`🚀Server started on ${getFullServerPath(this.config.get('HOST'), this.config.get('PORT'))}`);
  }

  private async _initRoutes() {
    this.logger.info('Controller initialization…');
    this.expressApplication.use('/movies', this.movieController.router);
    this.expressApplication.use('/users', this.userController.router);
    this.expressApplication.use('/comments', this.commentController.router);
    this.logger.info('Controller initialization completed');
  }

  private async _initMiddleware() {
    this.logger.info('Global middleware initialization…');
    this.expressApplication.use(express.json());
    this.expressApplication.use(
      '/uploads',
      express.static(this.config.get('UPLOAD_DIRECTORY'))
    );
    const authenticateMiddleware = new AuthenticateMiddleware(this.config.get('JWT_SECRET'));
    this.expressApplication.use(authenticateMiddleware.execute.bind(authenticateMiddleware));
    this.expressApplication.use(
      '/static',
      express.static(this.config.get('STATIC_DIRECTORY_PATH'))
    );
    this.expressApplication.use(cors());
    this.logger.info('Global middleware initialization completed');
  }

  private async _initExceptionFilters() {
    this.logger.info('Exception filters initialization');
    this.expressApplication.use(this.validationExceptionFilter.catch.bind(this.validationExceptionFilter));
    this.expressApplication.use(this.httpErrorExceptionFilter.catch.bind(this.httpErrorExceptionFilter));
    this.expressApplication.use(this.baseExceptionFilter.catch.bind(this.baseExceptionFilter));
    this.logger.info('Exception filters completed');
  }


  public async init() {
    this.logger.info('Application initialization…');
    await this._initDb();
    await this._initMiddleware();
    await this._initRoutes();
    await this._initExceptionFilters();
    await this._initServer();
  }
}
