/* eslint-disable @typescript-eslint/no-explicit-any */
export abstract class BaseRESTService {
  abstract getOne?: (...args: any[]) => Promise<any>
  abstract getList?: (...args: any[]) => Promise<any>
  abstract create?: (...args: any[]) => Promise<any>
  abstract update?: (...args: any[]) => Promise<any>
  abstract delete?: (...args: any[]) => Promise<any>
}
