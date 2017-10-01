export class Page {
  Page: number;
  Rows: number;
  Count: boolean;
  Total: number;
  Sort: string;
  public bindPage(params: any) {
    if (params.limit && params.limit > 0) {
      this.Rows = params.limit;
    }else {
      this.Rows = 10;
    }
    if (typeof(params.offset) !== 'number'  || params.offset < 0) {
      params.offset = 0;
    }
    this.Page = (params.offset / params.limit) + 1;
    if (typeof(params.sortBy) === 'string') {
      let asc = params.sortAsc ? '' : ' desc';
      this.Sort = params.sortBy + asc;
    }
  }
}

export class Model {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string;
}
