export const AppComponent = {
  RestApplication: Symbol.for('RestApplication'),
  LoggerInterface: Symbol.for('LoggerInterface'),
  ConfigInterface: Symbol.for('ConfigInterface'),
  DatabaseClientInterface: Symbol.for('DatabaseClientInterface'),
  UserServiceInterface: Symbol.for('UserServiceInterface'),
  UserModel: Symbol.for('UserModel'),
  MovieServiceInterface: Symbol.for('MovieServiceInterface'),
  MovieModel: Symbol.for('MovieModel'),
  CommentServiceInterface: Symbol.for('CommentServiceInterface'),
  CommentModel: Symbol.for('CommentModel'),
  MovieController: Symbol.for('MovieController'),
  UserController: Symbol.for('UserController'),
  CommentController: Symbol.for('CommentController'),
  FavoriteController: Symbol.for('FavoriteController'),
  HttpErrorExceptionFilter: Symbol.for('HttpErrorExceptionFilter'),
  BaseExceptionFilter: Symbol.for('BaseExceptionFilter'),
  ValidationExceptionFilter: Symbol.for('ValidationExceptionFilter'),
} as const;


