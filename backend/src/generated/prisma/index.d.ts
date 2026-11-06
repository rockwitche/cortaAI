
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Barbearia
 * 
 */
export type Barbearia = $Result.DefaultSelection<Prisma.$BarbeariaPayload>
/**
 * Model Barbeiro
 * 
 */
export type Barbeiro = $Result.DefaultSelection<Prisma.$BarbeiroPayload>
/**
 * Model HorarioDisponivel
 * 
 */
export type HorarioDisponivel = $Result.DefaultSelection<Prisma.$HorarioDisponivelPayload>
/**
 * Model Servico
 * 
 */
export type Servico = $Result.DefaultSelection<Prisma.$ServicoPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const UserType: {
  CLIENTE: 'CLIENTE',
  BARBEIRO: 'BARBEIRO'
};

export type UserType = (typeof UserType)[keyof typeof UserType]


export const Plano: {
  BASICO: 'BASICO',
  PROFISSIONAL: 'PROFISSIONAL',
  PREMIUM: 'PREMIUM'
};

export type Plano = (typeof Plano)[keyof typeof Plano]

}

export type UserType = $Enums.UserType

export const UserType: typeof $Enums.UserType

export type Plano = $Enums.Plano

export const Plano: typeof $Enums.Plano

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.PrismaClientConstructorArgs<ClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.barbearia`: Exposes CRUD operations for the **Barbearia** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Barbearias
    * const barbearias = await prisma.barbearia.findMany()
    * ```
    */
  get barbearia(): Prisma.BarbeariaDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.barbeiro`: Exposes CRUD operations for the **Barbeiro** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Barbeiros
    * const barbeiros = await prisma.barbeiro.findMany()
    * ```
    */
  get barbeiro(): Prisma.BarbeiroDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.horarioDisponivel`: Exposes CRUD operations for the **HorarioDisponivel** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more HorarioDisponivels
    * const horarioDisponivels = await prisma.horarioDisponivel.findMany()
    * ```
    */
  get horarioDisponivel(): Prisma.HorarioDisponivelDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.servico`: Exposes CRUD operations for the **Servico** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Servicos
    * const servicos = await prisma.servico.findMany()
    * ```
    */
  get servico(): Prisma.ServicoDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.10.1
   * Query Engine version: d1b3f377ca835d73fd50954a5e22128b9ebdd6b8
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * Resolved type of the argument passed to the `PrismaClient` constructor.
   *
   * When called without a narrower options type (the common case), this resolves
   * to `PrismaClientOptions` directly, which produces a clear TypeScript error
   * message (`not assignable to parameter of type 'PrismaClientOptions'`) when
   * the argument is missing or incomplete. When the user supplies a narrower
   * options type (e.g. via a literal), it falls back to `Subset` to keep
   * filtering out unknown properties.
   */
  export type PrismaClientConstructorArgs<Options extends PrismaClientOptions> =
    [PrismaClientOptions] extends [Options] ? PrismaClientOptions : Subset<Options, PrismaClientOptions>;

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      ((Without<T, U> & U) | (Without<U, T> & T)) & object
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Barbearia: 'Barbearia',
    Barbeiro: 'Barbeiro',
    HorarioDisponivel: 'HorarioDisponivel',
    Servico: 'Servico'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "barbearia" | "barbeiro" | "horarioDisponivel" | "servico"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Barbearia: {
        payload: Prisma.$BarbeariaPayload<ExtArgs>
        fields: Prisma.BarbeariaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BarbeariaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BarbeariaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BarbeariaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BarbeariaPayload>
          }
          findFirst: {
            args: Prisma.BarbeariaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BarbeariaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BarbeariaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BarbeariaPayload>
          }
          findMany: {
            args: Prisma.BarbeariaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BarbeariaPayload>[]
          }
          create: {
            args: Prisma.BarbeariaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BarbeariaPayload>
          }
          createMany: {
            args: Prisma.BarbeariaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BarbeariaCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BarbeariaPayload>[]
          }
          delete: {
            args: Prisma.BarbeariaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BarbeariaPayload>
          }
          update: {
            args: Prisma.BarbeariaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BarbeariaPayload>
          }
          deleteMany: {
            args: Prisma.BarbeariaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BarbeariaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BarbeariaUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BarbeariaPayload>[]
          }
          upsert: {
            args: Prisma.BarbeariaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BarbeariaPayload>
          }
          aggregate: {
            args: Prisma.BarbeariaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBarbearia>
          }
          groupBy: {
            args: Prisma.BarbeariaGroupByArgs<ExtArgs>
            result: $Utils.Optional<BarbeariaGroupByOutputType>[]
          }
          count: {
            args: Prisma.BarbeariaCountArgs<ExtArgs>
            result: $Utils.Optional<BarbeariaCountAggregateOutputType> | number
          }
        }
      }
      Barbeiro: {
        payload: Prisma.$BarbeiroPayload<ExtArgs>
        fields: Prisma.BarbeiroFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BarbeiroFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BarbeiroPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BarbeiroFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BarbeiroPayload>
          }
          findFirst: {
            args: Prisma.BarbeiroFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BarbeiroPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BarbeiroFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BarbeiroPayload>
          }
          findMany: {
            args: Prisma.BarbeiroFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BarbeiroPayload>[]
          }
          create: {
            args: Prisma.BarbeiroCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BarbeiroPayload>
          }
          createMany: {
            args: Prisma.BarbeiroCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BarbeiroCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BarbeiroPayload>[]
          }
          delete: {
            args: Prisma.BarbeiroDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BarbeiroPayload>
          }
          update: {
            args: Prisma.BarbeiroUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BarbeiroPayload>
          }
          deleteMany: {
            args: Prisma.BarbeiroDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BarbeiroUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BarbeiroUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BarbeiroPayload>[]
          }
          upsert: {
            args: Prisma.BarbeiroUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BarbeiroPayload>
          }
          aggregate: {
            args: Prisma.BarbeiroAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBarbeiro>
          }
          groupBy: {
            args: Prisma.BarbeiroGroupByArgs<ExtArgs>
            result: $Utils.Optional<BarbeiroGroupByOutputType>[]
          }
          count: {
            args: Prisma.BarbeiroCountArgs<ExtArgs>
            result: $Utils.Optional<BarbeiroCountAggregateOutputType> | number
          }
        }
      }
      HorarioDisponivel: {
        payload: Prisma.$HorarioDisponivelPayload<ExtArgs>
        fields: Prisma.HorarioDisponivelFieldRefs
        operations: {
          findUnique: {
            args: Prisma.HorarioDisponivelFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HorarioDisponivelPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.HorarioDisponivelFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HorarioDisponivelPayload>
          }
          findFirst: {
            args: Prisma.HorarioDisponivelFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HorarioDisponivelPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.HorarioDisponivelFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HorarioDisponivelPayload>
          }
          findMany: {
            args: Prisma.HorarioDisponivelFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HorarioDisponivelPayload>[]
          }
          create: {
            args: Prisma.HorarioDisponivelCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HorarioDisponivelPayload>
          }
          createMany: {
            args: Prisma.HorarioDisponivelCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.HorarioDisponivelCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HorarioDisponivelPayload>[]
          }
          delete: {
            args: Prisma.HorarioDisponivelDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HorarioDisponivelPayload>
          }
          update: {
            args: Prisma.HorarioDisponivelUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HorarioDisponivelPayload>
          }
          deleteMany: {
            args: Prisma.HorarioDisponivelDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.HorarioDisponivelUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.HorarioDisponivelUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HorarioDisponivelPayload>[]
          }
          upsert: {
            args: Prisma.HorarioDisponivelUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HorarioDisponivelPayload>
          }
          aggregate: {
            args: Prisma.HorarioDisponivelAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateHorarioDisponivel>
          }
          groupBy: {
            args: Prisma.HorarioDisponivelGroupByArgs<ExtArgs>
            result: $Utils.Optional<HorarioDisponivelGroupByOutputType>[]
          }
          count: {
            args: Prisma.HorarioDisponivelCountArgs<ExtArgs>
            result: $Utils.Optional<HorarioDisponivelCountAggregateOutputType> | number
          }
        }
      }
      Servico: {
        payload: Prisma.$ServicoPayload<ExtArgs>
        fields: Prisma.ServicoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ServicoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ServicoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicoPayload>
          }
          findFirst: {
            args: Prisma.ServicoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ServicoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicoPayload>
          }
          findMany: {
            args: Prisma.ServicoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicoPayload>[]
          }
          create: {
            args: Prisma.ServicoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicoPayload>
          }
          createMany: {
            args: Prisma.ServicoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ServicoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicoPayload>[]
          }
          delete: {
            args: Prisma.ServicoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicoPayload>
          }
          update: {
            args: Prisma.ServicoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicoPayload>
          }
          deleteMany: {
            args: Prisma.ServicoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ServicoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ServicoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicoPayload>[]
          }
          upsert: {
            args: Prisma.ServicoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicoPayload>
          }
          aggregate: {
            args: Prisma.ServicoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateServico>
          }
          groupBy: {
            args: Prisma.ServicoGroupByArgs<ExtArgs>
            result: $Utils.Optional<ServicoGroupByOutputType>[]
          }
          count: {
            args: Prisma.ServicoCountArgs<ExtArgs>
            result: $Utils.Optional<ServicoCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * A driver adapter that PrismaClient uses to connect to your database, such as the ones provided by `@prisma/adapter-pg`, `@prisma/adapter-libsql`, `@prisma/adapter-planetscale`, etc.
     * 
     * A driver adapter is **required** unless you connect to your database through Prisma Accelerate (in which case use `accelerateUrl` instead).
     * 
     * Learn more: https://pris.ly/d/driver-adapters
     * 
     * @example
     * ```ts
     * import { PrismaPg } from '@prisma/adapter-pg'
     * import { PrismaClient } from './generated/prisma/client'
     * 
     * const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
     * const prisma = new PrismaClient({ adapter })
     * ```
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * The Prisma Accelerate connection URL. Use this option to connect to your database through Prisma Accelerate instead of using a driver adapter to connect directly.
     * 
     * Learn more: https://pris.ly/d/accelerate
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    barbearia?: BarbeariaOmit
    barbeiro?: BarbeiroOmit
    horarioDisponivel?: HorarioDisponivelOmit
    servico?: ServicoOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    barbearias: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    barbearias?: boolean | UserCountOutputTypeCountBarbeariasArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountBarbeariasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BarbeariaWhereInput
  }


  /**
   * Count Type BarbeariaCountOutputType
   */

  export type BarbeariaCountOutputType = {
    barbeiros: number
    servicos: number
  }

  export type BarbeariaCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    barbeiros?: boolean | BarbeariaCountOutputTypeCountBarbeirosArgs
    servicos?: boolean | BarbeariaCountOutputTypeCountServicosArgs
  }

  // Custom InputTypes
  /**
   * BarbeariaCountOutputType without action
   */
  export type BarbeariaCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BarbeariaCountOutputType
     */
    select?: BarbeariaCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * BarbeariaCountOutputType without action
   */
  export type BarbeariaCountOutputTypeCountBarbeirosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BarbeiroWhereInput
  }

  /**
   * BarbeariaCountOutputType without action
   */
  export type BarbeariaCountOutputTypeCountServicosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServicoWhereInput
  }


  /**
   * Count Type BarbeiroCountOutputType
   */

  export type BarbeiroCountOutputType = {
    servicos: number
    horarios: number
  }

  export type BarbeiroCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    servicos?: boolean | BarbeiroCountOutputTypeCountServicosArgs
    horarios?: boolean | BarbeiroCountOutputTypeCountHorariosArgs
  }

  // Custom InputTypes
  /**
   * BarbeiroCountOutputType without action
   */
  export type BarbeiroCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BarbeiroCountOutputType
     */
    select?: BarbeiroCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * BarbeiroCountOutputType without action
   */
  export type BarbeiroCountOutputTypeCountServicosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServicoWhereInput
  }

  /**
   * BarbeiroCountOutputType without action
   */
  export type BarbeiroCountOutputTypeCountHorariosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HorarioDisponivelWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    authVersion: number | null
    verificationAttempts: number | null
  }

  export type UserSumAggregateOutputType = {
    authVersion: number | null
    verificationAttempts: number | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    nome: string | null
    email: string | null
    senha: string | null
    telefone: string | null
    tipo: $Enums.UserType | null
    plano: $Enums.Plano | null
    googleId: string | null
    avatar: string | null
    emailVerified: boolean | null
    authVersion: number | null
    verificationAttempts: number | null
    verificationCode: string | null
    verificationExpires: Date | null
    resetPasswordToken: string | null
    resetPasswordExpires: Date | null
    subscriptionId: string | null
    latestPaymentId: string | null
    subscriptionStatus: string | null
    planoExpiraEm: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    nome: string | null
    email: string | null
    senha: string | null
    telefone: string | null
    tipo: $Enums.UserType | null
    plano: $Enums.Plano | null
    googleId: string | null
    avatar: string | null
    emailVerified: boolean | null
    authVersion: number | null
    verificationAttempts: number | null
    verificationCode: string | null
    verificationExpires: Date | null
    resetPasswordToken: string | null
    resetPasswordExpires: Date | null
    subscriptionId: string | null
    latestPaymentId: string | null
    subscriptionStatus: string | null
    planoExpiraEm: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    nome: number
    email: number
    senha: number
    telefone: number
    tipo: number
    plano: number
    googleId: number
    avatar: number
    emailVerified: number
    authVersion: number
    verificationAttempts: number
    verificationCode: number
    verificationExpires: number
    resetPasswordToken: number
    resetPasswordExpires: number
    subscriptionId: number
    latestPaymentId: number
    subscriptionStatus: number
    planoExpiraEm: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    authVersion?: true
    verificationAttempts?: true
  }

  export type UserSumAggregateInputType = {
    authVersion?: true
    verificationAttempts?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    nome?: true
    email?: true
    senha?: true
    telefone?: true
    tipo?: true
    plano?: true
    googleId?: true
    avatar?: true
    emailVerified?: true
    authVersion?: true
    verificationAttempts?: true
    verificationCode?: true
    verificationExpires?: true
    resetPasswordToken?: true
    resetPasswordExpires?: true
    subscriptionId?: true
    latestPaymentId?: true
    subscriptionStatus?: true
    planoExpiraEm?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    nome?: true
    email?: true
    senha?: true
    telefone?: true
    tipo?: true
    plano?: true
    googleId?: true
    avatar?: true
    emailVerified?: true
    authVersion?: true
    verificationAttempts?: true
    verificationCode?: true
    verificationExpires?: true
    resetPasswordToken?: true
    resetPasswordExpires?: true
    subscriptionId?: true
    latestPaymentId?: true
    subscriptionStatus?: true
    planoExpiraEm?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    nome?: true
    email?: true
    senha?: true
    telefone?: true
    tipo?: true
    plano?: true
    googleId?: true
    avatar?: true
    emailVerified?: true
    authVersion?: true
    verificationAttempts?: true
    verificationCode?: true
    verificationExpires?: true
    resetPasswordToken?: true
    resetPasswordExpires?: true
    subscriptionId?: true
    latestPaymentId?: true
    subscriptionStatus?: true
    planoExpiraEm?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    nome: string
    email: string
    senha: string | null
    telefone: string | null
    tipo: $Enums.UserType
    plano: $Enums.Plano
    googleId: string | null
    avatar: string | null
    emailVerified: boolean
    authVersion: number
    verificationAttempts: number
    verificationCode: string | null
    verificationExpires: Date | null
    resetPasswordToken: string | null
    resetPasswordExpires: Date | null
    subscriptionId: string | null
    latestPaymentId: string | null
    subscriptionStatus: string | null
    planoExpiraEm: Date | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    email?: boolean
    senha?: boolean
    telefone?: boolean
    tipo?: boolean
    plano?: boolean
    googleId?: boolean
    avatar?: boolean
    emailVerified?: boolean
    authVersion?: boolean
    verificationAttempts?: boolean
    verificationCode?: boolean
    verificationExpires?: boolean
    resetPasswordToken?: boolean
    resetPasswordExpires?: boolean
    subscriptionId?: boolean
    latestPaymentId?: boolean
    subscriptionStatus?: boolean
    planoExpiraEm?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    barbearias?: boolean | User$barbeariasArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    email?: boolean
    senha?: boolean
    telefone?: boolean
    tipo?: boolean
    plano?: boolean
    googleId?: boolean
    avatar?: boolean
    emailVerified?: boolean
    authVersion?: boolean
    verificationAttempts?: boolean
    verificationCode?: boolean
    verificationExpires?: boolean
    resetPasswordToken?: boolean
    resetPasswordExpires?: boolean
    subscriptionId?: boolean
    latestPaymentId?: boolean
    subscriptionStatus?: boolean
    planoExpiraEm?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    email?: boolean
    senha?: boolean
    telefone?: boolean
    tipo?: boolean
    plano?: boolean
    googleId?: boolean
    avatar?: boolean
    emailVerified?: boolean
    authVersion?: boolean
    verificationAttempts?: boolean
    verificationCode?: boolean
    verificationExpires?: boolean
    resetPasswordToken?: boolean
    resetPasswordExpires?: boolean
    subscriptionId?: boolean
    latestPaymentId?: boolean
    subscriptionStatus?: boolean
    planoExpiraEm?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    nome?: boolean
    email?: boolean
    senha?: boolean
    telefone?: boolean
    tipo?: boolean
    plano?: boolean
    googleId?: boolean
    avatar?: boolean
    emailVerified?: boolean
    authVersion?: boolean
    verificationAttempts?: boolean
    verificationCode?: boolean
    verificationExpires?: boolean
    resetPasswordToken?: boolean
    resetPasswordExpires?: boolean
    subscriptionId?: boolean
    latestPaymentId?: boolean
    subscriptionStatus?: boolean
    planoExpiraEm?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nome" | "email" | "senha" | "telefone" | "tipo" | "plano" | "googleId" | "avatar" | "emailVerified" | "authVersion" | "verificationAttempts" | "verificationCode" | "verificationExpires" | "resetPasswordToken" | "resetPasswordExpires" | "subscriptionId" | "latestPaymentId" | "subscriptionStatus" | "planoExpiraEm" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    barbearias?: boolean | User$barbeariasArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      barbearias: Prisma.$BarbeariaPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nome: string
      email: string
      senha: string | null
      telefone: string | null
      tipo: $Enums.UserType
      plano: $Enums.Plano
      googleId: string | null
      avatar: string | null
      emailVerified: boolean
      authVersion: number
      verificationAttempts: number
      verificationCode: string | null
      verificationExpires: Date | null
      resetPasswordToken: string | null
      resetPasswordExpires: Date | null
      subscriptionId: string | null
      latestPaymentId: string | null
      subscriptionStatus: string | null
      planoExpiraEm: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    barbearias<T extends User$barbeariasArgs<ExtArgs> = {}>(args?: Subset<T, User$barbeariasArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BarbeariaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly nome: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly senha: FieldRef<"User", 'String'>
    readonly telefone: FieldRef<"User", 'String'>
    readonly tipo: FieldRef<"User", 'UserType'>
    readonly plano: FieldRef<"User", 'Plano'>
    readonly googleId: FieldRef<"User", 'String'>
    readonly avatar: FieldRef<"User", 'String'>
    readonly emailVerified: FieldRef<"User", 'Boolean'>
    readonly authVersion: FieldRef<"User", 'Int'>
    readonly verificationAttempts: FieldRef<"User", 'Int'>
    readonly verificationCode: FieldRef<"User", 'String'>
    readonly verificationExpires: FieldRef<"User", 'DateTime'>
    readonly resetPasswordToken: FieldRef<"User", 'String'>
    readonly resetPasswordExpires: FieldRef<"User", 'DateTime'>
    readonly subscriptionId: FieldRef<"User", 'String'>
    readonly latestPaymentId: FieldRef<"User", 'String'>
    readonly subscriptionStatus: FieldRef<"User", 'String'>
    readonly planoExpiraEm: FieldRef<"User", 'DateTime'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.barbearias
   */
  export type User$barbeariasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Barbearia
     */
    select?: BarbeariaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Barbearia
     */
    omit?: BarbeariaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BarbeariaInclude<ExtArgs> | null
    where?: BarbeariaWhereInput
    orderBy?: BarbeariaOrderByWithRelationInput | BarbeariaOrderByWithRelationInput[]
    cursor?: BarbeariaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BarbeariaScalarFieldEnum | BarbeariaScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Barbearia
   */

  export type AggregateBarbearia = {
    _count: BarbeariaCountAggregateOutputType | null
    _avg: BarbeariaAvgAggregateOutputType | null
    _sum: BarbeariaSumAggregateOutputType | null
    _min: BarbeariaMinAggregateOutputType | null
    _max: BarbeariaMaxAggregateOutputType | null
  }

  export type BarbeariaAvgAggregateOutputType = {
    latitude: number | null
    longitude: number | null
  }

  export type BarbeariaSumAggregateOutputType = {
    latitude: number | null
    longitude: number | null
  }

  export type BarbeariaMinAggregateOutputType = {
    id: string | null
    nome: string | null
    slug: string | null
    descricao: string | null
    endereco: string | null
    cidade: string | null
    estado: string | null
    cep: string | null
    pontoReferencia: string | null
    latitude: number | null
    longitude: number | null
    telefone: string | null
    whatsapp: string | null
    mensagemLembrete: string | null
    lembreteAtivo: boolean | null
    foto: string | null
    ownerId: string | null
    ativa: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BarbeariaMaxAggregateOutputType = {
    id: string | null
    nome: string | null
    slug: string | null
    descricao: string | null
    endereco: string | null
    cidade: string | null
    estado: string | null
    cep: string | null
    pontoReferencia: string | null
    latitude: number | null
    longitude: number | null
    telefone: string | null
    whatsapp: string | null
    mensagemLembrete: string | null
    lembreteAtivo: boolean | null
    foto: string | null
    ownerId: string | null
    ativa: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BarbeariaCountAggregateOutputType = {
    id: number
    nome: number
    slug: number
    descricao: number
    endereco: number
    cidade: number
    estado: number
    cep: number
    pontoReferencia: number
    latitude: number
    longitude: number
    telefone: number
    whatsapp: number
    mensagemLembrete: number
    lembreteAtivo: number
    foto: number
    fotos: number
    ownerId: number
    ativa: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type BarbeariaAvgAggregateInputType = {
    latitude?: true
    longitude?: true
  }

  export type BarbeariaSumAggregateInputType = {
    latitude?: true
    longitude?: true
  }

  export type BarbeariaMinAggregateInputType = {
    id?: true
    nome?: true
    slug?: true
    descricao?: true
    endereco?: true
    cidade?: true
    estado?: true
    cep?: true
    pontoReferencia?: true
    latitude?: true
    longitude?: true
    telefone?: true
    whatsapp?: true
    mensagemLembrete?: true
    lembreteAtivo?: true
    foto?: true
    ownerId?: true
    ativa?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BarbeariaMaxAggregateInputType = {
    id?: true
    nome?: true
    slug?: true
    descricao?: true
    endereco?: true
    cidade?: true
    estado?: true
    cep?: true
    pontoReferencia?: true
    latitude?: true
    longitude?: true
    telefone?: true
    whatsapp?: true
    mensagemLembrete?: true
    lembreteAtivo?: true
    foto?: true
    ownerId?: true
    ativa?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BarbeariaCountAggregateInputType = {
    id?: true
    nome?: true
    slug?: true
    descricao?: true
    endereco?: true
    cidade?: true
    estado?: true
    cep?: true
    pontoReferencia?: true
    latitude?: true
    longitude?: true
    telefone?: true
    whatsapp?: true
    mensagemLembrete?: true
    lembreteAtivo?: true
    foto?: true
    fotos?: true
    ownerId?: true
    ativa?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type BarbeariaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Barbearia to aggregate.
     */
    where?: BarbeariaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Barbearias to fetch.
     */
    orderBy?: BarbeariaOrderByWithRelationInput | BarbeariaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BarbeariaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Barbearias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Barbearias.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Barbearias
    **/
    _count?: true | BarbeariaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BarbeariaAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BarbeariaSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BarbeariaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BarbeariaMaxAggregateInputType
  }

  export type GetBarbeariaAggregateType<T extends BarbeariaAggregateArgs> = {
        [P in keyof T & keyof AggregateBarbearia]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBarbearia[P]>
      : GetScalarType<T[P], AggregateBarbearia[P]>
  }




  export type BarbeariaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BarbeariaWhereInput
    orderBy?: BarbeariaOrderByWithAggregationInput | BarbeariaOrderByWithAggregationInput[]
    by: BarbeariaScalarFieldEnum[] | BarbeariaScalarFieldEnum
    having?: BarbeariaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BarbeariaCountAggregateInputType | true
    _avg?: BarbeariaAvgAggregateInputType
    _sum?: BarbeariaSumAggregateInputType
    _min?: BarbeariaMinAggregateInputType
    _max?: BarbeariaMaxAggregateInputType
  }

  export type BarbeariaGroupByOutputType = {
    id: string
    nome: string
    slug: string
    descricao: string | null
    endereco: string
    cidade: string
    estado: string
    cep: string | null
    pontoReferencia: string | null
    latitude: number | null
    longitude: number | null
    telefone: string | null
    whatsapp: string | null
    mensagemLembrete: string | null
    lembreteAtivo: boolean
    foto: string | null
    fotos: string[]
    ownerId: string
    ativa: boolean
    createdAt: Date
    updatedAt: Date
    _count: BarbeariaCountAggregateOutputType | null
    _avg: BarbeariaAvgAggregateOutputType | null
    _sum: BarbeariaSumAggregateOutputType | null
    _min: BarbeariaMinAggregateOutputType | null
    _max: BarbeariaMaxAggregateOutputType | null
  }

  type GetBarbeariaGroupByPayload<T extends BarbeariaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BarbeariaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BarbeariaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BarbeariaGroupByOutputType[P]>
            : GetScalarType<T[P], BarbeariaGroupByOutputType[P]>
        }
      >
    >


  export type BarbeariaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    slug?: boolean
    descricao?: boolean
    endereco?: boolean
    cidade?: boolean
    estado?: boolean
    cep?: boolean
    pontoReferencia?: boolean
    latitude?: boolean
    longitude?: boolean
    telefone?: boolean
    whatsapp?: boolean
    mensagemLembrete?: boolean
    lembreteAtivo?: boolean
    foto?: boolean
    fotos?: boolean
    ownerId?: boolean
    ativa?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    owner?: boolean | UserDefaultArgs<ExtArgs>
    barbeiros?: boolean | Barbearia$barbeirosArgs<ExtArgs>
    servicos?: boolean | Barbearia$servicosArgs<ExtArgs>
    _count?: boolean | BarbeariaCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["barbearia"]>

  export type BarbeariaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    slug?: boolean
    descricao?: boolean
    endereco?: boolean
    cidade?: boolean
    estado?: boolean
    cep?: boolean
    pontoReferencia?: boolean
    latitude?: boolean
    longitude?: boolean
    telefone?: boolean
    whatsapp?: boolean
    mensagemLembrete?: boolean
    lembreteAtivo?: boolean
    foto?: boolean
    fotos?: boolean
    ownerId?: boolean
    ativa?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["barbearia"]>

  export type BarbeariaSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    slug?: boolean
    descricao?: boolean
    endereco?: boolean
    cidade?: boolean
    estado?: boolean
    cep?: boolean
    pontoReferencia?: boolean
    latitude?: boolean
    longitude?: boolean
    telefone?: boolean
    whatsapp?: boolean
    mensagemLembrete?: boolean
    lembreteAtivo?: boolean
    foto?: boolean
    fotos?: boolean
    ownerId?: boolean
    ativa?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["barbearia"]>

  export type BarbeariaSelectScalar = {
    id?: boolean
    nome?: boolean
    slug?: boolean
    descricao?: boolean
    endereco?: boolean
    cidade?: boolean
    estado?: boolean
    cep?: boolean
    pontoReferencia?: boolean
    latitude?: boolean
    longitude?: boolean
    telefone?: boolean
    whatsapp?: boolean
    mensagemLembrete?: boolean
    lembreteAtivo?: boolean
    foto?: boolean
    fotos?: boolean
    ownerId?: boolean
    ativa?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type BarbeariaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nome" | "slug" | "descricao" | "endereco" | "cidade" | "estado" | "cep" | "pontoReferencia" | "latitude" | "longitude" | "telefone" | "whatsapp" | "mensagemLembrete" | "lembreteAtivo" | "foto" | "fotos" | "ownerId" | "ativa" | "createdAt" | "updatedAt", ExtArgs["result"]["barbearia"]>
  export type BarbeariaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | UserDefaultArgs<ExtArgs>
    barbeiros?: boolean | Barbearia$barbeirosArgs<ExtArgs>
    servicos?: boolean | Barbearia$servicosArgs<ExtArgs>
    _count?: boolean | BarbeariaCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type BarbeariaIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type BarbeariaIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $BarbeariaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Barbearia"
    objects: {
      owner: Prisma.$UserPayload<ExtArgs>
      barbeiros: Prisma.$BarbeiroPayload<ExtArgs>[]
      servicos: Prisma.$ServicoPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nome: string
      slug: string
      descricao: string | null
      endereco: string
      cidade: string
      estado: string
      cep: string | null
      pontoReferencia: string | null
      latitude: number | null
      longitude: number | null
      telefone: string | null
      whatsapp: string | null
      mensagemLembrete: string | null
      lembreteAtivo: boolean
      foto: string | null
      fotos: string[]
      ownerId: string
      ativa: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["barbearia"]>
    composites: {}
  }

  type BarbeariaGetPayload<S extends boolean | null | undefined | BarbeariaDefaultArgs> = $Result.GetResult<Prisma.$BarbeariaPayload, S>

  type BarbeariaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BarbeariaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BarbeariaCountAggregateInputType | true
    }

  export interface BarbeariaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Barbearia'], meta: { name: 'Barbearia' } }
    /**
     * Find zero or one Barbearia that matches the filter.
     * @param {BarbeariaFindUniqueArgs} args - Arguments to find a Barbearia
     * @example
     * // Get one Barbearia
     * const barbearia = await prisma.barbearia.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BarbeariaFindUniqueArgs>(args: SelectSubset<T, BarbeariaFindUniqueArgs<ExtArgs>>): Prisma__BarbeariaClient<$Result.GetResult<Prisma.$BarbeariaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Barbearia that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BarbeariaFindUniqueOrThrowArgs} args - Arguments to find a Barbearia
     * @example
     * // Get one Barbearia
     * const barbearia = await prisma.barbearia.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BarbeariaFindUniqueOrThrowArgs>(args: SelectSubset<T, BarbeariaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BarbeariaClient<$Result.GetResult<Prisma.$BarbeariaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Barbearia that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BarbeariaFindFirstArgs} args - Arguments to find a Barbearia
     * @example
     * // Get one Barbearia
     * const barbearia = await prisma.barbearia.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BarbeariaFindFirstArgs>(args?: SelectSubset<T, BarbeariaFindFirstArgs<ExtArgs>>): Prisma__BarbeariaClient<$Result.GetResult<Prisma.$BarbeariaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Barbearia that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BarbeariaFindFirstOrThrowArgs} args - Arguments to find a Barbearia
     * @example
     * // Get one Barbearia
     * const barbearia = await prisma.barbearia.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BarbeariaFindFirstOrThrowArgs>(args?: SelectSubset<T, BarbeariaFindFirstOrThrowArgs<ExtArgs>>): Prisma__BarbeariaClient<$Result.GetResult<Prisma.$BarbeariaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Barbearias that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BarbeariaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Barbearias
     * const barbearias = await prisma.barbearia.findMany()
     * 
     * // Get first 10 Barbearias
     * const barbearias = await prisma.barbearia.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const barbeariaWithIdOnly = await prisma.barbearia.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BarbeariaFindManyArgs>(args?: SelectSubset<T, BarbeariaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BarbeariaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Barbearia.
     * @param {BarbeariaCreateArgs} args - Arguments to create a Barbearia.
     * @example
     * // Create one Barbearia
     * const Barbearia = await prisma.barbearia.create({
     *   data: {
     *     // ... data to create a Barbearia
     *   }
     * })
     * 
     */
    create<T extends BarbeariaCreateArgs>(args: SelectSubset<T, BarbeariaCreateArgs<ExtArgs>>): Prisma__BarbeariaClient<$Result.GetResult<Prisma.$BarbeariaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Barbearias.
     * @param {BarbeariaCreateManyArgs} args - Arguments to create many Barbearias.
     * @example
     * // Create many Barbearias
     * const barbearia = await prisma.barbearia.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BarbeariaCreateManyArgs>(args?: SelectSubset<T, BarbeariaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Barbearias and returns the data saved in the database.
     * @param {BarbeariaCreateManyAndReturnArgs} args - Arguments to create many Barbearias.
     * @example
     * // Create many Barbearias
     * const barbearia = await prisma.barbearia.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Barbearias and only return the `id`
     * const barbeariaWithIdOnly = await prisma.barbearia.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BarbeariaCreateManyAndReturnArgs>(args?: SelectSubset<T, BarbeariaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BarbeariaPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Barbearia.
     * @param {BarbeariaDeleteArgs} args - Arguments to delete one Barbearia.
     * @example
     * // Delete one Barbearia
     * const Barbearia = await prisma.barbearia.delete({
     *   where: {
     *     // ... filter to delete one Barbearia
     *   }
     * })
     * 
     */
    delete<T extends BarbeariaDeleteArgs>(args: SelectSubset<T, BarbeariaDeleteArgs<ExtArgs>>): Prisma__BarbeariaClient<$Result.GetResult<Prisma.$BarbeariaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Barbearia.
     * @param {BarbeariaUpdateArgs} args - Arguments to update one Barbearia.
     * @example
     * // Update one Barbearia
     * const barbearia = await prisma.barbearia.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BarbeariaUpdateArgs>(args: SelectSubset<T, BarbeariaUpdateArgs<ExtArgs>>): Prisma__BarbeariaClient<$Result.GetResult<Prisma.$BarbeariaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Barbearias.
     * @param {BarbeariaDeleteManyArgs} args - Arguments to filter Barbearias to delete.
     * @example
     * // Delete a few Barbearias
     * const { count } = await prisma.barbearia.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BarbeariaDeleteManyArgs>(args?: SelectSubset<T, BarbeariaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Barbearias.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BarbeariaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Barbearias
     * const barbearia = await prisma.barbearia.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BarbeariaUpdateManyArgs>(args: SelectSubset<T, BarbeariaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Barbearias and returns the data updated in the database.
     * @param {BarbeariaUpdateManyAndReturnArgs} args - Arguments to update many Barbearias.
     * @example
     * // Update many Barbearias
     * const barbearia = await prisma.barbearia.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Barbearias and only return the `id`
     * const barbeariaWithIdOnly = await prisma.barbearia.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BarbeariaUpdateManyAndReturnArgs>(args: SelectSubset<T, BarbeariaUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BarbeariaPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Barbearia.
     * @param {BarbeariaUpsertArgs} args - Arguments to update or create a Barbearia.
     * @example
     * // Update or create a Barbearia
     * const barbearia = await prisma.barbearia.upsert({
     *   create: {
     *     // ... data to create a Barbearia
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Barbearia we want to update
     *   }
     * })
     */
    upsert<T extends BarbeariaUpsertArgs>(args: SelectSubset<T, BarbeariaUpsertArgs<ExtArgs>>): Prisma__BarbeariaClient<$Result.GetResult<Prisma.$BarbeariaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Barbearias.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BarbeariaCountArgs} args - Arguments to filter Barbearias to count.
     * @example
     * // Count the number of Barbearias
     * const count = await prisma.barbearia.count({
     *   where: {
     *     // ... the filter for the Barbearias we want to count
     *   }
     * })
    **/
    count<T extends BarbeariaCountArgs>(
      args?: Subset<T, BarbeariaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BarbeariaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Barbearia.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BarbeariaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BarbeariaAggregateArgs>(args: Subset<T, BarbeariaAggregateArgs>): Prisma.PrismaPromise<GetBarbeariaAggregateType<T>>

    /**
     * Group by Barbearia.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BarbeariaGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BarbeariaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BarbeariaGroupByArgs['orderBy'] }
        : { orderBy?: BarbeariaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BarbeariaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBarbeariaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Barbearia model
   */
  readonly fields: BarbeariaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Barbearia.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BarbeariaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    owner<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    barbeiros<T extends Barbearia$barbeirosArgs<ExtArgs> = {}>(args?: Subset<T, Barbearia$barbeirosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BarbeiroPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    servicos<T extends Barbearia$servicosArgs<ExtArgs> = {}>(args?: Subset<T, Barbearia$servicosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServicoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Barbearia model
   */
  interface BarbeariaFieldRefs {
    readonly id: FieldRef<"Barbearia", 'String'>
    readonly nome: FieldRef<"Barbearia", 'String'>
    readonly slug: FieldRef<"Barbearia", 'String'>
    readonly descricao: FieldRef<"Barbearia", 'String'>
    readonly endereco: FieldRef<"Barbearia", 'String'>
    readonly cidade: FieldRef<"Barbearia", 'String'>
    readonly estado: FieldRef<"Barbearia", 'String'>
    readonly cep: FieldRef<"Barbearia", 'String'>
    readonly pontoReferencia: FieldRef<"Barbearia", 'String'>
    readonly latitude: FieldRef<"Barbearia", 'Float'>
    readonly longitude: FieldRef<"Barbearia", 'Float'>
    readonly telefone: FieldRef<"Barbearia", 'String'>
    readonly whatsapp: FieldRef<"Barbearia", 'String'>
    readonly mensagemLembrete: FieldRef<"Barbearia", 'String'>
    readonly lembreteAtivo: FieldRef<"Barbearia", 'Boolean'>
    readonly foto: FieldRef<"Barbearia", 'String'>
    readonly fotos: FieldRef<"Barbearia", 'String[]'>
    readonly ownerId: FieldRef<"Barbearia", 'String'>
    readonly ativa: FieldRef<"Barbearia", 'Boolean'>
    readonly createdAt: FieldRef<"Barbearia", 'DateTime'>
    readonly updatedAt: FieldRef<"Barbearia", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Barbearia findUnique
   */
  export type BarbeariaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Barbearia
     */
    select?: BarbeariaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Barbearia
     */
    omit?: BarbeariaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BarbeariaInclude<ExtArgs> | null
    /**
     * Filter, which Barbearia to fetch.
     */
    where: BarbeariaWhereUniqueInput
  }

  /**
   * Barbearia findUniqueOrThrow
   */
  export type BarbeariaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Barbearia
     */
    select?: BarbeariaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Barbearia
     */
    omit?: BarbeariaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BarbeariaInclude<ExtArgs> | null
    /**
     * Filter, which Barbearia to fetch.
     */
    where: BarbeariaWhereUniqueInput
  }

  /**
   * Barbearia findFirst
   */
  export type BarbeariaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Barbearia
     */
    select?: BarbeariaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Barbearia
     */
    omit?: BarbeariaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BarbeariaInclude<ExtArgs> | null
    /**
     * Filter, which Barbearia to fetch.
     */
    where?: BarbeariaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Barbearias to fetch.
     */
    orderBy?: BarbeariaOrderByWithRelationInput | BarbeariaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Barbearias.
     */
    cursor?: BarbeariaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Barbearias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Barbearias.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Barbearias.
     */
    distinct?: BarbeariaScalarFieldEnum | BarbeariaScalarFieldEnum[]
  }

  /**
   * Barbearia findFirstOrThrow
   */
  export type BarbeariaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Barbearia
     */
    select?: BarbeariaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Barbearia
     */
    omit?: BarbeariaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BarbeariaInclude<ExtArgs> | null
    /**
     * Filter, which Barbearia to fetch.
     */
    where?: BarbeariaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Barbearias to fetch.
     */
    orderBy?: BarbeariaOrderByWithRelationInput | BarbeariaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Barbearias.
     */
    cursor?: BarbeariaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Barbearias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Barbearias.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Barbearias.
     */
    distinct?: BarbeariaScalarFieldEnum | BarbeariaScalarFieldEnum[]
  }

  /**
   * Barbearia findMany
   */
  export type BarbeariaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Barbearia
     */
    select?: BarbeariaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Barbearia
     */
    omit?: BarbeariaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BarbeariaInclude<ExtArgs> | null
    /**
     * Filter, which Barbearias to fetch.
     */
    where?: BarbeariaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Barbearias to fetch.
     */
    orderBy?: BarbeariaOrderByWithRelationInput | BarbeariaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Barbearias.
     */
    cursor?: BarbeariaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Barbearias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Barbearias.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Barbearias.
     */
    distinct?: BarbeariaScalarFieldEnum | BarbeariaScalarFieldEnum[]
  }

  /**
   * Barbearia create
   */
  export type BarbeariaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Barbearia
     */
    select?: BarbeariaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Barbearia
     */
    omit?: BarbeariaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BarbeariaInclude<ExtArgs> | null
    /**
     * The data needed to create a Barbearia.
     */
    data: XOR<BarbeariaCreateInput, BarbeariaUncheckedCreateInput>
  }

  /**
   * Barbearia createMany
   */
  export type BarbeariaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Barbearias.
     */
    data: BarbeariaCreateManyInput | BarbeariaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Barbearia createManyAndReturn
   */
  export type BarbeariaCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Barbearia
     */
    select?: BarbeariaSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Barbearia
     */
    omit?: BarbeariaOmit<ExtArgs> | null
    /**
     * The data used to create many Barbearias.
     */
    data: BarbeariaCreateManyInput | BarbeariaCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BarbeariaIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Barbearia update
   */
  export type BarbeariaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Barbearia
     */
    select?: BarbeariaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Barbearia
     */
    omit?: BarbeariaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BarbeariaInclude<ExtArgs> | null
    /**
     * The data needed to update a Barbearia.
     */
    data: XOR<BarbeariaUpdateInput, BarbeariaUncheckedUpdateInput>
    /**
     * Choose, which Barbearia to update.
     */
    where: BarbeariaWhereUniqueInput
  }

  /**
   * Barbearia updateMany
   */
  export type BarbeariaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Barbearias.
     */
    data: XOR<BarbeariaUpdateManyMutationInput, BarbeariaUncheckedUpdateManyInput>
    /**
     * Filter which Barbearias to update
     */
    where?: BarbeariaWhereInput
    /**
     * Limit how many Barbearias to update.
     */
    limit?: number
  }

  /**
   * Barbearia updateManyAndReturn
   */
  export type BarbeariaUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Barbearia
     */
    select?: BarbeariaSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Barbearia
     */
    omit?: BarbeariaOmit<ExtArgs> | null
    /**
     * The data used to update Barbearias.
     */
    data: XOR<BarbeariaUpdateManyMutationInput, BarbeariaUncheckedUpdateManyInput>
    /**
     * Filter which Barbearias to update
     */
    where?: BarbeariaWhereInput
    /**
     * Limit how many Barbearias to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BarbeariaIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Barbearia upsert
   */
  export type BarbeariaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Barbearia
     */
    select?: BarbeariaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Barbearia
     */
    omit?: BarbeariaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BarbeariaInclude<ExtArgs> | null
    /**
     * The filter to search for the Barbearia to update in case it exists.
     */
    where: BarbeariaWhereUniqueInput
    /**
     * In case the Barbearia found by the `where` argument doesn't exist, create a new Barbearia with this data.
     */
    create: XOR<BarbeariaCreateInput, BarbeariaUncheckedCreateInput>
    /**
     * In case the Barbearia was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BarbeariaUpdateInput, BarbeariaUncheckedUpdateInput>
  }

  /**
   * Barbearia delete
   */
  export type BarbeariaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Barbearia
     */
    select?: BarbeariaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Barbearia
     */
    omit?: BarbeariaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BarbeariaInclude<ExtArgs> | null
    /**
     * Filter which Barbearia to delete.
     */
    where: BarbeariaWhereUniqueInput
  }

  /**
   * Barbearia deleteMany
   */
  export type BarbeariaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Barbearias to delete
     */
    where?: BarbeariaWhereInput
    /**
     * Limit how many Barbearias to delete.
     */
    limit?: number
  }

  /**
   * Barbearia.barbeiros
   */
  export type Barbearia$barbeirosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Barbeiro
     */
    select?: BarbeiroSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Barbeiro
     */
    omit?: BarbeiroOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BarbeiroInclude<ExtArgs> | null
    where?: BarbeiroWhereInput
    orderBy?: BarbeiroOrderByWithRelationInput | BarbeiroOrderByWithRelationInput[]
    cursor?: BarbeiroWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BarbeiroScalarFieldEnum | BarbeiroScalarFieldEnum[]
  }

  /**
   * Barbearia.servicos
   */
  export type Barbearia$servicosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Servico
     */
    select?: ServicoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Servico
     */
    omit?: ServicoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServicoInclude<ExtArgs> | null
    where?: ServicoWhereInput
    orderBy?: ServicoOrderByWithRelationInput | ServicoOrderByWithRelationInput[]
    cursor?: ServicoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ServicoScalarFieldEnum | ServicoScalarFieldEnum[]
  }

  /**
   * Barbearia without action
   */
  export type BarbeariaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Barbearia
     */
    select?: BarbeariaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Barbearia
     */
    omit?: BarbeariaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BarbeariaInclude<ExtArgs> | null
  }


  /**
   * Model Barbeiro
   */

  export type AggregateBarbeiro = {
    _count: BarbeiroCountAggregateOutputType | null
    _min: BarbeiroMinAggregateOutputType | null
    _max: BarbeiroMaxAggregateOutputType | null
  }

  export type BarbeiroMinAggregateOutputType = {
    id: string | null
    nome: string | null
    foto: string | null
    barbeariaId: string | null
    ativo: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BarbeiroMaxAggregateOutputType = {
    id: string | null
    nome: string | null
    foto: string | null
    barbeariaId: string | null
    ativo: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BarbeiroCountAggregateOutputType = {
    id: number
    nome: number
    foto: number
    barbeariaId: number
    ativo: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type BarbeiroMinAggregateInputType = {
    id?: true
    nome?: true
    foto?: true
    barbeariaId?: true
    ativo?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BarbeiroMaxAggregateInputType = {
    id?: true
    nome?: true
    foto?: true
    barbeariaId?: true
    ativo?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BarbeiroCountAggregateInputType = {
    id?: true
    nome?: true
    foto?: true
    barbeariaId?: true
    ativo?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type BarbeiroAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Barbeiro to aggregate.
     */
    where?: BarbeiroWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Barbeiros to fetch.
     */
    orderBy?: BarbeiroOrderByWithRelationInput | BarbeiroOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BarbeiroWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Barbeiros from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Barbeiros.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Barbeiros
    **/
    _count?: true | BarbeiroCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BarbeiroMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BarbeiroMaxAggregateInputType
  }

  export type GetBarbeiroAggregateType<T extends BarbeiroAggregateArgs> = {
        [P in keyof T & keyof AggregateBarbeiro]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBarbeiro[P]>
      : GetScalarType<T[P], AggregateBarbeiro[P]>
  }




  export type BarbeiroGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BarbeiroWhereInput
    orderBy?: BarbeiroOrderByWithAggregationInput | BarbeiroOrderByWithAggregationInput[]
    by: BarbeiroScalarFieldEnum[] | BarbeiroScalarFieldEnum
    having?: BarbeiroScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BarbeiroCountAggregateInputType | true
    _min?: BarbeiroMinAggregateInputType
    _max?: BarbeiroMaxAggregateInputType
  }

  export type BarbeiroGroupByOutputType = {
    id: string
    nome: string
    foto: string | null
    barbeariaId: string
    ativo: boolean
    createdAt: Date
    updatedAt: Date
    _count: BarbeiroCountAggregateOutputType | null
    _min: BarbeiroMinAggregateOutputType | null
    _max: BarbeiroMaxAggregateOutputType | null
  }

  type GetBarbeiroGroupByPayload<T extends BarbeiroGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BarbeiroGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BarbeiroGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BarbeiroGroupByOutputType[P]>
            : GetScalarType<T[P], BarbeiroGroupByOutputType[P]>
        }
      >
    >


  export type BarbeiroSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    foto?: boolean
    barbeariaId?: boolean
    ativo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    barbearia?: boolean | BarbeariaDefaultArgs<ExtArgs>
    servicos?: boolean | Barbeiro$servicosArgs<ExtArgs>
    horarios?: boolean | Barbeiro$horariosArgs<ExtArgs>
    _count?: boolean | BarbeiroCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["barbeiro"]>

  export type BarbeiroSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    foto?: boolean
    barbeariaId?: boolean
    ativo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    barbearia?: boolean | BarbeariaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["barbeiro"]>

  export type BarbeiroSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    foto?: boolean
    barbeariaId?: boolean
    ativo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    barbearia?: boolean | BarbeariaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["barbeiro"]>

  export type BarbeiroSelectScalar = {
    id?: boolean
    nome?: boolean
    foto?: boolean
    barbeariaId?: boolean
    ativo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type BarbeiroOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nome" | "foto" | "barbeariaId" | "ativo" | "createdAt" | "updatedAt", ExtArgs["result"]["barbeiro"]>
  export type BarbeiroInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    barbearia?: boolean | BarbeariaDefaultArgs<ExtArgs>
    servicos?: boolean | Barbeiro$servicosArgs<ExtArgs>
    horarios?: boolean | Barbeiro$horariosArgs<ExtArgs>
    _count?: boolean | BarbeiroCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type BarbeiroIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    barbearia?: boolean | BarbeariaDefaultArgs<ExtArgs>
  }
  export type BarbeiroIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    barbearia?: boolean | BarbeariaDefaultArgs<ExtArgs>
  }

  export type $BarbeiroPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Barbeiro"
    objects: {
      barbearia: Prisma.$BarbeariaPayload<ExtArgs>
      servicos: Prisma.$ServicoPayload<ExtArgs>[]
      horarios: Prisma.$HorarioDisponivelPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nome: string
      foto: string | null
      barbeariaId: string
      ativo: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["barbeiro"]>
    composites: {}
  }

  type BarbeiroGetPayload<S extends boolean | null | undefined | BarbeiroDefaultArgs> = $Result.GetResult<Prisma.$BarbeiroPayload, S>

  type BarbeiroCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BarbeiroFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BarbeiroCountAggregateInputType | true
    }

  export interface BarbeiroDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Barbeiro'], meta: { name: 'Barbeiro' } }
    /**
     * Find zero or one Barbeiro that matches the filter.
     * @param {BarbeiroFindUniqueArgs} args - Arguments to find a Barbeiro
     * @example
     * // Get one Barbeiro
     * const barbeiro = await prisma.barbeiro.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BarbeiroFindUniqueArgs>(args: SelectSubset<T, BarbeiroFindUniqueArgs<ExtArgs>>): Prisma__BarbeiroClient<$Result.GetResult<Prisma.$BarbeiroPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Barbeiro that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BarbeiroFindUniqueOrThrowArgs} args - Arguments to find a Barbeiro
     * @example
     * // Get one Barbeiro
     * const barbeiro = await prisma.barbeiro.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BarbeiroFindUniqueOrThrowArgs>(args: SelectSubset<T, BarbeiroFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BarbeiroClient<$Result.GetResult<Prisma.$BarbeiroPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Barbeiro that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BarbeiroFindFirstArgs} args - Arguments to find a Barbeiro
     * @example
     * // Get one Barbeiro
     * const barbeiro = await prisma.barbeiro.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BarbeiroFindFirstArgs>(args?: SelectSubset<T, BarbeiroFindFirstArgs<ExtArgs>>): Prisma__BarbeiroClient<$Result.GetResult<Prisma.$BarbeiroPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Barbeiro that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BarbeiroFindFirstOrThrowArgs} args - Arguments to find a Barbeiro
     * @example
     * // Get one Barbeiro
     * const barbeiro = await prisma.barbeiro.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BarbeiroFindFirstOrThrowArgs>(args?: SelectSubset<T, BarbeiroFindFirstOrThrowArgs<ExtArgs>>): Prisma__BarbeiroClient<$Result.GetResult<Prisma.$BarbeiroPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Barbeiros that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BarbeiroFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Barbeiros
     * const barbeiros = await prisma.barbeiro.findMany()
     * 
     * // Get first 10 Barbeiros
     * const barbeiros = await prisma.barbeiro.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const barbeiroWithIdOnly = await prisma.barbeiro.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BarbeiroFindManyArgs>(args?: SelectSubset<T, BarbeiroFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BarbeiroPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Barbeiro.
     * @param {BarbeiroCreateArgs} args - Arguments to create a Barbeiro.
     * @example
     * // Create one Barbeiro
     * const Barbeiro = await prisma.barbeiro.create({
     *   data: {
     *     // ... data to create a Barbeiro
     *   }
     * })
     * 
     */
    create<T extends BarbeiroCreateArgs>(args: SelectSubset<T, BarbeiroCreateArgs<ExtArgs>>): Prisma__BarbeiroClient<$Result.GetResult<Prisma.$BarbeiroPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Barbeiros.
     * @param {BarbeiroCreateManyArgs} args - Arguments to create many Barbeiros.
     * @example
     * // Create many Barbeiros
     * const barbeiro = await prisma.barbeiro.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BarbeiroCreateManyArgs>(args?: SelectSubset<T, BarbeiroCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Barbeiros and returns the data saved in the database.
     * @param {BarbeiroCreateManyAndReturnArgs} args - Arguments to create many Barbeiros.
     * @example
     * // Create many Barbeiros
     * const barbeiro = await prisma.barbeiro.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Barbeiros and only return the `id`
     * const barbeiroWithIdOnly = await prisma.barbeiro.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BarbeiroCreateManyAndReturnArgs>(args?: SelectSubset<T, BarbeiroCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BarbeiroPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Barbeiro.
     * @param {BarbeiroDeleteArgs} args - Arguments to delete one Barbeiro.
     * @example
     * // Delete one Barbeiro
     * const Barbeiro = await prisma.barbeiro.delete({
     *   where: {
     *     // ... filter to delete one Barbeiro
     *   }
     * })
     * 
     */
    delete<T extends BarbeiroDeleteArgs>(args: SelectSubset<T, BarbeiroDeleteArgs<ExtArgs>>): Prisma__BarbeiroClient<$Result.GetResult<Prisma.$BarbeiroPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Barbeiro.
     * @param {BarbeiroUpdateArgs} args - Arguments to update one Barbeiro.
     * @example
     * // Update one Barbeiro
     * const barbeiro = await prisma.barbeiro.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BarbeiroUpdateArgs>(args: SelectSubset<T, BarbeiroUpdateArgs<ExtArgs>>): Prisma__BarbeiroClient<$Result.GetResult<Prisma.$BarbeiroPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Barbeiros.
     * @param {BarbeiroDeleteManyArgs} args - Arguments to filter Barbeiros to delete.
     * @example
     * // Delete a few Barbeiros
     * const { count } = await prisma.barbeiro.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BarbeiroDeleteManyArgs>(args?: SelectSubset<T, BarbeiroDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Barbeiros.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BarbeiroUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Barbeiros
     * const barbeiro = await prisma.barbeiro.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BarbeiroUpdateManyArgs>(args: SelectSubset<T, BarbeiroUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Barbeiros and returns the data updated in the database.
     * @param {BarbeiroUpdateManyAndReturnArgs} args - Arguments to update many Barbeiros.
     * @example
     * // Update many Barbeiros
     * const barbeiro = await prisma.barbeiro.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Barbeiros and only return the `id`
     * const barbeiroWithIdOnly = await prisma.barbeiro.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BarbeiroUpdateManyAndReturnArgs>(args: SelectSubset<T, BarbeiroUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BarbeiroPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Barbeiro.
     * @param {BarbeiroUpsertArgs} args - Arguments to update or create a Barbeiro.
     * @example
     * // Update or create a Barbeiro
     * const barbeiro = await prisma.barbeiro.upsert({
     *   create: {
     *     // ... data to create a Barbeiro
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Barbeiro we want to update
     *   }
     * })
     */
    upsert<T extends BarbeiroUpsertArgs>(args: SelectSubset<T, BarbeiroUpsertArgs<ExtArgs>>): Prisma__BarbeiroClient<$Result.GetResult<Prisma.$BarbeiroPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Barbeiros.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BarbeiroCountArgs} args - Arguments to filter Barbeiros to count.
     * @example
     * // Count the number of Barbeiros
     * const count = await prisma.barbeiro.count({
     *   where: {
     *     // ... the filter for the Barbeiros we want to count
     *   }
     * })
    **/
    count<T extends BarbeiroCountArgs>(
      args?: Subset<T, BarbeiroCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BarbeiroCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Barbeiro.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BarbeiroAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BarbeiroAggregateArgs>(args: Subset<T, BarbeiroAggregateArgs>): Prisma.PrismaPromise<GetBarbeiroAggregateType<T>>

    /**
     * Group by Barbeiro.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BarbeiroGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BarbeiroGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BarbeiroGroupByArgs['orderBy'] }
        : { orderBy?: BarbeiroGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BarbeiroGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBarbeiroGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Barbeiro model
   */
  readonly fields: BarbeiroFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Barbeiro.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BarbeiroClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    barbearia<T extends BarbeariaDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BarbeariaDefaultArgs<ExtArgs>>): Prisma__BarbeariaClient<$Result.GetResult<Prisma.$BarbeariaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    servicos<T extends Barbeiro$servicosArgs<ExtArgs> = {}>(args?: Subset<T, Barbeiro$servicosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServicoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    horarios<T extends Barbeiro$horariosArgs<ExtArgs> = {}>(args?: Subset<T, Barbeiro$horariosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HorarioDisponivelPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Barbeiro model
   */
  interface BarbeiroFieldRefs {
    readonly id: FieldRef<"Barbeiro", 'String'>
    readonly nome: FieldRef<"Barbeiro", 'String'>
    readonly foto: FieldRef<"Barbeiro", 'String'>
    readonly barbeariaId: FieldRef<"Barbeiro", 'String'>
    readonly ativo: FieldRef<"Barbeiro", 'Boolean'>
    readonly createdAt: FieldRef<"Barbeiro", 'DateTime'>
    readonly updatedAt: FieldRef<"Barbeiro", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Barbeiro findUnique
   */
  export type BarbeiroFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Barbeiro
     */
    select?: BarbeiroSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Barbeiro
     */
    omit?: BarbeiroOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BarbeiroInclude<ExtArgs> | null
    /**
     * Filter, which Barbeiro to fetch.
     */
    where: BarbeiroWhereUniqueInput
  }

  /**
   * Barbeiro findUniqueOrThrow
   */
  export type BarbeiroFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Barbeiro
     */
    select?: BarbeiroSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Barbeiro
     */
    omit?: BarbeiroOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BarbeiroInclude<ExtArgs> | null
    /**
     * Filter, which Barbeiro to fetch.
     */
    where: BarbeiroWhereUniqueInput
  }

  /**
   * Barbeiro findFirst
   */
  export type BarbeiroFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Barbeiro
     */
    select?: BarbeiroSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Barbeiro
     */
    omit?: BarbeiroOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BarbeiroInclude<ExtArgs> | null
    /**
     * Filter, which Barbeiro to fetch.
     */
    where?: BarbeiroWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Barbeiros to fetch.
     */
    orderBy?: BarbeiroOrderByWithRelationInput | BarbeiroOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Barbeiros.
     */
    cursor?: BarbeiroWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Barbeiros from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Barbeiros.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Barbeiros.
     */
    distinct?: BarbeiroScalarFieldEnum | BarbeiroScalarFieldEnum[]
  }

  /**
   * Barbeiro findFirstOrThrow
   */
  export type BarbeiroFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Barbeiro
     */
    select?: BarbeiroSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Barbeiro
     */
    omit?: BarbeiroOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BarbeiroInclude<ExtArgs> | null
    /**
     * Filter, which Barbeiro to fetch.
     */
    where?: BarbeiroWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Barbeiros to fetch.
     */
    orderBy?: BarbeiroOrderByWithRelationInput | BarbeiroOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Barbeiros.
     */
    cursor?: BarbeiroWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Barbeiros from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Barbeiros.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Barbeiros.
     */
    distinct?: BarbeiroScalarFieldEnum | BarbeiroScalarFieldEnum[]
  }

  /**
   * Barbeiro findMany
   */
  export type BarbeiroFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Barbeiro
     */
    select?: BarbeiroSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Barbeiro
     */
    omit?: BarbeiroOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BarbeiroInclude<ExtArgs> | null
    /**
     * Filter, which Barbeiros to fetch.
     */
    where?: BarbeiroWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Barbeiros to fetch.
     */
    orderBy?: BarbeiroOrderByWithRelationInput | BarbeiroOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Barbeiros.
     */
    cursor?: BarbeiroWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Barbeiros from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Barbeiros.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Barbeiros.
     */
    distinct?: BarbeiroScalarFieldEnum | BarbeiroScalarFieldEnum[]
  }

  /**
   * Barbeiro create
   */
  export type BarbeiroCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Barbeiro
     */
    select?: BarbeiroSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Barbeiro
     */
    omit?: BarbeiroOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BarbeiroInclude<ExtArgs> | null
    /**
     * The data needed to create a Barbeiro.
     */
    data: XOR<BarbeiroCreateInput, BarbeiroUncheckedCreateInput>
  }

  /**
   * Barbeiro createMany
   */
  export type BarbeiroCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Barbeiros.
     */
    data: BarbeiroCreateManyInput | BarbeiroCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Barbeiro createManyAndReturn
   */
  export type BarbeiroCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Barbeiro
     */
    select?: BarbeiroSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Barbeiro
     */
    omit?: BarbeiroOmit<ExtArgs> | null
    /**
     * The data used to create many Barbeiros.
     */
    data: BarbeiroCreateManyInput | BarbeiroCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BarbeiroIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Barbeiro update
   */
  export type BarbeiroUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Barbeiro
     */
    select?: BarbeiroSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Barbeiro
     */
    omit?: BarbeiroOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BarbeiroInclude<ExtArgs> | null
    /**
     * The data needed to update a Barbeiro.
     */
    data: XOR<BarbeiroUpdateInput, BarbeiroUncheckedUpdateInput>
    /**
     * Choose, which Barbeiro to update.
     */
    where: BarbeiroWhereUniqueInput
  }

  /**
   * Barbeiro updateMany
   */
  export type BarbeiroUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Barbeiros.
     */
    data: XOR<BarbeiroUpdateManyMutationInput, BarbeiroUncheckedUpdateManyInput>
    /**
     * Filter which Barbeiros to update
     */
    where?: BarbeiroWhereInput
    /**
     * Limit how many Barbeiros to update.
     */
    limit?: number
  }

  /**
   * Barbeiro updateManyAndReturn
   */
  export type BarbeiroUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Barbeiro
     */
    select?: BarbeiroSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Barbeiro
     */
    omit?: BarbeiroOmit<ExtArgs> | null
    /**
     * The data used to update Barbeiros.
     */
    data: XOR<BarbeiroUpdateManyMutationInput, BarbeiroUncheckedUpdateManyInput>
    /**
     * Filter which Barbeiros to update
     */
    where?: BarbeiroWhereInput
    /**
     * Limit how many Barbeiros to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BarbeiroIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Barbeiro upsert
   */
  export type BarbeiroUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Barbeiro
     */
    select?: BarbeiroSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Barbeiro
     */
    omit?: BarbeiroOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BarbeiroInclude<ExtArgs> | null
    /**
     * The filter to search for the Barbeiro to update in case it exists.
     */
    where: BarbeiroWhereUniqueInput
    /**
     * In case the Barbeiro found by the `where` argument doesn't exist, create a new Barbeiro with this data.
     */
    create: XOR<BarbeiroCreateInput, BarbeiroUncheckedCreateInput>
    /**
     * In case the Barbeiro was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BarbeiroUpdateInput, BarbeiroUncheckedUpdateInput>
  }

  /**
   * Barbeiro delete
   */
  export type BarbeiroDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Barbeiro
     */
    select?: BarbeiroSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Barbeiro
     */
    omit?: BarbeiroOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BarbeiroInclude<ExtArgs> | null
    /**
     * Filter which Barbeiro to delete.
     */
    where: BarbeiroWhereUniqueInput
  }

  /**
   * Barbeiro deleteMany
   */
  export type BarbeiroDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Barbeiros to delete
     */
    where?: BarbeiroWhereInput
    /**
     * Limit how many Barbeiros to delete.
     */
    limit?: number
  }

  /**
   * Barbeiro.servicos
   */
  export type Barbeiro$servicosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Servico
     */
    select?: ServicoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Servico
     */
    omit?: ServicoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServicoInclude<ExtArgs> | null
    where?: ServicoWhereInput
    orderBy?: ServicoOrderByWithRelationInput | ServicoOrderByWithRelationInput[]
    cursor?: ServicoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ServicoScalarFieldEnum | ServicoScalarFieldEnum[]
  }

  /**
   * Barbeiro.horarios
   */
  export type Barbeiro$horariosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HorarioDisponivel
     */
    select?: HorarioDisponivelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HorarioDisponivel
     */
    omit?: HorarioDisponivelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HorarioDisponivelInclude<ExtArgs> | null
    where?: HorarioDisponivelWhereInput
    orderBy?: HorarioDisponivelOrderByWithRelationInput | HorarioDisponivelOrderByWithRelationInput[]
    cursor?: HorarioDisponivelWhereUniqueInput
    take?: number
    skip?: number
    distinct?: HorarioDisponivelScalarFieldEnum | HorarioDisponivelScalarFieldEnum[]
  }

  /**
   * Barbeiro without action
   */
  export type BarbeiroDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Barbeiro
     */
    select?: BarbeiroSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Barbeiro
     */
    omit?: BarbeiroOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BarbeiroInclude<ExtArgs> | null
  }


  /**
   * Model HorarioDisponivel
   */

  export type AggregateHorarioDisponivel = {
    _count: HorarioDisponivelCountAggregateOutputType | null
    _avg: HorarioDisponivelAvgAggregateOutputType | null
    _sum: HorarioDisponivelSumAggregateOutputType | null
    _min: HorarioDisponivelMinAggregateOutputType | null
    _max: HorarioDisponivelMaxAggregateOutputType | null
  }

  export type HorarioDisponivelAvgAggregateOutputType = {
    diaSemana: number | null
  }

  export type HorarioDisponivelSumAggregateOutputType = {
    diaSemana: number | null
  }

  export type HorarioDisponivelMinAggregateOutputType = {
    id: string | null
    barbeiroId: string | null
    diaSemana: number | null
    horaInicio: string | null
    horaFim: string | null
    almocoInicio: string | null
    almocoFim: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type HorarioDisponivelMaxAggregateOutputType = {
    id: string | null
    barbeiroId: string | null
    diaSemana: number | null
    horaInicio: string | null
    horaFim: string | null
    almocoInicio: string | null
    almocoFim: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type HorarioDisponivelCountAggregateOutputType = {
    id: number
    barbeiroId: number
    diaSemana: number
    horaInicio: number
    horaFim: number
    almocoInicio: number
    almocoFim: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type HorarioDisponivelAvgAggregateInputType = {
    diaSemana?: true
  }

  export type HorarioDisponivelSumAggregateInputType = {
    diaSemana?: true
  }

  export type HorarioDisponivelMinAggregateInputType = {
    id?: true
    barbeiroId?: true
    diaSemana?: true
    horaInicio?: true
    horaFim?: true
    almocoInicio?: true
    almocoFim?: true
    createdAt?: true
    updatedAt?: true
  }

  export type HorarioDisponivelMaxAggregateInputType = {
    id?: true
    barbeiroId?: true
    diaSemana?: true
    horaInicio?: true
    horaFim?: true
    almocoInicio?: true
    almocoFim?: true
    createdAt?: true
    updatedAt?: true
  }

  export type HorarioDisponivelCountAggregateInputType = {
    id?: true
    barbeiroId?: true
    diaSemana?: true
    horaInicio?: true
    horaFim?: true
    almocoInicio?: true
    almocoFim?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type HorarioDisponivelAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which HorarioDisponivel to aggregate.
     */
    where?: HorarioDisponivelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HorarioDisponivels to fetch.
     */
    orderBy?: HorarioDisponivelOrderByWithRelationInput | HorarioDisponivelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: HorarioDisponivelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HorarioDisponivels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HorarioDisponivels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned HorarioDisponivels
    **/
    _count?: true | HorarioDisponivelCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: HorarioDisponivelAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: HorarioDisponivelSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: HorarioDisponivelMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: HorarioDisponivelMaxAggregateInputType
  }

  export type GetHorarioDisponivelAggregateType<T extends HorarioDisponivelAggregateArgs> = {
        [P in keyof T & keyof AggregateHorarioDisponivel]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateHorarioDisponivel[P]>
      : GetScalarType<T[P], AggregateHorarioDisponivel[P]>
  }




  export type HorarioDisponivelGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HorarioDisponivelWhereInput
    orderBy?: HorarioDisponivelOrderByWithAggregationInput | HorarioDisponivelOrderByWithAggregationInput[]
    by: HorarioDisponivelScalarFieldEnum[] | HorarioDisponivelScalarFieldEnum
    having?: HorarioDisponivelScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: HorarioDisponivelCountAggregateInputType | true
    _avg?: HorarioDisponivelAvgAggregateInputType
    _sum?: HorarioDisponivelSumAggregateInputType
    _min?: HorarioDisponivelMinAggregateInputType
    _max?: HorarioDisponivelMaxAggregateInputType
  }

  export type HorarioDisponivelGroupByOutputType = {
    id: string
    barbeiroId: string
    diaSemana: number
    horaInicio: string
    horaFim: string
    almocoInicio: string | null
    almocoFim: string | null
    createdAt: Date
    updatedAt: Date
    _count: HorarioDisponivelCountAggregateOutputType | null
    _avg: HorarioDisponivelAvgAggregateOutputType | null
    _sum: HorarioDisponivelSumAggregateOutputType | null
    _min: HorarioDisponivelMinAggregateOutputType | null
    _max: HorarioDisponivelMaxAggregateOutputType | null
  }

  type GetHorarioDisponivelGroupByPayload<T extends HorarioDisponivelGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<HorarioDisponivelGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof HorarioDisponivelGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], HorarioDisponivelGroupByOutputType[P]>
            : GetScalarType<T[P], HorarioDisponivelGroupByOutputType[P]>
        }
      >
    >


  export type HorarioDisponivelSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    barbeiroId?: boolean
    diaSemana?: boolean
    horaInicio?: boolean
    horaFim?: boolean
    almocoInicio?: boolean
    almocoFim?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    barbeiro?: boolean | BarbeiroDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["horarioDisponivel"]>

  export type HorarioDisponivelSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    barbeiroId?: boolean
    diaSemana?: boolean
    horaInicio?: boolean
    horaFim?: boolean
    almocoInicio?: boolean
    almocoFim?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    barbeiro?: boolean | BarbeiroDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["horarioDisponivel"]>

  export type HorarioDisponivelSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    barbeiroId?: boolean
    diaSemana?: boolean
    horaInicio?: boolean
    horaFim?: boolean
    almocoInicio?: boolean
    almocoFim?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    barbeiro?: boolean | BarbeiroDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["horarioDisponivel"]>

  export type HorarioDisponivelSelectScalar = {
    id?: boolean
    barbeiroId?: boolean
    diaSemana?: boolean
    horaInicio?: boolean
    horaFim?: boolean
    almocoInicio?: boolean
    almocoFim?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type HorarioDisponivelOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "barbeiroId" | "diaSemana" | "horaInicio" | "horaFim" | "almocoInicio" | "almocoFim" | "createdAt" | "updatedAt", ExtArgs["result"]["horarioDisponivel"]>
  export type HorarioDisponivelInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    barbeiro?: boolean | BarbeiroDefaultArgs<ExtArgs>
  }
  export type HorarioDisponivelIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    barbeiro?: boolean | BarbeiroDefaultArgs<ExtArgs>
  }
  export type HorarioDisponivelIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    barbeiro?: boolean | BarbeiroDefaultArgs<ExtArgs>
  }

  export type $HorarioDisponivelPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "HorarioDisponivel"
    objects: {
      barbeiro: Prisma.$BarbeiroPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      barbeiroId: string
      diaSemana: number
      horaInicio: string
      horaFim: string
      almocoInicio: string | null
      almocoFim: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["horarioDisponivel"]>
    composites: {}
  }

  type HorarioDisponivelGetPayload<S extends boolean | null | undefined | HorarioDisponivelDefaultArgs> = $Result.GetResult<Prisma.$HorarioDisponivelPayload, S>

  type HorarioDisponivelCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<HorarioDisponivelFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: HorarioDisponivelCountAggregateInputType | true
    }

  export interface HorarioDisponivelDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['HorarioDisponivel'], meta: { name: 'HorarioDisponivel' } }
    /**
     * Find zero or one HorarioDisponivel that matches the filter.
     * @param {HorarioDisponivelFindUniqueArgs} args - Arguments to find a HorarioDisponivel
     * @example
     * // Get one HorarioDisponivel
     * const horarioDisponivel = await prisma.horarioDisponivel.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends HorarioDisponivelFindUniqueArgs>(args: SelectSubset<T, HorarioDisponivelFindUniqueArgs<ExtArgs>>): Prisma__HorarioDisponivelClient<$Result.GetResult<Prisma.$HorarioDisponivelPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one HorarioDisponivel that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {HorarioDisponivelFindUniqueOrThrowArgs} args - Arguments to find a HorarioDisponivel
     * @example
     * // Get one HorarioDisponivel
     * const horarioDisponivel = await prisma.horarioDisponivel.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends HorarioDisponivelFindUniqueOrThrowArgs>(args: SelectSubset<T, HorarioDisponivelFindUniqueOrThrowArgs<ExtArgs>>): Prisma__HorarioDisponivelClient<$Result.GetResult<Prisma.$HorarioDisponivelPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first HorarioDisponivel that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HorarioDisponivelFindFirstArgs} args - Arguments to find a HorarioDisponivel
     * @example
     * // Get one HorarioDisponivel
     * const horarioDisponivel = await prisma.horarioDisponivel.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends HorarioDisponivelFindFirstArgs>(args?: SelectSubset<T, HorarioDisponivelFindFirstArgs<ExtArgs>>): Prisma__HorarioDisponivelClient<$Result.GetResult<Prisma.$HorarioDisponivelPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first HorarioDisponivel that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HorarioDisponivelFindFirstOrThrowArgs} args - Arguments to find a HorarioDisponivel
     * @example
     * // Get one HorarioDisponivel
     * const horarioDisponivel = await prisma.horarioDisponivel.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends HorarioDisponivelFindFirstOrThrowArgs>(args?: SelectSubset<T, HorarioDisponivelFindFirstOrThrowArgs<ExtArgs>>): Prisma__HorarioDisponivelClient<$Result.GetResult<Prisma.$HorarioDisponivelPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more HorarioDisponivels that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HorarioDisponivelFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all HorarioDisponivels
     * const horarioDisponivels = await prisma.horarioDisponivel.findMany()
     * 
     * // Get first 10 HorarioDisponivels
     * const horarioDisponivels = await prisma.horarioDisponivel.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const horarioDisponivelWithIdOnly = await prisma.horarioDisponivel.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends HorarioDisponivelFindManyArgs>(args?: SelectSubset<T, HorarioDisponivelFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HorarioDisponivelPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a HorarioDisponivel.
     * @param {HorarioDisponivelCreateArgs} args - Arguments to create a HorarioDisponivel.
     * @example
     * // Create one HorarioDisponivel
     * const HorarioDisponivel = await prisma.horarioDisponivel.create({
     *   data: {
     *     // ... data to create a HorarioDisponivel
     *   }
     * })
     * 
     */
    create<T extends HorarioDisponivelCreateArgs>(args: SelectSubset<T, HorarioDisponivelCreateArgs<ExtArgs>>): Prisma__HorarioDisponivelClient<$Result.GetResult<Prisma.$HorarioDisponivelPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many HorarioDisponivels.
     * @param {HorarioDisponivelCreateManyArgs} args - Arguments to create many HorarioDisponivels.
     * @example
     * // Create many HorarioDisponivels
     * const horarioDisponivel = await prisma.horarioDisponivel.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends HorarioDisponivelCreateManyArgs>(args?: SelectSubset<T, HorarioDisponivelCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many HorarioDisponivels and returns the data saved in the database.
     * @param {HorarioDisponivelCreateManyAndReturnArgs} args - Arguments to create many HorarioDisponivels.
     * @example
     * // Create many HorarioDisponivels
     * const horarioDisponivel = await prisma.horarioDisponivel.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many HorarioDisponivels and only return the `id`
     * const horarioDisponivelWithIdOnly = await prisma.horarioDisponivel.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends HorarioDisponivelCreateManyAndReturnArgs>(args?: SelectSubset<T, HorarioDisponivelCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HorarioDisponivelPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a HorarioDisponivel.
     * @param {HorarioDisponivelDeleteArgs} args - Arguments to delete one HorarioDisponivel.
     * @example
     * // Delete one HorarioDisponivel
     * const HorarioDisponivel = await prisma.horarioDisponivel.delete({
     *   where: {
     *     // ... filter to delete one HorarioDisponivel
     *   }
     * })
     * 
     */
    delete<T extends HorarioDisponivelDeleteArgs>(args: SelectSubset<T, HorarioDisponivelDeleteArgs<ExtArgs>>): Prisma__HorarioDisponivelClient<$Result.GetResult<Prisma.$HorarioDisponivelPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one HorarioDisponivel.
     * @param {HorarioDisponivelUpdateArgs} args - Arguments to update one HorarioDisponivel.
     * @example
     * // Update one HorarioDisponivel
     * const horarioDisponivel = await prisma.horarioDisponivel.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends HorarioDisponivelUpdateArgs>(args: SelectSubset<T, HorarioDisponivelUpdateArgs<ExtArgs>>): Prisma__HorarioDisponivelClient<$Result.GetResult<Prisma.$HorarioDisponivelPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more HorarioDisponivels.
     * @param {HorarioDisponivelDeleteManyArgs} args - Arguments to filter HorarioDisponivels to delete.
     * @example
     * // Delete a few HorarioDisponivels
     * const { count } = await prisma.horarioDisponivel.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends HorarioDisponivelDeleteManyArgs>(args?: SelectSubset<T, HorarioDisponivelDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more HorarioDisponivels.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HorarioDisponivelUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many HorarioDisponivels
     * const horarioDisponivel = await prisma.horarioDisponivel.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends HorarioDisponivelUpdateManyArgs>(args: SelectSubset<T, HorarioDisponivelUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more HorarioDisponivels and returns the data updated in the database.
     * @param {HorarioDisponivelUpdateManyAndReturnArgs} args - Arguments to update many HorarioDisponivels.
     * @example
     * // Update many HorarioDisponivels
     * const horarioDisponivel = await prisma.horarioDisponivel.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more HorarioDisponivels and only return the `id`
     * const horarioDisponivelWithIdOnly = await prisma.horarioDisponivel.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends HorarioDisponivelUpdateManyAndReturnArgs>(args: SelectSubset<T, HorarioDisponivelUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HorarioDisponivelPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one HorarioDisponivel.
     * @param {HorarioDisponivelUpsertArgs} args - Arguments to update or create a HorarioDisponivel.
     * @example
     * // Update or create a HorarioDisponivel
     * const horarioDisponivel = await prisma.horarioDisponivel.upsert({
     *   create: {
     *     // ... data to create a HorarioDisponivel
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the HorarioDisponivel we want to update
     *   }
     * })
     */
    upsert<T extends HorarioDisponivelUpsertArgs>(args: SelectSubset<T, HorarioDisponivelUpsertArgs<ExtArgs>>): Prisma__HorarioDisponivelClient<$Result.GetResult<Prisma.$HorarioDisponivelPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of HorarioDisponivels.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HorarioDisponivelCountArgs} args - Arguments to filter HorarioDisponivels to count.
     * @example
     * // Count the number of HorarioDisponivels
     * const count = await prisma.horarioDisponivel.count({
     *   where: {
     *     // ... the filter for the HorarioDisponivels we want to count
     *   }
     * })
    **/
    count<T extends HorarioDisponivelCountArgs>(
      args?: Subset<T, HorarioDisponivelCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], HorarioDisponivelCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a HorarioDisponivel.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HorarioDisponivelAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends HorarioDisponivelAggregateArgs>(args: Subset<T, HorarioDisponivelAggregateArgs>): Prisma.PrismaPromise<GetHorarioDisponivelAggregateType<T>>

    /**
     * Group by HorarioDisponivel.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HorarioDisponivelGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends HorarioDisponivelGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: HorarioDisponivelGroupByArgs['orderBy'] }
        : { orderBy?: HorarioDisponivelGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, HorarioDisponivelGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetHorarioDisponivelGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the HorarioDisponivel model
   */
  readonly fields: HorarioDisponivelFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for HorarioDisponivel.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__HorarioDisponivelClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    barbeiro<T extends BarbeiroDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BarbeiroDefaultArgs<ExtArgs>>): Prisma__BarbeiroClient<$Result.GetResult<Prisma.$BarbeiroPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the HorarioDisponivel model
   */
  interface HorarioDisponivelFieldRefs {
    readonly id: FieldRef<"HorarioDisponivel", 'String'>
    readonly barbeiroId: FieldRef<"HorarioDisponivel", 'String'>
    readonly diaSemana: FieldRef<"HorarioDisponivel", 'Int'>
    readonly horaInicio: FieldRef<"HorarioDisponivel", 'String'>
    readonly horaFim: FieldRef<"HorarioDisponivel", 'String'>
    readonly almocoInicio: FieldRef<"HorarioDisponivel", 'String'>
    readonly almocoFim: FieldRef<"HorarioDisponivel", 'String'>
    readonly createdAt: FieldRef<"HorarioDisponivel", 'DateTime'>
    readonly updatedAt: FieldRef<"HorarioDisponivel", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * HorarioDisponivel findUnique
   */
  export type HorarioDisponivelFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HorarioDisponivel
     */
    select?: HorarioDisponivelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HorarioDisponivel
     */
    omit?: HorarioDisponivelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HorarioDisponivelInclude<ExtArgs> | null
    /**
     * Filter, which HorarioDisponivel to fetch.
     */
    where: HorarioDisponivelWhereUniqueInput
  }

  /**
   * HorarioDisponivel findUniqueOrThrow
   */
  export type HorarioDisponivelFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HorarioDisponivel
     */
    select?: HorarioDisponivelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HorarioDisponivel
     */
    omit?: HorarioDisponivelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HorarioDisponivelInclude<ExtArgs> | null
    /**
     * Filter, which HorarioDisponivel to fetch.
     */
    where: HorarioDisponivelWhereUniqueInput
  }

  /**
   * HorarioDisponivel findFirst
   */
  export type HorarioDisponivelFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HorarioDisponivel
     */
    select?: HorarioDisponivelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HorarioDisponivel
     */
    omit?: HorarioDisponivelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HorarioDisponivelInclude<ExtArgs> | null
    /**
     * Filter, which HorarioDisponivel to fetch.
     */
    where?: HorarioDisponivelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HorarioDisponivels to fetch.
     */
    orderBy?: HorarioDisponivelOrderByWithRelationInput | HorarioDisponivelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for HorarioDisponivels.
     */
    cursor?: HorarioDisponivelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HorarioDisponivels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HorarioDisponivels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HorarioDisponivels.
     */
    distinct?: HorarioDisponivelScalarFieldEnum | HorarioDisponivelScalarFieldEnum[]
  }

  /**
   * HorarioDisponivel findFirstOrThrow
   */
  export type HorarioDisponivelFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HorarioDisponivel
     */
    select?: HorarioDisponivelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HorarioDisponivel
     */
    omit?: HorarioDisponivelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HorarioDisponivelInclude<ExtArgs> | null
    /**
     * Filter, which HorarioDisponivel to fetch.
     */
    where?: HorarioDisponivelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HorarioDisponivels to fetch.
     */
    orderBy?: HorarioDisponivelOrderByWithRelationInput | HorarioDisponivelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for HorarioDisponivels.
     */
    cursor?: HorarioDisponivelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HorarioDisponivels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HorarioDisponivels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HorarioDisponivels.
     */
    distinct?: HorarioDisponivelScalarFieldEnum | HorarioDisponivelScalarFieldEnum[]
  }

  /**
   * HorarioDisponivel findMany
   */
  export type HorarioDisponivelFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HorarioDisponivel
     */
    select?: HorarioDisponivelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HorarioDisponivel
     */
    omit?: HorarioDisponivelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HorarioDisponivelInclude<ExtArgs> | null
    /**
     * Filter, which HorarioDisponivels to fetch.
     */
    where?: HorarioDisponivelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HorarioDisponivels to fetch.
     */
    orderBy?: HorarioDisponivelOrderByWithRelationInput | HorarioDisponivelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing HorarioDisponivels.
     */
    cursor?: HorarioDisponivelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HorarioDisponivels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HorarioDisponivels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HorarioDisponivels.
     */
    distinct?: HorarioDisponivelScalarFieldEnum | HorarioDisponivelScalarFieldEnum[]
  }

  /**
   * HorarioDisponivel create
   */
  export type HorarioDisponivelCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HorarioDisponivel
     */
    select?: HorarioDisponivelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HorarioDisponivel
     */
    omit?: HorarioDisponivelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HorarioDisponivelInclude<ExtArgs> | null
    /**
     * The data needed to create a HorarioDisponivel.
     */
    data: XOR<HorarioDisponivelCreateInput, HorarioDisponivelUncheckedCreateInput>
  }

  /**
   * HorarioDisponivel createMany
   */
  export type HorarioDisponivelCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many HorarioDisponivels.
     */
    data: HorarioDisponivelCreateManyInput | HorarioDisponivelCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * HorarioDisponivel createManyAndReturn
   */
  export type HorarioDisponivelCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HorarioDisponivel
     */
    select?: HorarioDisponivelSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the HorarioDisponivel
     */
    omit?: HorarioDisponivelOmit<ExtArgs> | null
    /**
     * The data used to create many HorarioDisponivels.
     */
    data: HorarioDisponivelCreateManyInput | HorarioDisponivelCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HorarioDisponivelIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * HorarioDisponivel update
   */
  export type HorarioDisponivelUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HorarioDisponivel
     */
    select?: HorarioDisponivelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HorarioDisponivel
     */
    omit?: HorarioDisponivelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HorarioDisponivelInclude<ExtArgs> | null
    /**
     * The data needed to update a HorarioDisponivel.
     */
    data: XOR<HorarioDisponivelUpdateInput, HorarioDisponivelUncheckedUpdateInput>
    /**
     * Choose, which HorarioDisponivel to update.
     */
    where: HorarioDisponivelWhereUniqueInput
  }

  /**
   * HorarioDisponivel updateMany
   */
  export type HorarioDisponivelUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update HorarioDisponivels.
     */
    data: XOR<HorarioDisponivelUpdateManyMutationInput, HorarioDisponivelUncheckedUpdateManyInput>
    /**
     * Filter which HorarioDisponivels to update
     */
    where?: HorarioDisponivelWhereInput
    /**
     * Limit how many HorarioDisponivels to update.
     */
    limit?: number
  }

  /**
   * HorarioDisponivel updateManyAndReturn
   */
  export type HorarioDisponivelUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HorarioDisponivel
     */
    select?: HorarioDisponivelSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the HorarioDisponivel
     */
    omit?: HorarioDisponivelOmit<ExtArgs> | null
    /**
     * The data used to update HorarioDisponivels.
     */
    data: XOR<HorarioDisponivelUpdateManyMutationInput, HorarioDisponivelUncheckedUpdateManyInput>
    /**
     * Filter which HorarioDisponivels to update
     */
    where?: HorarioDisponivelWhereInput
    /**
     * Limit how many HorarioDisponivels to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HorarioDisponivelIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * HorarioDisponivel upsert
   */
  export type HorarioDisponivelUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HorarioDisponivel
     */
    select?: HorarioDisponivelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HorarioDisponivel
     */
    omit?: HorarioDisponivelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HorarioDisponivelInclude<ExtArgs> | null
    /**
     * The filter to search for the HorarioDisponivel to update in case it exists.
     */
    where: HorarioDisponivelWhereUniqueInput
    /**
     * In case the HorarioDisponivel found by the `where` argument doesn't exist, create a new HorarioDisponivel with this data.
     */
    create: XOR<HorarioDisponivelCreateInput, HorarioDisponivelUncheckedCreateInput>
    /**
     * In case the HorarioDisponivel was found with the provided `where` argument, update it with this data.
     */
    update: XOR<HorarioDisponivelUpdateInput, HorarioDisponivelUncheckedUpdateInput>
  }

  /**
   * HorarioDisponivel delete
   */
  export type HorarioDisponivelDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HorarioDisponivel
     */
    select?: HorarioDisponivelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HorarioDisponivel
     */
    omit?: HorarioDisponivelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HorarioDisponivelInclude<ExtArgs> | null
    /**
     * Filter which HorarioDisponivel to delete.
     */
    where: HorarioDisponivelWhereUniqueInput
  }

  /**
   * HorarioDisponivel deleteMany
   */
  export type HorarioDisponivelDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which HorarioDisponivels to delete
     */
    where?: HorarioDisponivelWhereInput
    /**
     * Limit how many HorarioDisponivels to delete.
     */
    limit?: number
  }

  /**
   * HorarioDisponivel without action
   */
  export type HorarioDisponivelDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HorarioDisponivel
     */
    select?: HorarioDisponivelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HorarioDisponivel
     */
    omit?: HorarioDisponivelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HorarioDisponivelInclude<ExtArgs> | null
  }


  /**
   * Model Servico
   */

  export type AggregateServico = {
    _count: ServicoCountAggregateOutputType | null
    _avg: ServicoAvgAggregateOutputType | null
    _sum: ServicoSumAggregateOutputType | null
    _min: ServicoMinAggregateOutputType | null
    _max: ServicoMaxAggregateOutputType | null
  }

  export type ServicoAvgAggregateOutputType = {
    preco: number | null
    duracao: number | null
  }

  export type ServicoSumAggregateOutputType = {
    preco: number | null
    duracao: number | null
  }

  export type ServicoMinAggregateOutputType = {
    id: string | null
    nome: string | null
    preco: number | null
    duracao: number | null
    barbeariaId: string | null
    barbeiroId: string | null
    ativo: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ServicoMaxAggregateOutputType = {
    id: string | null
    nome: string | null
    preco: number | null
    duracao: number | null
    barbeariaId: string | null
    barbeiroId: string | null
    ativo: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ServicoCountAggregateOutputType = {
    id: number
    nome: number
    preco: number
    duracao: number
    barbeariaId: number
    barbeiroId: number
    ativo: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ServicoAvgAggregateInputType = {
    preco?: true
    duracao?: true
  }

  export type ServicoSumAggregateInputType = {
    preco?: true
    duracao?: true
  }

  export type ServicoMinAggregateInputType = {
    id?: true
    nome?: true
    preco?: true
    duracao?: true
    barbeariaId?: true
    barbeiroId?: true
    ativo?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ServicoMaxAggregateInputType = {
    id?: true
    nome?: true
    preco?: true
    duracao?: true
    barbeariaId?: true
    barbeiroId?: true
    ativo?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ServicoCountAggregateInputType = {
    id?: true
    nome?: true
    preco?: true
    duracao?: true
    barbeariaId?: true
    barbeiroId?: true
    ativo?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ServicoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Servico to aggregate.
     */
    where?: ServicoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Servicos to fetch.
     */
    orderBy?: ServicoOrderByWithRelationInput | ServicoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ServicoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Servicos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Servicos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Servicos
    **/
    _count?: true | ServicoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ServicoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ServicoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ServicoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ServicoMaxAggregateInputType
  }

  export type GetServicoAggregateType<T extends ServicoAggregateArgs> = {
        [P in keyof T & keyof AggregateServico]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateServico[P]>
      : GetScalarType<T[P], AggregateServico[P]>
  }




  export type ServicoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServicoWhereInput
    orderBy?: ServicoOrderByWithAggregationInput | ServicoOrderByWithAggregationInput[]
    by: ServicoScalarFieldEnum[] | ServicoScalarFieldEnum
    having?: ServicoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ServicoCountAggregateInputType | true
    _avg?: ServicoAvgAggregateInputType
    _sum?: ServicoSumAggregateInputType
    _min?: ServicoMinAggregateInputType
    _max?: ServicoMaxAggregateInputType
  }

  export type ServicoGroupByOutputType = {
    id: string
    nome: string
    preco: number
    duracao: number
    barbeariaId: string
    barbeiroId: string | null
    ativo: boolean
    createdAt: Date
    updatedAt: Date
    _count: ServicoCountAggregateOutputType | null
    _avg: ServicoAvgAggregateOutputType | null
    _sum: ServicoSumAggregateOutputType | null
    _min: ServicoMinAggregateOutputType | null
    _max: ServicoMaxAggregateOutputType | null
  }

  type GetServicoGroupByPayload<T extends ServicoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ServicoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ServicoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ServicoGroupByOutputType[P]>
            : GetScalarType<T[P], ServicoGroupByOutputType[P]>
        }
      >
    >


  export type ServicoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    preco?: boolean
    duracao?: boolean
    barbeariaId?: boolean
    barbeiroId?: boolean
    ativo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    barbearia?: boolean | BarbeariaDefaultArgs<ExtArgs>
    barbeiro?: boolean | Servico$barbeiroArgs<ExtArgs>
  }, ExtArgs["result"]["servico"]>

  export type ServicoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    preco?: boolean
    duracao?: boolean
    barbeariaId?: boolean
    barbeiroId?: boolean
    ativo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    barbearia?: boolean | BarbeariaDefaultArgs<ExtArgs>
    barbeiro?: boolean | Servico$barbeiroArgs<ExtArgs>
  }, ExtArgs["result"]["servico"]>

  export type ServicoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    preco?: boolean
    duracao?: boolean
    barbeariaId?: boolean
    barbeiroId?: boolean
    ativo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    barbearia?: boolean | BarbeariaDefaultArgs<ExtArgs>
    barbeiro?: boolean | Servico$barbeiroArgs<ExtArgs>
  }, ExtArgs["result"]["servico"]>

  export type ServicoSelectScalar = {
    id?: boolean
    nome?: boolean
    preco?: boolean
    duracao?: boolean
    barbeariaId?: boolean
    barbeiroId?: boolean
    ativo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ServicoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nome" | "preco" | "duracao" | "barbeariaId" | "barbeiroId" | "ativo" | "createdAt" | "updatedAt", ExtArgs["result"]["servico"]>
  export type ServicoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    barbearia?: boolean | BarbeariaDefaultArgs<ExtArgs>
    barbeiro?: boolean | Servico$barbeiroArgs<ExtArgs>
  }
  export type ServicoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    barbearia?: boolean | BarbeariaDefaultArgs<ExtArgs>
    barbeiro?: boolean | Servico$barbeiroArgs<ExtArgs>
  }
  export type ServicoIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    barbearia?: boolean | BarbeariaDefaultArgs<ExtArgs>
    barbeiro?: boolean | Servico$barbeiroArgs<ExtArgs>
  }

  export type $ServicoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Servico"
    objects: {
      barbearia: Prisma.$BarbeariaPayload<ExtArgs>
      barbeiro: Prisma.$BarbeiroPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nome: string
      preco: number
      duracao: number
      barbeariaId: string
      barbeiroId: string | null
      ativo: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["servico"]>
    composites: {}
  }

  type ServicoGetPayload<S extends boolean | null | undefined | ServicoDefaultArgs> = $Result.GetResult<Prisma.$ServicoPayload, S>

  type ServicoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ServicoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ServicoCountAggregateInputType | true
    }

  export interface ServicoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Servico'], meta: { name: 'Servico' } }
    /**
     * Find zero or one Servico that matches the filter.
     * @param {ServicoFindUniqueArgs} args - Arguments to find a Servico
     * @example
     * // Get one Servico
     * const servico = await prisma.servico.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ServicoFindUniqueArgs>(args: SelectSubset<T, ServicoFindUniqueArgs<ExtArgs>>): Prisma__ServicoClient<$Result.GetResult<Prisma.$ServicoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Servico that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ServicoFindUniqueOrThrowArgs} args - Arguments to find a Servico
     * @example
     * // Get one Servico
     * const servico = await prisma.servico.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ServicoFindUniqueOrThrowArgs>(args: SelectSubset<T, ServicoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ServicoClient<$Result.GetResult<Prisma.$ServicoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Servico that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServicoFindFirstArgs} args - Arguments to find a Servico
     * @example
     * // Get one Servico
     * const servico = await prisma.servico.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ServicoFindFirstArgs>(args?: SelectSubset<T, ServicoFindFirstArgs<ExtArgs>>): Prisma__ServicoClient<$Result.GetResult<Prisma.$ServicoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Servico that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServicoFindFirstOrThrowArgs} args - Arguments to find a Servico
     * @example
     * // Get one Servico
     * const servico = await prisma.servico.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ServicoFindFirstOrThrowArgs>(args?: SelectSubset<T, ServicoFindFirstOrThrowArgs<ExtArgs>>): Prisma__ServicoClient<$Result.GetResult<Prisma.$ServicoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Servicos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServicoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Servicos
     * const servicos = await prisma.servico.findMany()
     * 
     * // Get first 10 Servicos
     * const servicos = await prisma.servico.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const servicoWithIdOnly = await prisma.servico.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ServicoFindManyArgs>(args?: SelectSubset<T, ServicoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServicoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Servico.
     * @param {ServicoCreateArgs} args - Arguments to create a Servico.
     * @example
     * // Create one Servico
     * const Servico = await prisma.servico.create({
     *   data: {
     *     // ... data to create a Servico
     *   }
     * })
     * 
     */
    create<T extends ServicoCreateArgs>(args: SelectSubset<T, ServicoCreateArgs<ExtArgs>>): Prisma__ServicoClient<$Result.GetResult<Prisma.$ServicoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Servicos.
     * @param {ServicoCreateManyArgs} args - Arguments to create many Servicos.
     * @example
     * // Create many Servicos
     * const servico = await prisma.servico.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ServicoCreateManyArgs>(args?: SelectSubset<T, ServicoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Servicos and returns the data saved in the database.
     * @param {ServicoCreateManyAndReturnArgs} args - Arguments to create many Servicos.
     * @example
     * // Create many Servicos
     * const servico = await prisma.servico.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Servicos and only return the `id`
     * const servicoWithIdOnly = await prisma.servico.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ServicoCreateManyAndReturnArgs>(args?: SelectSubset<T, ServicoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServicoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Servico.
     * @param {ServicoDeleteArgs} args - Arguments to delete one Servico.
     * @example
     * // Delete one Servico
     * const Servico = await prisma.servico.delete({
     *   where: {
     *     // ... filter to delete one Servico
     *   }
     * })
     * 
     */
    delete<T extends ServicoDeleteArgs>(args: SelectSubset<T, ServicoDeleteArgs<ExtArgs>>): Prisma__ServicoClient<$Result.GetResult<Prisma.$ServicoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Servico.
     * @param {ServicoUpdateArgs} args - Arguments to update one Servico.
     * @example
     * // Update one Servico
     * const servico = await prisma.servico.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ServicoUpdateArgs>(args: SelectSubset<T, ServicoUpdateArgs<ExtArgs>>): Prisma__ServicoClient<$Result.GetResult<Prisma.$ServicoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Servicos.
     * @param {ServicoDeleteManyArgs} args - Arguments to filter Servicos to delete.
     * @example
     * // Delete a few Servicos
     * const { count } = await prisma.servico.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ServicoDeleteManyArgs>(args?: SelectSubset<T, ServicoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Servicos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServicoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Servicos
     * const servico = await prisma.servico.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ServicoUpdateManyArgs>(args: SelectSubset<T, ServicoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Servicos and returns the data updated in the database.
     * @param {ServicoUpdateManyAndReturnArgs} args - Arguments to update many Servicos.
     * @example
     * // Update many Servicos
     * const servico = await prisma.servico.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Servicos and only return the `id`
     * const servicoWithIdOnly = await prisma.servico.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ServicoUpdateManyAndReturnArgs>(args: SelectSubset<T, ServicoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServicoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Servico.
     * @param {ServicoUpsertArgs} args - Arguments to update or create a Servico.
     * @example
     * // Update or create a Servico
     * const servico = await prisma.servico.upsert({
     *   create: {
     *     // ... data to create a Servico
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Servico we want to update
     *   }
     * })
     */
    upsert<T extends ServicoUpsertArgs>(args: SelectSubset<T, ServicoUpsertArgs<ExtArgs>>): Prisma__ServicoClient<$Result.GetResult<Prisma.$ServicoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Servicos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServicoCountArgs} args - Arguments to filter Servicos to count.
     * @example
     * // Count the number of Servicos
     * const count = await prisma.servico.count({
     *   where: {
     *     // ... the filter for the Servicos we want to count
     *   }
     * })
    **/
    count<T extends ServicoCountArgs>(
      args?: Subset<T, ServicoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ServicoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Servico.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServicoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ServicoAggregateArgs>(args: Subset<T, ServicoAggregateArgs>): Prisma.PrismaPromise<GetServicoAggregateType<T>>

    /**
     * Group by Servico.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServicoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ServicoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ServicoGroupByArgs['orderBy'] }
        : { orderBy?: ServicoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ServicoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetServicoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Servico model
   */
  readonly fields: ServicoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Servico.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ServicoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    barbearia<T extends BarbeariaDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BarbeariaDefaultArgs<ExtArgs>>): Prisma__BarbeariaClient<$Result.GetResult<Prisma.$BarbeariaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    barbeiro<T extends Servico$barbeiroArgs<ExtArgs> = {}>(args?: Subset<T, Servico$barbeiroArgs<ExtArgs>>): Prisma__BarbeiroClient<$Result.GetResult<Prisma.$BarbeiroPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Servico model
   */
  interface ServicoFieldRefs {
    readonly id: FieldRef<"Servico", 'String'>
    readonly nome: FieldRef<"Servico", 'String'>
    readonly preco: FieldRef<"Servico", 'Float'>
    readonly duracao: FieldRef<"Servico", 'Int'>
    readonly barbeariaId: FieldRef<"Servico", 'String'>
    readonly barbeiroId: FieldRef<"Servico", 'String'>
    readonly ativo: FieldRef<"Servico", 'Boolean'>
    readonly createdAt: FieldRef<"Servico", 'DateTime'>
    readonly updatedAt: FieldRef<"Servico", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Servico findUnique
   */
  export type ServicoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Servico
     */
    select?: ServicoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Servico
     */
    omit?: ServicoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServicoInclude<ExtArgs> | null
    /**
     * Filter, which Servico to fetch.
     */
    where: ServicoWhereUniqueInput
  }

  /**
   * Servico findUniqueOrThrow
   */
  export type ServicoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Servico
     */
    select?: ServicoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Servico
     */
    omit?: ServicoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServicoInclude<ExtArgs> | null
    /**
     * Filter, which Servico to fetch.
     */
    where: ServicoWhereUniqueInput
  }

  /**
   * Servico findFirst
   */
  export type ServicoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Servico
     */
    select?: ServicoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Servico
     */
    omit?: ServicoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServicoInclude<ExtArgs> | null
    /**
     * Filter, which Servico to fetch.
     */
    where?: ServicoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Servicos to fetch.
     */
    orderBy?: ServicoOrderByWithRelationInput | ServicoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Servicos.
     */
    cursor?: ServicoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Servicos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Servicos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Servicos.
     */
    distinct?: ServicoScalarFieldEnum | ServicoScalarFieldEnum[]
  }

  /**
   * Servico findFirstOrThrow
   */
  export type ServicoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Servico
     */
    select?: ServicoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Servico
     */
    omit?: ServicoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServicoInclude<ExtArgs> | null
    /**
     * Filter, which Servico to fetch.
     */
    where?: ServicoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Servicos to fetch.
     */
    orderBy?: ServicoOrderByWithRelationInput | ServicoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Servicos.
     */
    cursor?: ServicoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Servicos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Servicos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Servicos.
     */
    distinct?: ServicoScalarFieldEnum | ServicoScalarFieldEnum[]
  }

  /**
   * Servico findMany
   */
  export type ServicoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Servico
     */
    select?: ServicoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Servico
     */
    omit?: ServicoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServicoInclude<ExtArgs> | null
    /**
     * Filter, which Servicos to fetch.
     */
    where?: ServicoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Servicos to fetch.
     */
    orderBy?: ServicoOrderByWithRelationInput | ServicoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Servicos.
     */
    cursor?: ServicoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Servicos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Servicos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Servicos.
     */
    distinct?: ServicoScalarFieldEnum | ServicoScalarFieldEnum[]
  }

  /**
   * Servico create
   */
  export type ServicoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Servico
     */
    select?: ServicoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Servico
     */
    omit?: ServicoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServicoInclude<ExtArgs> | null
    /**
     * The data needed to create a Servico.
     */
    data: XOR<ServicoCreateInput, ServicoUncheckedCreateInput>
  }

  /**
   * Servico createMany
   */
  export type ServicoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Servicos.
     */
    data: ServicoCreateManyInput | ServicoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Servico createManyAndReturn
   */
  export type ServicoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Servico
     */
    select?: ServicoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Servico
     */
    omit?: ServicoOmit<ExtArgs> | null
    /**
     * The data used to create many Servicos.
     */
    data: ServicoCreateManyInput | ServicoCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServicoIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Servico update
   */
  export type ServicoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Servico
     */
    select?: ServicoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Servico
     */
    omit?: ServicoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServicoInclude<ExtArgs> | null
    /**
     * The data needed to update a Servico.
     */
    data: XOR<ServicoUpdateInput, ServicoUncheckedUpdateInput>
    /**
     * Choose, which Servico to update.
     */
    where: ServicoWhereUniqueInput
  }

  /**
   * Servico updateMany
   */
  export type ServicoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Servicos.
     */
    data: XOR<ServicoUpdateManyMutationInput, ServicoUncheckedUpdateManyInput>
    /**
     * Filter which Servicos to update
     */
    where?: ServicoWhereInput
    /**
     * Limit how many Servicos to update.
     */
    limit?: number
  }

  /**
   * Servico updateManyAndReturn
   */
  export type ServicoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Servico
     */
    select?: ServicoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Servico
     */
    omit?: ServicoOmit<ExtArgs> | null
    /**
     * The data used to update Servicos.
     */
    data: XOR<ServicoUpdateManyMutationInput, ServicoUncheckedUpdateManyInput>
    /**
     * Filter which Servicos to update
     */
    where?: ServicoWhereInput
    /**
     * Limit how many Servicos to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServicoIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Servico upsert
   */
  export type ServicoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Servico
     */
    select?: ServicoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Servico
     */
    omit?: ServicoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServicoInclude<ExtArgs> | null
    /**
     * The filter to search for the Servico to update in case it exists.
     */
    where: ServicoWhereUniqueInput
    /**
     * In case the Servico found by the `where` argument doesn't exist, create a new Servico with this data.
     */
    create: XOR<ServicoCreateInput, ServicoUncheckedCreateInput>
    /**
     * In case the Servico was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ServicoUpdateInput, ServicoUncheckedUpdateInput>
  }

  /**
   * Servico delete
   */
  export type ServicoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Servico
     */
    select?: ServicoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Servico
     */
    omit?: ServicoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServicoInclude<ExtArgs> | null
    /**
     * Filter which Servico to delete.
     */
    where: ServicoWhereUniqueInput
  }

  /**
   * Servico deleteMany
   */
  export type ServicoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Servicos to delete
     */
    where?: ServicoWhereInput
    /**
     * Limit how many Servicos to delete.
     */
    limit?: number
  }

  /**
   * Servico.barbeiro
   */
  export type Servico$barbeiroArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Barbeiro
     */
    select?: BarbeiroSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Barbeiro
     */
    omit?: BarbeiroOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BarbeiroInclude<ExtArgs> | null
    where?: BarbeiroWhereInput
  }

  /**
   * Servico without action
   */
  export type ServicoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Servico
     */
    select?: ServicoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Servico
     */
    omit?: ServicoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServicoInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    nome: 'nome',
    email: 'email',
    senha: 'senha',
    telefone: 'telefone',
    tipo: 'tipo',
    plano: 'plano',
    googleId: 'googleId',
    avatar: 'avatar',
    emailVerified: 'emailVerified',
    authVersion: 'authVersion',
    verificationAttempts: 'verificationAttempts',
    verificationCode: 'verificationCode',
    verificationExpires: 'verificationExpires',
    resetPasswordToken: 'resetPasswordToken',
    resetPasswordExpires: 'resetPasswordExpires',
    subscriptionId: 'subscriptionId',
    latestPaymentId: 'latestPaymentId',
    subscriptionStatus: 'subscriptionStatus',
    planoExpiraEm: 'planoExpiraEm',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const BarbeariaScalarFieldEnum: {
    id: 'id',
    nome: 'nome',
    slug: 'slug',
    descricao: 'descricao',
    endereco: 'endereco',
    cidade: 'cidade',
    estado: 'estado',
    cep: 'cep',
    pontoReferencia: 'pontoReferencia',
    latitude: 'latitude',
    longitude: 'longitude',
    telefone: 'telefone',
    whatsapp: 'whatsapp',
    mensagemLembrete: 'mensagemLembrete',
    lembreteAtivo: 'lembreteAtivo',
    foto: 'foto',
    fotos: 'fotos',
    ownerId: 'ownerId',
    ativa: 'ativa',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type BarbeariaScalarFieldEnum = (typeof BarbeariaScalarFieldEnum)[keyof typeof BarbeariaScalarFieldEnum]


  export const BarbeiroScalarFieldEnum: {
    id: 'id',
    nome: 'nome',
    foto: 'foto',
    barbeariaId: 'barbeariaId',
    ativo: 'ativo',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type BarbeiroScalarFieldEnum = (typeof BarbeiroScalarFieldEnum)[keyof typeof BarbeiroScalarFieldEnum]


  export const HorarioDisponivelScalarFieldEnum: {
    id: 'id',
    barbeiroId: 'barbeiroId',
    diaSemana: 'diaSemana',
    horaInicio: 'horaInicio',
    horaFim: 'horaFim',
    almocoInicio: 'almocoInicio',
    almocoFim: 'almocoFim',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type HorarioDisponivelScalarFieldEnum = (typeof HorarioDisponivelScalarFieldEnum)[keyof typeof HorarioDisponivelScalarFieldEnum]


  export const ServicoScalarFieldEnum: {
    id: 'id',
    nome: 'nome',
    preco: 'preco',
    duracao: 'duracao',
    barbeariaId: 'barbeariaId',
    barbeiroId: 'barbeiroId',
    ativo: 'ativo',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ServicoScalarFieldEnum = (typeof ServicoScalarFieldEnum)[keyof typeof ServicoScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'UserType'
   */
  export type EnumUserTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserType'>
    


  /**
   * Reference to a field of type 'UserType[]'
   */
  export type ListEnumUserTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserType[]'>
    


  /**
   * Reference to a field of type 'Plano'
   */
  export type EnumPlanoFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Plano'>
    


  /**
   * Reference to a field of type 'Plano[]'
   */
  export type ListEnumPlanoFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Plano[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    nome?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    senha?: StringNullableFilter<"User"> | string | null
    telefone?: StringNullableFilter<"User"> | string | null
    tipo?: EnumUserTypeFilter<"User"> | $Enums.UserType
    plano?: EnumPlanoFilter<"User"> | $Enums.Plano
    googleId?: StringNullableFilter<"User"> | string | null
    avatar?: StringNullableFilter<"User"> | string | null
    emailVerified?: BoolFilter<"User"> | boolean
    authVersion?: IntFilter<"User"> | number
    verificationAttempts?: IntFilter<"User"> | number
    verificationCode?: StringNullableFilter<"User"> | string | null
    verificationExpires?: DateTimeNullableFilter<"User"> | Date | string | null
    resetPasswordToken?: StringNullableFilter<"User"> | string | null
    resetPasswordExpires?: DateTimeNullableFilter<"User"> | Date | string | null
    subscriptionId?: StringNullableFilter<"User"> | string | null
    latestPaymentId?: StringNullableFilter<"User"> | string | null
    subscriptionStatus?: StringNullableFilter<"User"> | string | null
    planoExpiraEm?: DateTimeNullableFilter<"User"> | Date | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    barbearias?: BarbeariaListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    nome?: SortOrder
    email?: SortOrder
    senha?: SortOrderInput | SortOrder
    telefone?: SortOrderInput | SortOrder
    tipo?: SortOrder
    plano?: SortOrder
    googleId?: SortOrderInput | SortOrder
    avatar?: SortOrderInput | SortOrder
    emailVerified?: SortOrder
    authVersion?: SortOrder
    verificationAttempts?: SortOrder
    verificationCode?: SortOrderInput | SortOrder
    verificationExpires?: SortOrderInput | SortOrder
    resetPasswordToken?: SortOrderInput | SortOrder
    resetPasswordExpires?: SortOrderInput | SortOrder
    subscriptionId?: SortOrderInput | SortOrder
    latestPaymentId?: SortOrderInput | SortOrder
    subscriptionStatus?: SortOrderInput | SortOrder
    planoExpiraEm?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    barbearias?: BarbeariaOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    googleId?: string
    subscriptionId?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    nome?: StringFilter<"User"> | string
    senha?: StringNullableFilter<"User"> | string | null
    telefone?: StringNullableFilter<"User"> | string | null
    tipo?: EnumUserTypeFilter<"User"> | $Enums.UserType
    plano?: EnumPlanoFilter<"User"> | $Enums.Plano
    avatar?: StringNullableFilter<"User"> | string | null
    emailVerified?: BoolFilter<"User"> | boolean
    authVersion?: IntFilter<"User"> | number
    verificationAttempts?: IntFilter<"User"> | number
    verificationCode?: StringNullableFilter<"User"> | string | null
    verificationExpires?: DateTimeNullableFilter<"User"> | Date | string | null
    resetPasswordToken?: StringNullableFilter<"User"> | string | null
    resetPasswordExpires?: DateTimeNullableFilter<"User"> | Date | string | null
    latestPaymentId?: StringNullableFilter<"User"> | string | null
    subscriptionStatus?: StringNullableFilter<"User"> | string | null
    planoExpiraEm?: DateTimeNullableFilter<"User"> | Date | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    barbearias?: BarbeariaListRelationFilter
  }, "id" | "email" | "googleId" | "subscriptionId">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    nome?: SortOrder
    email?: SortOrder
    senha?: SortOrderInput | SortOrder
    telefone?: SortOrderInput | SortOrder
    tipo?: SortOrder
    plano?: SortOrder
    googleId?: SortOrderInput | SortOrder
    avatar?: SortOrderInput | SortOrder
    emailVerified?: SortOrder
    authVersion?: SortOrder
    verificationAttempts?: SortOrder
    verificationCode?: SortOrderInput | SortOrder
    verificationExpires?: SortOrderInput | SortOrder
    resetPasswordToken?: SortOrderInput | SortOrder
    resetPasswordExpires?: SortOrderInput | SortOrder
    subscriptionId?: SortOrderInput | SortOrder
    latestPaymentId?: SortOrderInput | SortOrder
    subscriptionStatus?: SortOrderInput | SortOrder
    planoExpiraEm?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    nome?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    senha?: StringNullableWithAggregatesFilter<"User"> | string | null
    telefone?: StringNullableWithAggregatesFilter<"User"> | string | null
    tipo?: EnumUserTypeWithAggregatesFilter<"User"> | $Enums.UserType
    plano?: EnumPlanoWithAggregatesFilter<"User"> | $Enums.Plano
    googleId?: StringNullableWithAggregatesFilter<"User"> | string | null
    avatar?: StringNullableWithAggregatesFilter<"User"> | string | null
    emailVerified?: BoolWithAggregatesFilter<"User"> | boolean
    authVersion?: IntWithAggregatesFilter<"User"> | number
    verificationAttempts?: IntWithAggregatesFilter<"User"> | number
    verificationCode?: StringNullableWithAggregatesFilter<"User"> | string | null
    verificationExpires?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    resetPasswordToken?: StringNullableWithAggregatesFilter<"User"> | string | null
    resetPasswordExpires?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    subscriptionId?: StringNullableWithAggregatesFilter<"User"> | string | null
    latestPaymentId?: StringNullableWithAggregatesFilter<"User"> | string | null
    subscriptionStatus?: StringNullableWithAggregatesFilter<"User"> | string | null
    planoExpiraEm?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type BarbeariaWhereInput = {
    AND?: BarbeariaWhereInput | BarbeariaWhereInput[]
    OR?: BarbeariaWhereInput[]
    NOT?: BarbeariaWhereInput | BarbeariaWhereInput[]
    id?: StringFilter<"Barbearia"> | string
    nome?: StringFilter<"Barbearia"> | string
    slug?: StringFilter<"Barbearia"> | string
    descricao?: StringNullableFilter<"Barbearia"> | string | null
    endereco?: StringFilter<"Barbearia"> | string
    cidade?: StringFilter<"Barbearia"> | string
    estado?: StringFilter<"Barbearia"> | string
    cep?: StringNullableFilter<"Barbearia"> | string | null
    pontoReferencia?: StringNullableFilter<"Barbearia"> | string | null
    latitude?: FloatNullableFilter<"Barbearia"> | number | null
    longitude?: FloatNullableFilter<"Barbearia"> | number | null
    telefone?: StringNullableFilter<"Barbearia"> | string | null
    whatsapp?: StringNullableFilter<"Barbearia"> | string | null
    mensagemLembrete?: StringNullableFilter<"Barbearia"> | string | null
    lembreteAtivo?: BoolFilter<"Barbearia"> | boolean
    foto?: StringNullableFilter<"Barbearia"> | string | null
    fotos?: StringNullableListFilter<"Barbearia">
    ownerId?: StringFilter<"Barbearia"> | string
    ativa?: BoolFilter<"Barbearia"> | boolean
    createdAt?: DateTimeFilter<"Barbearia"> | Date | string
    updatedAt?: DateTimeFilter<"Barbearia"> | Date | string
    owner?: XOR<UserScalarRelationFilter, UserWhereInput>
    barbeiros?: BarbeiroListRelationFilter
    servicos?: ServicoListRelationFilter
  }

  export type BarbeariaOrderByWithRelationInput = {
    id?: SortOrder
    nome?: SortOrder
    slug?: SortOrder
    descricao?: SortOrderInput | SortOrder
    endereco?: SortOrder
    cidade?: SortOrder
    estado?: SortOrder
    cep?: SortOrderInput | SortOrder
    pontoReferencia?: SortOrderInput | SortOrder
    latitude?: SortOrderInput | SortOrder
    longitude?: SortOrderInput | SortOrder
    telefone?: SortOrderInput | SortOrder
    whatsapp?: SortOrderInput | SortOrder
    mensagemLembrete?: SortOrderInput | SortOrder
    lembreteAtivo?: SortOrder
    foto?: SortOrderInput | SortOrder
    fotos?: SortOrder
    ownerId?: SortOrder
    ativa?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    owner?: UserOrderByWithRelationInput
    barbeiros?: BarbeiroOrderByRelationAggregateInput
    servicos?: ServicoOrderByRelationAggregateInput
  }

  export type BarbeariaWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slug?: string
    AND?: BarbeariaWhereInput | BarbeariaWhereInput[]
    OR?: BarbeariaWhereInput[]
    NOT?: BarbeariaWhereInput | BarbeariaWhereInput[]
    nome?: StringFilter<"Barbearia"> | string
    descricao?: StringNullableFilter<"Barbearia"> | string | null
    endereco?: StringFilter<"Barbearia"> | string
    cidade?: StringFilter<"Barbearia"> | string
    estado?: StringFilter<"Barbearia"> | string
    cep?: StringNullableFilter<"Barbearia"> | string | null
    pontoReferencia?: StringNullableFilter<"Barbearia"> | string | null
    latitude?: FloatNullableFilter<"Barbearia"> | number | null
    longitude?: FloatNullableFilter<"Barbearia"> | number | null
    telefone?: StringNullableFilter<"Barbearia"> | string | null
    whatsapp?: StringNullableFilter<"Barbearia"> | string | null
    mensagemLembrete?: StringNullableFilter<"Barbearia"> | string | null
    lembreteAtivo?: BoolFilter<"Barbearia"> | boolean
    foto?: StringNullableFilter<"Barbearia"> | string | null
    fotos?: StringNullableListFilter<"Barbearia">
    ownerId?: StringFilter<"Barbearia"> | string
    ativa?: BoolFilter<"Barbearia"> | boolean
    createdAt?: DateTimeFilter<"Barbearia"> | Date | string
    updatedAt?: DateTimeFilter<"Barbearia"> | Date | string
    owner?: XOR<UserScalarRelationFilter, UserWhereInput>
    barbeiros?: BarbeiroListRelationFilter
    servicos?: ServicoListRelationFilter
  }, "id" | "slug">

  export type BarbeariaOrderByWithAggregationInput = {
    id?: SortOrder
    nome?: SortOrder
    slug?: SortOrder
    descricao?: SortOrderInput | SortOrder
    endereco?: SortOrder
    cidade?: SortOrder
    estado?: SortOrder
    cep?: SortOrderInput | SortOrder
    pontoReferencia?: SortOrderInput | SortOrder
    latitude?: SortOrderInput | SortOrder
    longitude?: SortOrderInput | SortOrder
    telefone?: SortOrderInput | SortOrder
    whatsapp?: SortOrderInput | SortOrder
    mensagemLembrete?: SortOrderInput | SortOrder
    lembreteAtivo?: SortOrder
    foto?: SortOrderInput | SortOrder
    fotos?: SortOrder
    ownerId?: SortOrder
    ativa?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: BarbeariaCountOrderByAggregateInput
    _avg?: BarbeariaAvgOrderByAggregateInput
    _max?: BarbeariaMaxOrderByAggregateInput
    _min?: BarbeariaMinOrderByAggregateInput
    _sum?: BarbeariaSumOrderByAggregateInput
  }

  export type BarbeariaScalarWhereWithAggregatesInput = {
    AND?: BarbeariaScalarWhereWithAggregatesInput | BarbeariaScalarWhereWithAggregatesInput[]
    OR?: BarbeariaScalarWhereWithAggregatesInput[]
    NOT?: BarbeariaScalarWhereWithAggregatesInput | BarbeariaScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Barbearia"> | string
    nome?: StringWithAggregatesFilter<"Barbearia"> | string
    slug?: StringWithAggregatesFilter<"Barbearia"> | string
    descricao?: StringNullableWithAggregatesFilter<"Barbearia"> | string | null
    endereco?: StringWithAggregatesFilter<"Barbearia"> | string
    cidade?: StringWithAggregatesFilter<"Barbearia"> | string
    estado?: StringWithAggregatesFilter<"Barbearia"> | string
    cep?: StringNullableWithAggregatesFilter<"Barbearia"> | string | null
    pontoReferencia?: StringNullableWithAggregatesFilter<"Barbearia"> | string | null
    latitude?: FloatNullableWithAggregatesFilter<"Barbearia"> | number | null
    longitude?: FloatNullableWithAggregatesFilter<"Barbearia"> | number | null
    telefone?: StringNullableWithAggregatesFilter<"Barbearia"> | string | null
    whatsapp?: StringNullableWithAggregatesFilter<"Barbearia"> | string | null
    mensagemLembrete?: StringNullableWithAggregatesFilter<"Barbearia"> | string | null
    lembreteAtivo?: BoolWithAggregatesFilter<"Barbearia"> | boolean
    foto?: StringNullableWithAggregatesFilter<"Barbearia"> | string | null
    fotos?: StringNullableListFilter<"Barbearia">
    ownerId?: StringWithAggregatesFilter<"Barbearia"> | string
    ativa?: BoolWithAggregatesFilter<"Barbearia"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Barbearia"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Barbearia"> | Date | string
  }

  export type BarbeiroWhereInput = {
    AND?: BarbeiroWhereInput | BarbeiroWhereInput[]
    OR?: BarbeiroWhereInput[]
    NOT?: BarbeiroWhereInput | BarbeiroWhereInput[]
    id?: StringFilter<"Barbeiro"> | string
    nome?: StringFilter<"Barbeiro"> | string
    foto?: StringNullableFilter<"Barbeiro"> | string | null
    barbeariaId?: StringFilter<"Barbeiro"> | string
    ativo?: BoolFilter<"Barbeiro"> | boolean
    createdAt?: DateTimeFilter<"Barbeiro"> | Date | string
    updatedAt?: DateTimeFilter<"Barbeiro"> | Date | string
    barbearia?: XOR<BarbeariaScalarRelationFilter, BarbeariaWhereInput>
    servicos?: ServicoListRelationFilter
    horarios?: HorarioDisponivelListRelationFilter
  }

  export type BarbeiroOrderByWithRelationInput = {
    id?: SortOrder
    nome?: SortOrder
    foto?: SortOrderInput | SortOrder
    barbeariaId?: SortOrder
    ativo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    barbearia?: BarbeariaOrderByWithRelationInput
    servicos?: ServicoOrderByRelationAggregateInput
    horarios?: HorarioDisponivelOrderByRelationAggregateInput
  }

  export type BarbeiroWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: BarbeiroWhereInput | BarbeiroWhereInput[]
    OR?: BarbeiroWhereInput[]
    NOT?: BarbeiroWhereInput | BarbeiroWhereInput[]
    nome?: StringFilter<"Barbeiro"> | string
    foto?: StringNullableFilter<"Barbeiro"> | string | null
    barbeariaId?: StringFilter<"Barbeiro"> | string
    ativo?: BoolFilter<"Barbeiro"> | boolean
    createdAt?: DateTimeFilter<"Barbeiro"> | Date | string
    updatedAt?: DateTimeFilter<"Barbeiro"> | Date | string
    barbearia?: XOR<BarbeariaScalarRelationFilter, BarbeariaWhereInput>
    servicos?: ServicoListRelationFilter
    horarios?: HorarioDisponivelListRelationFilter
  }, "id">

  export type BarbeiroOrderByWithAggregationInput = {
    id?: SortOrder
    nome?: SortOrder
    foto?: SortOrderInput | SortOrder
    barbeariaId?: SortOrder
    ativo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: BarbeiroCountOrderByAggregateInput
    _max?: BarbeiroMaxOrderByAggregateInput
    _min?: BarbeiroMinOrderByAggregateInput
  }

  export type BarbeiroScalarWhereWithAggregatesInput = {
    AND?: BarbeiroScalarWhereWithAggregatesInput | BarbeiroScalarWhereWithAggregatesInput[]
    OR?: BarbeiroScalarWhereWithAggregatesInput[]
    NOT?: BarbeiroScalarWhereWithAggregatesInput | BarbeiroScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Barbeiro"> | string
    nome?: StringWithAggregatesFilter<"Barbeiro"> | string
    foto?: StringNullableWithAggregatesFilter<"Barbeiro"> | string | null
    barbeariaId?: StringWithAggregatesFilter<"Barbeiro"> | string
    ativo?: BoolWithAggregatesFilter<"Barbeiro"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Barbeiro"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Barbeiro"> | Date | string
  }

  export type HorarioDisponivelWhereInput = {
    AND?: HorarioDisponivelWhereInput | HorarioDisponivelWhereInput[]
    OR?: HorarioDisponivelWhereInput[]
    NOT?: HorarioDisponivelWhereInput | HorarioDisponivelWhereInput[]
    id?: StringFilter<"HorarioDisponivel"> | string
    barbeiroId?: StringFilter<"HorarioDisponivel"> | string
    diaSemana?: IntFilter<"HorarioDisponivel"> | number
    horaInicio?: StringFilter<"HorarioDisponivel"> | string
    horaFim?: StringFilter<"HorarioDisponivel"> | string
    almocoInicio?: StringNullableFilter<"HorarioDisponivel"> | string | null
    almocoFim?: StringNullableFilter<"HorarioDisponivel"> | string | null
    createdAt?: DateTimeFilter<"HorarioDisponivel"> | Date | string
    updatedAt?: DateTimeFilter<"HorarioDisponivel"> | Date | string
    barbeiro?: XOR<BarbeiroScalarRelationFilter, BarbeiroWhereInput>
  }

  export type HorarioDisponivelOrderByWithRelationInput = {
    id?: SortOrder
    barbeiroId?: SortOrder
    diaSemana?: SortOrder
    horaInicio?: SortOrder
    horaFim?: SortOrder
    almocoInicio?: SortOrderInput | SortOrder
    almocoFim?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    barbeiro?: BarbeiroOrderByWithRelationInput
  }

  export type HorarioDisponivelWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: HorarioDisponivelWhereInput | HorarioDisponivelWhereInput[]
    OR?: HorarioDisponivelWhereInput[]
    NOT?: HorarioDisponivelWhereInput | HorarioDisponivelWhereInput[]
    barbeiroId?: StringFilter<"HorarioDisponivel"> | string
    diaSemana?: IntFilter<"HorarioDisponivel"> | number
    horaInicio?: StringFilter<"HorarioDisponivel"> | string
    horaFim?: StringFilter<"HorarioDisponivel"> | string
    almocoInicio?: StringNullableFilter<"HorarioDisponivel"> | string | null
    almocoFim?: StringNullableFilter<"HorarioDisponivel"> | string | null
    createdAt?: DateTimeFilter<"HorarioDisponivel"> | Date | string
    updatedAt?: DateTimeFilter<"HorarioDisponivel"> | Date | string
    barbeiro?: XOR<BarbeiroScalarRelationFilter, BarbeiroWhereInput>
  }, "id">

  export type HorarioDisponivelOrderByWithAggregationInput = {
    id?: SortOrder
    barbeiroId?: SortOrder
    diaSemana?: SortOrder
    horaInicio?: SortOrder
    horaFim?: SortOrder
    almocoInicio?: SortOrderInput | SortOrder
    almocoFim?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: HorarioDisponivelCountOrderByAggregateInput
    _avg?: HorarioDisponivelAvgOrderByAggregateInput
    _max?: HorarioDisponivelMaxOrderByAggregateInput
    _min?: HorarioDisponivelMinOrderByAggregateInput
    _sum?: HorarioDisponivelSumOrderByAggregateInput
  }

  export type HorarioDisponivelScalarWhereWithAggregatesInput = {
    AND?: HorarioDisponivelScalarWhereWithAggregatesInput | HorarioDisponivelScalarWhereWithAggregatesInput[]
    OR?: HorarioDisponivelScalarWhereWithAggregatesInput[]
    NOT?: HorarioDisponivelScalarWhereWithAggregatesInput | HorarioDisponivelScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"HorarioDisponivel"> | string
    barbeiroId?: StringWithAggregatesFilter<"HorarioDisponivel"> | string
    diaSemana?: IntWithAggregatesFilter<"HorarioDisponivel"> | number
    horaInicio?: StringWithAggregatesFilter<"HorarioDisponivel"> | string
    horaFim?: StringWithAggregatesFilter<"HorarioDisponivel"> | string
    almocoInicio?: StringNullableWithAggregatesFilter<"HorarioDisponivel"> | string | null
    almocoFim?: StringNullableWithAggregatesFilter<"HorarioDisponivel"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"HorarioDisponivel"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"HorarioDisponivel"> | Date | string
  }

  export type ServicoWhereInput = {
    AND?: ServicoWhereInput | ServicoWhereInput[]
    OR?: ServicoWhereInput[]
    NOT?: ServicoWhereInput | ServicoWhereInput[]
    id?: StringFilter<"Servico"> | string
    nome?: StringFilter<"Servico"> | string
    preco?: FloatFilter<"Servico"> | number
    duracao?: IntFilter<"Servico"> | number
    barbeariaId?: StringFilter<"Servico"> | string
    barbeiroId?: StringNullableFilter<"Servico"> | string | null
    ativo?: BoolFilter<"Servico"> | boolean
    createdAt?: DateTimeFilter<"Servico"> | Date | string
    updatedAt?: DateTimeFilter<"Servico"> | Date | string
    barbearia?: XOR<BarbeariaScalarRelationFilter, BarbeariaWhereInput>
    barbeiro?: XOR<BarbeiroNullableScalarRelationFilter, BarbeiroWhereInput> | null
  }

  export type ServicoOrderByWithRelationInput = {
    id?: SortOrder
    nome?: SortOrder
    preco?: SortOrder
    duracao?: SortOrder
    barbeariaId?: SortOrder
    barbeiroId?: SortOrderInput | SortOrder
    ativo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    barbearia?: BarbeariaOrderByWithRelationInput
    barbeiro?: BarbeiroOrderByWithRelationInput
  }

  export type ServicoWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ServicoWhereInput | ServicoWhereInput[]
    OR?: ServicoWhereInput[]
    NOT?: ServicoWhereInput | ServicoWhereInput[]
    nome?: StringFilter<"Servico"> | string
    preco?: FloatFilter<"Servico"> | number
    duracao?: IntFilter<"Servico"> | number
    barbeariaId?: StringFilter<"Servico"> | string
    barbeiroId?: StringNullableFilter<"Servico"> | string | null
    ativo?: BoolFilter<"Servico"> | boolean
    createdAt?: DateTimeFilter<"Servico"> | Date | string
    updatedAt?: DateTimeFilter<"Servico"> | Date | string
    barbearia?: XOR<BarbeariaScalarRelationFilter, BarbeariaWhereInput>
    barbeiro?: XOR<BarbeiroNullableScalarRelationFilter, BarbeiroWhereInput> | null
  }, "id">

  export type ServicoOrderByWithAggregationInput = {
    id?: SortOrder
    nome?: SortOrder
    preco?: SortOrder
    duracao?: SortOrder
    barbeariaId?: SortOrder
    barbeiroId?: SortOrderInput | SortOrder
    ativo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ServicoCountOrderByAggregateInput
    _avg?: ServicoAvgOrderByAggregateInput
    _max?: ServicoMaxOrderByAggregateInput
    _min?: ServicoMinOrderByAggregateInput
    _sum?: ServicoSumOrderByAggregateInput
  }

  export type ServicoScalarWhereWithAggregatesInput = {
    AND?: ServicoScalarWhereWithAggregatesInput | ServicoScalarWhereWithAggregatesInput[]
    OR?: ServicoScalarWhereWithAggregatesInput[]
    NOT?: ServicoScalarWhereWithAggregatesInput | ServicoScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Servico"> | string
    nome?: StringWithAggregatesFilter<"Servico"> | string
    preco?: FloatWithAggregatesFilter<"Servico"> | number
    duracao?: IntWithAggregatesFilter<"Servico"> | number
    barbeariaId?: StringWithAggregatesFilter<"Servico"> | string
    barbeiroId?: StringNullableWithAggregatesFilter<"Servico"> | string | null
    ativo?: BoolWithAggregatesFilter<"Servico"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Servico"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Servico"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    nome: string
    email: string
    senha?: string | null
    telefone?: string | null
    tipo?: $Enums.UserType
    plano?: $Enums.Plano
    googleId?: string | null
    avatar?: string | null
    emailVerified?: boolean
    authVersion?: number
    verificationAttempts?: number
    verificationCode?: string | null
    verificationExpires?: Date | string | null
    resetPasswordToken?: string | null
    resetPasswordExpires?: Date | string | null
    subscriptionId?: string | null
    latestPaymentId?: string | null
    subscriptionStatus?: string | null
    planoExpiraEm?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    barbearias?: BarbeariaCreateNestedManyWithoutOwnerInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    nome: string
    email: string
    senha?: string | null
    telefone?: string | null
    tipo?: $Enums.UserType
    plano?: $Enums.Plano
    googleId?: string | null
    avatar?: string | null
    emailVerified?: boolean
    authVersion?: number
    verificationAttempts?: number
    verificationCode?: string | null
    verificationExpires?: Date | string | null
    resetPasswordToken?: string | null
    resetPasswordExpires?: Date | string | null
    subscriptionId?: string | null
    latestPaymentId?: string | null
    subscriptionStatus?: string | null
    planoExpiraEm?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    barbearias?: BarbeariaUncheckedCreateNestedManyWithoutOwnerInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: NullableStringFieldUpdateOperationsInput | string | null
    telefone?: NullableStringFieldUpdateOperationsInput | string | null
    tipo?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    plano?: EnumPlanoFieldUpdateOperationsInput | $Enums.Plano
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    authVersion?: IntFieldUpdateOperationsInput | number
    verificationAttempts?: IntFieldUpdateOperationsInput | number
    verificationCode?: NullableStringFieldUpdateOperationsInput | string | null
    verificationExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resetPasswordToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetPasswordExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    latestPaymentId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionStatus?: NullableStringFieldUpdateOperationsInput | string | null
    planoExpiraEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    barbearias?: BarbeariaUpdateManyWithoutOwnerNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: NullableStringFieldUpdateOperationsInput | string | null
    telefone?: NullableStringFieldUpdateOperationsInput | string | null
    tipo?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    plano?: EnumPlanoFieldUpdateOperationsInput | $Enums.Plano
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    authVersion?: IntFieldUpdateOperationsInput | number
    verificationAttempts?: IntFieldUpdateOperationsInput | number
    verificationCode?: NullableStringFieldUpdateOperationsInput | string | null
    verificationExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resetPasswordToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetPasswordExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    latestPaymentId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionStatus?: NullableStringFieldUpdateOperationsInput | string | null
    planoExpiraEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    barbearias?: BarbeariaUncheckedUpdateManyWithoutOwnerNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    nome: string
    email: string
    senha?: string | null
    telefone?: string | null
    tipo?: $Enums.UserType
    plano?: $Enums.Plano
    googleId?: string | null
    avatar?: string | null
    emailVerified?: boolean
    authVersion?: number
    verificationAttempts?: number
    verificationCode?: string | null
    verificationExpires?: Date | string | null
    resetPasswordToken?: string | null
    resetPasswordExpires?: Date | string | null
    subscriptionId?: string | null
    latestPaymentId?: string | null
    subscriptionStatus?: string | null
    planoExpiraEm?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: NullableStringFieldUpdateOperationsInput | string | null
    telefone?: NullableStringFieldUpdateOperationsInput | string | null
    tipo?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    plano?: EnumPlanoFieldUpdateOperationsInput | $Enums.Plano
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    authVersion?: IntFieldUpdateOperationsInput | number
    verificationAttempts?: IntFieldUpdateOperationsInput | number
    verificationCode?: NullableStringFieldUpdateOperationsInput | string | null
    verificationExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resetPasswordToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetPasswordExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    latestPaymentId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionStatus?: NullableStringFieldUpdateOperationsInput | string | null
    planoExpiraEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: NullableStringFieldUpdateOperationsInput | string | null
    telefone?: NullableStringFieldUpdateOperationsInput | string | null
    tipo?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    plano?: EnumPlanoFieldUpdateOperationsInput | $Enums.Plano
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    authVersion?: IntFieldUpdateOperationsInput | number
    verificationAttempts?: IntFieldUpdateOperationsInput | number
    verificationCode?: NullableStringFieldUpdateOperationsInput | string | null
    verificationExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resetPasswordToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetPasswordExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    latestPaymentId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionStatus?: NullableStringFieldUpdateOperationsInput | string | null
    planoExpiraEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BarbeariaCreateInput = {
    id?: string
    nome: string
    slug: string
    descricao?: string | null
    endereco: string
    cidade: string
    estado: string
    cep?: string | null
    pontoReferencia?: string | null
    latitude?: number | null
    longitude?: number | null
    telefone?: string | null
    whatsapp?: string | null
    mensagemLembrete?: string | null
    lembreteAtivo?: boolean
    foto?: string | null
    fotos?: BarbeariaCreatefotosInput | string[]
    ativa?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    owner: UserCreateNestedOneWithoutBarbeariasInput
    barbeiros?: BarbeiroCreateNestedManyWithoutBarbeariaInput
    servicos?: ServicoCreateNestedManyWithoutBarbeariaInput
  }

  export type BarbeariaUncheckedCreateInput = {
    id?: string
    nome: string
    slug: string
    descricao?: string | null
    endereco: string
    cidade: string
    estado: string
    cep?: string | null
    pontoReferencia?: string | null
    latitude?: number | null
    longitude?: number | null
    telefone?: string | null
    whatsapp?: string | null
    mensagemLembrete?: string | null
    lembreteAtivo?: boolean
    foto?: string | null
    fotos?: BarbeariaCreatefotosInput | string[]
    ownerId: string
    ativa?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    barbeiros?: BarbeiroUncheckedCreateNestedManyWithoutBarbeariaInput
    servicos?: ServicoUncheckedCreateNestedManyWithoutBarbeariaInput
  }

  export type BarbeariaUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    endereco?: StringFieldUpdateOperationsInput | string
    cidade?: StringFieldUpdateOperationsInput | string
    estado?: StringFieldUpdateOperationsInput | string
    cep?: NullableStringFieldUpdateOperationsInput | string | null
    pontoReferencia?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    telefone?: NullableStringFieldUpdateOperationsInput | string | null
    whatsapp?: NullableStringFieldUpdateOperationsInput | string | null
    mensagemLembrete?: NullableStringFieldUpdateOperationsInput | string | null
    lembreteAtivo?: BoolFieldUpdateOperationsInput | boolean
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    fotos?: BarbeariaUpdatefotosInput | string[]
    ativa?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owner?: UserUpdateOneRequiredWithoutBarbeariasNestedInput
    barbeiros?: BarbeiroUpdateManyWithoutBarbeariaNestedInput
    servicos?: ServicoUpdateManyWithoutBarbeariaNestedInput
  }

  export type BarbeariaUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    endereco?: StringFieldUpdateOperationsInput | string
    cidade?: StringFieldUpdateOperationsInput | string
    estado?: StringFieldUpdateOperationsInput | string
    cep?: NullableStringFieldUpdateOperationsInput | string | null
    pontoReferencia?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    telefone?: NullableStringFieldUpdateOperationsInput | string | null
    whatsapp?: NullableStringFieldUpdateOperationsInput | string | null
    mensagemLembrete?: NullableStringFieldUpdateOperationsInput | string | null
    lembreteAtivo?: BoolFieldUpdateOperationsInput | boolean
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    fotos?: BarbeariaUpdatefotosInput | string[]
    ownerId?: StringFieldUpdateOperationsInput | string
    ativa?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    barbeiros?: BarbeiroUncheckedUpdateManyWithoutBarbeariaNestedInput
    servicos?: ServicoUncheckedUpdateManyWithoutBarbeariaNestedInput
  }

  export type BarbeariaCreateManyInput = {
    id?: string
    nome: string
    slug: string
    descricao?: string | null
    endereco: string
    cidade: string
    estado: string
    cep?: string | null
    pontoReferencia?: string | null
    latitude?: number | null
    longitude?: number | null
    telefone?: string | null
    whatsapp?: string | null
    mensagemLembrete?: string | null
    lembreteAtivo?: boolean
    foto?: string | null
    fotos?: BarbeariaCreatefotosInput | string[]
    ownerId: string
    ativa?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BarbeariaUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    endereco?: StringFieldUpdateOperationsInput | string
    cidade?: StringFieldUpdateOperationsInput | string
    estado?: StringFieldUpdateOperationsInput | string
    cep?: NullableStringFieldUpdateOperationsInput | string | null
    pontoReferencia?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    telefone?: NullableStringFieldUpdateOperationsInput | string | null
    whatsapp?: NullableStringFieldUpdateOperationsInput | string | null
    mensagemLembrete?: NullableStringFieldUpdateOperationsInput | string | null
    lembreteAtivo?: BoolFieldUpdateOperationsInput | boolean
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    fotos?: BarbeariaUpdatefotosInput | string[]
    ativa?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BarbeariaUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    endereco?: StringFieldUpdateOperationsInput | string
    cidade?: StringFieldUpdateOperationsInput | string
    estado?: StringFieldUpdateOperationsInput | string
    cep?: NullableStringFieldUpdateOperationsInput | string | null
    pontoReferencia?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    telefone?: NullableStringFieldUpdateOperationsInput | string | null
    whatsapp?: NullableStringFieldUpdateOperationsInput | string | null
    mensagemLembrete?: NullableStringFieldUpdateOperationsInput | string | null
    lembreteAtivo?: BoolFieldUpdateOperationsInput | boolean
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    fotos?: BarbeariaUpdatefotosInput | string[]
    ownerId?: StringFieldUpdateOperationsInput | string
    ativa?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BarbeiroCreateInput = {
    id?: string
    nome: string
    foto?: string | null
    ativo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    barbearia: BarbeariaCreateNestedOneWithoutBarbeirosInput
    servicos?: ServicoCreateNestedManyWithoutBarbeiroInput
    horarios?: HorarioDisponivelCreateNestedManyWithoutBarbeiroInput
  }

  export type BarbeiroUncheckedCreateInput = {
    id?: string
    nome: string
    foto?: string | null
    barbeariaId: string
    ativo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    servicos?: ServicoUncheckedCreateNestedManyWithoutBarbeiroInput
    horarios?: HorarioDisponivelUncheckedCreateNestedManyWithoutBarbeiroInput
  }

  export type BarbeiroUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    ativo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    barbearia?: BarbeariaUpdateOneRequiredWithoutBarbeirosNestedInput
    servicos?: ServicoUpdateManyWithoutBarbeiroNestedInput
    horarios?: HorarioDisponivelUpdateManyWithoutBarbeiroNestedInput
  }

  export type BarbeiroUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    barbeariaId?: StringFieldUpdateOperationsInput | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    servicos?: ServicoUncheckedUpdateManyWithoutBarbeiroNestedInput
    horarios?: HorarioDisponivelUncheckedUpdateManyWithoutBarbeiroNestedInput
  }

  export type BarbeiroCreateManyInput = {
    id?: string
    nome: string
    foto?: string | null
    barbeariaId: string
    ativo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BarbeiroUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    ativo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BarbeiroUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    barbeariaId?: StringFieldUpdateOperationsInput | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HorarioDisponivelCreateInput = {
    id?: string
    diaSemana: number
    horaInicio: string
    horaFim: string
    almocoInicio?: string | null
    almocoFim?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    barbeiro: BarbeiroCreateNestedOneWithoutHorariosInput
  }

  export type HorarioDisponivelUncheckedCreateInput = {
    id?: string
    barbeiroId: string
    diaSemana: number
    horaInicio: string
    horaFim: string
    almocoInicio?: string | null
    almocoFim?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type HorarioDisponivelUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    diaSemana?: IntFieldUpdateOperationsInput | number
    horaInicio?: StringFieldUpdateOperationsInput | string
    horaFim?: StringFieldUpdateOperationsInput | string
    almocoInicio?: NullableStringFieldUpdateOperationsInput | string | null
    almocoFim?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    barbeiro?: BarbeiroUpdateOneRequiredWithoutHorariosNestedInput
  }

  export type HorarioDisponivelUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    barbeiroId?: StringFieldUpdateOperationsInput | string
    diaSemana?: IntFieldUpdateOperationsInput | number
    horaInicio?: StringFieldUpdateOperationsInput | string
    horaFim?: StringFieldUpdateOperationsInput | string
    almocoInicio?: NullableStringFieldUpdateOperationsInput | string | null
    almocoFim?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HorarioDisponivelCreateManyInput = {
    id?: string
    barbeiroId: string
    diaSemana: number
    horaInicio: string
    horaFim: string
    almocoInicio?: string | null
    almocoFim?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type HorarioDisponivelUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    diaSemana?: IntFieldUpdateOperationsInput | number
    horaInicio?: StringFieldUpdateOperationsInput | string
    horaFim?: StringFieldUpdateOperationsInput | string
    almocoInicio?: NullableStringFieldUpdateOperationsInput | string | null
    almocoFim?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HorarioDisponivelUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    barbeiroId?: StringFieldUpdateOperationsInput | string
    diaSemana?: IntFieldUpdateOperationsInput | number
    horaInicio?: StringFieldUpdateOperationsInput | string
    horaFim?: StringFieldUpdateOperationsInput | string
    almocoInicio?: NullableStringFieldUpdateOperationsInput | string | null
    almocoFim?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServicoCreateInput = {
    id?: string
    nome: string
    preco: number
    duracao: number
    ativo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    barbearia: BarbeariaCreateNestedOneWithoutServicosInput
    barbeiro?: BarbeiroCreateNestedOneWithoutServicosInput
  }

  export type ServicoUncheckedCreateInput = {
    id?: string
    nome: string
    preco: number
    duracao: number
    barbeariaId: string
    barbeiroId?: string | null
    ativo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ServicoUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    preco?: FloatFieldUpdateOperationsInput | number
    duracao?: IntFieldUpdateOperationsInput | number
    ativo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    barbearia?: BarbeariaUpdateOneRequiredWithoutServicosNestedInput
    barbeiro?: BarbeiroUpdateOneWithoutServicosNestedInput
  }

  export type ServicoUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    preco?: FloatFieldUpdateOperationsInput | number
    duracao?: IntFieldUpdateOperationsInput | number
    barbeariaId?: StringFieldUpdateOperationsInput | string
    barbeiroId?: NullableStringFieldUpdateOperationsInput | string | null
    ativo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServicoCreateManyInput = {
    id?: string
    nome: string
    preco: number
    duracao: number
    barbeariaId: string
    barbeiroId?: string | null
    ativo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ServicoUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    preco?: FloatFieldUpdateOperationsInput | number
    duracao?: IntFieldUpdateOperationsInput | number
    ativo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServicoUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    preco?: FloatFieldUpdateOperationsInput | number
    duracao?: IntFieldUpdateOperationsInput | number
    barbeariaId?: StringFieldUpdateOperationsInput | string
    barbeiroId?: NullableStringFieldUpdateOperationsInput | string | null
    ativo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumUserTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.UserType | EnumUserTypeFieldRefInput<$PrismaModel>
    in?: $Enums.UserType[] | ListEnumUserTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserType[] | ListEnumUserTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumUserTypeFilter<$PrismaModel> | $Enums.UserType
  }

  export type EnumPlanoFilter<$PrismaModel = never> = {
    equals?: $Enums.Plano | EnumPlanoFieldRefInput<$PrismaModel>
    in?: $Enums.Plano[] | ListEnumPlanoFieldRefInput<$PrismaModel>
    notIn?: $Enums.Plano[] | ListEnumPlanoFieldRefInput<$PrismaModel>
    not?: NestedEnumPlanoFilter<$PrismaModel> | $Enums.Plano
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type BarbeariaListRelationFilter = {
    every?: BarbeariaWhereInput
    some?: BarbeariaWhereInput
    none?: BarbeariaWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type BarbeariaOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    email?: SortOrder
    senha?: SortOrder
    telefone?: SortOrder
    tipo?: SortOrder
    plano?: SortOrder
    googleId?: SortOrder
    avatar?: SortOrder
    emailVerified?: SortOrder
    authVersion?: SortOrder
    verificationAttempts?: SortOrder
    verificationCode?: SortOrder
    verificationExpires?: SortOrder
    resetPasswordToken?: SortOrder
    resetPasswordExpires?: SortOrder
    subscriptionId?: SortOrder
    latestPaymentId?: SortOrder
    subscriptionStatus?: SortOrder
    planoExpiraEm?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    authVersion?: SortOrder
    verificationAttempts?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    email?: SortOrder
    senha?: SortOrder
    telefone?: SortOrder
    tipo?: SortOrder
    plano?: SortOrder
    googleId?: SortOrder
    avatar?: SortOrder
    emailVerified?: SortOrder
    authVersion?: SortOrder
    verificationAttempts?: SortOrder
    verificationCode?: SortOrder
    verificationExpires?: SortOrder
    resetPasswordToken?: SortOrder
    resetPasswordExpires?: SortOrder
    subscriptionId?: SortOrder
    latestPaymentId?: SortOrder
    subscriptionStatus?: SortOrder
    planoExpiraEm?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    email?: SortOrder
    senha?: SortOrder
    telefone?: SortOrder
    tipo?: SortOrder
    plano?: SortOrder
    googleId?: SortOrder
    avatar?: SortOrder
    emailVerified?: SortOrder
    authVersion?: SortOrder
    verificationAttempts?: SortOrder
    verificationCode?: SortOrder
    verificationExpires?: SortOrder
    resetPasswordToken?: SortOrder
    resetPasswordExpires?: SortOrder
    subscriptionId?: SortOrder
    latestPaymentId?: SortOrder
    subscriptionStatus?: SortOrder
    planoExpiraEm?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    authVersion?: SortOrder
    verificationAttempts?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumUserTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserType | EnumUserTypeFieldRefInput<$PrismaModel>
    in?: $Enums.UserType[] | ListEnumUserTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserType[] | ListEnumUserTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumUserTypeWithAggregatesFilter<$PrismaModel> | $Enums.UserType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserTypeFilter<$PrismaModel>
    _max?: NestedEnumUserTypeFilter<$PrismaModel>
  }

  export type EnumPlanoWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Plano | EnumPlanoFieldRefInput<$PrismaModel>
    in?: $Enums.Plano[] | ListEnumPlanoFieldRefInput<$PrismaModel>
    notIn?: $Enums.Plano[] | ListEnumPlanoFieldRefInput<$PrismaModel>
    not?: NestedEnumPlanoWithAggregatesFilter<$PrismaModel> | $Enums.Plano
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPlanoFilter<$PrismaModel>
    _max?: NestedEnumPlanoFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type BarbeiroListRelationFilter = {
    every?: BarbeiroWhereInput
    some?: BarbeiroWhereInput
    none?: BarbeiroWhereInput
  }

  export type ServicoListRelationFilter = {
    every?: ServicoWhereInput
    some?: ServicoWhereInput
    none?: ServicoWhereInput
  }

  export type BarbeiroOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ServicoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BarbeariaCountOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    slug?: SortOrder
    descricao?: SortOrder
    endereco?: SortOrder
    cidade?: SortOrder
    estado?: SortOrder
    cep?: SortOrder
    pontoReferencia?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    telefone?: SortOrder
    whatsapp?: SortOrder
    mensagemLembrete?: SortOrder
    lembreteAtivo?: SortOrder
    foto?: SortOrder
    fotos?: SortOrder
    ownerId?: SortOrder
    ativa?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BarbeariaAvgOrderByAggregateInput = {
    latitude?: SortOrder
    longitude?: SortOrder
  }

  export type BarbeariaMaxOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    slug?: SortOrder
    descricao?: SortOrder
    endereco?: SortOrder
    cidade?: SortOrder
    estado?: SortOrder
    cep?: SortOrder
    pontoReferencia?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    telefone?: SortOrder
    whatsapp?: SortOrder
    mensagemLembrete?: SortOrder
    lembreteAtivo?: SortOrder
    foto?: SortOrder
    ownerId?: SortOrder
    ativa?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BarbeariaMinOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    slug?: SortOrder
    descricao?: SortOrder
    endereco?: SortOrder
    cidade?: SortOrder
    estado?: SortOrder
    cep?: SortOrder
    pontoReferencia?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    telefone?: SortOrder
    whatsapp?: SortOrder
    mensagemLembrete?: SortOrder
    lembreteAtivo?: SortOrder
    foto?: SortOrder
    ownerId?: SortOrder
    ativa?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BarbeariaSumOrderByAggregateInput = {
    latitude?: SortOrder
    longitude?: SortOrder
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type BarbeariaScalarRelationFilter = {
    is?: BarbeariaWhereInput
    isNot?: BarbeariaWhereInput
  }

  export type HorarioDisponivelListRelationFilter = {
    every?: HorarioDisponivelWhereInput
    some?: HorarioDisponivelWhereInput
    none?: HorarioDisponivelWhereInput
  }

  export type HorarioDisponivelOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BarbeiroCountOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    foto?: SortOrder
    barbeariaId?: SortOrder
    ativo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BarbeiroMaxOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    foto?: SortOrder
    barbeariaId?: SortOrder
    ativo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BarbeiroMinOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    foto?: SortOrder
    barbeariaId?: SortOrder
    ativo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BarbeiroScalarRelationFilter = {
    is?: BarbeiroWhereInput
    isNot?: BarbeiroWhereInput
  }

  export type HorarioDisponivelCountOrderByAggregateInput = {
    id?: SortOrder
    barbeiroId?: SortOrder
    diaSemana?: SortOrder
    horaInicio?: SortOrder
    horaFim?: SortOrder
    almocoInicio?: SortOrder
    almocoFim?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type HorarioDisponivelAvgOrderByAggregateInput = {
    diaSemana?: SortOrder
  }

  export type HorarioDisponivelMaxOrderByAggregateInput = {
    id?: SortOrder
    barbeiroId?: SortOrder
    diaSemana?: SortOrder
    horaInicio?: SortOrder
    horaFim?: SortOrder
    almocoInicio?: SortOrder
    almocoFim?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type HorarioDisponivelMinOrderByAggregateInput = {
    id?: SortOrder
    barbeiroId?: SortOrder
    diaSemana?: SortOrder
    horaInicio?: SortOrder
    horaFim?: SortOrder
    almocoInicio?: SortOrder
    almocoFim?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type HorarioDisponivelSumOrderByAggregateInput = {
    diaSemana?: SortOrder
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type BarbeiroNullableScalarRelationFilter = {
    is?: BarbeiroWhereInput | null
    isNot?: BarbeiroWhereInput | null
  }

  export type ServicoCountOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    preco?: SortOrder
    duracao?: SortOrder
    barbeariaId?: SortOrder
    barbeiroId?: SortOrder
    ativo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ServicoAvgOrderByAggregateInput = {
    preco?: SortOrder
    duracao?: SortOrder
  }

  export type ServicoMaxOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    preco?: SortOrder
    duracao?: SortOrder
    barbeariaId?: SortOrder
    barbeiroId?: SortOrder
    ativo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ServicoMinOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    preco?: SortOrder
    duracao?: SortOrder
    barbeariaId?: SortOrder
    barbeiroId?: SortOrder
    ativo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ServicoSumOrderByAggregateInput = {
    preco?: SortOrder
    duracao?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type BarbeariaCreateNestedManyWithoutOwnerInput = {
    create?: XOR<BarbeariaCreateWithoutOwnerInput, BarbeariaUncheckedCreateWithoutOwnerInput> | BarbeariaCreateWithoutOwnerInput[] | BarbeariaUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: BarbeariaCreateOrConnectWithoutOwnerInput | BarbeariaCreateOrConnectWithoutOwnerInput[]
    createMany?: BarbeariaCreateManyOwnerInputEnvelope
    connect?: BarbeariaWhereUniqueInput | BarbeariaWhereUniqueInput[]
  }

  export type BarbeariaUncheckedCreateNestedManyWithoutOwnerInput = {
    create?: XOR<BarbeariaCreateWithoutOwnerInput, BarbeariaUncheckedCreateWithoutOwnerInput> | BarbeariaCreateWithoutOwnerInput[] | BarbeariaUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: BarbeariaCreateOrConnectWithoutOwnerInput | BarbeariaCreateOrConnectWithoutOwnerInput[]
    createMany?: BarbeariaCreateManyOwnerInputEnvelope
    connect?: BarbeariaWhereUniqueInput | BarbeariaWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumUserTypeFieldUpdateOperationsInput = {
    set?: $Enums.UserType
  }

  export type EnumPlanoFieldUpdateOperationsInput = {
    set?: $Enums.Plano
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type BarbeariaUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<BarbeariaCreateWithoutOwnerInput, BarbeariaUncheckedCreateWithoutOwnerInput> | BarbeariaCreateWithoutOwnerInput[] | BarbeariaUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: BarbeariaCreateOrConnectWithoutOwnerInput | BarbeariaCreateOrConnectWithoutOwnerInput[]
    upsert?: BarbeariaUpsertWithWhereUniqueWithoutOwnerInput | BarbeariaUpsertWithWhereUniqueWithoutOwnerInput[]
    createMany?: BarbeariaCreateManyOwnerInputEnvelope
    set?: BarbeariaWhereUniqueInput | BarbeariaWhereUniqueInput[]
    disconnect?: BarbeariaWhereUniqueInput | BarbeariaWhereUniqueInput[]
    delete?: BarbeariaWhereUniqueInput | BarbeariaWhereUniqueInput[]
    connect?: BarbeariaWhereUniqueInput | BarbeariaWhereUniqueInput[]
    update?: BarbeariaUpdateWithWhereUniqueWithoutOwnerInput | BarbeariaUpdateWithWhereUniqueWithoutOwnerInput[]
    updateMany?: BarbeariaUpdateManyWithWhereWithoutOwnerInput | BarbeariaUpdateManyWithWhereWithoutOwnerInput[]
    deleteMany?: BarbeariaScalarWhereInput | BarbeariaScalarWhereInput[]
  }

  export type BarbeariaUncheckedUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<BarbeariaCreateWithoutOwnerInput, BarbeariaUncheckedCreateWithoutOwnerInput> | BarbeariaCreateWithoutOwnerInput[] | BarbeariaUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: BarbeariaCreateOrConnectWithoutOwnerInput | BarbeariaCreateOrConnectWithoutOwnerInput[]
    upsert?: BarbeariaUpsertWithWhereUniqueWithoutOwnerInput | BarbeariaUpsertWithWhereUniqueWithoutOwnerInput[]
    createMany?: BarbeariaCreateManyOwnerInputEnvelope
    set?: BarbeariaWhereUniqueInput | BarbeariaWhereUniqueInput[]
    disconnect?: BarbeariaWhereUniqueInput | BarbeariaWhereUniqueInput[]
    delete?: BarbeariaWhereUniqueInput | BarbeariaWhereUniqueInput[]
    connect?: BarbeariaWhereUniqueInput | BarbeariaWhereUniqueInput[]
    update?: BarbeariaUpdateWithWhereUniqueWithoutOwnerInput | BarbeariaUpdateWithWhereUniqueWithoutOwnerInput[]
    updateMany?: BarbeariaUpdateManyWithWhereWithoutOwnerInput | BarbeariaUpdateManyWithWhereWithoutOwnerInput[]
    deleteMany?: BarbeariaScalarWhereInput | BarbeariaScalarWhereInput[]
  }

  export type BarbeariaCreatefotosInput = {
    set: string[]
  }

  export type UserCreateNestedOneWithoutBarbeariasInput = {
    create?: XOR<UserCreateWithoutBarbeariasInput, UserUncheckedCreateWithoutBarbeariasInput>
    connectOrCreate?: UserCreateOrConnectWithoutBarbeariasInput
    connect?: UserWhereUniqueInput
  }

  export type BarbeiroCreateNestedManyWithoutBarbeariaInput = {
    create?: XOR<BarbeiroCreateWithoutBarbeariaInput, BarbeiroUncheckedCreateWithoutBarbeariaInput> | BarbeiroCreateWithoutBarbeariaInput[] | BarbeiroUncheckedCreateWithoutBarbeariaInput[]
    connectOrCreate?: BarbeiroCreateOrConnectWithoutBarbeariaInput | BarbeiroCreateOrConnectWithoutBarbeariaInput[]
    createMany?: BarbeiroCreateManyBarbeariaInputEnvelope
    connect?: BarbeiroWhereUniqueInput | BarbeiroWhereUniqueInput[]
  }

  export type ServicoCreateNestedManyWithoutBarbeariaInput = {
    create?: XOR<ServicoCreateWithoutBarbeariaInput, ServicoUncheckedCreateWithoutBarbeariaInput> | ServicoCreateWithoutBarbeariaInput[] | ServicoUncheckedCreateWithoutBarbeariaInput[]
    connectOrCreate?: ServicoCreateOrConnectWithoutBarbeariaInput | ServicoCreateOrConnectWithoutBarbeariaInput[]
    createMany?: ServicoCreateManyBarbeariaInputEnvelope
    connect?: ServicoWhereUniqueInput | ServicoWhereUniqueInput[]
  }

  export type BarbeiroUncheckedCreateNestedManyWithoutBarbeariaInput = {
    create?: XOR<BarbeiroCreateWithoutBarbeariaInput, BarbeiroUncheckedCreateWithoutBarbeariaInput> | BarbeiroCreateWithoutBarbeariaInput[] | BarbeiroUncheckedCreateWithoutBarbeariaInput[]
    connectOrCreate?: BarbeiroCreateOrConnectWithoutBarbeariaInput | BarbeiroCreateOrConnectWithoutBarbeariaInput[]
    createMany?: BarbeiroCreateManyBarbeariaInputEnvelope
    connect?: BarbeiroWhereUniqueInput | BarbeiroWhereUniqueInput[]
  }

  export type ServicoUncheckedCreateNestedManyWithoutBarbeariaInput = {
    create?: XOR<ServicoCreateWithoutBarbeariaInput, ServicoUncheckedCreateWithoutBarbeariaInput> | ServicoCreateWithoutBarbeariaInput[] | ServicoUncheckedCreateWithoutBarbeariaInput[]
    connectOrCreate?: ServicoCreateOrConnectWithoutBarbeariaInput | ServicoCreateOrConnectWithoutBarbeariaInput[]
    createMany?: ServicoCreateManyBarbeariaInputEnvelope
    connect?: ServicoWhereUniqueInput | ServicoWhereUniqueInput[]
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BarbeariaUpdatefotosInput = {
    set?: string[]
    push?: string | string[]
  }

  export type UserUpdateOneRequiredWithoutBarbeariasNestedInput = {
    create?: XOR<UserCreateWithoutBarbeariasInput, UserUncheckedCreateWithoutBarbeariasInput>
    connectOrCreate?: UserCreateOrConnectWithoutBarbeariasInput
    upsert?: UserUpsertWithoutBarbeariasInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutBarbeariasInput, UserUpdateWithoutBarbeariasInput>, UserUncheckedUpdateWithoutBarbeariasInput>
  }

  export type BarbeiroUpdateManyWithoutBarbeariaNestedInput = {
    create?: XOR<BarbeiroCreateWithoutBarbeariaInput, BarbeiroUncheckedCreateWithoutBarbeariaInput> | BarbeiroCreateWithoutBarbeariaInput[] | BarbeiroUncheckedCreateWithoutBarbeariaInput[]
    connectOrCreate?: BarbeiroCreateOrConnectWithoutBarbeariaInput | BarbeiroCreateOrConnectWithoutBarbeariaInput[]
    upsert?: BarbeiroUpsertWithWhereUniqueWithoutBarbeariaInput | BarbeiroUpsertWithWhereUniqueWithoutBarbeariaInput[]
    createMany?: BarbeiroCreateManyBarbeariaInputEnvelope
    set?: BarbeiroWhereUniqueInput | BarbeiroWhereUniqueInput[]
    disconnect?: BarbeiroWhereUniqueInput | BarbeiroWhereUniqueInput[]
    delete?: BarbeiroWhereUniqueInput | BarbeiroWhereUniqueInput[]
    connect?: BarbeiroWhereUniqueInput | BarbeiroWhereUniqueInput[]
    update?: BarbeiroUpdateWithWhereUniqueWithoutBarbeariaInput | BarbeiroUpdateWithWhereUniqueWithoutBarbeariaInput[]
    updateMany?: BarbeiroUpdateManyWithWhereWithoutBarbeariaInput | BarbeiroUpdateManyWithWhereWithoutBarbeariaInput[]
    deleteMany?: BarbeiroScalarWhereInput | BarbeiroScalarWhereInput[]
  }

  export type ServicoUpdateManyWithoutBarbeariaNestedInput = {
    create?: XOR<ServicoCreateWithoutBarbeariaInput, ServicoUncheckedCreateWithoutBarbeariaInput> | ServicoCreateWithoutBarbeariaInput[] | ServicoUncheckedCreateWithoutBarbeariaInput[]
    connectOrCreate?: ServicoCreateOrConnectWithoutBarbeariaInput | ServicoCreateOrConnectWithoutBarbeariaInput[]
    upsert?: ServicoUpsertWithWhereUniqueWithoutBarbeariaInput | ServicoUpsertWithWhereUniqueWithoutBarbeariaInput[]
    createMany?: ServicoCreateManyBarbeariaInputEnvelope
    set?: ServicoWhereUniqueInput | ServicoWhereUniqueInput[]
    disconnect?: ServicoWhereUniqueInput | ServicoWhereUniqueInput[]
    delete?: ServicoWhereUniqueInput | ServicoWhereUniqueInput[]
    connect?: ServicoWhereUniqueInput | ServicoWhereUniqueInput[]
    update?: ServicoUpdateWithWhereUniqueWithoutBarbeariaInput | ServicoUpdateWithWhereUniqueWithoutBarbeariaInput[]
    updateMany?: ServicoUpdateManyWithWhereWithoutBarbeariaInput | ServicoUpdateManyWithWhereWithoutBarbeariaInput[]
    deleteMany?: ServicoScalarWhereInput | ServicoScalarWhereInput[]
  }

  export type BarbeiroUncheckedUpdateManyWithoutBarbeariaNestedInput = {
    create?: XOR<BarbeiroCreateWithoutBarbeariaInput, BarbeiroUncheckedCreateWithoutBarbeariaInput> | BarbeiroCreateWithoutBarbeariaInput[] | BarbeiroUncheckedCreateWithoutBarbeariaInput[]
    connectOrCreate?: BarbeiroCreateOrConnectWithoutBarbeariaInput | BarbeiroCreateOrConnectWithoutBarbeariaInput[]
    upsert?: BarbeiroUpsertWithWhereUniqueWithoutBarbeariaInput | BarbeiroUpsertWithWhereUniqueWithoutBarbeariaInput[]
    createMany?: BarbeiroCreateManyBarbeariaInputEnvelope
    set?: BarbeiroWhereUniqueInput | BarbeiroWhereUniqueInput[]
    disconnect?: BarbeiroWhereUniqueInput | BarbeiroWhereUniqueInput[]
    delete?: BarbeiroWhereUniqueInput | BarbeiroWhereUniqueInput[]
    connect?: BarbeiroWhereUniqueInput | BarbeiroWhereUniqueInput[]
    update?: BarbeiroUpdateWithWhereUniqueWithoutBarbeariaInput | BarbeiroUpdateWithWhereUniqueWithoutBarbeariaInput[]
    updateMany?: BarbeiroUpdateManyWithWhereWithoutBarbeariaInput | BarbeiroUpdateManyWithWhereWithoutBarbeariaInput[]
    deleteMany?: BarbeiroScalarWhereInput | BarbeiroScalarWhereInput[]
  }

  export type ServicoUncheckedUpdateManyWithoutBarbeariaNestedInput = {
    create?: XOR<ServicoCreateWithoutBarbeariaInput, ServicoUncheckedCreateWithoutBarbeariaInput> | ServicoCreateWithoutBarbeariaInput[] | ServicoUncheckedCreateWithoutBarbeariaInput[]
    connectOrCreate?: ServicoCreateOrConnectWithoutBarbeariaInput | ServicoCreateOrConnectWithoutBarbeariaInput[]
    upsert?: ServicoUpsertWithWhereUniqueWithoutBarbeariaInput | ServicoUpsertWithWhereUniqueWithoutBarbeariaInput[]
    createMany?: ServicoCreateManyBarbeariaInputEnvelope
    set?: ServicoWhereUniqueInput | ServicoWhereUniqueInput[]
    disconnect?: ServicoWhereUniqueInput | ServicoWhereUniqueInput[]
    delete?: ServicoWhereUniqueInput | ServicoWhereUniqueInput[]
    connect?: ServicoWhereUniqueInput | ServicoWhereUniqueInput[]
    update?: ServicoUpdateWithWhereUniqueWithoutBarbeariaInput | ServicoUpdateWithWhereUniqueWithoutBarbeariaInput[]
    updateMany?: ServicoUpdateManyWithWhereWithoutBarbeariaInput | ServicoUpdateManyWithWhereWithoutBarbeariaInput[]
    deleteMany?: ServicoScalarWhereInput | ServicoScalarWhereInput[]
  }

  export type BarbeariaCreateNestedOneWithoutBarbeirosInput = {
    create?: XOR<BarbeariaCreateWithoutBarbeirosInput, BarbeariaUncheckedCreateWithoutBarbeirosInput>
    connectOrCreate?: BarbeariaCreateOrConnectWithoutBarbeirosInput
    connect?: BarbeariaWhereUniqueInput
  }

  export type ServicoCreateNestedManyWithoutBarbeiroInput = {
    create?: XOR<ServicoCreateWithoutBarbeiroInput, ServicoUncheckedCreateWithoutBarbeiroInput> | ServicoCreateWithoutBarbeiroInput[] | ServicoUncheckedCreateWithoutBarbeiroInput[]
    connectOrCreate?: ServicoCreateOrConnectWithoutBarbeiroInput | ServicoCreateOrConnectWithoutBarbeiroInput[]
    createMany?: ServicoCreateManyBarbeiroInputEnvelope
    connect?: ServicoWhereUniqueInput | ServicoWhereUniqueInput[]
  }

  export type HorarioDisponivelCreateNestedManyWithoutBarbeiroInput = {
    create?: XOR<HorarioDisponivelCreateWithoutBarbeiroInput, HorarioDisponivelUncheckedCreateWithoutBarbeiroInput> | HorarioDisponivelCreateWithoutBarbeiroInput[] | HorarioDisponivelUncheckedCreateWithoutBarbeiroInput[]
    connectOrCreate?: HorarioDisponivelCreateOrConnectWithoutBarbeiroInput | HorarioDisponivelCreateOrConnectWithoutBarbeiroInput[]
    createMany?: HorarioDisponivelCreateManyBarbeiroInputEnvelope
    connect?: HorarioDisponivelWhereUniqueInput | HorarioDisponivelWhereUniqueInput[]
  }

  export type ServicoUncheckedCreateNestedManyWithoutBarbeiroInput = {
    create?: XOR<ServicoCreateWithoutBarbeiroInput, ServicoUncheckedCreateWithoutBarbeiroInput> | ServicoCreateWithoutBarbeiroInput[] | ServicoUncheckedCreateWithoutBarbeiroInput[]
    connectOrCreate?: ServicoCreateOrConnectWithoutBarbeiroInput | ServicoCreateOrConnectWithoutBarbeiroInput[]
    createMany?: ServicoCreateManyBarbeiroInputEnvelope
    connect?: ServicoWhereUniqueInput | ServicoWhereUniqueInput[]
  }

  export type HorarioDisponivelUncheckedCreateNestedManyWithoutBarbeiroInput = {
    create?: XOR<HorarioDisponivelCreateWithoutBarbeiroInput, HorarioDisponivelUncheckedCreateWithoutBarbeiroInput> | HorarioDisponivelCreateWithoutBarbeiroInput[] | HorarioDisponivelUncheckedCreateWithoutBarbeiroInput[]
    connectOrCreate?: HorarioDisponivelCreateOrConnectWithoutBarbeiroInput | HorarioDisponivelCreateOrConnectWithoutBarbeiroInput[]
    createMany?: HorarioDisponivelCreateManyBarbeiroInputEnvelope
    connect?: HorarioDisponivelWhereUniqueInput | HorarioDisponivelWhereUniqueInput[]
  }

  export type BarbeariaUpdateOneRequiredWithoutBarbeirosNestedInput = {
    create?: XOR<BarbeariaCreateWithoutBarbeirosInput, BarbeariaUncheckedCreateWithoutBarbeirosInput>
    connectOrCreate?: BarbeariaCreateOrConnectWithoutBarbeirosInput
    upsert?: BarbeariaUpsertWithoutBarbeirosInput
    connect?: BarbeariaWhereUniqueInput
    update?: XOR<XOR<BarbeariaUpdateToOneWithWhereWithoutBarbeirosInput, BarbeariaUpdateWithoutBarbeirosInput>, BarbeariaUncheckedUpdateWithoutBarbeirosInput>
  }

  export type ServicoUpdateManyWithoutBarbeiroNestedInput = {
    create?: XOR<ServicoCreateWithoutBarbeiroInput, ServicoUncheckedCreateWithoutBarbeiroInput> | ServicoCreateWithoutBarbeiroInput[] | ServicoUncheckedCreateWithoutBarbeiroInput[]
    connectOrCreate?: ServicoCreateOrConnectWithoutBarbeiroInput | ServicoCreateOrConnectWithoutBarbeiroInput[]
    upsert?: ServicoUpsertWithWhereUniqueWithoutBarbeiroInput | ServicoUpsertWithWhereUniqueWithoutBarbeiroInput[]
    createMany?: ServicoCreateManyBarbeiroInputEnvelope
    set?: ServicoWhereUniqueInput | ServicoWhereUniqueInput[]
    disconnect?: ServicoWhereUniqueInput | ServicoWhereUniqueInput[]
    delete?: ServicoWhereUniqueInput | ServicoWhereUniqueInput[]
    connect?: ServicoWhereUniqueInput | ServicoWhereUniqueInput[]
    update?: ServicoUpdateWithWhereUniqueWithoutBarbeiroInput | ServicoUpdateWithWhereUniqueWithoutBarbeiroInput[]
    updateMany?: ServicoUpdateManyWithWhereWithoutBarbeiroInput | ServicoUpdateManyWithWhereWithoutBarbeiroInput[]
    deleteMany?: ServicoScalarWhereInput | ServicoScalarWhereInput[]
  }

  export type HorarioDisponivelUpdateManyWithoutBarbeiroNestedInput = {
    create?: XOR<HorarioDisponivelCreateWithoutBarbeiroInput, HorarioDisponivelUncheckedCreateWithoutBarbeiroInput> | HorarioDisponivelCreateWithoutBarbeiroInput[] | HorarioDisponivelUncheckedCreateWithoutBarbeiroInput[]
    connectOrCreate?: HorarioDisponivelCreateOrConnectWithoutBarbeiroInput | HorarioDisponivelCreateOrConnectWithoutBarbeiroInput[]
    upsert?: HorarioDisponivelUpsertWithWhereUniqueWithoutBarbeiroInput | HorarioDisponivelUpsertWithWhereUniqueWithoutBarbeiroInput[]
    createMany?: HorarioDisponivelCreateManyBarbeiroInputEnvelope
    set?: HorarioDisponivelWhereUniqueInput | HorarioDisponivelWhereUniqueInput[]
    disconnect?: HorarioDisponivelWhereUniqueInput | HorarioDisponivelWhereUniqueInput[]
    delete?: HorarioDisponivelWhereUniqueInput | HorarioDisponivelWhereUniqueInput[]
    connect?: HorarioDisponivelWhereUniqueInput | HorarioDisponivelWhereUniqueInput[]
    update?: HorarioDisponivelUpdateWithWhereUniqueWithoutBarbeiroInput | HorarioDisponivelUpdateWithWhereUniqueWithoutBarbeiroInput[]
    updateMany?: HorarioDisponivelUpdateManyWithWhereWithoutBarbeiroInput | HorarioDisponivelUpdateManyWithWhereWithoutBarbeiroInput[]
    deleteMany?: HorarioDisponivelScalarWhereInput | HorarioDisponivelScalarWhereInput[]
  }

  export type ServicoUncheckedUpdateManyWithoutBarbeiroNestedInput = {
    create?: XOR<ServicoCreateWithoutBarbeiroInput, ServicoUncheckedCreateWithoutBarbeiroInput> | ServicoCreateWithoutBarbeiroInput[] | ServicoUncheckedCreateWithoutBarbeiroInput[]
    connectOrCreate?: ServicoCreateOrConnectWithoutBarbeiroInput | ServicoCreateOrConnectWithoutBarbeiroInput[]
    upsert?: ServicoUpsertWithWhereUniqueWithoutBarbeiroInput | ServicoUpsertWithWhereUniqueWithoutBarbeiroInput[]
    createMany?: ServicoCreateManyBarbeiroInputEnvelope
    set?: ServicoWhereUniqueInput | ServicoWhereUniqueInput[]
    disconnect?: ServicoWhereUniqueInput | ServicoWhereUniqueInput[]
    delete?: ServicoWhereUniqueInput | ServicoWhereUniqueInput[]
    connect?: ServicoWhereUniqueInput | ServicoWhereUniqueInput[]
    update?: ServicoUpdateWithWhereUniqueWithoutBarbeiroInput | ServicoUpdateWithWhereUniqueWithoutBarbeiroInput[]
    updateMany?: ServicoUpdateManyWithWhereWithoutBarbeiroInput | ServicoUpdateManyWithWhereWithoutBarbeiroInput[]
    deleteMany?: ServicoScalarWhereInput | ServicoScalarWhereInput[]
  }

  export type HorarioDisponivelUncheckedUpdateManyWithoutBarbeiroNestedInput = {
    create?: XOR<HorarioDisponivelCreateWithoutBarbeiroInput, HorarioDisponivelUncheckedCreateWithoutBarbeiroInput> | HorarioDisponivelCreateWithoutBarbeiroInput[] | HorarioDisponivelUncheckedCreateWithoutBarbeiroInput[]
    connectOrCreate?: HorarioDisponivelCreateOrConnectWithoutBarbeiroInput | HorarioDisponivelCreateOrConnectWithoutBarbeiroInput[]
    upsert?: HorarioDisponivelUpsertWithWhereUniqueWithoutBarbeiroInput | HorarioDisponivelUpsertWithWhereUniqueWithoutBarbeiroInput[]
    createMany?: HorarioDisponivelCreateManyBarbeiroInputEnvelope
    set?: HorarioDisponivelWhereUniqueInput | HorarioDisponivelWhereUniqueInput[]
    disconnect?: HorarioDisponivelWhereUniqueInput | HorarioDisponivelWhereUniqueInput[]
    delete?: HorarioDisponivelWhereUniqueInput | HorarioDisponivelWhereUniqueInput[]
    connect?: HorarioDisponivelWhereUniqueInput | HorarioDisponivelWhereUniqueInput[]
    update?: HorarioDisponivelUpdateWithWhereUniqueWithoutBarbeiroInput | HorarioDisponivelUpdateWithWhereUniqueWithoutBarbeiroInput[]
    updateMany?: HorarioDisponivelUpdateManyWithWhereWithoutBarbeiroInput | HorarioDisponivelUpdateManyWithWhereWithoutBarbeiroInput[]
    deleteMany?: HorarioDisponivelScalarWhereInput | HorarioDisponivelScalarWhereInput[]
  }

  export type BarbeiroCreateNestedOneWithoutHorariosInput = {
    create?: XOR<BarbeiroCreateWithoutHorariosInput, BarbeiroUncheckedCreateWithoutHorariosInput>
    connectOrCreate?: BarbeiroCreateOrConnectWithoutHorariosInput
    connect?: BarbeiroWhereUniqueInput
  }

  export type BarbeiroUpdateOneRequiredWithoutHorariosNestedInput = {
    create?: XOR<BarbeiroCreateWithoutHorariosInput, BarbeiroUncheckedCreateWithoutHorariosInput>
    connectOrCreate?: BarbeiroCreateOrConnectWithoutHorariosInput
    upsert?: BarbeiroUpsertWithoutHorariosInput
    connect?: BarbeiroWhereUniqueInput
    update?: XOR<XOR<BarbeiroUpdateToOneWithWhereWithoutHorariosInput, BarbeiroUpdateWithoutHorariosInput>, BarbeiroUncheckedUpdateWithoutHorariosInput>
  }

  export type BarbeariaCreateNestedOneWithoutServicosInput = {
    create?: XOR<BarbeariaCreateWithoutServicosInput, BarbeariaUncheckedCreateWithoutServicosInput>
    connectOrCreate?: BarbeariaCreateOrConnectWithoutServicosInput
    connect?: BarbeariaWhereUniqueInput
  }

  export type BarbeiroCreateNestedOneWithoutServicosInput = {
    create?: XOR<BarbeiroCreateWithoutServicosInput, BarbeiroUncheckedCreateWithoutServicosInput>
    connectOrCreate?: BarbeiroCreateOrConnectWithoutServicosInput
    connect?: BarbeiroWhereUniqueInput
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BarbeariaUpdateOneRequiredWithoutServicosNestedInput = {
    create?: XOR<BarbeariaCreateWithoutServicosInput, BarbeariaUncheckedCreateWithoutServicosInput>
    connectOrCreate?: BarbeariaCreateOrConnectWithoutServicosInput
    upsert?: BarbeariaUpsertWithoutServicosInput
    connect?: BarbeariaWhereUniqueInput
    update?: XOR<XOR<BarbeariaUpdateToOneWithWhereWithoutServicosInput, BarbeariaUpdateWithoutServicosInput>, BarbeariaUncheckedUpdateWithoutServicosInput>
  }

  export type BarbeiroUpdateOneWithoutServicosNestedInput = {
    create?: XOR<BarbeiroCreateWithoutServicosInput, BarbeiroUncheckedCreateWithoutServicosInput>
    connectOrCreate?: BarbeiroCreateOrConnectWithoutServicosInput
    upsert?: BarbeiroUpsertWithoutServicosInput
    disconnect?: BarbeiroWhereInput | boolean
    delete?: BarbeiroWhereInput | boolean
    connect?: BarbeiroWhereUniqueInput
    update?: XOR<XOR<BarbeiroUpdateToOneWithWhereWithoutServicosInput, BarbeiroUpdateWithoutServicosInput>, BarbeiroUncheckedUpdateWithoutServicosInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumUserTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.UserType | EnumUserTypeFieldRefInput<$PrismaModel>
    in?: $Enums.UserType[] | ListEnumUserTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserType[] | ListEnumUserTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumUserTypeFilter<$PrismaModel> | $Enums.UserType
  }

  export type NestedEnumPlanoFilter<$PrismaModel = never> = {
    equals?: $Enums.Plano | EnumPlanoFieldRefInput<$PrismaModel>
    in?: $Enums.Plano[] | ListEnumPlanoFieldRefInput<$PrismaModel>
    notIn?: $Enums.Plano[] | ListEnumPlanoFieldRefInput<$PrismaModel>
    not?: NestedEnumPlanoFilter<$PrismaModel> | $Enums.Plano
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumUserTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserType | EnumUserTypeFieldRefInput<$PrismaModel>
    in?: $Enums.UserType[] | ListEnumUserTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserType[] | ListEnumUserTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumUserTypeWithAggregatesFilter<$PrismaModel> | $Enums.UserType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserTypeFilter<$PrismaModel>
    _max?: NestedEnumUserTypeFilter<$PrismaModel>
  }

  export type NestedEnumPlanoWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Plano | EnumPlanoFieldRefInput<$PrismaModel>
    in?: $Enums.Plano[] | ListEnumPlanoFieldRefInput<$PrismaModel>
    notIn?: $Enums.Plano[] | ListEnumPlanoFieldRefInput<$PrismaModel>
    not?: NestedEnumPlanoWithAggregatesFilter<$PrismaModel> | $Enums.Plano
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPlanoFilter<$PrismaModel>
    _max?: NestedEnumPlanoFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type BarbeariaCreateWithoutOwnerInput = {
    id?: string
    nome: string
    slug: string
    descricao?: string | null
    endereco: string
    cidade: string
    estado: string
    cep?: string | null
    pontoReferencia?: string | null
    latitude?: number | null
    longitude?: number | null
    telefone?: string | null
    whatsapp?: string | null
    mensagemLembrete?: string | null
    lembreteAtivo?: boolean
    foto?: string | null
    fotos?: BarbeariaCreatefotosInput | string[]
    ativa?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    barbeiros?: BarbeiroCreateNestedManyWithoutBarbeariaInput
    servicos?: ServicoCreateNestedManyWithoutBarbeariaInput
  }

  export type BarbeariaUncheckedCreateWithoutOwnerInput = {
    id?: string
    nome: string
    slug: string
    descricao?: string | null
    endereco: string
    cidade: string
    estado: string
    cep?: string | null
    pontoReferencia?: string | null
    latitude?: number | null
    longitude?: number | null
    telefone?: string | null
    whatsapp?: string | null
    mensagemLembrete?: string | null
    lembreteAtivo?: boolean
    foto?: string | null
    fotos?: BarbeariaCreatefotosInput | string[]
    ativa?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    barbeiros?: BarbeiroUncheckedCreateNestedManyWithoutBarbeariaInput
    servicos?: ServicoUncheckedCreateNestedManyWithoutBarbeariaInput
  }

  export type BarbeariaCreateOrConnectWithoutOwnerInput = {
    where: BarbeariaWhereUniqueInput
    create: XOR<BarbeariaCreateWithoutOwnerInput, BarbeariaUncheckedCreateWithoutOwnerInput>
  }

  export type BarbeariaCreateManyOwnerInputEnvelope = {
    data: BarbeariaCreateManyOwnerInput | BarbeariaCreateManyOwnerInput[]
    skipDuplicates?: boolean
  }

  export type BarbeariaUpsertWithWhereUniqueWithoutOwnerInput = {
    where: BarbeariaWhereUniqueInput
    update: XOR<BarbeariaUpdateWithoutOwnerInput, BarbeariaUncheckedUpdateWithoutOwnerInput>
    create: XOR<BarbeariaCreateWithoutOwnerInput, BarbeariaUncheckedCreateWithoutOwnerInput>
  }

  export type BarbeariaUpdateWithWhereUniqueWithoutOwnerInput = {
    where: BarbeariaWhereUniqueInput
    data: XOR<BarbeariaUpdateWithoutOwnerInput, BarbeariaUncheckedUpdateWithoutOwnerInput>
  }

  export type BarbeariaUpdateManyWithWhereWithoutOwnerInput = {
    where: BarbeariaScalarWhereInput
    data: XOR<BarbeariaUpdateManyMutationInput, BarbeariaUncheckedUpdateManyWithoutOwnerInput>
  }

  export type BarbeariaScalarWhereInput = {
    AND?: BarbeariaScalarWhereInput | BarbeariaScalarWhereInput[]
    OR?: BarbeariaScalarWhereInput[]
    NOT?: BarbeariaScalarWhereInput | BarbeariaScalarWhereInput[]
    id?: StringFilter<"Barbearia"> | string
    nome?: StringFilter<"Barbearia"> | string
    slug?: StringFilter<"Barbearia"> | string
    descricao?: StringNullableFilter<"Barbearia"> | string | null
    endereco?: StringFilter<"Barbearia"> | string
    cidade?: StringFilter<"Barbearia"> | string
    estado?: StringFilter<"Barbearia"> | string
    cep?: StringNullableFilter<"Barbearia"> | string | null
    pontoReferencia?: StringNullableFilter<"Barbearia"> | string | null
    latitude?: FloatNullableFilter<"Barbearia"> | number | null
    longitude?: FloatNullableFilter<"Barbearia"> | number | null
    telefone?: StringNullableFilter<"Barbearia"> | string | null
    whatsapp?: StringNullableFilter<"Barbearia"> | string | null
    mensagemLembrete?: StringNullableFilter<"Barbearia"> | string | null
    lembreteAtivo?: BoolFilter<"Barbearia"> | boolean
    foto?: StringNullableFilter<"Barbearia"> | string | null
    fotos?: StringNullableListFilter<"Barbearia">
    ownerId?: StringFilter<"Barbearia"> | string
    ativa?: BoolFilter<"Barbearia"> | boolean
    createdAt?: DateTimeFilter<"Barbearia"> | Date | string
    updatedAt?: DateTimeFilter<"Barbearia"> | Date | string
  }

  export type UserCreateWithoutBarbeariasInput = {
    id?: string
    nome: string
    email: string
    senha?: string | null
    telefone?: string | null
    tipo?: $Enums.UserType
    plano?: $Enums.Plano
    googleId?: string | null
    avatar?: string | null
    emailVerified?: boolean
    authVersion?: number
    verificationAttempts?: number
    verificationCode?: string | null
    verificationExpires?: Date | string | null
    resetPasswordToken?: string | null
    resetPasswordExpires?: Date | string | null
    subscriptionId?: string | null
    latestPaymentId?: string | null
    subscriptionStatus?: string | null
    planoExpiraEm?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUncheckedCreateWithoutBarbeariasInput = {
    id?: string
    nome: string
    email: string
    senha?: string | null
    telefone?: string | null
    tipo?: $Enums.UserType
    plano?: $Enums.Plano
    googleId?: string | null
    avatar?: string | null
    emailVerified?: boolean
    authVersion?: number
    verificationAttempts?: number
    verificationCode?: string | null
    verificationExpires?: Date | string | null
    resetPasswordToken?: string | null
    resetPasswordExpires?: Date | string | null
    subscriptionId?: string | null
    latestPaymentId?: string | null
    subscriptionStatus?: string | null
    planoExpiraEm?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserCreateOrConnectWithoutBarbeariasInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutBarbeariasInput, UserUncheckedCreateWithoutBarbeariasInput>
  }

  export type BarbeiroCreateWithoutBarbeariaInput = {
    id?: string
    nome: string
    foto?: string | null
    ativo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    servicos?: ServicoCreateNestedManyWithoutBarbeiroInput
    horarios?: HorarioDisponivelCreateNestedManyWithoutBarbeiroInput
  }

  export type BarbeiroUncheckedCreateWithoutBarbeariaInput = {
    id?: string
    nome: string
    foto?: string | null
    ativo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    servicos?: ServicoUncheckedCreateNestedManyWithoutBarbeiroInput
    horarios?: HorarioDisponivelUncheckedCreateNestedManyWithoutBarbeiroInput
  }

  export type BarbeiroCreateOrConnectWithoutBarbeariaInput = {
    where: BarbeiroWhereUniqueInput
    create: XOR<BarbeiroCreateWithoutBarbeariaInput, BarbeiroUncheckedCreateWithoutBarbeariaInput>
  }

  export type BarbeiroCreateManyBarbeariaInputEnvelope = {
    data: BarbeiroCreateManyBarbeariaInput | BarbeiroCreateManyBarbeariaInput[]
    skipDuplicates?: boolean
  }

  export type ServicoCreateWithoutBarbeariaInput = {
    id?: string
    nome: string
    preco: number
    duracao: number
    ativo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    barbeiro?: BarbeiroCreateNestedOneWithoutServicosInput
  }

  export type ServicoUncheckedCreateWithoutBarbeariaInput = {
    id?: string
    nome: string
    preco: number
    duracao: number
    barbeiroId?: string | null
    ativo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ServicoCreateOrConnectWithoutBarbeariaInput = {
    where: ServicoWhereUniqueInput
    create: XOR<ServicoCreateWithoutBarbeariaInput, ServicoUncheckedCreateWithoutBarbeariaInput>
  }

  export type ServicoCreateManyBarbeariaInputEnvelope = {
    data: ServicoCreateManyBarbeariaInput | ServicoCreateManyBarbeariaInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutBarbeariasInput = {
    update: XOR<UserUpdateWithoutBarbeariasInput, UserUncheckedUpdateWithoutBarbeariasInput>
    create: XOR<UserCreateWithoutBarbeariasInput, UserUncheckedCreateWithoutBarbeariasInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutBarbeariasInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutBarbeariasInput, UserUncheckedUpdateWithoutBarbeariasInput>
  }

  export type UserUpdateWithoutBarbeariasInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: NullableStringFieldUpdateOperationsInput | string | null
    telefone?: NullableStringFieldUpdateOperationsInput | string | null
    tipo?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    plano?: EnumPlanoFieldUpdateOperationsInput | $Enums.Plano
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    authVersion?: IntFieldUpdateOperationsInput | number
    verificationAttempts?: IntFieldUpdateOperationsInput | number
    verificationCode?: NullableStringFieldUpdateOperationsInput | string | null
    verificationExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resetPasswordToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetPasswordExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    latestPaymentId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionStatus?: NullableStringFieldUpdateOperationsInput | string | null
    planoExpiraEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateWithoutBarbeariasInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: NullableStringFieldUpdateOperationsInput | string | null
    telefone?: NullableStringFieldUpdateOperationsInput | string | null
    tipo?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    plano?: EnumPlanoFieldUpdateOperationsInput | $Enums.Plano
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    authVersion?: IntFieldUpdateOperationsInput | number
    verificationAttempts?: IntFieldUpdateOperationsInput | number
    verificationCode?: NullableStringFieldUpdateOperationsInput | string | null
    verificationExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resetPasswordToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetPasswordExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    latestPaymentId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionStatus?: NullableStringFieldUpdateOperationsInput | string | null
    planoExpiraEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BarbeiroUpsertWithWhereUniqueWithoutBarbeariaInput = {
    where: BarbeiroWhereUniqueInput
    update: XOR<BarbeiroUpdateWithoutBarbeariaInput, BarbeiroUncheckedUpdateWithoutBarbeariaInput>
    create: XOR<BarbeiroCreateWithoutBarbeariaInput, BarbeiroUncheckedCreateWithoutBarbeariaInput>
  }

  export type BarbeiroUpdateWithWhereUniqueWithoutBarbeariaInput = {
    where: BarbeiroWhereUniqueInput
    data: XOR<BarbeiroUpdateWithoutBarbeariaInput, BarbeiroUncheckedUpdateWithoutBarbeariaInput>
  }

  export type BarbeiroUpdateManyWithWhereWithoutBarbeariaInput = {
    where: BarbeiroScalarWhereInput
    data: XOR<BarbeiroUpdateManyMutationInput, BarbeiroUncheckedUpdateManyWithoutBarbeariaInput>
  }

  export type BarbeiroScalarWhereInput = {
    AND?: BarbeiroScalarWhereInput | BarbeiroScalarWhereInput[]
    OR?: BarbeiroScalarWhereInput[]
    NOT?: BarbeiroScalarWhereInput | BarbeiroScalarWhereInput[]
    id?: StringFilter<"Barbeiro"> | string
    nome?: StringFilter<"Barbeiro"> | string
    foto?: StringNullableFilter<"Barbeiro"> | string | null
    barbeariaId?: StringFilter<"Barbeiro"> | string
    ativo?: BoolFilter<"Barbeiro"> | boolean
    createdAt?: DateTimeFilter<"Barbeiro"> | Date | string
    updatedAt?: DateTimeFilter<"Barbeiro"> | Date | string
  }

  export type ServicoUpsertWithWhereUniqueWithoutBarbeariaInput = {
    where: ServicoWhereUniqueInput
    update: XOR<ServicoUpdateWithoutBarbeariaInput, ServicoUncheckedUpdateWithoutBarbeariaInput>
    create: XOR<ServicoCreateWithoutBarbeariaInput, ServicoUncheckedCreateWithoutBarbeariaInput>
  }

  export type ServicoUpdateWithWhereUniqueWithoutBarbeariaInput = {
    where: ServicoWhereUniqueInput
    data: XOR<ServicoUpdateWithoutBarbeariaInput, ServicoUncheckedUpdateWithoutBarbeariaInput>
  }

  export type ServicoUpdateManyWithWhereWithoutBarbeariaInput = {
    where: ServicoScalarWhereInput
    data: XOR<ServicoUpdateManyMutationInput, ServicoUncheckedUpdateManyWithoutBarbeariaInput>
  }

  export type ServicoScalarWhereInput = {
    AND?: ServicoScalarWhereInput | ServicoScalarWhereInput[]
    OR?: ServicoScalarWhereInput[]
    NOT?: ServicoScalarWhereInput | ServicoScalarWhereInput[]
    id?: StringFilter<"Servico"> | string
    nome?: StringFilter<"Servico"> | string
    preco?: FloatFilter<"Servico"> | number
    duracao?: IntFilter<"Servico"> | number
    barbeariaId?: StringFilter<"Servico"> | string
    barbeiroId?: StringNullableFilter<"Servico"> | string | null
    ativo?: BoolFilter<"Servico"> | boolean
    createdAt?: DateTimeFilter<"Servico"> | Date | string
    updatedAt?: DateTimeFilter<"Servico"> | Date | string
  }

  export type BarbeariaCreateWithoutBarbeirosInput = {
    id?: string
    nome: string
    slug: string
    descricao?: string | null
    endereco: string
    cidade: string
    estado: string
    cep?: string | null
    pontoReferencia?: string | null
    latitude?: number | null
    longitude?: number | null
    telefone?: string | null
    whatsapp?: string | null
    mensagemLembrete?: string | null
    lembreteAtivo?: boolean
    foto?: string | null
    fotos?: BarbeariaCreatefotosInput | string[]
    ativa?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    owner: UserCreateNestedOneWithoutBarbeariasInput
    servicos?: ServicoCreateNestedManyWithoutBarbeariaInput
  }

  export type BarbeariaUncheckedCreateWithoutBarbeirosInput = {
    id?: string
    nome: string
    slug: string
    descricao?: string | null
    endereco: string
    cidade: string
    estado: string
    cep?: string | null
    pontoReferencia?: string | null
    latitude?: number | null
    longitude?: number | null
    telefone?: string | null
    whatsapp?: string | null
    mensagemLembrete?: string | null
    lembreteAtivo?: boolean
    foto?: string | null
    fotos?: BarbeariaCreatefotosInput | string[]
    ownerId: string
    ativa?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    servicos?: ServicoUncheckedCreateNestedManyWithoutBarbeariaInput
  }

  export type BarbeariaCreateOrConnectWithoutBarbeirosInput = {
    where: BarbeariaWhereUniqueInput
    create: XOR<BarbeariaCreateWithoutBarbeirosInput, BarbeariaUncheckedCreateWithoutBarbeirosInput>
  }

  export type ServicoCreateWithoutBarbeiroInput = {
    id?: string
    nome: string
    preco: number
    duracao: number
    ativo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    barbearia: BarbeariaCreateNestedOneWithoutServicosInput
  }

  export type ServicoUncheckedCreateWithoutBarbeiroInput = {
    id?: string
    nome: string
    preco: number
    duracao: number
    barbeariaId: string
    ativo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ServicoCreateOrConnectWithoutBarbeiroInput = {
    where: ServicoWhereUniqueInput
    create: XOR<ServicoCreateWithoutBarbeiroInput, ServicoUncheckedCreateWithoutBarbeiroInput>
  }

  export type ServicoCreateManyBarbeiroInputEnvelope = {
    data: ServicoCreateManyBarbeiroInput | ServicoCreateManyBarbeiroInput[]
    skipDuplicates?: boolean
  }

  export type HorarioDisponivelCreateWithoutBarbeiroInput = {
    id?: string
    diaSemana: number
    horaInicio: string
    horaFim: string
    almocoInicio?: string | null
    almocoFim?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type HorarioDisponivelUncheckedCreateWithoutBarbeiroInput = {
    id?: string
    diaSemana: number
    horaInicio: string
    horaFim: string
    almocoInicio?: string | null
    almocoFim?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type HorarioDisponivelCreateOrConnectWithoutBarbeiroInput = {
    where: HorarioDisponivelWhereUniqueInput
    create: XOR<HorarioDisponivelCreateWithoutBarbeiroInput, HorarioDisponivelUncheckedCreateWithoutBarbeiroInput>
  }

  export type HorarioDisponivelCreateManyBarbeiroInputEnvelope = {
    data: HorarioDisponivelCreateManyBarbeiroInput | HorarioDisponivelCreateManyBarbeiroInput[]
    skipDuplicates?: boolean
  }

  export type BarbeariaUpsertWithoutBarbeirosInput = {
    update: XOR<BarbeariaUpdateWithoutBarbeirosInput, BarbeariaUncheckedUpdateWithoutBarbeirosInput>
    create: XOR<BarbeariaCreateWithoutBarbeirosInput, BarbeariaUncheckedCreateWithoutBarbeirosInput>
    where?: BarbeariaWhereInput
  }

  export type BarbeariaUpdateToOneWithWhereWithoutBarbeirosInput = {
    where?: BarbeariaWhereInput
    data: XOR<BarbeariaUpdateWithoutBarbeirosInput, BarbeariaUncheckedUpdateWithoutBarbeirosInput>
  }

  export type BarbeariaUpdateWithoutBarbeirosInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    endereco?: StringFieldUpdateOperationsInput | string
    cidade?: StringFieldUpdateOperationsInput | string
    estado?: StringFieldUpdateOperationsInput | string
    cep?: NullableStringFieldUpdateOperationsInput | string | null
    pontoReferencia?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    telefone?: NullableStringFieldUpdateOperationsInput | string | null
    whatsapp?: NullableStringFieldUpdateOperationsInput | string | null
    mensagemLembrete?: NullableStringFieldUpdateOperationsInput | string | null
    lembreteAtivo?: BoolFieldUpdateOperationsInput | boolean
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    fotos?: BarbeariaUpdatefotosInput | string[]
    ativa?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owner?: UserUpdateOneRequiredWithoutBarbeariasNestedInput
    servicos?: ServicoUpdateManyWithoutBarbeariaNestedInput
  }

  export type BarbeariaUncheckedUpdateWithoutBarbeirosInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    endereco?: StringFieldUpdateOperationsInput | string
    cidade?: StringFieldUpdateOperationsInput | string
    estado?: StringFieldUpdateOperationsInput | string
    cep?: NullableStringFieldUpdateOperationsInput | string | null
    pontoReferencia?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    telefone?: NullableStringFieldUpdateOperationsInput | string | null
    whatsapp?: NullableStringFieldUpdateOperationsInput | string | null
    mensagemLembrete?: NullableStringFieldUpdateOperationsInput | string | null
    lembreteAtivo?: BoolFieldUpdateOperationsInput | boolean
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    fotos?: BarbeariaUpdatefotosInput | string[]
    ownerId?: StringFieldUpdateOperationsInput | string
    ativa?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    servicos?: ServicoUncheckedUpdateManyWithoutBarbeariaNestedInput
  }

  export type ServicoUpsertWithWhereUniqueWithoutBarbeiroInput = {
    where: ServicoWhereUniqueInput
    update: XOR<ServicoUpdateWithoutBarbeiroInput, ServicoUncheckedUpdateWithoutBarbeiroInput>
    create: XOR<ServicoCreateWithoutBarbeiroInput, ServicoUncheckedCreateWithoutBarbeiroInput>
  }

  export type ServicoUpdateWithWhereUniqueWithoutBarbeiroInput = {
    where: ServicoWhereUniqueInput
    data: XOR<ServicoUpdateWithoutBarbeiroInput, ServicoUncheckedUpdateWithoutBarbeiroInput>
  }

  export type ServicoUpdateManyWithWhereWithoutBarbeiroInput = {
    where: ServicoScalarWhereInput
    data: XOR<ServicoUpdateManyMutationInput, ServicoUncheckedUpdateManyWithoutBarbeiroInput>
  }

  export type HorarioDisponivelUpsertWithWhereUniqueWithoutBarbeiroInput = {
    where: HorarioDisponivelWhereUniqueInput
    update: XOR<HorarioDisponivelUpdateWithoutBarbeiroInput, HorarioDisponivelUncheckedUpdateWithoutBarbeiroInput>
    create: XOR<HorarioDisponivelCreateWithoutBarbeiroInput, HorarioDisponivelUncheckedCreateWithoutBarbeiroInput>
  }

  export type HorarioDisponivelUpdateWithWhereUniqueWithoutBarbeiroInput = {
    where: HorarioDisponivelWhereUniqueInput
    data: XOR<HorarioDisponivelUpdateWithoutBarbeiroInput, HorarioDisponivelUncheckedUpdateWithoutBarbeiroInput>
  }

  export type HorarioDisponivelUpdateManyWithWhereWithoutBarbeiroInput = {
    where: HorarioDisponivelScalarWhereInput
    data: XOR<HorarioDisponivelUpdateManyMutationInput, HorarioDisponivelUncheckedUpdateManyWithoutBarbeiroInput>
  }

  export type HorarioDisponivelScalarWhereInput = {
    AND?: HorarioDisponivelScalarWhereInput | HorarioDisponivelScalarWhereInput[]
    OR?: HorarioDisponivelScalarWhereInput[]
    NOT?: HorarioDisponivelScalarWhereInput | HorarioDisponivelScalarWhereInput[]
    id?: StringFilter<"HorarioDisponivel"> | string
    barbeiroId?: StringFilter<"HorarioDisponivel"> | string
    diaSemana?: IntFilter<"HorarioDisponivel"> | number
    horaInicio?: StringFilter<"HorarioDisponivel"> | string
    horaFim?: StringFilter<"HorarioDisponivel"> | string
    almocoInicio?: StringNullableFilter<"HorarioDisponivel"> | string | null
    almocoFim?: StringNullableFilter<"HorarioDisponivel"> | string | null
    createdAt?: DateTimeFilter<"HorarioDisponivel"> | Date | string
    updatedAt?: DateTimeFilter<"HorarioDisponivel"> | Date | string
  }

  export type BarbeiroCreateWithoutHorariosInput = {
    id?: string
    nome: string
    foto?: string | null
    ativo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    barbearia: BarbeariaCreateNestedOneWithoutBarbeirosInput
    servicos?: ServicoCreateNestedManyWithoutBarbeiroInput
  }

  export type BarbeiroUncheckedCreateWithoutHorariosInput = {
    id?: string
    nome: string
    foto?: string | null
    barbeariaId: string
    ativo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    servicos?: ServicoUncheckedCreateNestedManyWithoutBarbeiroInput
  }

  export type BarbeiroCreateOrConnectWithoutHorariosInput = {
    where: BarbeiroWhereUniqueInput
    create: XOR<BarbeiroCreateWithoutHorariosInput, BarbeiroUncheckedCreateWithoutHorariosInput>
  }

  export type BarbeiroUpsertWithoutHorariosInput = {
    update: XOR<BarbeiroUpdateWithoutHorariosInput, BarbeiroUncheckedUpdateWithoutHorariosInput>
    create: XOR<BarbeiroCreateWithoutHorariosInput, BarbeiroUncheckedCreateWithoutHorariosInput>
    where?: BarbeiroWhereInput
  }

  export type BarbeiroUpdateToOneWithWhereWithoutHorariosInput = {
    where?: BarbeiroWhereInput
    data: XOR<BarbeiroUpdateWithoutHorariosInput, BarbeiroUncheckedUpdateWithoutHorariosInput>
  }

  export type BarbeiroUpdateWithoutHorariosInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    ativo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    barbearia?: BarbeariaUpdateOneRequiredWithoutBarbeirosNestedInput
    servicos?: ServicoUpdateManyWithoutBarbeiroNestedInput
  }

  export type BarbeiroUncheckedUpdateWithoutHorariosInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    barbeariaId?: StringFieldUpdateOperationsInput | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    servicos?: ServicoUncheckedUpdateManyWithoutBarbeiroNestedInput
  }

  export type BarbeariaCreateWithoutServicosInput = {
    id?: string
    nome: string
    slug: string
    descricao?: string | null
    endereco: string
    cidade: string
    estado: string
    cep?: string | null
    pontoReferencia?: string | null
    latitude?: number | null
    longitude?: number | null
    telefone?: string | null
    whatsapp?: string | null
    mensagemLembrete?: string | null
    lembreteAtivo?: boolean
    foto?: string | null
    fotos?: BarbeariaCreatefotosInput | string[]
    ativa?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    owner: UserCreateNestedOneWithoutBarbeariasInput
    barbeiros?: BarbeiroCreateNestedManyWithoutBarbeariaInput
  }

  export type BarbeariaUncheckedCreateWithoutServicosInput = {
    id?: string
    nome: string
    slug: string
    descricao?: string | null
    endereco: string
    cidade: string
    estado: string
    cep?: string | null
    pontoReferencia?: string | null
    latitude?: number | null
    longitude?: number | null
    telefone?: string | null
    whatsapp?: string | null
    mensagemLembrete?: string | null
    lembreteAtivo?: boolean
    foto?: string | null
    fotos?: BarbeariaCreatefotosInput | string[]
    ownerId: string
    ativa?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    barbeiros?: BarbeiroUncheckedCreateNestedManyWithoutBarbeariaInput
  }

  export type BarbeariaCreateOrConnectWithoutServicosInput = {
    where: BarbeariaWhereUniqueInput
    create: XOR<BarbeariaCreateWithoutServicosInput, BarbeariaUncheckedCreateWithoutServicosInput>
  }

  export type BarbeiroCreateWithoutServicosInput = {
    id?: string
    nome: string
    foto?: string | null
    ativo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    barbearia: BarbeariaCreateNestedOneWithoutBarbeirosInput
    horarios?: HorarioDisponivelCreateNestedManyWithoutBarbeiroInput
  }

  export type BarbeiroUncheckedCreateWithoutServicosInput = {
    id?: string
    nome: string
    foto?: string | null
    barbeariaId: string
    ativo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    horarios?: HorarioDisponivelUncheckedCreateNestedManyWithoutBarbeiroInput
  }

  export type BarbeiroCreateOrConnectWithoutServicosInput = {
    where: BarbeiroWhereUniqueInput
    create: XOR<BarbeiroCreateWithoutServicosInput, BarbeiroUncheckedCreateWithoutServicosInput>
  }

  export type BarbeariaUpsertWithoutServicosInput = {
    update: XOR<BarbeariaUpdateWithoutServicosInput, BarbeariaUncheckedUpdateWithoutServicosInput>
    create: XOR<BarbeariaCreateWithoutServicosInput, BarbeariaUncheckedCreateWithoutServicosInput>
    where?: BarbeariaWhereInput
  }

  export type BarbeariaUpdateToOneWithWhereWithoutServicosInput = {
    where?: BarbeariaWhereInput
    data: XOR<BarbeariaUpdateWithoutServicosInput, BarbeariaUncheckedUpdateWithoutServicosInput>
  }

  export type BarbeariaUpdateWithoutServicosInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    endereco?: StringFieldUpdateOperationsInput | string
    cidade?: StringFieldUpdateOperationsInput | string
    estado?: StringFieldUpdateOperationsInput | string
    cep?: NullableStringFieldUpdateOperationsInput | string | null
    pontoReferencia?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    telefone?: NullableStringFieldUpdateOperationsInput | string | null
    whatsapp?: NullableStringFieldUpdateOperationsInput | string | null
    mensagemLembrete?: NullableStringFieldUpdateOperationsInput | string | null
    lembreteAtivo?: BoolFieldUpdateOperationsInput | boolean
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    fotos?: BarbeariaUpdatefotosInput | string[]
    ativa?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owner?: UserUpdateOneRequiredWithoutBarbeariasNestedInput
    barbeiros?: BarbeiroUpdateManyWithoutBarbeariaNestedInput
  }

  export type BarbeariaUncheckedUpdateWithoutServicosInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    endereco?: StringFieldUpdateOperationsInput | string
    cidade?: StringFieldUpdateOperationsInput | string
    estado?: StringFieldUpdateOperationsInput | string
    cep?: NullableStringFieldUpdateOperationsInput | string | null
    pontoReferencia?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    telefone?: NullableStringFieldUpdateOperationsInput | string | null
    whatsapp?: NullableStringFieldUpdateOperationsInput | string | null
    mensagemLembrete?: NullableStringFieldUpdateOperationsInput | string | null
    lembreteAtivo?: BoolFieldUpdateOperationsInput | boolean
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    fotos?: BarbeariaUpdatefotosInput | string[]
    ownerId?: StringFieldUpdateOperationsInput | string
    ativa?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    barbeiros?: BarbeiroUncheckedUpdateManyWithoutBarbeariaNestedInput
  }

  export type BarbeiroUpsertWithoutServicosInput = {
    update: XOR<BarbeiroUpdateWithoutServicosInput, BarbeiroUncheckedUpdateWithoutServicosInput>
    create: XOR<BarbeiroCreateWithoutServicosInput, BarbeiroUncheckedCreateWithoutServicosInput>
    where?: BarbeiroWhereInput
  }

  export type BarbeiroUpdateToOneWithWhereWithoutServicosInput = {
    where?: BarbeiroWhereInput
    data: XOR<BarbeiroUpdateWithoutServicosInput, BarbeiroUncheckedUpdateWithoutServicosInput>
  }

  export type BarbeiroUpdateWithoutServicosInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    ativo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    barbearia?: BarbeariaUpdateOneRequiredWithoutBarbeirosNestedInput
    horarios?: HorarioDisponivelUpdateManyWithoutBarbeiroNestedInput
  }

  export type BarbeiroUncheckedUpdateWithoutServicosInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    barbeariaId?: StringFieldUpdateOperationsInput | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    horarios?: HorarioDisponivelUncheckedUpdateManyWithoutBarbeiroNestedInput
  }

  export type BarbeariaCreateManyOwnerInput = {
    id?: string
    nome: string
    slug: string
    descricao?: string | null
    endereco: string
    cidade: string
    estado: string
    cep?: string | null
    pontoReferencia?: string | null
    latitude?: number | null
    longitude?: number | null
    telefone?: string | null
    whatsapp?: string | null
    mensagemLembrete?: string | null
    lembreteAtivo?: boolean
    foto?: string | null
    fotos?: BarbeariaCreatefotosInput | string[]
    ativa?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BarbeariaUpdateWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    endereco?: StringFieldUpdateOperationsInput | string
    cidade?: StringFieldUpdateOperationsInput | string
    estado?: StringFieldUpdateOperationsInput | string
    cep?: NullableStringFieldUpdateOperationsInput | string | null
    pontoReferencia?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    telefone?: NullableStringFieldUpdateOperationsInput | string | null
    whatsapp?: NullableStringFieldUpdateOperationsInput | string | null
    mensagemLembrete?: NullableStringFieldUpdateOperationsInput | string | null
    lembreteAtivo?: BoolFieldUpdateOperationsInput | boolean
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    fotos?: BarbeariaUpdatefotosInput | string[]
    ativa?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    barbeiros?: BarbeiroUpdateManyWithoutBarbeariaNestedInput
    servicos?: ServicoUpdateManyWithoutBarbeariaNestedInput
  }

  export type BarbeariaUncheckedUpdateWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    endereco?: StringFieldUpdateOperationsInput | string
    cidade?: StringFieldUpdateOperationsInput | string
    estado?: StringFieldUpdateOperationsInput | string
    cep?: NullableStringFieldUpdateOperationsInput | string | null
    pontoReferencia?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    telefone?: NullableStringFieldUpdateOperationsInput | string | null
    whatsapp?: NullableStringFieldUpdateOperationsInput | string | null
    mensagemLembrete?: NullableStringFieldUpdateOperationsInput | string | null
    lembreteAtivo?: BoolFieldUpdateOperationsInput | boolean
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    fotos?: BarbeariaUpdatefotosInput | string[]
    ativa?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    barbeiros?: BarbeiroUncheckedUpdateManyWithoutBarbeariaNestedInput
    servicos?: ServicoUncheckedUpdateManyWithoutBarbeariaNestedInput
  }

  export type BarbeariaUncheckedUpdateManyWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    endereco?: StringFieldUpdateOperationsInput | string
    cidade?: StringFieldUpdateOperationsInput | string
    estado?: StringFieldUpdateOperationsInput | string
    cep?: NullableStringFieldUpdateOperationsInput | string | null
    pontoReferencia?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    telefone?: NullableStringFieldUpdateOperationsInput | string | null
    whatsapp?: NullableStringFieldUpdateOperationsInput | string | null
    mensagemLembrete?: NullableStringFieldUpdateOperationsInput | string | null
    lembreteAtivo?: BoolFieldUpdateOperationsInput | boolean
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    fotos?: BarbeariaUpdatefotosInput | string[]
    ativa?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BarbeiroCreateManyBarbeariaInput = {
    id?: string
    nome: string
    foto?: string | null
    ativo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ServicoCreateManyBarbeariaInput = {
    id?: string
    nome: string
    preco: number
    duracao: number
    barbeiroId?: string | null
    ativo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BarbeiroUpdateWithoutBarbeariaInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    ativo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    servicos?: ServicoUpdateManyWithoutBarbeiroNestedInput
    horarios?: HorarioDisponivelUpdateManyWithoutBarbeiroNestedInput
  }

  export type BarbeiroUncheckedUpdateWithoutBarbeariaInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    ativo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    servicos?: ServicoUncheckedUpdateManyWithoutBarbeiroNestedInput
    horarios?: HorarioDisponivelUncheckedUpdateManyWithoutBarbeiroNestedInput
  }

  export type BarbeiroUncheckedUpdateManyWithoutBarbeariaInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    ativo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServicoUpdateWithoutBarbeariaInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    preco?: FloatFieldUpdateOperationsInput | number
    duracao?: IntFieldUpdateOperationsInput | number
    ativo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    barbeiro?: BarbeiroUpdateOneWithoutServicosNestedInput
  }

  export type ServicoUncheckedUpdateWithoutBarbeariaInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    preco?: FloatFieldUpdateOperationsInput | number
    duracao?: IntFieldUpdateOperationsInput | number
    barbeiroId?: NullableStringFieldUpdateOperationsInput | string | null
    ativo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServicoUncheckedUpdateManyWithoutBarbeariaInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    preco?: FloatFieldUpdateOperationsInput | number
    duracao?: IntFieldUpdateOperationsInput | number
    barbeiroId?: NullableStringFieldUpdateOperationsInput | string | null
    ativo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServicoCreateManyBarbeiroInput = {
    id?: string
    nome: string
    preco: number
    duracao: number
    barbeariaId: string
    ativo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type HorarioDisponivelCreateManyBarbeiroInput = {
    id?: string
    diaSemana: number
    horaInicio: string
    horaFim: string
    almocoInicio?: string | null
    almocoFim?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ServicoUpdateWithoutBarbeiroInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    preco?: FloatFieldUpdateOperationsInput | number
    duracao?: IntFieldUpdateOperationsInput | number
    ativo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    barbearia?: BarbeariaUpdateOneRequiredWithoutServicosNestedInput
  }

  export type ServicoUncheckedUpdateWithoutBarbeiroInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    preco?: FloatFieldUpdateOperationsInput | number
    duracao?: IntFieldUpdateOperationsInput | number
    barbeariaId?: StringFieldUpdateOperationsInput | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServicoUncheckedUpdateManyWithoutBarbeiroInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    preco?: FloatFieldUpdateOperationsInput | number
    duracao?: IntFieldUpdateOperationsInput | number
    barbeariaId?: StringFieldUpdateOperationsInput | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HorarioDisponivelUpdateWithoutBarbeiroInput = {
    id?: StringFieldUpdateOperationsInput | string
    diaSemana?: IntFieldUpdateOperationsInput | number
    horaInicio?: StringFieldUpdateOperationsInput | string
    horaFim?: StringFieldUpdateOperationsInput | string
    almocoInicio?: NullableStringFieldUpdateOperationsInput | string | null
    almocoFim?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HorarioDisponivelUncheckedUpdateWithoutBarbeiroInput = {
    id?: StringFieldUpdateOperationsInput | string
    diaSemana?: IntFieldUpdateOperationsInput | number
    horaInicio?: StringFieldUpdateOperationsInput | string
    horaFim?: StringFieldUpdateOperationsInput | string
    almocoInicio?: NullableStringFieldUpdateOperationsInput | string | null
    almocoFim?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HorarioDisponivelUncheckedUpdateManyWithoutBarbeiroInput = {
    id?: StringFieldUpdateOperationsInput | string
    diaSemana?: IntFieldUpdateOperationsInput | number
    horaInicio?: StringFieldUpdateOperationsInput | string
    horaFim?: StringFieldUpdateOperationsInput | string
    almocoInicio?: NullableStringFieldUpdateOperationsInput | string | null
    almocoFim?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}